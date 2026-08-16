/**
 * Aspalo product site — nav, motion, hero stage, works, sector page, shared chrome.
 */
(function () {
    'use strict';

    function t(key) {
        return window.AspaloI18n ? window.AspaloI18n.t(key) : key;
    }

    function injectChrome() {
        if (document.getElementById('demo-modal')) return;
        var html = ''
            + '<div id="demo-modal" class="demo-modal">'
            + '<div class="demo-modal-overlay"></div>'
            + '<div class="demo-modal-content">'
            + '<button class="demo-modal-close" data-i18n-aria="modal_close" aria-label="Kapat"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>'
            + '<div class="demo-modal-body">'
            + '<div class="demo-info-panel"><div class="demo-brand"><img src="images/logo2.png" alt="Aspalo" class="demo-logo-img"></div>'
            + '<h2 class="demo-title" data-i18n="modal_title">Sayılarınızı Birlikte İnceleyelim</h2>'
            + '<p class="demo-description" data-i18n="modal_desc">Kaç arama kaçıyor, gerçek maliyeti ne, hattınıza nasıl bağlanır — 30 dakikada netleştirelim.</p>'
            + '<div class="demo-details" id="demo-details">'
            + '<div class="demo-detail-item"><span class="demo-detail-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span><span data-i18n="modal_confirm">Onay gerekli</span></div>'
            + '<div class="demo-detail-item"><span class="demo-detail-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span><span data-i18n="modal_duration">30 dakika</span></div>'
            + '<div class="demo-detail-item"><span class="demo-detail-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span><span data-i18n="modal_app">Organizatörün varsayılan uygulaması</span></div>'
            + '<div class="demo-detail-item"><span class="demo-detail-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></span><span data-i18n="modal_tz">Europe/Istanbul</span></div>'
            + '</div></div>'
            + '<div class="demo-calendar-panel"><div class="calendar-header"><button class="calendar-nav-btn" id="prev-month">‹</button><h3 class="calendar-month-year" id="calendar-month-year">Ocak 2026</h3><button class="calendar-nav-btn" id="next-month">›</button></div>'
            + '<div class="calendar-weekdays" id="calendar-weekdays"><div>PAZ</div><div>PZT</div><div>SAL</div><div>ÇAR</div><div>PER</div><div>CUM</div><div>CMT</div></div>'
            + '<div class="calendar-days" id="calendar-days"></div></div>'
            + '<div class="demo-form-panel"><div class="selected-date-info" id="selected-date-info"><span id="selected-date-text" data-i18n="cal_pick_date">Tarih seçin</span></div>'
            + '<div class="time-format-toggle"><button class="time-toggle-btn" data-format="12">12 sa</button><button class="time-toggle-btn active" data-format="24">24 sa</button></div>'
            + '<div class="time-slots" id="time-slots"><p class="no-date-selected" id="no-date-selected-p" data-i18n="cal_pick_first">Lütfen önce bir tarih seçin</p></div>'
            + '<div class="demo-form-inner" id="demo-form-inner" style="display:none;">'
            + '<div class="form-group"><label for="demo-name" data-i18n="form_name">Adınız *</label><input type="text" id="demo-name" name="name" required></div>'
            + '<div class="form-group"><label for="demo-email">Email *</label><input type="email" id="demo-email" name="email" required></div>'
            + '<div class="form-group"><label for="demo-company" data-i18n="form_company">Şirket ismi</label><input type="text" id="demo-company" name="company"></div>'
            + '<div class="form-group"><label for="demo-phone" data-i18n="form_phone">Telefon numarası</label><input type="tel" id="demo-phone" name="phone"></div>'
            + '<p class="form-disclaimer" data-i18n-html="form_disclaimer_html">Devam ederek <a href="#">Şartlar</a> ve <a href="#">Gizlilik Politikası</a>\'nı kabul etmiş olursunuz.</p>'
            + '<div class="form-actions"><button type="button" class="btn-back" id="btn-back" data-i18n="form_back">Geri</button><button type="button" class="btn-confirm" id="btn-confirm" data-i18n="form_confirm">Onayla</button></div>'
            + '</div></div></div></div></div>'
            + '<div id="live-demo-modal" class="live-demo-modal"><div class="live-demo-overlay" data-close-live-demo></div><div class="live-demo-content">'
            + '<button class="live-demo-close" data-close-live-demo data-i18n-aria="modal_close" aria-label="Kapat"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>'
            + '<div class="live-demo-state live-demo-state-idle" id="live-demo-idle" data-state="idle">'
            + '<p class="live-demo-eyebrow" data-i18n="live_demo_eyebrow">Canlı Yapay Zeka Demosu</p>'
            + '<h2 class="live-demo-title" data-i18n="live_demo_title">Aspalo\'nun bir aramayı nasıl karşıladığını dinleyin</h2>'
            + '<p class="live-demo-desc" data-i18n="live_demo_desc">Mikrofonunuza izin verin, "Aramayı başlat" butonuna basın — Aspalo\'nun AI asistanı gerçek bir müşteri gibi sizinle konuşacak.</p>'
            + '<button type="button" class="btn btn-primary" id="live-demo-start-btn"><span data-i18n="live_demo_start">Aramayı başlat</span></button>'
            + '<p class="live-demo-mic-note" data-i18n="live_demo_mic_note">Bu bir simülasyondur; gerçek bir görüşme kaydedilmez.</p></div>'
            + '<div class="live-demo-state live-demo-state-connecting" id="live-demo-connecting" data-state="connecting" hidden><div class="live-demo-spinner" aria-hidden="true"></div><p class="live-demo-connecting-text" data-i18n="live_demo_connecting">Bağlanıyor...</p></div>'
            + '<div class="live-demo-state live-demo-state-active" id="live-demo-active" data-state="active" hidden>'
            + '<div class="live-demo-call-bar"><span class="live-demo-live-dot" aria-hidden="true"></span><span class="live-demo-live-label" data-i18n="live_demo_live">Canlı Görüşme</span><span class="live-demo-timer" id="live-demo-timer">0:00</span><button type="button" class="live-demo-end-btn" id="live-demo-end-btn" data-i18n="live_demo_end">Görüşmeyi bitir</button></div>'
            + '<div class="live-demo-body"><div class="live-demo-transcript" id="live-demo-transcript" aria-live="polite"></div>'
            + '<div class="live-demo-captured"><p class="live-demo-captured-title" data-i18n="live_demo_captured_title">Yakalanan bilgi</p>'
            + '<div class="live-demo-captured-row"><span class="live-demo-captured-label" data-i18n="live_demo_captured_name">İsim</span><span class="live-demo-captured-value" id="live-demo-captured-name">—</span></div>'
            + '<div class="live-demo-captured-row"><span class="live-demo-captured-label" data-i18n="live_demo_captured_sector">Sektör</span><span class="live-demo-captured-value" id="live-demo-captured-sector">—</span></div>'
            + '</div></div></div>'
            + '<div class="live-demo-state live-demo-state-ended" id="live-demo-ended" data-state="ended" hidden>'
            + '<p class="live-demo-eyebrow" data-i18n="live_demo_ended_eyebrow">Demo tamamlandı</p>'
            + '<h2 class="live-demo-title" data-i18n="live_demo_ended_title">Aynısı, gerçek hattınızda da olabilir</h2>'
            + '<p class="live-demo-desc" data-i18n="live_demo_ended_desc">Az önce duyduğunuz deneyimi işletmenize özel kurmamız için birlikte 30 dakikalık bir görüşme ayarlayalım.</p>'
            + '<div class="live-demo-ended-actions"><a href="#" class="btn btn-primary" data-open-demo data-close-live-demo data-i18n="live_demo_ended_cta">Görüşme Ayarla</a><button type="button" class="btn btn-outline" id="live-demo-restart-btn" data-i18n="live_demo_restart">Tekrar dinle</button></div>'
            + '</div></div></div>';
        document.body.insertAdjacentHTML('beforeend', html);
    }

    injectChrome();

    function initNav() {
        document.querySelectorAll('.nav-dd').forEach(function (dd) {
            var btn = dd.querySelector('.nav-dd-btn');
            if (!btn) return;
            btn.addEventListener('click', function (e) {
                if (window.matchMedia('(max-width: 900px)').matches) return;
                e.preventDefault();
                var open = dd.classList.contains('is-open');
                document.querySelectorAll('.nav-dd').forEach(function (other) { other.classList.remove('is-open'); });
                if (!open) dd.classList.add('is-open');
            });
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-dd')) {
                document.querySelectorAll('.nav-dd').forEach(function (dd) { dd.classList.remove('is-open'); });
            }
        });
    }

    function initReveal() {
        var nodes = document.querySelectorAll('[data-reveal]');
        if (!nodes.length) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            nodes.forEach(function (el) { el.classList.add('is-in'); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
        nodes.forEach(function (el) { io.observe(el); });
    }

    function initHeroStage() {
        var bubbles = document.querySelectorAll('.hero-bubble[data-delay]');
        if (!bubbles.length) return;
        function play() {
            bubbles.forEach(function (b) {
                b.classList.remove('is-on');
                var delay = parseInt(b.getAttribute('data-delay'), 10) || 0;
                setTimeout(function () { b.classList.add('is-on'); }, delay);
            });
        }
        play();
        setInterval(play, 9000);
    }

    function initWorks() {
        var steps = document.querySelectorAll('.works-step');
        var panels = document.querySelectorAll('.works-panel');
        if (!steps.length) return;
        function activate(index) {
            steps.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
            panels.forEach(function (p, i) { p.classList.toggle('is-on', i === index); });
        }
        steps.forEach(function (step, i) {
            step.addEventListener('click', function () { activate(i); });
        });
        activate(0);
    }

    var SECTOR_MAP = {
        Emlak: 'emlak',
        Otomotiv: 'otomotiv',
        'Sağlık': 'saglik',
        Lojistik: 'lojistik',
        'E-Ticaret': 'eticaret',
        'Otel Konaklama': 'otel'
    };

    function applySectorCopy(sector) {
        var slug = SECTOR_MAP[sector];
        if (!slug) return;
        document.querySelectorAll('[data-sec]').forEach(function (el) {
            var part = el.getAttribute('data-sec');
            var key = 'sec_' + slug + '_' + part;
            if (el.hasAttribute('data-i18n-html') || el.getAttribute('data-sec-html') === '1') {
                el.innerHTML = t(key);
            } else {
                el.textContent = t(key);
            }
        });
        document.querySelectorAll('.sector-chip').forEach(function (chip) {
            chip.classList.toggle('active', chip.getAttribute('data-sector') === sector);
            chip.setAttribute('aria-pressed', chip.getAttribute('data-sector') === sector ? 'true' : 'false');
        });
    }

    function initSectors() {
        var chips = document.querySelectorAll('.sector-chip');
        if (!chips.length) return;
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var sector = chip.getAttribute('data-sector');
                applySectorCopy(sector);
                var btn = document.querySelector('.calc-sector-btn[data-sector="' + sector + '"]');
                if (btn && typeof window.setCalcSector === 'function') window.setCalcSector(btn, sector);
            });
        });
        document.querySelectorAll('.calc-sector-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                applySectorCopy(btn.getAttribute('data-sector'));
            });
        });
        var params = new URLSearchParams(window.location.search);
        var q = params.get('s');
        var initial = 'Emlak';
        Object.keys(SECTOR_MAP).forEach(function (name) {
            if (SECTOR_MAP[name] === q) initial = name;
        });
        applySectorCopy(initial);
        var btn = document.querySelector('.calc-sector-btn[data-sector="' + initial + '"]');
        if (btn && typeof window.setCalcSector === 'function') window.setCalcSector(btn, initial);
    }

    function applyPageMeta() {
        var page = document.body.getAttribute('data-i18n-page');
        if (!page || !window.AspaloI18n) return;
        var title = t('meta_title_' + page);
        if (title && title !== 'meta_title_' + page) document.title = title;
        var desc = t('meta_desc_' + page);
        var meta = document.querySelector('meta[name="description"]');
        if (meta && desc && desc !== 'meta_desc_' + page) meta.setAttribute('content', desc);
    }

    function init() {
        initNav();
        initReveal();
        initHeroStage();
        initWorks();
        initSectors();
        applyPageMeta();
        var prevLang = window.onAspaloLanguageChange;
        window.onAspaloLanguageChange = function (lang) {
            if (typeof prevLang === 'function') prevLang(lang);
            var active = document.querySelector('.sector-chip.active');
            if (active) applySectorCopy(active.getAttribute('data-sector'));
            applyPageMeta();
        };
        var year = document.getElementById('footer-year');
        if (year) year.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
