/**
 * Aspalo — Vapi floating button + live demo modal controller.
 */
(function () {
    var vapiInstance = null;
    var assistant = "056c49fc-6999-46e0-88ee-235392642f7a";
    var apiKey = "76473afb-6fd2-44d8-affc-6b040bd924d3";
    var adaCallActive = false;

    function t(key) {
        return window.AspaloI18n ? window.AspaloI18n.t(key) : key;
    }

    function getAdaOverrides() {
        var locale = window.AspaloI18n && window.AspaloI18n.assistantLocale
            ? window.AspaloI18n.assistantLocale()
            : { languageCode: "tr-TR", stt: "tr", responseLanguage: "Turkish" };
        return {
            firstMessage: t("ada_first_message"),
            transcriber: { language: locale.stt },
            variableValues: {
                locale: locale.languageCode,
                response_language: locale.responseLanguage,
                system_instruction: t("ada_system_instruction")
            }
        };
    }

    function startAdaCall() {
        if (!vapiInstance) return false;
        try {
            vapiInstance.start(assistant, getAdaOverrides());
            return true;
        } catch (e) {
            console.error("Vapi start error:", e);
            return false;
        }
    }

    function stopAdaCall() {
        if (!vapiInstance) return;
        try { vapiInstance.stop(); } catch (e) {}
        adaCallActive = false;
    }

    function buildVapiButtonConfig() {
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
    function paintVapiLabels() {
        buttonConfig = buildVapiButtonConfig();
        var idle = t("vapi_idle_title");
        var idleSub = t("vapi_idle_sub");
        document.querySelectorAll(".vapi-btn, [class*='vapi']").forEach(function (root) {
            var titles = root.querySelectorAll("p, span, div");
            titles.forEach(function (el) {
                var text = (el.textContent || "").trim();
                if (text === "Talk Now" || text === "Hemen Konuş" || text === "ADA ile Konuş" || text === "Talk to ADA") {
                    el.textContent = idle;
                }
                if (text === "Talk with Aspalo" || text === "Aspalo ile konuş" || text === "Sesli yapay zekâ asistanı" || text === "AI voice assistant") {
                    el.textContent = idleSub;
                }
            });
        });
    }

    window.refreshVapiLabels = paintVapiLabels;

    function initVapiWidget(config) {
        if (!window.vapiSDK || typeof window.vapiSDK.run !== "function") return null;
        try {
            var instance = window.vapiSDK.run({
                apiKey: apiKey,
                assistant: assistant,
                assistantOverrides: getAdaOverrides(),
                config: config
            });
            instance.on("call-start", function () { adaCallActive = true; });
            instance.on("call-end", function () { adaCallActive = false; });
            instance.on("error", function (err) {
                console.error("Vapi error:", err);
                var msg = (err && err.message) ? String(err.message) : "";
                if (msg.indexOf("Permission") !== -1 || msg.indexOf("NotAllowed") !== -1 || msg.indexOf("denied") !== -1) {
                    try {
                        alert(t("vapi_mic_err") || t("ada_mic_needed"));
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
            buttonConfig = buildVapiButtonConfig();
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
        stopAdaCall();
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
                if (!startAdaCall()) ldShowState("idle");
            });
        }
        var endBtn = document.getElementById("live-demo-end-btn");
        if (endBtn) {
            endBtn.addEventListener("click", function () {
                stopAdaCall();
            });
        }
        var restartBtn = document.getElementById("live-demo-restart-btn");
        if (restartBtn) {
            restartBtn.addEventListener("click", function () { ldShowState("idle"); });
        }

        document.addEventListener("click", function (e) {
            var btn = e.target.closest && e.target.closest(".vapi-btn");
            if (!btn) return;
            e.preventDefault();
            e.stopPropagation();
            if (adaCallActive) stopAdaCall();
            else startAdaCall();
        }, true);
    }

    function onAdaLocaleChange() {
        paintVapiLabels();
        if (!adaCallActive) return;
        stopAdaCall();
        ldShowState("idle");
        var idle = document.getElementById("live-demo-idle");
        if (!idle) return;
        var existing = idle.querySelector(".live-demo-lang-note");
        if (existing) existing.remove();
        var note = document.createElement("p");
        note.className = "live-demo-lang-note";
        note.setAttribute("role", "status");
        note.textContent = t("ada_lang_switch_end");
        var startBtn = document.getElementById("live-demo-start-btn");
        idle.insertBefore(note, startBtn || null);
    }

    var prevLangHandler = window.onAspaloLanguageChange;
    window.onAspaloLanguageChange = function (lang) {
        if (typeof prevLangHandler === "function") prevLangHandler(lang);
        onAdaLocaleChange();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindLiveDemo);
    } else {
        bindLiveDemo();
    }
})();
