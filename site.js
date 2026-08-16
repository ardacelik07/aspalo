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
            + '<div class="demo-info-panel"><div class="demo-brand"><img src="/images/logo2.png" alt="Aspalo" class="demo-logo-img"></div>'
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
            + '<div class="time-format-toggle"><button class="time-toggle-btn" data-format="12" data-i18n="time_12">12 sa</button><button class="time-toggle-btn active" data-format="24" data-i18n="time_24">24 sa</button></div>'
            + '<div class="time-slots" id="time-slots"><p class="no-date-selected" id="no-date-selected-p" data-i18n="cal_pick_first">Lütfen önce bir tarih seçin</p></div>'
            + '<div class="demo-form-inner" id="demo-form-inner" style="display:none;">'
            + '<div class="form-group"><label for="demo-name" data-i18n="form_name">Adınız *</label><input type="text" id="demo-name" name="name" required autocomplete="name" data-i18n-placeholder="form_name_ph"></div>'
            + '<div class="form-group"><label for="demo-email" data-i18n="form_email">E-posta *</label><input type="email" id="demo-email" name="email" required autocomplete="email" data-i18n-placeholder="form_email_ph"></div>'
            + '<div class="form-group"><label for="demo-company" data-i18n="form_company">Şirket adı</label><input type="text" id="demo-company" name="company" autocomplete="organization" data-i18n-placeholder="form_company_ph"></div>'
            + '<div class="form-group"><label for="demo-phone" data-i18n="form_phone">Telefon numarası</label><input type="tel" id="demo-phone" name="phone" autocomplete="tel" data-i18n-placeholder="form_phone_ph"></div>'
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
            + '<div class="live-demo-call-bar" role="status" aria-live="polite" data-i18n-aria="ada_status_aria"><span class="live-demo-live-dot" aria-hidden="true"></span><span class="live-demo-live-label" data-i18n="live_demo_live">Canlı görüşme</span><span class="live-demo-timer" id="live-demo-timer">0:00</span><button type="button" class="live-demo-end-btn" id="live-demo-end-btn" data-i18n="live_demo_end">Görüşmeyi Bitir</button></div>'
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

    function isMobileNav() {
        return window.matchMedia('(max-width: 1200px)').matches;
    }

    function setDdOpen(dd, open) {
        var btn = dd.querySelector('.nav-dd-btn');
        dd.classList.toggle('is-open', open);
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function closeAllDd() {
        document.querySelectorAll('.nav-dd').forEach(function (dd) { setDdOpen(dd, false); });
    }

    function initNav() {
        var nav = document.getElementById('site-nav') || document.querySelector('.site-nav');
        if (nav) {
            var onScroll = function () {
                nav.classList.toggle('is-scrolled', window.scrollY > 8);
            };
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        var menuBtn = document.querySelector('.mobile-menu-btn');
        if (menuBtn && nav) {
            menuBtn.addEventListener('click', function () {
                requestAnimationFrame(function () {
                    menuBtn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
                });
            });
        }

        document.querySelectorAll('.nav-dd').forEach(function (dd) {
            var btn = dd.querySelector('.nav-dd-btn');
            var menu = dd.querySelector('.nav-dd-menu');
            if (!btn || !menu) return;

            btn.addEventListener('click', function (e) {
                if (isMobileNav()) return;
                e.preventDefault();
                var open = !dd.classList.contains('is-open');
                closeAllDd();
                setDdOpen(dd, open);
                if (open) {
                    var first = menu.querySelector('a');
                    if (first) first.focus();
                }
            });

            btn.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeAllDd();
                    setDdOpen(dd, true);
                    var first = menu.querySelector('a');
                    if (first) first.focus();
                }
            });

            menu.querySelectorAll('a').forEach(function (link, i, links) {
                link.addEventListener('keydown', function (e) {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        setDdOpen(dd, false);
                        btn.focus();
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        (links[i + 1] || links[0]).focus();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        (links[i - 1] || links[links.length - 1]).focus();
                    } else if (e.key === 'Home') {
                        e.preventDefault();
                        links[0].focus();
                    } else if (e.key === 'End') {
                        e.preventDefault();
                        links[links.length - 1].focus();
                    }
                });
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-dd')) closeAllDd();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAllDd();
        });

        document.querySelectorAll('.mobile-acc-btn').forEach(function (btn) {
            var acc = btn.closest('.mobile-acc');
            var panel = acc ? acc.querySelector('.mobile-acc-panel') : null;
            if (!panel) return;
            btn.addEventListener('click', function () {
                var open = !acc.classList.contains('is-open');
                acc.classList.toggle('is-open', open);
                btn.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (open) {
                    panel.removeAttribute('hidden');
                    panel.removeAttribute('inert');
                } else {
                    panel.setAttribute('hidden', '');
                    panel.setAttribute('inert', '');
                }
            });
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

    var HERO_SCENARIOS = [
        {
            id: 'healthcare',
            name: 'Ayşe Kaya',
            caller: 'female',
            intent: { tr: 'Randevu', en: 'Appointment' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Klinik. Ben ADA. Nasıl yardımcı olabilirim?', en: 'Hello, Aspalo Clinic. This is ADA. How can I help you?' },
                { role: 'user', tr: 'Yarın nöroloji için randevu almak istiyorum.', en: 'I\'d like a neurology appointment for tomorrow.', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Tabii. Daha önce kliniğimizde muayene oldunuz mu?', en: 'Of course. Have you been seen at our clinic before?' },
                { role: 'user', tr: 'Evet, geçen yıl Dr. Demir\'e gitmiştim.', en: 'Yes — I saw Dr. Demir last year.' },
                { role: 'ai', tr: 'Anladım. Yarın 14:30 veya 16:00 uygun. Hangisini istersiniz?', en: 'Understood. Tomorrow 14:30 or 16:00 is open. Which do you prefer?' },
                { role: 'user', tr: '14:30 olsun. Adım Ayşe Kaya.', en: '14:30 works. My name is Ayşe Kaya.', meta: { name: true } },
                { role: 'ai', tr: 'Teşekkürler Ayşe Hanım. Teyit SMS\'i için telefonunuzu alabilir miyim?', en: 'Thank you, Ayşe. May I take your number for the confirmation text?' },
                { role: 'user', tr: '0532 441 19 08', en: '0532 441 19 08' },
                { role: 'ai', tr: '14:30, Dr. Demir — kaydı oluşturuyorum.', en: '14:30 with Dr. Demir — I\'m creating the record now.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Randevunuz alındı. Takvim ve özet CRM\'e düştü.', en: 'Your appointment is booked. The calendar and summary are in the CRM.', meta: { status: 'crm' } },
                { role: 'user', tr: 'Harika, teşekkürler.', en: 'Perfect, thank you.' },
                { role: 'ai', tr: 'Geçmiş olsun. Başka bir şey var mı?', en: 'Wishing you a smooth visit. Anything else I can help with?' },
                { role: 'user', tr: 'Yok, sağ olun.', en: 'No, that\'s all.' },
                { role: 'ai', tr: 'Görüşmeyi kapatıyorum. İyi günler.', en: 'I\'ll close the call. Have a good day.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'realestate',
            name: 'Mehmet Yılmaz',
            caller: 'male',
            intent: { tr: 'Portföy sorusu', en: 'Property inquiry' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Emlak. Ben ADA. Hangi semtte bakıyorsunuz?', en: 'Hello, Aspalo Realty. This is ADA. Which neighborhood are you looking in?' },
                { role: 'user', tr: 'Kadıköy\'de 3+1, deniz manzaralı bir daire var mı?', en: 'Do you have a 3-bed with a sea view in Kadıköy?', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Var. Moda\'da 145 m², site içinde. Yarın 11:00\'de gezilebilir.', en: 'Yes. A 145 m² unit in Moda, in a gated complex. It can be shown tomorrow at 11:00.' },
                { role: 'user', tr: 'Fiyatı nedir?', en: 'What\'s the asking price?' },
                { role: 'ai', tr: '18,4 milyon TL, aidat 4.200 TL. İsterseniz yerinde gösterelim.', en: '18.4 million TL, 4,200 TL maintenance. I can book a viewing if you\'d like.' },
                { role: 'user', tr: 'Yarın 11:00 olur. Mehmet Yılmaz.', en: 'Tomorrow at 11:00 works. Mehmet Yılmaz.', meta: { name: true } },
                { role: 'ai', tr: 'Not aldım. Cep telefonunuzu da ekleyeyim mi?', en: 'Noted. Shall I add your mobile number as well?' },
                { role: 'user', tr: '0533 218 44 90', en: '0533 218 44 90' },
                { role: 'ai', tr: 'Mehmet Bey, yarın 11:00 Moda 3+1 — randevuyu işliyorum.', en: 'Mehmet, tomorrow 11:00 at the Moda 3-bed — I\'m locking the viewing.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Gezme saati kilitlendi. Danışmana ve CRM\'e düştü.', en: 'The viewing is booked. It\'s with the agent and in the CRM.', meta: { status: 'crm' } },
                { role: 'user', tr: 'Tamam, orada olurum.', en: 'Good — I\'ll be there.' },
                { role: 'ai', tr: 'Adres ve kat planını SMS ile gönderiyorum. İyi günler.', en: 'I\'m sending the address and floor plan by SMS. Have a good day.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'hotel',
            name: 'Elif Demir',
            caller: 'female',
            intent: { tr: 'Rezervasyon', en: 'Reservation' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Otel. Ben ADA. Rezervasyon için yardımcı olayım.', en: 'Hello, Aspalo Hotel. This is ADA. I can help with a reservation.' },
                { role: 'user', tr: 'Bu hafta sonu iki gece, deniz manzaralı oda arıyorum.', en: 'I need a sea-view room for two nights this weekend.', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: '22–24 Ağustos için deluxe deniz manzaralı müsait. İki kişi mi?', en: 'A deluxe sea-view is open for 22–24 August. For two guests?' },
                { role: 'user', tr: 'Evet, eşimle. Kahvaltı dahil olsun.', en: 'Yes, with my partner. Breakfast included, please.' },
                { role: 'ai', tr: 'Kahvaltı dahil, gece 9.400 TL. Adınıza ayırayım mı?', en: 'Breakfast included, 9,400 TL per night. Shall I hold it in your name?' },
                { role: 'user', tr: 'Evet. Elif Demir.', en: 'Yes. Elif Demir.', meta: { name: true } },
                { role: 'ai', tr: 'Elif Hanım, kartsız opsiyonla 30 dakika tutabilirim. Telefonunuz?', en: 'Elif, I can hold it for 30 minutes without a card. Your phone number?' },
                { role: 'user', tr: '0541 776 02 31', en: '0541 776 02 31' },
                { role: 'ai', tr: 'Kaydı oluşturuyorum — 22–24 Ağustos, deluxe, kahvaltı dahil.', en: 'Creating the booking — 22–24 August, deluxe, breakfast included.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Rezervasyonunuz alındı. Onay e-postası ve CRM kaydı hazır.', en: 'Your reservation is confirmed. The email and CRM record are ready.', meta: { status: 'crm' } },
                { role: 'user', tr: 'Mükemmel.', en: 'Excellent.' },
                { role: 'ai', tr: 'Resepsiyonda sizi bekleriz. İyi akşamlar.', en: 'We\'ll see you at reception. Have a good evening.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'automotive',
            name: 'Can Öztürk',
            caller: 'male',
            intent: { tr: 'Servis', en: 'Service' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Oto. Ben ADA. Servis mi, satış mı?', en: 'Hello, Aspalo Auto. This is ADA. Service or sales?' },
                { role: 'user', tr: 'Periyodik bakım ve yağ değişimi için randevu istiyorum.', en: 'I need an appointment for a service and oil change.', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Aracın marka ve modelini alabilir miyim?', en: 'May I take the make and model?' },
                { role: 'user', tr: '2022 Volkswagen Tiguan, 48 bin km.', en: '2022 Volkswagen Tiguan, 48,000 km.' },
                { role: 'ai', tr: 'Yarın 09:30 veya çarşamba 15:00 açık. Hangisi uygun?', en: 'Tomorrow 09:30 or Wednesday 15:00 is open. Which works?' },
                { role: 'user', tr: 'Yarın 09:30. Can Öztürk.', en: 'Tomorrow 09:30. Can Öztürk.', meta: { name: true } },
                { role: 'ai', tr: 'Plaka ve telefonunuz da yeterli, kaydı bağlarım.', en: 'Plate and phone are enough — I\'ll attach the record.' },
                { role: 'user', tr: '34 CNO 122, 0530 667 81 45', en: '34 CNO 122, 0530 667 81 45' },
                { role: 'ai', tr: 'Yarın 09:30 bakım + yağ — işlemi açıyorum.', en: 'Tomorrow 09:30, service and oil — opening the job now.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Randevu alındı. Usta atandı, kayıt CRM\'de.', en: 'Appointment booked. A technician is assigned and it\'s in the CRM.', meta: { status: 'crm' } },
                { role: 'user', tr: 'İkame araç var mı?', en: 'Do you have a courtesy car?' },
                { role: 'ai', tr: 'Evet, ikame araç rezerve ettim. Serviste görüşürüz.', en: 'Yes — I reserved a courtesy car. See you at the workshop.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'logistics',
            name: 'Zeynep Acar',
            caller: 'female',
            intent: { tr: 'Kargo takibi', en: 'Shipment status' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Lojistik. Ben ADA. Takip numaranız var mı?', en: 'Hello, Aspalo Logistics. This is ADA. Do you have a tracking number?' },
                { role: 'user', tr: 'Evet, TR-448291. Kargo nerede?', en: 'Yes, TR-448291. Where is the shipment?', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Bir saniye, sevkiyatı sorguluyorum.', en: 'One moment — I\'m looking up the shipment.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Paket Gebze aktarmada. Yarın 10:00–13:00 teslim penceresi.', en: 'The parcel is at the Gebze hub. Delivery window is tomorrow 10:00–13:00.' },
                { role: 'user', tr: 'Saat 12\'den önce gelebilir mi? Adres ev, Zeynep Acar.', en: 'Can it arrive before 12:00? Home address, Zeynep Acar.', meta: { name: true } },
                { role: 'ai', tr: '10:00–12:00 olarak daraltıyorum. Kapıda kim imza atacak?', en: 'I\'ll narrow it to 10:00–12:00. Who will sign at the door?' },
                { role: 'user', tr: 'Ben olacağım, 0542 119 33 70', en: 'I will — 0542 119 33 70' },
                { role: 'ai', tr: 'Tercihinizi sürücüye ve CRM\'e yazıyorum.', en: 'I\'m writing the preference to the driver and the CRM.', meta: { status: 'crm' } },
                { role: 'ai', tr: 'Güncellendi. Yarın 10:00–12:00, SMS ile link gelecek.', en: 'Updated. Tomorrow 10:00–12:00 — you\'ll get the tracking link by SMS.', meta: { status: 'booked' } },
                { role: 'user', tr: 'Teşekkürler.', en: 'Thank you.' },
                { role: 'ai', tr: 'Rica ederim. Başka bir gönderi var mı?', en: 'You\'re welcome. Any other shipment I can check?' },
                { role: 'user', tr: 'Yok.', en: 'No.' },
                { role: 'ai', tr: 'İyi günler, Zeynep Hanım.', en: 'Have a good day, Zeynep.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'support',
            name: 'Deniz Koç',
            caller: 'female',
            intent: { tr: 'Sipariş desteği', en: 'Support request' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Mağaza. Ben ADA. Siparişinizle ilgili yardımcı olayım.', en: 'Hello, Aspalo Store. This is ADA. I can help with your order.' },
                { role: 'user', tr: '7A19 siparişim hâlâ kargoya verilmemiş.', en: 'My order 7A19 still hasn\'t shipped.', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Kontrol ediyorum. Stok bekliyordu, bugün 16:00\'da kargoya çıkıyor.', en: 'Checking now. It was waiting on stock — it ships today at 16:00.', meta: { status: 'processing' } },
                { role: 'user', tr: 'Yarın elime geçer mi? Deniz Koç.', en: 'Will I have it tomorrow? Deniz Koç.', meta: { name: true } },
                { role: 'ai', tr: 'İstanbul içi evet, 18:00 öncesi. Adres aynı mı — Kadıköy, Caferağa?', en: 'In Istanbul, yes — before 18:00. Same address, Kadıköy, Caferağa?' },
                { role: 'user', tr: 'Evet, aynı.', en: 'Yes, same address.' },
                { role: 'ai', tr: 'Takip numarasını SMS ve e-postaya düşürüyorum.', en: 'I\'m sending the tracking number by SMS and email.' },
                { role: 'user', tr: 'İade süresi ne kadar?', en: 'How long is the return window?' },
                { role: 'ai', tr: 'Teslimden sonra 14 gün, kutusu açılmamışsa. Kaydı not ettim.', en: '14 days after delivery if unopened. I\'ve noted that on the file.' },
                { role: 'ai', tr: 'Sipariş hareketi CRM\'e işlendi. Takip: ASP-7A19-882.', en: 'The order movement is in the CRM. Tracking: ASP-7A19-882.', meta: { status: 'crm' } },
                { role: 'user', tr: 'Süper, sağ olun.', en: 'Great, thanks.' },
                { role: 'ai', tr: 'Başka bir kalem var mı?', en: 'Anything else on the order?' },
                { role: 'user', tr: 'Yok, teşekkürler.', en: 'No, that\'s all.' },
                { role: 'ai', tr: 'İyi alışverişler.', en: 'Enjoy your order.', meta: { status: 'done' } }
            ]
        },
        {
            id: 'restaurant',
            name: 'Selin Arı',
            caller: 'female',
            intent: { tr: 'Rezervasyon', en: 'Reservation' },
            messages: [
                { role: 'ai', tr: 'Merhaba, Aspalo Mutfak. Ben ADA. Masa için yardımcı olayım.', en: 'Hello, Aspalo Kitchen. This is ADA. I can help with a table.' },
                { role: 'user', tr: 'Bu akşam 20:30, dört kişilik teras masası var mı?', en: 'Do you have a terrace table for four tonight at 20:30?', meta: { intent: true, status: 'listening' } },
                { role: 'ai', tr: 'Bakıyorum. Terasta 20:30 için dört kişilik masa açık.', en: 'Checking now. A terrace table for four is open at 20:30.' },
                { role: 'user', tr: 'Harika. Selin Arı.', en: 'Perfect. Selin Arı.', meta: { name: true } },
                { role: 'ai', tr: 'Selin Hanım, telefonunuzu da alayım — hatırlatma SMS\'i için.', en: 'Selin, may I take your number for a reminder text?' },
                { role: 'user', tr: '0536 902 14 77', en: '0536 902 14 77' },
                { role: 'ai', tr: 'Alerji veya özel istek var mı?', en: 'Any allergies or special requests?' },
                { role: 'user', tr: 'Pencereye yakın olsun yeter.', en: 'Near the window is enough.' },
                { role: 'ai', tr: '20:30, teras, dört kişi — masayı ayırıyorum.', en: '20:30, terrace, four guests — I\'m holding the table.', meta: { status: 'processing' } },
                { role: 'ai', tr: 'Rezervasyon alındı. Onay SMS\'i ve CRM kaydı düştü.', en: 'The table is booked. Confirmation SMS and CRM are in.', meta: { status: 'crm' } },
                { role: 'user', tr: 'Teşekkürler.', en: 'Thank you.' },
                { role: 'ai', tr: 'Bu akşam sizi bekleriz. Afiyet olsun.', en: 'We\'ll see you tonight. Enjoy your evening.', meta: { status: 'done' } }
            ]
        }
    ];

    function initHeroStage() {
        var stage = document.querySelector('.hero-stage');
        var chat = stage && stage.querySelector('[data-hero-chat]');
        var thread = stage && stage.querySelector('[data-hero-thread]');
        if (!stage || !chat || !thread) return null;

        var wave = stage.querySelector('[data-hero-wave]');
        var timerEl = stage.querySelector('[data-hero-timer]');
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var currentId = null;
        var paused = false;
        var muted = true;
        var speakingUtter = null;
        var speakingAudio = null;
        var fxAudio = null;
        var ringing = false;
        var audioCtx = null;
        var ringTimer = null;
        var ringOscs = [];
        var pickupBuf = null;
        var muteBtn = stage.querySelector('[data-hero-mute]');
        var replayBtn = stage.querySelector('[data-hero-replay]');

        if (window.speechSynthesis) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); };
        }

        var voiceCache = { tr: {}, en: {} };

        function getAudioCtx() {
            var AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            if (!audioCtx) audioCtx = new AC();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            return audioCtx;
        }

        function stopTone() {
            if (ringTimer) {
                clearInterval(ringTimer);
                ringTimer = null;
            }
            ringOscs.forEach(function (node) {
                try { node.stop(); } catch (e) {}
            });
            ringOscs = [];
        }

        function stopFx() {
            stopTone();
            if (!fxAudio) return;
            try {
                fxAudio.onended = null;
                fxAudio.onerror = null;
                fxAudio.pause();
                fxAudio.src = '';
            } catch (e) {}
            fxAudio = null;
        }

        function playMp3Fx(name, done, loop) {
            stopFx();
            var a = new Audio('/audio/call/' + name + '.mp3' + (name === 'pickup' ? '?v=3' : ''));
            fxAudio = a;
            a.loop = !!loop;
            a.volume = name === 'ring' ? 0.85 : 0.62;
            var finished = false;
            function finish() {
                if (finished) return;
                finished = true;
                if (fxAudio === a) fxAudio = null;
                if (done) done();
            }
            if (!loop) a.onended = finish;
            a.onerror = finish;
            var play = a.play();
            if (play && typeof play.catch === 'function') play.catch(finish);
        }

        function playRingBurst(ctx) {
            var now = ctx.currentTime;
            var dur = 1.2;
            [440, 480].forEach(function (freq) {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.0001, now);
                gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
                gain.gain.setValueAtTime(0.22, now + dur - 0.08);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + dur + 0.02);
                ringOscs.push(osc);
            });
        }

        function whenUnlocked(fn) {
            var ctx = getAudioCtx();
            var settled = false;
            function go(next) {
                if (settled) return;
                settled = true;
                fn(next || null);
            }
            if (!ctx) {
                go(null);
                return;
            }
            if (ctx.state === 'running') {
                go(ctx);
                return;
            }
            ctx.resume().then(function () { go(getAudioCtx()); }).catch(function () { go(null); });
            setTimeout(function () { go(ctx); }, 180);
        }

        function startRing() {
            ringing = true;
            whenUnlocked(function (ctx) {
                if (!ringing) return;
                stopFx();
                ringing = true;
                if (ctx && ctx.state === 'running') {
                    playRingBurst(ctx);
                    ringTimer = setInterval(function () {
                        if (!ringing) return;
                        var liveCtx = getAudioCtx();
                        if (liveCtx && liveCtx.state === 'running') playRingBurst(liveCtx);
                    }, 1650);
                    return;
                }
                playMp3Fx('ring', null, true);
            });
        }

        function preloadPickup(ctx) {
            if (pickupBuf || !ctx) return;
            fetch('/audio/call/pickup.mp3?v=3').then(function (res) {
                if (!res.ok) throw new Error('pickup');
                return res.arrayBuffer();
            }).then(function (raw) {
                return ctx.decodeAudioData(raw);
            }).then(function (buf) {
                pickupBuf = buf;
            }).catch(function () {});
        }

        function playPickup(done) {
            ringing = false;
            var finished = false;
            function finish() {
                if (finished) return;
                finished = true;
                if (done) done();
            }
            setTimeout(finish, 420);
            whenUnlocked(function (ctx) {
                stopFx();
                if (ctx) preloadPickup(ctx);
                if (ctx && ctx.state === 'running' && pickupBuf) {
                    var src = ctx.createBufferSource();
                    var gain = ctx.createGain();
                    src.buffer = pickupBuf;
                    gain.gain.value = 0.58;
                    src.connect(gain);
                    gain.connect(ctx.destination);
                    src.start();
                    return;
                }
                playMp3Fx('pickup', null, false);
            });
        }

        function unlockHeroAudio() {
            whenUnlocked(function (ctx) {
                preloadPickup(ctx);
                if (ringing && ctx && !ringTimer) startRing();
            });
        }

        function cancelSpeak() {
            speakingUtter = null;
            if (speakingAudio) {
                try {
                    speakingAudio.onended = null;
                    speakingAudio.onerror = null;
                    speakingAudio.pause();
                    speakingAudio.src = '';
                } catch (e) {}
                speakingAudio = null;
            }
            if (window.speechSynthesis) {
                try { window.speechSynthesis.cancel(); } catch (e) {}
            }
        }

        function locale() {
            return lang() === 'en' ? 'en-US' : 'tr-TR';
        }

        function callerGender(scenario) {
            if (scenario && scenario.caller) return scenario.caller;
            var first = String((scenario && scenario.name) || '').split(/\s+/)[0].toLowerCase();
            if (/^(ay[sş]e|elif|zeynep|selin|fatma|emine|merve|seda|ece|irem|g[uü]l|nisa|deniz)$/.test(first)) return 'female';
            return 'male';
        }

        function scoreVoice(voice, loc, role, gender) {
            var vLang = (voice.lang || '').toLowerCase();
            var name = (voice.name || '').toLowerCase();
            var prefix = loc.slice(0, 2);
            var score = 0;
            if (vLang === loc.toLowerCase()) score += 120;
            else if (vLang.indexOf(prefix + '-') === 0 || vLang === prefix) score += 50;
            else return -1;

            if (/premium|enhanced|neural|natural|online|google|microsoft|siri/.test(name)) score += 55;
            if (voice.localService) score += 18;

            if (prefix === 'tr') {
                if (/yelda|filiz|yıldız|yildiz|emel|aylin/.test(name)) score += 90;
                if (/tolga|yuri|can|ahmet/.test(name)) score += role === 'user' ? 85 : 20;
            } else {
                if (/samantha|ava|allison|zoe|susan|siri|karen|moira|tessa|samantha|aria|jenny|sara/.test(name)) score += 45;
                if (/daniel|alex|fred|tom|david|mark|aaron|guy|eric/.test(name)) score += role === 'user' ? 50 : 10;
            }

            if (role === 'ai' && /female|woman|yelda|filiz|samantha|ava|allison|zoe|susan|aria|jenny|emel/.test(name)) score += 22;
            if (role === 'user' && gender === 'female' && /female|woman|yelda|filiz|samantha|ava|allison|zoe|susan|aria|jenny|emel|emma|michelle|ana/.test(name)) score += 40;
            if (role === 'user' && gender === 'female' && /male|man|tolga|ahmet|guy|daniel|andrew|brian|david/.test(name)) score -= 60;
            if (role === 'user' && gender !== 'female' && /male|man|tolga|daniel|alex|david|guy|fred|ahmet|andrew|brian/.test(name)) score += 28;
            if (/compact|eloquence|novelty|whisper|zarvox|trinoids|boing|bad news/.test(name)) score -= 80;
            return score;
        }

        function pickVoice(role, gender) {
            if (!window.speechSynthesis) return null;
            var loc = locale();
            var key = lang();
            var slot = role === 'user' ? 'user-' + (gender || 'male') : 'ai';
            if (voiceCache[key] && voiceCache[key][slot]) return voiceCache[key][slot];
            var voices = window.speechSynthesis.getVoices() || [];
            if (!voices.length) return null;
            var ranked = voices.map(function (v) {
                return { v: v, s: scoreVoice(v, loc, role, gender) };
            }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; });
            var chosen = ranked[0] && ranked[0].v;
            if (role === 'user' && ranked.length > 1 && chosen && voiceCache[key] && voiceCache[key].ai === chosen) {
                chosen = ranked[1].v;
            }
            if (!voiceCache[key]) voiceCache[key] = {};
            voiceCache[key][slot] = chosen || null;
            return chosen || null;
        }

        var TR_ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
        var TR_TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
        var TR_DIGIT = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];

        function trNum(n) {
            n = parseInt(n, 10);
            if (isNaN(n)) return '';
            if (n === 0) return 'sıfır';
            if (n < 10) return TR_ONES[n];
            if (n < 100) {
                var t = Math.floor(n / 10);
                var o = n % 10;
                return (TR_TENS[t] + (o ? ' ' + TR_ONES[o] : '')).trim();
            }
            return String(n);
        }

        function speakable(text, loc) {
            var out = String(text || '');
            if (loc === 'tr-TR') {
                out = out.replace(/Dr\./g, 'Doktor');
                out = out.replace(/SMS/g, 'es em es');
                out = out.replace(/CRM/g, 'si ar em');
                out = out.replace(/m²/g, 'metrekare');
                out = out.replace(/\bTL\b/g, 'lira');
                out = out.replace(/\bkm\b/gi, 'kilometre');
                out = out.replace(/3\+1/g, 'üç artı bir');
                out = out.replace(/(\d{1,2}):(\d{2})/g, function (_, h, m) {
                    return m === '00' ? trNum(h) : (trNum(h) + ' ' + trNum(m));
                });
                out = out.replace(/0(\d{3})\s(\d{3})\s(\d{2})\s(\d{2})/g, function (_, a, b, c, d) {
                    return ['sıfır', a, b, c, d].map(function (part, i) {
                        if (i === 0) return part;
                        return String(part).split('').map(function (ch) { return TR_DIGIT[ch] || ch; }).join(' ');
                    }).join(', ');
                });
                out = out.replace(/(\d+)[.,](\d+)\s*milyon/gi, function (_, a, b) {
                    return trNum(a) + ' virgül ' + trNum(b) + ' milyon';
                });
            } else {
                out = out.replace(/Dr\./g, 'Doctor');
                out = out.replace(/(\d{1,2}):(\d{2})/g, function (_, h, m) {
                    var hr = parseInt(h, 10);
                    if (m === '00') return hr + " o'clock";
                    return hr + ' ' + m;
                });
                out = out.replace(/0(\d{3})\s(\d{3})\s(\d{2})\s(\d{2})/g, function (full) {
                    return full.replace(/\d/g, function (d) { return d + ' '; }).trim();
                });
            }
            return out;
        }

        function clipUrl(scenario, index, role) {
            var i = String(index);
            if (i.length < 2) i = '0' + i;
            return '/audio/hero/' + scenario.id + '-' + lang() + '-' + i + '-' + role + '.mp3';
        }

        function speakLine(scenario, index, role, text, done) {
            cancelSpeak();
            if (muted || reduced || paused || !text) {
                done();
                return;
            }
            var finished = false;
            function finish() {
                if (finished) return;
                finished = true;
                speakingUtter = null;
                speakingAudio = null;
                done();
            }
            var audio = new Audio(clipUrl(scenario, index, role));
            speakingAudio = audio;
            audio.preload = 'auto';
            audio.onended = finish;
            audio.onerror = function () { speakBrowser(scenario, role, text, finish); };
            var play = audio.play();
            if (play && typeof play.catch === 'function') {
                play.catch(function () { speakBrowser(scenario, role, text, finish); });
            }
            setTimeout(function () {
                if (!finished && speakingAudio === audio) finish();
            }, 18000);
        }

        function speakBrowser(scenario, role, text, done) {
            if (!window.speechSynthesis) {
                done();
                return;
            }
            var loc = locale();
            var spoken = speakable(text, loc);
            var gender = role === 'user' ? callerGender(scenario) : 'female';
            var finished = false;
            function finish() {
                if (finished) return;
                finished = true;
                speakingUtter = null;
                done();
            }
            var u = new SpeechSynthesisUtterance(spoken);
            u.lang = loc;
            u.rate = role === 'ai' ? 0.94 : 0.98;
            u.pitch = role === 'ai' ? 1.04 : (gender === 'female' ? 1.08 : 0.86);
            var voice = pickVoice(role, gender);
            if (voice) {
                u.voice = voice;
                if (voice.lang) u.lang = voice.lang;
            }
            u.onend = finish;
            u.onerror = finish;
            speakingUtter = u;
            try { window.speechSynthesis.speak(u); } catch (e) { finish(); }
            setTimeout(function () {
                if (!finished && speakingUtter === u) finish();
            }, Math.min(16000, 2200 + String(spoken).length * 95));
        }

        function syncMuteBtn() {
            if (!muteBtn) return;
            muteBtn.classList.toggle('is-muted', muted);
            muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
            muteBtn.setAttribute('aria-label', t(muted ? 'hero_unmute' : 'hero_mute'));
        }

        function setMuted(next) {
            muted = !!next;
            syncMuteBtn();
            if (muted) {
                cancelSpeak();
                return;
            }
            unlockHeroAudio();
        }
        var timer = null;
        var clockTimer = null;
        var elapsed = 0;
        var scrollRaf = 0;

        function lang() {
            return (window.AspaloI18n && window.AspaloI18n.getLang()) || 'tr';
        }

        function txt(msg) {
            var l = lang();
            return (msg && (msg[l] || msg.tr)) || '';
        }

        function statusLabel(key) {
            return t('hero_st_' + key) || key;
        }

        function setSpeaking(on) {
            stage.classList.toggle('is-ada-speaking', !!on);
            if (wave) wave.classList.toggle('is-speaking', !!on && !reduced);
        }

        function setMeta(field, value) {
            var el = stage.querySelector('[data-hero-meta="' + field + '"]');
            if (!el || el.textContent === value) return;
            el.textContent = value;
            el.classList.remove('is-flash');
            void el.offsetWidth;
            el.classList.add('is-flash');
        }

        function applyMeta(scenario, meta) {
            if (!meta) return;
            if (meta.name) setMeta('name', scenario.name);
            if (meta.intent) setMeta('intent', txt(scenario.intent));
            if (meta.status) setMeta('status', statusLabel(meta.status));
        }

        function formatClock(sec) {
            var m = Math.floor(sec / 60);
            var s = sec % 60;
            return m + ':' + (s < 10 ? '0' : '') + s;
        }

        function startClock() {
            elapsed = 0;
            if (timerEl) timerEl.textContent = '0:00';
            if (clockTimer) clearInterval(clockTimer);
            if (reduced) return;
            clockTimer = setInterval(function () {
                if (paused) return;
                elapsed += 1;
                if (timerEl) timerEl.textContent = formatClock(elapsed);
            }, 1000);
        }

        function stopClock() {
            if (clockTimer) clearInterval(clockTimer);
            clockTimer = null;
        }

        function schedule(fn, ms) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(function () {
                timer = null;
                if (paused) {
                    schedule(fn, 180);
                    return;
                }
                fn();
            }, ms);
        }

        function scrollChat() {
            var end = chat.scrollHeight - chat.clientHeight;
            if (end <= 0) return;
            if (reduced) {
                chat.scrollTop = end;
                return;
            }
            var start = chat.scrollTop;
            if (Math.abs(end - start) < 2) return;
            if (scrollRaf) cancelAnimationFrame(scrollRaf);
            var t0 = performance.now();
            var dur = 420;
            function ease(p) { return 1 - Math.pow(1 - p, 3); }
            function frame(now) {
                var p = Math.min(1, (now - t0) / dur);
                chat.scrollTop = start + (end - start) * ease(p);
                if (p < 1) scrollRaf = requestAnimationFrame(frame);
                else scrollRaf = 0;
            }
            scrollRaf = requestAnimationFrame(frame);
        }

        function makeBubble(role, text) {
            var el = document.createElement('div');
            el.className = 'hero-bubble hero-bubble-' + (role === 'user' ? 'user' : 'ai');
            el.textContent = text;
            return el;
        }

        function makeTyping() {
            var el = document.createElement('div');
            el.className = 'hero-bubble hero-bubble-ai hero-typing';
            el.innerHTML = '<i></i><i></i><i></i>';
            return el;
        }

        function reveal(el) {
            thread.appendChild(el);
            void el.offsetWidth;
            el.classList.add('is-on');
            scrollChat();
        }

        function jitter(min, span) {
            return min + Math.random() * span;
        }

        function holdFor(text, role) {
            var extra = Math.min(String(text).length * 22, 1400);
            return (role === 'ai' ? 900 : 520) + extra + jitter(80, 200);
        }

        function isShort(text) {
            return String(text).length < 32;
        }

        function thinkBeforeAda(scenario, index, text, msg) {
            if (index === 0) return jitter(180, 80);
            var prev = scenario.messages[index - 1];
            var status = msg.meta && msg.meta.status;
            if (status === 'processing') return jitter(480, 180);
            if (status === 'crm') return jitter(200, 100);
            if (prev && prev.role === 'ai') return jitter(160, 80);
            if (prev && isShort(txt(prev))) return jitter(200, 100);
            return jitter(240, 120);
        }

        function shouldType(msg, text, index) {
            if (index === 0) return false;
            if (msg.meta && (msg.meta.status === 'processing' || msg.meta.status === 'crm')) return true;
            return String(text).length > 78;
        }

        function afterTurn(msg, text, role) {
            if (msg.meta && msg.meta.status === 'done') return jitter(240, 80);
            if (role === 'ai' && /[?？]\s*$/.test(text)) return jitter(80, 60);
            return jitter(50, 40);
        }

        function userDelay(scenario, index, text) {
            var prev = index > 0 ? scenario.messages[index - 1] : null;
            if (prev && /[?？]\s*$/.test(txt(prev))) return jitter(420, 180);
            if (isShort(text)) return jitter(220, 80);
            return jitter(280, 120);
        }

        function pickScenario() {
            var used = [];
            try { used = JSON.parse(sessionStorage.getItem('aspalo_hero_seen') || '[]'); } catch (e) {}
            var pool = HERO_SCENARIOS.filter(function (s) { return used.indexOf(s.id) === -1; });
            if (!pool.length) {
                used = [];
                pool = HERO_SCENARIOS.slice();
            }
            var pick = pool[Math.floor(Math.random() * pool.length)];
            used.push(pick.id);
            try { sessionStorage.setItem('aspalo_hero_seen', JSON.stringify(used)); } catch (e) {}
            return pick;
        }

        function resetMeta() {
            setMeta('name', '—');
            setMeta('intent', '—');
            setMeta('status', statusLabel('listening'));
        }

        function clearChat() {
            thread.textContent = '';
            chat.scrollTop = 0;
            setSpeaking(false);
        }

        function renderStatic(scenario) {
            clearChat();
            resetMeta();
            var start = Math.max(0, scenario.messages.length - 5);
            scenario.messages.forEach(function (msg, i) {
                applyMeta(scenario, msg.meta);
                if (i < start) return;
                var el = makeBubble(msg.role, txt(msg));
                el.classList.add('is-on');
                thread.appendChild(el);
            });
            chat.scrollTop = chat.scrollHeight;
            if (timerEl) timerEl.textContent = '2:14';
        }

        function playMessage(scenario, index) {
            if (index >= scenario.messages.length) {
                schedule(function () {
                    stage.classList.add('is-fading');
                    schedule(function () {
                        stage.classList.remove('is-fading');
                        startConversation(currentId);
                    }, 480);
                }, 2000);
                return;
            }

            var msg = scenario.messages[index];
            var text = txt(msg);
            var next = function () { playMessage(scenario, index + 1); };

            if (msg.role === 'ai') {
                setSpeaking(false);
                var wait = thinkBeforeAda(scenario, index, text, msg);
                var typing = shouldType(msg, text, index) ? makeTyping() : null;
                if (typing) reveal(typing);
                schedule(function () {
                    if (typing && typing.parentNode) typing.parentNode.removeChild(typing);
                    applyMeta(scenario, msg.meta);
                    var bubble = makeBubble('ai', text);
                    reveal(bubble);
                    setSpeaking(true);
                    if (muted || reduced) {
                        schedule(function () {
                            setSpeaking(false);
                            schedule(next, afterTurn(msg, text, 'ai'));
                        }, holdFor(text, 'ai'));
                    } else {
                        speakLine(scenario, index, 'ai', text, function () {
                            setSpeaking(false);
                            schedule(next, afterTurn(msg, text, 'ai'));
                        });
                    }
                }, typing ? Math.max(wait, 420 + Math.min(String(text).length * 10, 500)) : wait);
                return;
            }

            setSpeaking(false);
            schedule(function () {
                applyMeta(scenario, msg.meta);
                reveal(makeBubble('user', text));
                if (muted || reduced) {
                    schedule(function () {
                        schedule(next, afterTurn(msg, text, 'user'));
                    }, holdFor(text, 'user'));
                } else {
                    speakLine(scenario, index, 'user', text, function () {
                        schedule(next, afterTurn(msg, text, 'user'));
                    });
                }
            }, userDelay(scenario, index, text));
        }

        function getScenario(id) {
            if (id) {
                for (var i = 0; i < HERO_SCENARIOS.length; i++) {
                    if (HERO_SCENARIOS[i].id === id) return HERO_SCENARIOS[i];
                }
            }
            return pickScenario();
        }

        function startConversation(id, opts) {
            opts = opts || {};
            ringing = false;
            var scenario = getScenario(id);
            currentId = scenario.id;
            clearChat();
            resetMeta();
            function beginTalk() {
                startClock();
                playMessage(scenario, 0);
            }
            if (reduced) {
                beginTalk();
                return;
            }
            if (opts.intro) {
                startRing();
                schedule(function () {
                    playPickup();
                    schedule(beginTalk, 260);
                }, 2200);
                return;
            }
            if (opts.pickup) {
                playPickup();
                schedule(beginTalk, 200);
                return;
            }
            beginTalk();
        }

        function stop() {
            if (timer) clearTimeout(timer);
            timer = null;
            ringing = false;
            stopClock();
            cancelSpeak();
            stopFx();
            setSpeaking(false);
        }

        function restart(id, opts) {
            stop();
            stage.classList.remove('is-fading');
            if (reduced) {
                renderStatic(getScenario(id));
                return;
            }
            startConversation(id, opts);
        }

        if (typeof IntersectionObserver === 'function') {
            var io = new IntersectionObserver(function (entries) {
                var entry = entries[0];
                paused = !(entry && entry.isIntersecting);
                if (paused) cancelSpeak();
            }, { threshold: 0.28 });
            io.observe(stage);
        }

        if (muteBtn) {
            muteBtn.addEventListener('click', function () { setMuted(!muted); });
            syncMuteBtn();
        }
        document.addEventListener('pointerdown', unlockHeroAudio, true);
        if (replayBtn) {
            replayBtn.addEventListener('click', function () { restart(currentId, { intro: true }); });
        }

        var storyMode = !!document.querySelector('[data-story]');
        var startId = stage.getAttribute('data-hero-start');
        if (!storyMode && !startId) restart(undefined, { intro: true });
        preloadPickup(getAudioCtx());
        window.AspaloHero = {
            play: restart,
            restart: restart,
            stop: stop,
            ring: startRing,
            pickup: function (done) {
                unlockHeroAudio();
                playPickup(done);
            },
            stopFx: stopFx,
            unlock: unlockHeroAudio,
            setMuted: setMuted,
            refreshLabels: syncMuteBtn
        };
        return { restart: restart, play: restart, setMuted: setMuted, refreshLabels: syncMuteBtn };
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

    var SECTOR_HERO = {
        Emlak: 'realestate',
        Otomotiv: 'automotive',
        'Sağlık': 'healthcare',
        Lojistik: 'logistics',
        'E-Ticaret': 'support',
        'Otel Konaklama': 'hotel'
    };

    var sectorHeroStarted = false;
    function playSectorHero(sector) {
        var id = SECTOR_HERO[sector];
        if (!id || !window.AspaloHero || typeof window.AspaloHero.play !== 'function') return;
        var opts = sectorHeroStarted ? { pickup: true } : { intro: true };
        sectorHeroStarted = true;
        window.AspaloHero.play(id, opts);
    }

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
        playSectorHero(sector);
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

    function initPartnerForm() {
        var form = document.getElementById('partner-apply-form');
        if (!form) return;
        var status = document.getElementById('partner-form-status');
        var btn = document.getElementById('partner-form-submit');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = (document.getElementById('partner-name') || {}).value || '';
            var email = (document.getElementById('partner-email') || {}).value || '';
            name = name.trim();
            email = email.trim();
            if (!name || !email) {
                if (status) {
                    status.hidden = false;
                    status.className = 'partner-form-status is-error';
                    status.textContent = t('form_err_fields');
                }
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (status) {
                    status.hidden = false;
                    status.className = 'partner-form-status is-error';
                    status.textContent = t('form_err_email');
                }
                return;
            }
            var company = ((document.getElementById('partner-company') || {}).value || '').trim();
            var trackEl = document.getElementById('partner-type');
            var track = trackEl ? trackEl.value : '';
            var message = ((document.getElementById('partner-message') || {}).value || '').trim();
            var fd = new FormData();
            fd.append('name', name);
            fd.append('email', email);
            fd.append('company', company);
            fd.append('track', track);
            fd.append('message', message);
            fd.append('source', 'partnership');
            fd.append('_subject', t('partner_form_subject') + name);
            if (btn) {
                btn.disabled = true;
                btn.textContent = t('form_sending');
            }
            fetch('https://formspree.io/f/xpqjadno', {
                method: 'POST',
                body: fd,
                headers: { Accept: 'application/json' }
            }).then(function (res) {
                if (!res.ok) throw new Error('fail');
                if (status) {
                    status.hidden = false;
                    status.className = 'partner-form-status';
                    status.textContent = t('partner_form_ok');
                }
                form.reset();
            }).catch(function () {
                if (status) {
                    status.hidden = false;
                    status.className = 'partner-form-status is-error';
                    status.textContent = t('form_err_send');
                }
            }).then(function () {
                if (btn) {
                    btn.disabled = false;
                    btn.textContent = t('partner_form_submit');
                }
            });
        });
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
        var hero = initHeroStage();
        initWorks();
        initSectors();
        applyPageMeta();
        initPartnerForm();
        var prevLang = window.onAspaloLanguageChange;
        window.onAspaloLanguageChange = function (lang) {
            if (typeof prevLang === 'function') prevLang(lang);
            var active = document.querySelector('.sector-chip.active');
            if (active) applySectorCopy(active.getAttribute('data-sector'));
            applyPageMeta();
            if (hero && typeof hero.refreshLabels === 'function') hero.refreshLabels();
            if (hero && typeof hero.restart === 'function' && !document.querySelector('[data-story]')) {
                var chip = document.querySelector('.sector-chip.active');
                var hid = chip && SECTOR_HERO[chip.getAttribute('data-sector')];
                hero.restart(hid || undefined, hid ? { pickup: true } : { intro: true });
            }
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
