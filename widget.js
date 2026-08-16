/**
 * Aspalo — Vapi floating button + live demo modal controller.
 */
(function () {
    var vapiInstance = null;
    var assistant = "056c49fc-6999-46e0-88ee-235392642f7a";
    var apiKey = "76473afb-6fd2-44d8-affc-6b040bd924d3";

    function buildVapiButtonConfig() {
        var t = window.AspaloI18n ? window.AspaloI18n.t.bind(window.AspaloI18n) : function (k) { return k; };
        return {
            position: "bottom-right",
            offset: "40px",
            width: "60px",
            height: "60px",
            idle: {
                color: "rgb(26, 22, 18)",
                type: "pill",
                title: t("vapi_idle_title"),
                subtitle: t("vapi_idle_sub"),
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg"
            },
            loading: {
                color: "rgb(90, 80, 70)",
                type: "pill",
                title: t("vapi_load_title"),
                subtitle: t("vapi_load_sub"),
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg"
            },
            active: {
                color: "rgb(198, 93, 46)",
                type: "pill",
                title: t("vapi_active_title"),
                subtitle: t("vapi_active_sub"),
                icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg"
            }
        };
    }

    var buttonConfig = buildVapiButtonConfig();
    window.refreshVapiLabels = function () {
        buttonConfig = buildVapiButtonConfig();
    };

    function initVapiWidget(config) {
        if (!window.vapiSDK || typeof window.vapiSDK.run !== "function") return null;
        try {
            var instance = window.vapiSDK.run({ apiKey: apiKey, assistant: assistant, config: config });
            instance.on("call-start", function () { console.log("Demo call started"); });
            instance.on("call-end", function () { console.log("Demo call ended"); });
            instance.on("error", function (err) {
                console.error("Vapi error:", err);
                var msg = (err && err.message) ? String(err.message) : "";
                if (msg.indexOf("Permission") !== -1 || msg.indexOf("NotAllowed") !== -1 || msg.indexOf("denied") !== -1) {
                    try {
                        alert(window.AspaloI18n ? window.AspaloI18n.t("vapi_mic_err") : "Mikrofon erişimi reddedildi.");
                    } catch (e) {}
                }
            });
            return instance;
        } catch (err) {
            console.error("Vapi init error:", err);
            return null;
        }
    }

    function findAndClickVapiButton() {
        var btn = document.querySelector(".vapi-btn");
        if (btn) { btn.click(); return true; }
        var all = document.querySelectorAll("body > div");
        for (var i = 0; i < all.length; i++) {
            var s = (all[i].getAttribute("style") || "").toLowerCase();
            if (s.indexOf("position") !== -1 && s.indexOf("fixed") !== -1 && s.indexOf("bottom") !== -1 && s.indexOf("right") !== -1) {
                var b = all[i].querySelector("button");
                if (b) { b.click(); return true; }
            }
        }
        return false;
    }

    window.startVapiCall = function () {
        if (findAndClickVapiButton()) return;
        var attempts = 0;
        var iv = setInterval(function () {
            if (findAndClickVapiButton()) { clearInterval(iv); return; }
            if (++attempts >= 25) clearInterval(iv);
        }, 300);
    };

    (function (d, tag) {
        var g = d.createElement(tag), s = d.getElementsByTagName(tag)[0];
        g.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function () {
            vapiInstance = initVapiWidget(buttonConfig);
            window.vapiInstance = vapiInstance;
            wireLiveDemoEvents(vapiInstance);
        };
    })(document, "script");

    var liveDemoTimerIv = null;
    var liveDemoSeconds = 0;
    var liveDemoBubbles = { user: null, assistant: null };
    var liveDemoEventsWired = false;

    function ldShowState(name) {
        ["idle", "connecting", "active", "ended"].forEach(function (s) {
            var el = document.getElementById("live-demo-" + s);
            if (el) el.hidden = (s !== name);
        });
    }

    function ldOpenModal() {
        var modal = document.getElementById("live-demo-modal");
        if (!modal) return;
        modal.classList.add("open");
        document.body.classList.add("modal-open");
        ldShowState("idle");
    }

    function ldCloseModal() {
        var modal = document.getElementById("live-demo-modal");
        if (!modal) return;
        modal.classList.remove("open");
        document.body.classList.remove("modal-open");
        if (vapiInstance) { try { vapiInstance.stop(); } catch (e) {} }
        ldStopTimer();
    }

    function ldStartTimer() {
        liveDemoSeconds = 0;
        var el = document.getElementById("live-demo-timer");
        if (el) el.textContent = "0:00";
        liveDemoTimerIv = setInterval(function () {
            liveDemoSeconds++;
            var m = Math.floor(liveDemoSeconds / 60);
            var s = liveDemoSeconds % 60;
            if (el) el.textContent = m + ":" + (s < 10 ? "0" : "") + s;
        }, 1000);
    }

    function ldStopTimer() {
        if (liveDemoTimerIv) { clearInterval(liveDemoTimerIv); liveDemoTimerIv = null; }
    }

    function ldResetTranscript() {
        var box = document.getElementById("live-demo-transcript");
        if (box) box.innerHTML = "";
        liveDemoBubbles = { user: null, assistant: null };
        var nameEl = document.getElementById("live-demo-captured-name");
        var sectorEl = document.getElementById("live-demo-captured-sector");
        if (nameEl) nameEl.textContent = "—";
        if (sectorEl) sectorEl.textContent = "—";
    }

    function ldAppendOrUpdateBubble(role, text, isFinal) {
        var box = document.getElementById("live-demo-transcript");
        if (!box || !text) return;
        var bubble = liveDemoBubbles[role];
        if (!bubble || bubble.dataset.final === "1") {
            bubble = document.createElement("div");
            bubble.className = "live-demo-bubble live-demo-bubble-" + role;
            box.appendChild(bubble);
            liveDemoBubbles[role] = bubble;
        }
        bubble.textContent = text;
        bubble.dataset.final = isFinal ? "1" : "0";
        box.scrollTop = box.scrollHeight;
    }

    function ldHandleToolCall(name, argsRaw) {
        if (name !== "save_lead_info") return;
        var args = argsRaw;
        if (typeof args === "string") {
            try { args = JSON.parse(args); } catch (e) { args = {}; }
        }
        args = args || {};
        var nameEl = document.getElementById("live-demo-captured-name");
        var sectorEl = document.getElementById("live-demo-captured-sector");
        if (nameEl && args.name) nameEl.textContent = args.name;
        if (sectorEl && args.sector) sectorEl.textContent = args.sector;
    }

    function ldHandleMessage(message) {
        if (!message || !message.type) return;
        if (message.type === "transcript") {
            ldAppendOrUpdateBubble(message.role === "user" ? "user" : "assistant", message.transcript, message.transcriptType === "final");
            return;
        }
        if (message.type === "tool-calls" && message.toolCalls) {
            message.toolCalls.forEach(function (tc) {
                var fn = tc.function || tc;
                if (fn && fn.name) ldHandleToolCall(fn.name, fn.arguments);
            });
            return;
        }
        if (message.type === "function-call" && message.functionCall) {
            ldHandleToolCall(message.functionCall.name, message.functionCall.parameters);
        }
    }

    function wireLiveDemoEvents(instance) {
        if (!instance || liveDemoEventsWired) return;
        liveDemoEventsWired = true;
        instance.on("call-start", function () {
            ldShowState("active");
            ldResetTranscript();
            ldStartTimer();
        });
        instance.on("call-end", function () {
            ldStopTimer();
            ldShowState("ended");
        });
        instance.on("message", ldHandleMessage);
        instance.on("error", function (err) {
            console.error("Vapi error:", err);
            ldStopTimer();
            ldShowState("idle");
        });
    }

    function bindLiveDemo() {
        document.querySelectorAll("[data-open-live-demo]").forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                ldOpenModal();
            });
        });
        document.querySelectorAll("[data-close-live-demo]").forEach(function (el) {
            el.addEventListener("click", function () { ldCloseModal(); });
        });
        var startBtn = document.getElementById("live-demo-start-btn");
        if (startBtn) {
            startBtn.addEventListener("click", function () {
                if (!vapiInstance) { console.error("Vapi not ready yet"); return; }
                ldShowState("connecting");
                wireLiveDemoEvents(vapiInstance);
                try { vapiInstance.start(assistant); } catch (e) { console.error("Vapi start error:", e); ldShowState("idle"); }
            });
        }
        var endBtn = document.getElementById("live-demo-end-btn");
        if (endBtn) {
            endBtn.addEventListener("click", function () {
                if (vapiInstance) { try { vapiInstance.stop(); } catch (e) {} }
            });
        }
        var restartBtn = document.getElementById("live-demo-restart-btn");
        if (restartBtn) {
            restartBtn.addEventListener("click", function () { ldShowState("idle"); });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindLiveDemo);
    } else {
        bindLiveDemo();
    }
})();
