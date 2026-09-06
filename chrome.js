/**
 * Shared nav + footer. Loaded synchronously at the top of <body> so the
 * bar is in the document before first paint of page content.
 */
(function () {
    'use strict';

    var page = (document.body && document.body.getAttribute('data-nav')) || '';

    function active(id) {
        return page === id ? ' is-active' : '';
    }

    function current(id) {
        return page === id ? ' aria-current="page"' : '';
    }

    var solutionsOpen = (page === 'ses' || page === 'sohbet');

    var langSwitch = function (extraClass) {
        return ''
            + '<div class="lang-switch' + (extraClass ? ' ' + extraClass : '') + '" role="group" data-i18n-aria="lang_switch_aria" aria-label="Dil seçimi">'
            + '<div class="lang-switch-track">'
            + '<button type="button" class="lang-btn active" data-lang="tr" aria-pressed="true" aria-label="Türkçe" data-i18n-aria="lang_tr">TR</button>'
            + '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false" aria-label="English" data-i18n-aria="lang_en">EN</button>'
            + '</div></div>';
    };

    var nav = ''
        + '<nav class="navbar site-nav" id="site-nav">'
        + '<div class="container nav-container">'
        + '<a href="/" class="logo"><img src="/images/logo2.png" alt="Aspalo" class="logo-img" data-i18n-alt="alt_logo"></a>'
        + '<div class="nav-links">'
        + '<div class="nav-dd' + (solutionsOpen ? ' is-current' : '') + '">'
        + '<button type="button" class="nav-dd-btn' + (solutionsOpen ? ' is-active' : '') + '" id="nav-solutions-btn" aria-expanded="false" aria-haspopup="true" aria-controls="nav-solutions-menu" data-i18n="nav_solutions">Çözümlerimiz</button>'
        + '<div class="nav-dd-menu" id="nav-solutions-menu" role="menu">'
        + '<a href="/cozumlerimiz/ses/" role="menuitem" class="' + active('ses').trim() + '"' + current('ses') + '><span data-i18n="nav_voice">Sesli Yapay Zeka</span><span data-i18n="nav_voice_desc">7/24 sesli yapay zeka asistanı</span></a>'
        + '<a href="/cozumlerimiz/sohbet/" role="menuitem" class="' + active('sohbet').trim() + '"' + current('sohbet') + '><span data-i18n="nav_chat">Yapay Zeka Sohbet Asistanı</span><span data-i18n="nav_chat_desc">Web ve mesajlaşma asistanı</span></a>'
        + '</div></div>'
        + '<a href="/sektorler/" class="nav-link' + active('sektorler') + '"' + current('sektorler') + ' data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" class="nav-link' + active('planlar') + '"' + current('planlar') + ' data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" class="nav-link' + active('partnerlik') + '"' + current('partnerlik') + ' data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" class="nav-link' + active('sss') + '"' + current('sss') + ' data-i18n="nav_sss">S.S.S</a>'
        + langSwitch()
        + '<a href="#" class="btn btn-nav" data-open-demo data-i18n="nav_cta">Görüşme Ayarla</a>'
        + '</div>'
        + '<button class="mobile-menu-btn" data-i18n-aria="menu_aria" aria-label="Menü" aria-expanded="false" aria-controls="mobile-nav">'
        + '<span></span><span></span><span></span></button>'
        + '</div>'
        + '<div class="mobile-nav" id="mobile-nav">'
        + '<div class="mobile-acc' + (solutionsOpen ? ' is-open' : '') + '">'
        + '<button type="button" class="mobile-acc-btn' + (solutionsOpen ? ' is-active' : '') + '" aria-expanded="' + (solutionsOpen ? 'true' : 'false') + '" aria-controls="mobile-solutions" data-i18n="nav_solutions">Çözümlerimiz</button>'
        + '<div class="mobile-acc-panel" id="mobile-solutions"' + (solutionsOpen ? '' : ' hidden inert') + '>'
        + '<div class="mobile-acc-inner">'
        + '<a href="/cozumlerimiz/ses/" class="' + active('ses').trim() + '"' + current('ses') + ' data-i18n="nav_voice">Sesli Yapay Zeka</a>'
        + '<a href="/cozumlerimiz/sohbet/" class="' + active('sohbet').trim() + '"' + current('sohbet') + ' data-i18n="nav_chat">Yapay Zeka Sohbet Asistanı</a>'
        + '</div></div></div>'
        + '<a href="/sektorler/" class="' + active('sektorler').trim() + '"' + current('sektorler') + ' data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" class="' + active('planlar').trim() + '"' + current('planlar') + ' data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" class="' + active('partnerlik').trim() + '"' + current('partnerlik') + ' data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" class="' + active('sss').trim() + '"' + current('sss') + ' data-i18n="nav_sss">S.S.S</a>'
        + langSwitch('lang-switch--mobile')
        + '<a href="#" class="btn btn-nav" data-open-demo data-i18n="nav_cta">Görüşme Ayarla</a>'
        + '</div></nav>';

    document.write(nav);

    var footer = ''
        + '<footer class="site-footer">'
        + '<div class="container footer-grid">'
        + '<div class="footer-brand">'
        + '<a href="/" class="logo"><img src="/images/logo2.png" alt="Aspalo" class="logo-img" data-i18n-alt="alt_logo"></a>'
        + '<div class="footer-social" role="list" data-i18n-aria="footer_social_aria" aria-label="Sosyal medya">'
        + '<a class="footer-social-link" role="listitem" href="https://www.linkedin.com/in/aspalo-ai-6282853b1/" target="_blank" rel="noopener noreferrer" data-i18n-aria="footer_social_linkedin" aria-label="LinkedIn">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/></svg>'
        + '</a>'
        + '<span class="footer-social-sep" aria-hidden="true"></span>'
        + '<a class="footer-social-link" role="listitem" href="https://www.instagram.com/aspalo.ai/" target="_blank" rel="noopener noreferrer" data-i18n-aria="footer_social_instagram" aria-label="Instagram">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>'
        + '</a>'
        + '</div></div>'
        + '<div class="footer-col"><h4 data-i18n="nav_solutions">Çözümlerimiz</h4>'
        + '<a href="/cozumlerimiz/ses/" data-i18n="nav_voice">Sesli Yapay Zeka</a>'
        + '<a href="/cozumlerimiz/sohbet/" data-i18n="nav_chat">Yapay Zeka Sohbet Asistanı</a></div>'
        + '<div class="footer-col"><h4 data-i18n="footer_col_company">Şirket</h4>'
        + '<a href="/sektorler/" data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" data-i18n="nav_sss">S.S.S</a></div>'
        + '<div class="footer-col"><h4 data-i18n="footer_col_contact">İletişim</h4>'
        + '<a href="mailto:info@aspalo.com">info@aspalo.com</a>'
        + '<a href="tel:+905427820043">+90 542 782 00 43</a>'
        + '<a href="tel:+905071424155">+90 507 142 41 55</a>'
        + '<a href="tel:+908502423250">+90 850 242 32 50</a></div>'
        + '</div>'
        + '<div class="footer-wave" aria-hidden="true"></div>'
        + '<div class="container footer-base">© <span id="footer-year">2026</span> Aspalo. <span data-i18n="footer_copy">Tüm hakları saklıdır.</span></div>'
        + '</footer>';

    function placeFooter() {
        var slot = document.querySelector('[data-site-footer]');
        if (slot) slot.outerHTML = footer;
        var year = document.getElementById('footer-year');
        if (year) year.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', placeFooter);
    } else {
        placeFooter();
    }
})();
