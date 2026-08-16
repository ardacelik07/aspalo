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

    var nav = ''
        + '<nav class="navbar site-nav" id="site-nav">'
        + '<div class="container nav-container">'
        + '<a href="/" class="logo"><img src="/images/logo2.png" alt="Aspalo" class="logo-img" data-i18n-alt="alt_logo"></a>'
        + '<div class="nav-links">'
        + '<div class="nav-dd' + (solutionsOpen ? ' is-current' : '') + '">'
        + '<button type="button" class="nav-dd-btn' + (solutionsOpen ? ' is-active' : '') + '" id="nav-solutions-btn" aria-expanded="false" aria-haspopup="true" aria-controls="nav-solutions-menu" data-i18n="nav_solutions">Çözümlerimiz</button>'
        + '<div class="nav-dd-menu" id="nav-solutions-menu" role="menu">'
        + '<a href="/cozumlerimiz/ses/" role="menuitem" class="' + active('ses').trim() + '"' + current('ses') + '><span data-i18n="nav_voice">Sesli Yapay Zekâ</span><span data-i18n="nav_voice_desc">7/24 sesli yapay zekâ asistanı</span></a>'
        + '<a href="/cozumlerimiz/sohbet/" role="menuitem" class="' + active('sohbet').trim() + '"' + current('sohbet') + '><span data-i18n="nav_chat">Yapay Zekâ Sohbet Asistanı</span><span data-i18n="nav_chat_desc">Web ve mesajlaşma asistanı</span></a>'
        + '</div></div>'
        + '<a href="/sektorler/" class="nav-link' + active('sektorler') + '"' + current('sektorler') + ' data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" class="nav-link' + active('planlar') + '"' + current('planlar') + ' data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" class="nav-link' + active('partnerlik') + '"' + current('partnerlik') + ' data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" class="nav-link' + active('sss') + '"' + current('sss') + ' data-i18n="nav_sss">Sıkça Sorulan Sorular</a>'
        + '<div class="lang-switch" role="group" data-i18n-aria="lang_switch_aria" aria-label="Dil seçimi">'
        + '<button type="button" class="lang-btn active" data-lang="tr" aria-pressed="true" data-i18n="lang_tr">Türkçe</button>'
        + '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false" data-i18n="lang_en">English</button>'
        + '</div>'
        + '<a href="#" class="btn btn-nav" data-open-demo data-i18n="nav_cta">Demo Talep Et</a>'
        + '</div>'
        + '<button class="mobile-menu-btn" data-i18n-aria="menu_aria" aria-label="Menü" aria-expanded="false" aria-controls="mobile-nav">'
        + '<span></span><span></span><span></span></button>'
        + '</div>'
        + '<div class="mobile-nav" id="mobile-nav">'
        + '<div class="mobile-acc' + (solutionsOpen ? ' is-open' : '') + '">'
        + '<button type="button" class="mobile-acc-btn' + (solutionsOpen ? ' is-active' : '') + '" aria-expanded="' + (solutionsOpen ? 'true' : 'false') + '" aria-controls="mobile-solutions" data-i18n="nav_solutions">Çözümlerimiz</button>'
        + '<div class="mobile-acc-panel" id="mobile-solutions"' + (solutionsOpen ? '' : ' hidden inert') + '>'
        + '<div class="mobile-acc-inner">'
        + '<a href="/cozumlerimiz/ses/" class="' + active('ses').trim() + '"' + current('ses') + ' data-i18n="nav_voice">Sesli Yapay Zekâ</a>'
        + '<a href="/cozumlerimiz/sohbet/" class="' + active('sohbet').trim() + '"' + current('sohbet') + ' data-i18n="nav_chat">Yapay Zekâ Sohbet Asistanı</a>'
        + '</div></div></div>'
        + '<a href="/sektorler/" class="' + active('sektorler').trim() + '"' + current('sektorler') + ' data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" class="' + active('planlar').trim() + '"' + current('planlar') + ' data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" class="' + active('partnerlik').trim() + '"' + current('partnerlik') + ' data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" class="' + active('sss').trim() + '"' + current('sss') + ' data-i18n="nav_sss">Sıkça Sorulan Sorular</a>'
        + '<div class="lang-switch lang-switch--mobile" role="group" data-i18n-aria="lang_switch_aria" aria-label="Dil seçimi">'
        + '<button type="button" class="lang-btn active" data-lang="tr" aria-pressed="true" data-i18n="lang_tr">Türkçe</button>'
        + '<button type="button" class="lang-btn" data-lang="en" aria-pressed="false" data-i18n="lang_en">English</button>'
        + '</div>'
        + '<a href="#" class="btn btn-nav" data-open-demo data-i18n="nav_cta">Demo Talep Et</a>'
        + '</div></nav>';

    document.write(nav);

    var footer = ''
        + '<footer class="site-footer">'
        + '<div class="container footer-grid">'
        + '<div><a href="/" class="logo"><img src="/images/logo2.png" alt="Aspalo" class="logo-img" data-i18n-alt="alt_logo"></a></div>'
        + '<div class="footer-col"><h4 data-i18n="nav_solutions">Çözümlerimiz</h4>'
        + '<a href="/cozumlerimiz/ses/" data-i18n="nav_voice">Sesli Yapay Zekâ</a>'
        + '<a href="/cozumlerimiz/sohbet/" data-i18n="nav_chat">Yapay Zekâ Sohbet Asistanı</a></div>'
        + '<div class="footer-col"><h4 data-i18n="footer_col_company">Şirket</h4>'
        + '<a href="/sektorler/" data-i18n="nav_sectors">Sektörler</a>'
        + '<a href="/planlar/" data-i18n="nav_plans">Planlar</a>'
        + '<a href="/partnerlik/" data-i18n="nav_partners">İş Ortaklığı</a>'
        + '<a href="/sss/" data-i18n="nav_sss">Sıkça Sorulan Sorular</a></div>'
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
