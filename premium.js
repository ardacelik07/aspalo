/**
 * Aspalo Premium Motion — GSAP + ScrollTrigger + Lenis
 * Content frozen — motion/presentation only
 */
(function () {
    'use strict';

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobile = window.innerWidth < 768;
    var phoneDemoTimer = null;
    var gsapCtx = null;

    var EASE = 'power4.out';
    var EASE_SOFT = 'power3.out';
    var STAGGER = 0.08;
    var SCROLL_START = 'top 82%';

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function wait(ms) {
        return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    /* ── Counter helpers ── */
    function parseCounter(text) {
        var raw = String(text || '').trim();
        if (raw === '+Gelir' || raw === '+Revenue') return { type: 'text', value: raw };
        var suffix = raw.indexOf('%') !== -1 ? '%' : '';
        var prefix = '';
        if (raw.indexOf('+$') === 0) prefix = '+$';
        else if (raw.indexOf('$') === 0) prefix = '$';
        if (raw.indexOf('k') !== -1) suffix = 'k';
        var num = parseFloat(raw.replace(/[^0-9.]/g, ''));
        if (isNaN(num)) return { type: 'text', value: raw };
        return { type: 'number', num: num, prefix: prefix, suffix: suffix };
    }

    function fmtCounter(p, v) {
        if (p.type === 'text') return p.value;
        var n = Math.round(v);
        if (p.prefix === '+$' && p.suffix === 'k') return '+$' + n + 'k';
        if (p.suffix === '%') return '%' + n;
        return String(n);
    }

    /* ── Masked line split (hero + section titles) ── */
    function splitMaskedTitle(el) {
        if (!el || el.classList.contains('title--split')) return;

        var html = el.innerHTML;
        var temp = document.createElement('div');
        temp.innerHTML = html;

        el.innerHTML = '';
        el.classList.add('title--split');

        var line1 = document.createElement('span');
        line1.className = 'hero-line';
        var inner1 = document.createElement('span');
        inner1.className = 'hero-line-inner';
        line1.appendChild(inner1);

        var line2 = document.createElement('span');
        line2.className = 'hero-line';
        var inner2 = document.createElement('span');
        inner2.className = 'hero-line-inner hero-line-inner--accent';
        line2.appendChild(inner2);

        var hasElement = false;
        Array.prototype.slice.call(temp.childNodes).forEach(function (node) {
            if (node.nodeType === 3) {
                var text = node.textContent;
                if (text) inner1.appendChild(document.createTextNode(text));
            } else if (node.nodeType === 1) {
                inner2.appendChild(node.cloneNode(true));
                hasElement = true;
            }
        });

        el.appendChild(line1);
        if (hasElement && inner2.childNodes.length) {
            el.appendChild(line2);
        } else if (!inner1.childNodes.length && inner2.childNodes.length) {
            line1.remove();
            inner2.className = 'hero-line-inner';
            line2.appendChild(inner2);
            el.appendChild(line2);
        }
    }

    function splitAllTitles() {
        var hero = document.querySelector('.hero-title');
        if (hero) {
            hero.classList.remove('title--split');
            splitMaskedTitle(hero);
        }
        document.querySelectorAll('.section-title').forEach(function (el) {
            el.classList.remove('title--split');
            splitMaskedTitle(el);
        });
    }

    function revealMaskedLines(container, opts) {
        if (typeof gsap === 'undefined') return;
        var inners = container.querySelectorAll('.hero-line-inner');
        if (!inners.length) return;
        gsap.from(inners, Object.assign({
            yPercent: 105,
            opacity: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: EASE
        }, opts || {}));
    }

    /* ── Live phone call demo ── */
    function initPhoneDemo() {
        var messages = document.querySelectorAll('.phone-msg-item');
        var typing = document.getElementById('phone-typing');
        var voiceBars = document.querySelector('.call-voice-bars');
        var timerEl = document.getElementById('phone-call-timer');
        var running = true;

        function formatTime(totalSec) {
            var m = Math.floor(totalSec / 60);
            var s = totalSec % 60;
            return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }

        function setVoice(active) {
            if (voiceBars) voiceBars.classList.toggle('is-active', !!active);
        }

        function setTyping(active) {
            if (typing) typing.classList.toggle('is-active', !!active);
        }

        function resetMessages() {
            messages.forEach(function (m) { m.classList.remove('is-visible'); });
            setTyping(false);
            setVoice(false);
        }

        function showAllMessages() {
            messages.forEach(function (m) { m.classList.add('is-visible'); });
            setTyping(false);
            setVoice(false);
        }

        if (reduced || !messages.length) {
            showAllMessages();
            return;
        }

        var seconds = 154;
        if (timerEl) timerEl.textContent = formatTime(seconds);

        phoneDemoTimer = setInterval(function () {
            if (!running) return;
            seconds += 1;
            if (timerEl) timerEl.textContent = formatTime(seconds);
        }, 1000);

        async function playLoop() {
            while (running) {
                resetMessages();
                await wait(500);
                setVoice(true);
                messages[0].classList.add('is-visible');
                await wait(1800);
                setVoice(false);
                await wait(400);
                setTyping(true);
                await wait(1200);
                setTyping(false);
                if (messages[1]) messages[1].classList.add('is-visible');
                await wait(1600);
                setTyping(true);
                setVoice(true);
                await wait(1100);
                setTyping(false);
                if (messages[2]) messages[2].classList.add('is-visible');
                await wait(2000);
                setVoice(false);
                await wait(2200);
            }
        }

        playLoop();
        window.stopPhoneDemo = function () {
            running = false;
            if (phoneDemoTimer) clearInterval(phoneDemoTimer);
        };
    }

    function initPhoneMotion() {
        if (typeof gsap === 'undefined' || reduced) return;
        var mockup = document.querySelector('.phone-mockup');
        var stage = document.querySelector('.phone-stage');
        if (!mockup) return;

        gsap.to(mockup, {
            y: -18,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        if (!isMobile && stage) {
            stage.addEventListener('mousemove', function (e) {
                var r = stage.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - 0.5;
                var y = (e.clientY - r.top) / r.height - 0.5;
                gsap.to(mockup, {
                    rotationY: x * 14,
                    rotationX: -y * 10,
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
            stage.addEventListener('mouseleave', function () {
                gsap.to(mockup, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.7,
                    ease: EASE_SOFT
                });
            });
        }
    }

    function initAurora() {
        var canvas = document.getElementById('aurora-canvas');
        if (!canvas || reduced) return;
        var ctx = canvas.getContext('2d');
        if (!ctx) return;

        var points = [
            { x: 0.75, y: 0.2, r: 0.45, c: [34, 211, 238], ph: 0 },
            { x: 0.15, y: 0.65, r: 0.38, c: [99, 102, 241], ph: 2 },
            { x: 0.55, y: 0.55, r: 0.32, c: [56, 189, 248], ph: 4 }
        ];
        var raf;

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            var parent = canvas.parentElement;
            if (!parent) return;
            var rect = parent.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        var t0 = performance.now();
        function draw(now) {
            var t = (now - t0) * 0.001;
            var w = canvas.clientWidth;
            var h = canvas.clientHeight;
            ctx.clearRect(0, 0, w, h);
            points.forEach(function (p) {
                var cx = (p.x + Math.sin(t * 0.4 + p.ph) * 0.05) * w;
                var cy = (p.y + Math.cos(t * 0.35 + p.ph) * 0.06) * h;
                var rad = p.r * Math.min(w, h) * (1 + Math.sin(t * 0.6 + p.ph) * 0.08);
                var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
                g.addColorStop(0, 'rgba(' + p.c.join(',') + ',0.22)');
                g.addColorStop(0.4, 'rgba(' + p.c.join(',') + ',0.08)');
                g.addColorStop(1, 'rgba(' + p.c.join(',') + ',0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(cx, cy, rad, 0, Math.PI * 2);
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        }

        resize();
        raf = requestAnimationFrame(draw);
        window.addEventListener('resize', resize);
    }

    function initCursor() {
        if (isMobile || reduced) return;
        var glow = document.querySelector('.cursor-glow');
        if (!glow) return;
        var x = 0, y = 0, cx = 0, cy = 0;
        document.body.classList.add('cursor-ready');
        document.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
        (function tick() {
            cx += (x - cx) * 0.12;
            cy += (y - cy) * 0.12;
            glow.style.transform = 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)';
            requestAnimationFrame(tick);
        })();
    }

    function initScrollProgress() {
        var bar = document.querySelector('.scroll-progress-bar');
        if (!bar || reduced || typeof ScrollTrigger === 'undefined') return;
        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: function (self) {
                gsap.set(bar, { scaleX: self.progress, transformOrigin: 'left center' });
            }
        });
        gsap.set(bar, { scaleX: 0, width: '100%' });
    }

    function markReveals() {
        [
            '.feature-card', '.comparison-card', '.pricing-card',
            '.sector-compat-card', '.step', '.dashboard-mockup',
            '.comparison-table-wrap', '.dash-card', '.sector-benefit-list li',
            '.reference-logo'
        ].forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                el.setAttribute('data-premium-reveal', 'scale');
            });
        });
    }

    function initReveals() {
        gsap.utils.toArray('[data-premium-reveal]').forEach(function (el) {
            if (el.classList.contains('sector-compat-card')) return;
            if (el.classList.contains('reference-logo')) return;
            gsap.to(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                ease: EASE_SOFT,
                scrollTrigger: {
                    trigger: el,
                    start: SCROLL_START,
                    toggleActions: 'play none none none'
                }
            });
        });

        var cards = document.querySelectorAll('#sector-cards .sector-compat-card');
        if (cards.length) {
            gsap.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: STAGGER,
                ease: EASE_SOFT,
                scrollTrigger: {
                    trigger: '#sector-cards',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        var logos = document.querySelectorAll('.references-logos .reference-logo');
        if (logos.length) {
            gsap.to(logos, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.7,
                stagger: 0.12,
                ease: 'back.out(1.4)',
                scrollTrigger: {
                    trigger: '.references-logos',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
    }

    function initSectionHeaders() {
        document.querySelectorAll('section:not(.hero)').forEach(function (sec) {
            var badge = sec.querySelector('.section-badge');
            var title = sec.querySelector('.section-title');
            var desc = sec.querySelector('.section-desc');
            var trigger = sec.querySelector('.section-header') || sec;
            var headerEls = [badge, title, desc].filter(Boolean);
            if (!headerEls.length) return;

            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            if (badge) {
                gsap.set(badge, { opacity: 0, y: 20, scale: 0.92 });
                tl.to(badge, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: EASE_SOFT });
            }

            if (title && title.classList.contains('title--split')) {
                var inners = title.querySelectorAll('.hero-line-inner');
                gsap.set(title, { opacity: 1 });
                gsap.set(inners, { yPercent: 110, opacity: 0 });
                tl.to(inners, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.09,
                    ease: EASE
                }, badge ? '-=0.25' : 0);
            } else if (title) {
                gsap.set(title, { opacity: 0, y: 28 });
                tl.to(title, { opacity: 1, y: 0, duration: 0.7, ease: EASE }, badge ? '-=0.2' : 0);
            }

            if (desc) {
                gsap.set(desc, { opacity: 0, y: 20 });
                tl.to(desc, { opacity: 1, y: 0, duration: 0.65, ease: EASE_SOFT }, '-=0.45');
            }
        });
    }

    function initHeroEntrance() {
        splitAllTitles();
        if (typeof gsap === 'undefined') return;

        var tl = gsap.timeline({ defaults: { ease: EASE_SOFT } });

        tl.from('.navbar', { y: -20, opacity: 0, duration: 0.55 })
            .from('.logo-img', { scale: 0.85, opacity: 0, duration: 0.45 }, '-=0.35')
            .from('.nav-links > a, .nav-links .lang-switch, .nav-links .btn-nav', {
                y: -10, opacity: 0, stagger: 0.05, duration: 0.4
            }, '-=0.3')
            .from('.hero-badge-industry', { y: 20, opacity: 0, duration: 0.5 }, '-=0.15')
            .from('.sector-badges .sector-badge', {
                y: 14, opacity: 0, scale: 0.92, stagger: 0.04, duration: 0.4
            }, '-=0.35');

        var heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            revealMaskedLines(heroTitle, { duration: 0.75, stagger: 0.09, delay: 0 });
            tl.add(function () {}, '+=0.05');
        }

        tl.from('.hero-sub', { y: 18, opacity: 0, duration: 0.55 }, '-=0.55')
            .from('.hero-cta > *', { y: 16, opacity: 0, stagger: 0.08, duration: 0.45, clearProps: 'opacity,transform' }, '-=0.35')
            .from('.hero-how-steps li', { x: -12, opacity: 0, stagger: 0.07, duration: 0.4 }, '-=0.25')
            .from('.hero-stats .stat', { y: 18, opacity: 0, stagger: 0.06, duration: 0.45 }, '-=0.25')
            .from('.phone-stage', {
                y: 40, opacity: 0, scale: 0.92, duration: 0.85, ease: EASE, clearProps: 'opacity,transform'
            }, '-=0.65');

        document.querySelectorAll('.hero-stats .stat-num').forEach(function (el) {
            var p = parseCounter(el.textContent);
            if (p.type !== 'number') return;
            var obj = { v: 0 };
            gsap.to(obj, {
                v: p.num,
                duration: 1.2,
                delay: 0.35,
                ease: 'power2.out',
                onUpdate: function () { el.textContent = fmtCounter(p, obj.v); }
            });
        });

        /* Güvenlik ağı: herhangi bir sebeple (yavaş/engellenen script, hata vb.)
           giriş animasyonu tamamlanmazsa hero içeriği görünmez kalmasın. */
        setTimeout(function () {
            var selectors = [
                '.navbar', '.logo-img', '.nav-links > a', '.nav-links .lang-switch', '.nav-links .btn-nav',
                '.hero-badge', '.sector-badges .sector-badge', '.hero-sub', '.hero-cta > *',
                '.hero-how-steps li', '.hero-stats .stat', '.phone-stage',
                '.integration-logos-right .integration-logo-item', '.hero-line-inner'
            ];
            document.querySelectorAll(selectors.join(',')).forEach(function (el) {
                var cs = window.getComputedStyle(el);
                if (parseFloat(cs.opacity) < 1) {
                    gsap.set(el, { clearProps: 'opacity,transform,filter' });
                }
            });
        }, 2500);
    }

    function initParallax() {
        if (isMobile || typeof gsap === 'undefined') return;

        gsap.to('.hero-aurora--1', {
            y: -80,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
        });
        gsap.to('.hero-aurora--2', {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.4 }
        });
        gsap.to('.phone-stage', {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
        });

        var frame = document.querySelector('.dashboard-frame');
        if (frame) {
            gsap.fromTo(frame,
                { y: 50, scale: 0.95 },
                {
                    y: 0,
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.dashboard-mockup',
                        start: 'top 88%',
                        end: 'top 48%',
                        scrub: 1
                    }
                }
            );
        }
    }

    function initDashboardMotion() {
        var section = document.querySelector('.dashboard-section');
        if (!section) return;

        gsap.from('.dash-menu-item', {
            x: -16,
            opacity: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: EASE_SOFT,
            scrollTrigger: {
                trigger: '.dashboard-frame',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        gsap.from('.dash-lead-tags span', {
            scale: 0.8,
            opacity: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: '.dash-lead-tags',
                start: SCROLL_START,
                toggleActions: 'play none none none'
            }
        });
    }

    function initCounters() {
        function run(el, trigger) {
            var p = parseCounter(el.textContent);
            if (p.type === 'text') {
                gsap.from(el, {
                    opacity: 0,
                    scale: 0.88,
                    duration: 0.7,
                    ease: 'back.out(1.5)',
                    scrollTrigger: { trigger: trigger, start: SCROLL_START, toggleActions: 'play none none none' }
                });
                return;
            }
            var obj = { v: 0 };
            gsap.to(obj, {
                v: p.num,
                duration: 1.6,
                ease: 'power2.out',
                scrollTrigger: { trigger: trigger, start: SCROLL_START, toggleActions: 'play none none none' },
                onUpdate: function () { el.textContent = fmtCounter(p, obj.v); }
            });
        }
        document.querySelectorAll('.dash-card-value').forEach(function (el) {
            run(el, el.closest('.dashboard-section') || el);
        });
        document.querySelectorAll('.comparison-value').forEach(function (el) {
            run(el, el.closest('.comparison') || el);
        });
    }

    function initChart() {
        document.querySelectorAll('.chart-bars .bar').forEach(function (bar, i) {
            var h = bar.style.height;
            bar.style.height = '0%';
            gsap.to(bar, {
                height: h,
                duration: 1,
                delay: i * 0.06,
                ease: EASE_SOFT,
                scrollTrigger: {
                    trigger: '.dash-chart',
                    start: SCROLL_START,
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    function initComparisonTable() {
        var rows = document.querySelectorAll('.comparison-table tbody tr');
        if (!rows.length) return;
        gsap.from(rows, {
            x: -20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: EASE_SOFT,
            scrollTrigger: {
                trigger: '.comparison-table-wrap',
                start: SCROLL_START,
                toggleActions: 'play none none none'
            }
        });
    }

    function initFeatureIcons() {
        document.querySelectorAll('.feature-card').forEach(function (card, i) {
            var icon = card.querySelector('.feature-icon');
            if (!icon) return;
            gsap.from(icon, {
                scale: 0,
                rotation: -20,
                duration: 0.65,
                delay: i * 0.04,
                ease: 'back.out(1.6)',
                scrollTrigger: {
                    trigger: card,
                    start: SCROLL_START,
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    function initFooter() {
        var grid = document.querySelector('.footer-grid');
        if (!grid) return;
        gsap.from(grid.children, {
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: EASE_SOFT,
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 92%',
                toggleActions: 'play none none none'
            }
        });
    }

    function initSpotlight() {
        document.querySelectorAll('.feature-card, .comparison-card, .pricing-card, .sector-compat-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--spot-x', ((e.clientX - r.left) / r.width * 100) + '%');
                card.style.setProperty('--spot-y', ((e.clientY - r.top) / r.height * 100) + '%');
            });
        });
    }

    function initMagnetic() {
        if (isMobile || typeof gsap === 'undefined') return;
        document.querySelectorAll('.btn-primary, .btn-nav, .pricing-cta, .hero-cta-secondary').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var r = btn.getBoundingClientRect();
                gsap.to(btn, {
                    x: (e.clientX - r.left - r.width / 2) * 0.15,
                    y: (e.clientY - r.top - r.height / 2) * 0.15,
                    duration: 0.25,
                    ease: 'power2.out'
                });
            });
            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.55)' });
            });
        });
    }

    function initNavbar() {
        var nav = document.querySelector('.navbar');
        if (!nav || typeof ScrollTrigger === 'undefined') return;
        ScrollTrigger.create({
            start: 0,
            end: 999999,
            onUpdate: function (s) { nav.classList.toggle('navbar--scrolled', s.scroll() > 60); }
        });
    }

    function initModal() {
        var modal = document.getElementById('demo-modal');
        if (!modal || typeof gsap === 'undefined') return;
        var content = modal.querySelector('.demo-modal-content');
        new MutationObserver(function () {
            if (modal.classList.contains('active') && content) {
                gsap.fromTo(content,
                    { y: 36, opacity: 0, scale: 0.96 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: EASE_SOFT }
                );
            }
        }).observe(modal, { attributes: true, attributeFilter: ['class'] });
    }

    function initSteps() {
        if (typeof gsap === 'undefined') return;
        document.querySelectorAll('.how-it-works .step').forEach(function (step, i) {
            var num = step.querySelector('.step-number');
            var icon = step.querySelector('.step-icon');
            if (num) {
                gsap.from(num, {
                    scale: 0,
                    rotation: -120,
                    duration: 0.65,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: step,
                        start: SCROLL_START,
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.05
                });
            }
            if (icon) {
                gsap.from(icon, {
                    y: 16,
                    opacity: 0,
                    scale: 0.85,
                    duration: 0.55,
                    ease: EASE_SOFT,
                    scrollTrigger: {
                        trigger: step,
                        start: SCROLL_START,
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.05 + 0.1
                });
            }
        });
    }

    function hookI18n() {
        var prev = window.onAspaloLanguageChange;
        window.onAspaloLanguageChange = function (lang) {
            if (prev) prev(lang);
            requestAnimationFrame(function () {
                splitAllTitles();
            });
        };
    }

    function showFallback() {
        document.querySelectorAll('[data-premium-reveal]').forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.filter = 'none';
        });
        document.querySelectorAll('.phone-msg-item').forEach(function (m) {
            m.classList.add('is-visible');
        });
    }

    function initScrollMotion() {
        markReveals();
        initSectionHeaders();
        initReveals();
        initParallax();
        initCounters();
        initChart();
        initDashboardMotion();
        initComparisonTable();
        initFeatureIcons();
        initFooter();
        initSteps();
    }

    function init() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            showFallback();
            initPhoneDemo();
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        document.body.classList.add('premium-ready');

        gsapCtx = gsap.context(function () {
            if (!reduced && typeof Lenis !== 'undefined') {
                var lenis = new Lenis({
                    duration: 1.05,
                    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
                    smoothWheel: true
                });
                lenis.on('scroll', ScrollTrigger.update);
                gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
                gsap.ticker.lagSmoothing(0);
            }

            initNavbar();
            initScrollProgress();
            initAurora();
            initCursor();
            initHeroEntrance();
            initPhoneDemo();
            initPhoneMotion();
            initSpotlight();
            initMagnetic();
            initModal();
            hookI18n();

            requestAnimationFrame(function () {
                initScrollMotion();
                ScrollTrigger.refresh();
            });
        });

        window.addEventListener('load', function () { ScrollTrigger.refresh(); });
        window.addEventListener('pagehide', function () {
            if (gsapCtx) gsapCtx.revert();
            if (window.stopPhoneDemo) window.stopPhoneDemo();
        });

        // Genel guvenlik agi: GSAP/ScrollTrigger giris animasyonlari herhangi bir
        // sebeple (context kill, refresh zamanlamasi, trigger hesaplama hatasi vb.)
        // yarida kesilip bir eleman opacity:0'da takili kalirsa, o eleman ekrana
        // girdikten kisa bir sure sonra zorla gorunur hale getirilir. Gercek
        // animasyon calisirsa bu hicbir sey yapmaz (opacity zaten 1'e ulasmis olur).
        var revealFallbackObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                setTimeout(function () {
                    if (parseFloat(getComputedStyle(el).opacity) < 1) {
                        gsap.set(el, { clearProps: 'opacity,transform,x,y' });
                    }
                }, 1200);
                revealFallbackObserver.unobserve(el);
            });
        }, { threshold: 0.01 });

        setTimeout(function () {
            document.querySelectorAll(
                '.hero-cta > *, .comparison-table tbody tr, .feature-card, .pricing-card, ' +
                '.reference-card, .step, .sector-compat-card, .hero-stats .stat'
            ).forEach(function (el) { revealFallbackObserver.observe(el); });
        }, 100);
    }

    onReady(function () {
        if (reduced) {
            document.documentElement.classList.add('reduce-motion');
            document.body.classList.add('premium-ready');
            splitAllTitles();
            showFallback();
            initPhoneDemo();
            return;
        }
        setTimeout(init, 80);
    });
})();
