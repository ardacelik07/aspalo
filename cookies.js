/**
 * Aspalo cookie consent: banner, preferences, and gated analytics/ads tags.
 * GA4 and Meta Pixel load only after the matching category is accepted.
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'aspalo_consent';
    var VERSION = 1;
    var GA_ID = 'G-B352V109LN';
    var META_ID = '1034557042621920';

    var loaded = { ga: false, meta: false };
    var ui = null;
    var lastFocus = null;

    function t(key, fallback) {
        if (global.AspaloI18n) {
            var value = global.AspaloI18n.t(key);
            if (value) return value;
        }
        return fallback || '';
    }

    function ensureGtag() {
        global.dataLayer = global.dataLayer || [];
        if (typeof global.gtag !== 'function') {
            global.gtag = function () { global.dataLayer.push(arguments); };
        }
    }

    function defaultConsent() {
        ensureGtag();
        global.gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
        });
    }

    function readConsent() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || data.v !== VERSION) return null;
            return {
                v: VERSION,
                necessary: true,
                analytics: !!data.analytics,
                marketing: !!data.marketing,
                ts: data.ts || ''
            };
        } catch (e) {
            return null;
        }
    }

    function writeConsent(prefs) {
        var data = {
            v: VERSION,
            necessary: true,
            analytics: !!prefs.analytics,
            marketing: !!prefs.marketing,
            ts: new Date().toISOString()
        };
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
        return data;
    }

    function updateGoogleConsent(prefs) {
        ensureGtag();
        global.gtag('consent', 'update', {
            analytics_storage: prefs.analytics ? 'granted' : 'denied',
            ad_storage: prefs.marketing ? 'granted' : 'denied',
            ad_user_data: prefs.marketing ? 'granted' : 'denied',
            ad_personalization: prefs.marketing ? 'granted' : 'denied'
        });
    }

    function loadAnalytics() {
        if (loaded.ga) return;
        loaded.ga = true;
        ensureGtag();
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        script.setAttribute('data-aspalo-ga', '1');
        script.onload = function () {
            global.gtag('js', new Date());
            global.gtag('config', GA_ID, { anonymize_ip: true });
        };
        document.head.appendChild(script);
    }

    function loadMarketing() {
        if (loaded.meta) {
            if (global.fbq) global.fbq('consent', 'grant');
            return;
        }
        loaded.meta = true;
        var fbq = global.fbq;
        if (!fbq) {
            fbq = function () {
                fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
            };
            global.fbq = fbq;
            if (!global._fbq) global._fbq = fbq;
            fbq.push = fbq;
            fbq.loaded = true;
            fbq.version = '2.0';
            fbq.queue = [];
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://connect.facebook.net/en_US/fbevents.js';
            script.setAttribute('data-aspalo-meta', '1');
            document.head.appendChild(script);
        }
        global.fbq('consent', 'grant');
        global.fbq('init', META_ID);
        global.fbq('track', 'PageView');
    }

    function applyConsent(prefs) {
        updateGoogleConsent(prefs);
        if (prefs.analytics) loadAnalytics();
        if (prefs.marketing) {
            loadMarketing();
        } else if (global.fbq) {
            global.fbq('consent', 'revoke');
        }
    }

    function paint() {
        if (!ui) return;
        var map = [
            ['#cookie-banner-title', 'cookie_banner_title', 'Çerezler'],
            ['#cookie-banner-text', 'cookie_banner_text', 'Zorunlu çerezler siteyi çalıştırır. Analitik ve pazarlama çerezleri için onayınızı istiyoruz.'],
            ['#cookie-policy-link', 'cookie_policy', 'Çerez Politikası'],
            ['#cookie-accept', 'cookie_accept', 'Tümünü kabul et'],
            ['#cookie-reject', 'cookie_reject', 'Yalnızca zorunlular'],
            ['#cookie-manage', 'cookie_manage', 'Tercihleri yönet'],
            ['#cookie-prefs-title', 'cookie_prefs_title', 'Çerez tercihleri'],
            ['#cookie-prefs-lead', 'cookie_prefs_lead', 'Kategorileri seçin. Zorunlu çerezler her zaman açıktır.'],
            ['#cookie-cat-necessary', 'cookie_necessary', 'Zorunlu'],
            ['#cookie-cat-necessary-p', 'cookie_necessary_p', 'Dil tercihi ve güvenlik. Site bunlarsız çalışmaz.'],
            ['#cookie-always-on', 'cookie_always_on', 'Her zaman açık'],
            ['#cookie-cat-analytics', 'cookie_analytics', 'Analitik'],
            ['#cookie-cat-analytics-p', 'cookie_analytics_p', 'Google Analytics. Sayfa kullanımını anlamamıza yardım eder.'],
            ['#cookie-cat-marketing', 'cookie_marketing', 'Pazarlama'],
            ['#cookie-cat-marketing-p', 'cookie_marketing_p', 'Meta Pixel. Reklam performansını ölçmek için kullanılır.'],
            ['#cookie-save', 'cookie_save', 'Tercihleri kaydet']
        ];
        map.forEach(function (row) {
            var el = ui.querySelector(row[0]);
            if (el) el.textContent = t(row[1], row[2]);
        });
        var closeBtn = ui.querySelector('#cookie-prefs-close');
        if (closeBtn) closeBtn.setAttribute('aria-label', t('cookie_prefs_close', 'Kapat'));
        var dialog = ui.querySelector('.cookie-prefs-dialog');
        if (dialog) dialog.setAttribute('aria-label', t('cookie_prefs_title', 'Çerez tercihleri'));
    }

    function setSwitch(name, on) {
        if (!ui) return;
        var btn = ui.querySelector('[data-cookie-cat="' + name + '"]');
        if (!btn || btn.disabled) return;
        btn.setAttribute('aria-checked', on ? 'true' : 'false');
        btn.classList.toggle('is-on', !!on);
    }

    function getSwitch(name) {
        if (!ui) return false;
        var btn = ui.querySelector('[data-cookie-cat="' + name + '"]');
        return !!(btn && btn.getAttribute('aria-checked') === 'true');
    }

    function syncSwitches(prefs) {
        setSwitch('analytics', !!(prefs && prefs.analytics));
        setSwitch('marketing', !!(prefs && prefs.marketing));
    }

    function showBanner() {
        if (!ui) return;
        ui.querySelector('.cookie-banner').hidden = false;
        document.body.classList.add('cookie-banner-open');
    }

    function hideBanner() {
        if (!ui) return;
        ui.querySelector('.cookie-banner').hidden = true;
        document.body.classList.remove('cookie-banner-open');
    }

    function openPrefs() {
        if (!ui) return;
        lastFocus = document.activeElement;
        var overlay = ui.querySelector('.cookie-prefs');
        overlay.hidden = false;
        document.body.classList.add('cookie-prefs-open');
        var closeBtn = ui.querySelector('#cookie-prefs-close');
        if (closeBtn) closeBtn.focus();
    }

    function closePrefs() {
        if (!ui) return;
        ui.querySelector('.cookie-prefs').hidden = true;
        document.body.classList.remove('cookie-prefs-open');
        if (lastFocus && typeof lastFocus.focus === 'function') {
            try { lastFocus.focus(); } catch (e) {}
        }
    }

    function decide(prefs) {
        var saved = writeConsent(prefs);
        applyConsent(saved);
        hideBanner();
        closePrefs();
    }

    function buildUI() {
        if (ui) return;
        ui = document.createElement('div');
        ui.id = 'aspalo-cookies';
        ui.innerHTML = ''
            + '<div class="cookie-banner" hidden>'
            + '<div class="cookie-banner-inner">'
            + '<div class="cookie-banner-copy">'
            + '<p class="cookie-banner-kicker" id="cookie-banner-title">Çerezler</p>'
            + '<p class="cookie-banner-text" id="cookie-banner-text">Zorunlu çerezler siteyi çalıştırır. Analitik ve pazarlama çerezleri için onayınızı istiyoruz.</p>'
            + '<a class="cookie-policy-link" id="cookie-policy-link" href="/cerez-politikasi/">Çerez Politikası</a>'
            + '</div>'
            + '<div class="cookie-banner-actions">'
            + '<button type="button" class="btn btn-primary" id="cookie-accept">Tümünü kabul et</button>'
            + '<button type="button" class="btn btn-outline cookie-btn-light" id="cookie-reject">Yalnızca zorunlular</button>'
            + '<button type="button" class="cookie-link-btn" id="cookie-manage">Tercihleri yönet</button>'
            + '</div></div></div>'
            + '<div class="cookie-prefs" hidden>'
            + '<div class="cookie-prefs-backdrop" data-cookie-backdrop></div>'
            + '<div class="cookie-prefs-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-prefs-title">'
            + '<div class="cookie-prefs-head">'
            + '<h2 id="cookie-prefs-title">Çerez tercihleri</h2>'
            + '<button type="button" class="cookie-prefs-x" id="cookie-prefs-close" aria-label="Kapat">×</button>'
            + '</div>'
            + '<p class="cookie-prefs-lead" id="cookie-prefs-lead">Kategorileri seçin. Zorunlu çerezler her zaman açıktır.</p>'
            + '<div class="cookie-cat">'
            + '<div class="cookie-cat-copy"><p class="cookie-cat-name" id="cookie-cat-necessary">Zorunlu</p>'
            + '<p class="cookie-cat-desc" id="cookie-cat-necessary-p">Dil tercihi ve güvenlik. Site bunlarsız çalışmaz.</p></div>'
            + '<div class="cookie-cat-ctrl"><span class="cookie-always" id="cookie-always-on">Her zaman açık</span>'
            + '<button type="button" class="cookie-switch is-on" role="switch" aria-checked="true" disabled data-cookie-cat="necessary"></button></div></div>'
            + '<div class="cookie-cat">'
            + '<div class="cookie-cat-copy"><p class="cookie-cat-name" id="cookie-cat-analytics">Analitik</p>'
            + '<p class="cookie-cat-desc" id="cookie-cat-analytics-p">Google Analytics. Sayfa kullanımını anlamamıza yardım eder.</p></div>'
            + '<button type="button" class="cookie-switch" role="switch" aria-checked="false" data-cookie-cat="analytics"></button></div>'
            + '<div class="cookie-cat">'
            + '<div class="cookie-cat-copy"><p class="cookie-cat-name" id="cookie-cat-marketing">Pazarlama</p>'
            + '<p class="cookie-cat-desc" id="cookie-cat-marketing-p">Meta Pixel. Reklam performansını ölçmek için kullanılır.</p></div>'
            + '<button type="button" class="cookie-switch" role="switch" aria-checked="false" data-cookie-cat="marketing"></button></div>'
            + '<button type="button" class="btn btn-primary cookie-save" id="cookie-save">Tercihleri kaydet</button>'
            + '</div></div>';
        document.body.appendChild(ui);
        paint();

        ui.querySelector('#cookie-accept').addEventListener('click', function () {
            decide({ analytics: true, marketing: true });
        });
        ui.querySelector('#cookie-reject').addEventListener('click', function () {
            decide({ analytics: false, marketing: false });
        });
        ui.querySelector('#cookie-manage').addEventListener('click', function () {
            syncSwitches(readConsent() || { analytics: false, marketing: false });
            openPrefs();
        });
        ui.querySelector('#cookie-save').addEventListener('click', function () {
            decide({ analytics: getSwitch('analytics'), marketing: getSwitch('marketing') });
        });
        ui.querySelector('#cookie-prefs-close').addEventListener('click', function () {
            closePrefs();
            if (!readConsent()) showBanner();
        });
        ui.querySelector('[data-cookie-backdrop]').addEventListener('click', function () {
            closePrefs();
            if (!readConsent()) showBanner();
        });
        ui.querySelectorAll('.cookie-switch:not([disabled])').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setSwitch(btn.getAttribute('data-cookie-cat'), btn.getAttribute('aria-checked') !== 'true');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.body.classList.contains('cookie-prefs-open')) {
                closePrefs();
                if (!readConsent()) showBanner();
            }
        });
    }

    function openFromFooter() {
        buildUI();
        paint();
        syncSwitches(readConsent() || { analytics: false, marketing: false });
        openPrefs();
    }

    defaultConsent();

    function start() {
        buildUI();
        var saved = readConsent();
        if (saved) {
            applyConsent(saved);
            hideBanner();
        } else {
            syncSwitches({ analytics: false, marketing: false });
            showBanner();
        }
        if (global.AspaloI18n && typeof global.AspaloI18n.onLanguageChange === 'function') {
            global.AspaloI18n.onLanguageChange(paint);
        } else {
            var prev = global.onAspaloLanguageChange;
            global.onAspaloLanguageChange = function (lang) {
                if (typeof prev === 'function') prev(lang);
                paint();
            };
        }
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest && e.target.closest('[data-open-cookies]');
        if (!trigger) return;
        e.preventDefault();
        openFromFooter();
    });

    global.AspaloCookies = {
        open: openFromFooter,
        get: readConsent
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})(window);
