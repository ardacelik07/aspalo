/**
 * Aspalo - General AI Call Center Landing
 * Mobile menu, sector badges, demo modal (takvim + form), CTA form
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var nav = document.querySelector('.navbar');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
        document.querySelectorAll('.mobile-nav a').forEach(function (link) {
            link.addEventListener('click', function () { nav.classList.remove('open'); });
        });
    }

    // Dinamik sektör badge'leri
    var sectorBadges = document.querySelectorAll('#sector-badges .sector-badge');
    var sectorBadgeInterval = null;
    if (sectorBadges.length) {
        var activeIndex = 0;
        sectorBadges[0].classList.add('active');
        sectorBadgeInterval = setInterval(function () {
            sectorBadges[activeIndex].classList.remove('active');
            activeIndex = (activeIndex + 1) % sectorBadges.length;
            sectorBadges[activeIndex].classList.add('active');
        }, 2200);
    }

    // Sektör kartı tıklanınca: fayda paneli göster, hero badge ile senkron
    var sectorBenefits = {
        'Emlak': {
            icon: '🏠',
            title: 'Emlak',
            subtitle: 'Aspalo emlak sektöründe nasıl fayda sağlar?',
            benefits: [
                '7/24 emlak bilgisi ve fiyat sunumu',
                'Görüşme ve ev gezisi randevusu alma',
                'Lead nitelendirme (sıcak / ılık müşteri)',
                'Portföy özeti ve kampanya bilgisi',
                'Kaçırılan aramaları geri dönüşümle değerlendirme'
            ]
        },
        'Otomotiv': {
            icon: '🚗',
            title: 'Otomotiv',
            subtitle: 'Aspalo otomotiv sektöründe nasıl fayda sağlar?',
            benefits: [
                'Servis randevusu ve test sürüşü planlama',
                'Model, fiyat ve kampanya bilgisi 7/24',
                'Müşteri geri arama ve takip',
                'Bayi stok ve teslimat süresi bilgisi',
                'Satış sonrası hizmet yönlendirme'
            ]
        },
        'Sağlık': {
            icon: '🏥',
            title: 'Sağlık',
            subtitle: 'Aspalo sağlık sektöründe nasıl fayda sağlar?',
            benefits: [
                'Randevu alma ve hatırlatma aramaları',
                'Hasta kaydı ve ön bilgi toplama',
                'Poliklinik ve doktor bilgisi',
                'Acil olmayan sorularda yönlendirme',
                'Randevu iptal ve erteletme'
            ]
        },
        'Lojistik': {
            icon: '📦',
            title: 'Lojistik',
            subtitle: 'Aspalo lojistik sektöründe nasıl fayda sağlar?',
            benefits: [
                'Kargo takip bilgisi 7/24',
                'Teslimat erteletme ve adres güncelleme',
                'Şikayet ve kayıp bildirimi alma',
                'Müşteri hizmetleri ön eleme',
                'Geri arama talebi kaydı'
            ]
        },
        'E-Ticaret': {
            icon: '🛒',
            title: 'E-Ticaret',
            subtitle: 'Aspalo e-ticaret sektöründe nasıl fayda sağlar?',
            benefits: [
                'Sipariş durumu ve kargo bilgisi',
                'İade ve değişim talebi alma',
                'Ürün bilgisi ve stok sorgulama',
                'Kampanya ve kupon bilgisi',
                'Müşteri memnuniyeti ölçümü'
            ]
        },
        'Otel Konaklama': {
            icon: '🏨',
            title: 'Otel Konaklama',
            subtitle: 'Aspalo otel ve konaklama sektöründe nasıl fayda sağlar?',
            benefits: [
                'Oda rezervasyonu ve fiyat bilgisi',
                'Check-in / check-out ve hizmet sorguları',
                'Erken rezervasyon ve grup talepleri',
                'Misafir istekleri ve yönlendirme',
                '7/24 rezervasyon merkezi desteği'
            ]
        }
    };
    var sectorCards = document.querySelectorAll('#sector-cards .sector-compat-card');
    var sectorBenefitIcon = document.getElementById('sector-benefit-icon');
    var sectorBenefitTitle = document.getElementById('sector-benefit-title');
    var sectorBenefitSubtitle = document.getElementById('sector-benefit-subtitle');
    var sectorBenefitList = document.getElementById('sector-benefit-list');
    function showSectorBenefit(sectorKey, fromUserClick) {
        var data = sectorBenefits[sectorKey];
        if (!data) return;
        sectorCards.forEach(function (card) {
            card.classList.toggle('active', card.getAttribute('data-sector') === sectorKey);
        });
        if (fromUserClick && sectorBadges && sectorBadgeInterval) {
            clearInterval(sectorBadgeInterval);
            sectorBadgeInterval = null;
        }
        if (sectorBadges && (fromUserClick || !sectorBadgeInterval)) {
            sectorBadges.forEach(function (badge) {
                badge.classList.toggle('active', badge.getAttribute('data-sector') === sectorKey);
            });
        }
        if (sectorBenefitIcon) sectorBenefitIcon.textContent = data.icon;
        if (sectorBenefitTitle) sectorBenefitTitle.textContent = data.title;
        if (sectorBenefitSubtitle) sectorBenefitSubtitle.textContent = data.subtitle;
        if (sectorBenefitList && data.benefits) {
            sectorBenefitList.innerHTML = data.benefits.map(function (b) { return '<li>' + b + '</li>'; }).join('');
        }
    }
    sectorCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var sector = card.getAttribute('data-sector');
            if (sector) showSectorBenefit(sector, true);
        });
    });
    if (sectorCards.length) {
        showSectorBenefit(sectorCards[0].getAttribute('data-sector'), false);
    }

    // Telefon mockup: mesajlaşma dili döngüsü (TR, DE, EN, AR)
    var phoneTranscripts = [
        { status: 'Görüşme devam ediyor...', speakerAi: 'AI:', speakerCustomer: 'Arayan:', msg1: 'Merhaba, size nasıl yardımcı olabilirim?', msg2: 'Randevu almak istiyorum.', msg3: 'Tabii, hangi gün uygun?', rtl: false },
        { status: 'Anruf läuft...', speakerAi: 'AI:', speakerCustomer: 'Anrufer:', msg1: 'Hallo, wie kann ich Ihnen helfen?', msg2: 'Ich möchte einen Termin vereinbaren.', msg3: 'Natürlich, welcher Tag passt Ihnen?', rtl: false },
        { status: 'Call in progress...', speakerAi: 'AI:', speakerCustomer: 'Caller:', msg1: 'Hello, how can I help you?', msg2: "I'd like to make an appointment.", msg3: 'Sure, which day works for you?', rtl: false },
        { status: 'المكالمة جارية...', speakerAi: 'AI:', speakerCustomer: 'المتصل:', msg1: 'مرحبا، كيف يمكنني مساعدتك؟', msg2: 'أود حجز موعد.', msg3: 'بالتأكيد، أي يوم يناسبك؟', rtl: true }
    ];
    var phoneStatusEl = document.getElementById('phone-call-status');
    var phoneSpeakerAi = document.getElementById('phone-speaker-ai');
    var phoneSpeakerCustomer = document.getElementById('phone-speaker-customer');
    var phoneMsg1 = document.getElementById('phone-msg-1');
    var phoneMsg2 = document.getElementById('phone-msg-2');
    var phoneMsg3 = document.getElementById('phone-msg-3');
    var phoneTranscriptWrap = document.querySelector('.call-transcript');
    var phoneLangIndex = 0;
    function setPhoneLanguage(index) {
        var L = phoneTranscripts[index];
        if (!L) return;
        if (phoneStatusEl) phoneStatusEl.textContent = L.status;
        if (phoneSpeakerAi) phoneSpeakerAi.textContent = L.speakerAi;
        if (phoneSpeakerCustomer) phoneSpeakerCustomer.textContent = L.speakerCustomer;
        if (phoneMsg1) phoneMsg1.textContent = L.msg1;
        if (phoneMsg2) phoneMsg2.textContent = L.msg2;
        if (phoneMsg3) phoneMsg3.textContent = L.msg3;
        if (phoneTranscriptWrap) phoneTranscriptWrap.setAttribute('dir', L.rtl ? 'rtl' : 'ltr');
    }
    if (phoneMsg1 && phoneMsg2 && phoneMsg3) {
        setInterval(function () {
            phoneLangIndex = (phoneLangIndex + 1) % phoneTranscripts.length;
            setPhoneLanguage(phoneLangIndex);
        }, 3500);
    }

    // --- Demo talep modalı (takvim + saat + form) ---
    var demoModal = document.getElementById('demo-modal');
    var demoRequestBtn = document.getElementById('demo-request-btn');
    var demoRequestBtnMobile = document.getElementById('demo-request-btn-mobile');
    var heroDemoBtn = document.getElementById('hero-demo-btn');
    var demoModalClose = document.querySelector('.demo-modal-close');
    var demoModalOverlay = document.querySelector('.demo-modal-overlay');

    function openDemoModal() {
        if (demoModal) {
            demoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            initCalendar();
        }
    }
    function closeDemoModal() {
        if (demoModal) {
            demoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (demoRequestBtn) demoRequestBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (demoRequestBtnMobile) demoRequestBtnMobile.addEventListener('click', function (e) {
        e.preventDefault();
        if (nav) nav.classList.remove('open');
        setTimeout(openDemoModal, 200);
    });
    if (heroDemoBtn) heroDemoBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    var demoRequestFooter = document.getElementById('demo-request-footer');
    if (demoRequestFooter) demoRequestFooter.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    var pricingBasicBtn = document.getElementById('pricing-basic-btn');
    var pricingGrowthBtn = document.getElementById('pricing-growth-btn');
    var pricingProBtn = document.getElementById('pricing-pro-btn');
    if (pricingBasicBtn) pricingBasicBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (pricingGrowthBtn) pricingGrowthBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (pricingProBtn) pricingProBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
    if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeDemoModal);

    // Fiyatlandırma: Aylık / Yıllık toggle
    var pricingToggleMonthly = document.getElementById('pricing-toggle-monthly');
    var pricingToggleAnnual = document.getElementById('pricing-toggle-annual');
    var pricingPriceSpans = document.querySelectorAll('.pricing-card .pricing-price[data-monthly][data-annual]');
    var pricingSavingsBasic = document.getElementById('pricing-savings-basic');
    var pricingSavingsGrowth = document.getElementById('pricing-savings-growth');
    function setPricingPeriod(period) {
        var isAnnual = period === 'annual';
        if (pricingToggleMonthly) pricingToggleMonthly.classList.toggle('active', !isAnnual);
        if (pricingToggleAnnual) pricingToggleAnnual.classList.toggle('active', isAnnual);
        pricingPriceSpans.forEach(function (el) {
            el.textContent = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        });
        if (pricingSavingsBasic) pricingSavingsBasic.hidden = !isAnnual;
        if (pricingSavingsGrowth) pricingSavingsGrowth.hidden = !isAnnual;
    }
    if (pricingToggleMonthly) pricingToggleMonthly.addEventListener('click', function () { setPricingPeriod('monthly'); });
    if (pricingToggleAnnual) pricingToggleAnnual.addEventListener('click', function () { setPricingPeriod('annual'); });

    // Takvim
    var currentDate = new Date();
    var selectedDate = null;
    var selectedTime = null;
    var timeFormat = '24';
    var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    var weekdaysFull = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

    function initCalendar() {
        renderCalendar();
        setupTimeFormatToggle();
        setupFormSubmit();
    }

    function renderCalendar() {
        var calendarDays = document.getElementById('calendar-days');
        var monthYear = document.getElementById('calendar-month-year');
        if (!calendarDays || !monthYear) return;
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        monthYear.textContent = monthNames[month] + ' ' + year;
        var firstDay = new Date(year, month, 1).getDay();
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        calendarDays.innerHTML = '';
        var prevMonthDays = new Date(year, month, 0).getDate();
        for (var i = firstDay - 1; i >= 0; i--) {
            var day = prevMonthDays - i;
            var date = new Date(year, month - 1, day);
            var el = document.createElement('div');
            el.className = 'calendar-day disabled';
            el.textContent = date.getDate();
            calendarDays.appendChild(el);
        }
        for (var d = 1; d <= daysInMonth; d++) {
            var date = new Date(year, month, d);
            var isPast = date < today;
            var isToday = date.getTime() === today.getTime();
            var el = document.createElement('div');
            el.className = 'calendar-day';
            if (isPast) el.classList.add('disabled');
            else if (isToday) el.classList.add('today');
            el.textContent = d;
            if (!isPast) {
                (function (y, m, day) {
                    el.addEventListener('click', function () {
                        document.querySelectorAll('.calendar-day.selected').forEach(function (x) { x.classList.remove('selected'); });
                        this.classList.add('selected');
                        selectedDate = new Date(y, m, day);
                        updateSelectedDateInfo();
                        renderTimeSlots();
                    });
                })(year, month, d);
            }
            calendarDays.appendChild(el);
        }
        var total = calendarDays.children.length;
        for (var k = 1; k <= 42 - total; k++) {
            var date = new Date(year, month + 1, k);
            var el = document.createElement('div');
            el.className = 'calendar-day disabled';
            el.textContent = date.getDate();
            calendarDays.appendChild(el);
        }
    }

    function updateSelectedDateInfo() {
        var selectedDateText = document.getElementById('selected-date-text');
        if (!selectedDateText) return;
        if (selectedDate) {
            var dayNames = ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'];
            selectedDateText.textContent = dayNames[selectedDate.getDay()] + ' ' + selectedDate.getDate();
        } else {
            selectedDateText.textContent = 'Tarih seçin';
        }
    }

    function renderTimeSlots() {
        var timeSlots = document.getElementById('time-slots');
        if (!timeSlots) return;
        if (!selectedDate) {
            timeSlots.innerHTML = '<p class="no-date-selected" id="no-date-selected-p">Lütfen önce bir tarih seçin</p>';
            return;
        }
        var slots = [];
        for (var h = 9; h <= 22; h++) {
            slots.push((h < 10 ? '0' : '') + h + ':00');
            if (h < 22) slots.push((h < 10 ? '0' : '') + h + ':30');
        }
        timeSlots.innerHTML = '';
        slots.forEach(function (time) {
            var el = document.createElement('div');
            el.className = 'time-slot';
            el.textContent = timeFormat === '12' ? formatTime12(time) : time;
            el.dataset.time = time;
            el.addEventListener('click', function () {
                document.querySelectorAll('.time-slot.selected').forEach(function (x) { x.classList.remove('selected'); });
                this.classList.add('selected');
                selectedTime = this.dataset.time;
                var formInner = document.getElementById('demo-form-inner');
                if (formInner) formInner.style.display = 'flex';
            });
            timeSlots.appendChild(el);
        });
    }

    function formatTime12(time24) {
        var parts = time24.split(':');
        var h = parseInt(parts[0], 10);
        var ampm = h >= 12 ? 'PM' : 'AM';
        var h12 = h % 12 || 12;
        return h12 + ':' + parts[1] + ' ' + ampm;
    }

    function setupTimeFormatToggle() {
        document.querySelectorAll('.time-toggle-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.time-toggle-btn').forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');
                timeFormat = this.dataset.format;
                renderTimeSlots();
            });
        });
    }

    function add30Min(time) {
        var parts = time.split(':').map(Number);
        var m = parts[1] + 30;
        var h = parts[0] + (m >= 60 ? 1 : 0);
        m = m % 60;
        return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    }

    window.DEMO_SUBMIT_CONFIG = { method: 'formspree', formspreeId: 'xpqjadno', apiUrl: '' };

    function submitDemoRequest(payload) {
        var config = window.DEMO_SUBMIT_CONFIG || {};
        if (config.method !== 'formspree' || !config.formspreeId) {
            console.log('Demo (not sent):', payload);
            return Promise.resolve({ ok: true });
        }
        var formData = new FormData();
        formData.append('name', payload.name);
        formData.append('email', payload.email);
        formData.append('company', payload.company || '');
        formData.append('date', payload.date);
        formData.append('time', payload.time);
        formData.append('_subject', 'Yeni Demo Talebi: ' + payload.name);
        return fetch('https://formspree.io/f/' + config.formspreeId, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
        }).then(function (res) { return res.ok ? { ok: true } : Promise.reject(new Error('Formspree error')); });
    }

    function setupFormSubmit() {
        var btnBack = document.getElementById('btn-back');
        var btnConfirm = document.getElementById('btn-confirm');
        var formInner = document.getElementById('demo-form-inner');
        if (btnBack && formInner) {
            btnBack.addEventListener('click', function () {
                selectedTime = null;
                document.querySelectorAll('.time-slot.selected').forEach(function (el) { el.classList.remove('selected'); });
                formInner.style.display = 'none';
            });
        }
        if (btnConfirm && formInner) {
            btnConfirm.addEventListener('click', function () {
                var nameEl = document.getElementById('demo-name');
                var emailEl = document.getElementById('demo-email');
                var companyEl = document.getElementById('demo-company');
                var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
                var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
                var company = (companyEl && companyEl.value) ? companyEl.value.trim() : '';
                if (!name || !email) {
                    alert('Lütfen ad ve email alanlarını doldurun.');
                    return;
                }
                var dateStr = '';
                if (selectedDate && monthNames && weekdaysFull) {
                    dateStr = selectedDate.getDate() + ' ' + monthNames[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear() + ' ' + weekdaysFull[selectedDate.getDay()];
                }
                var payload = { name: name, email: email, company: company, date: dateStr, time: selectedTime || '', language: 'tr' };
                var origText = btnConfirm.textContent;
                btnConfirm.disabled = true;
                btnConfirm.textContent = 'Gönderiliyor...';
                submitDemoRequest(payload).then(function () {
                    btnConfirm.textContent = '✓ Talebiniz alındı';
                    btnConfirm.style.background = 'linear-gradient(135deg, #15803d 0%, #166534 100%)';
                    setTimeout(function () {
                        if (nameEl) nameEl.value = '';
                        if (emailEl) emailEl.value = '';
                        if (companyEl) companyEl.value = '';
                        formInner.style.display = 'none';
                        selectedDate = null;
                        selectedTime = null;
                        document.querySelectorAll('.calendar-day.selected').forEach(function (el) { el.classList.remove('selected'); });
                        document.querySelectorAll('.time-slot.selected').forEach(function (el) { el.classList.remove('selected'); });
                        updateSelectedDateInfo();
                        renderTimeSlots();
                        closeDemoModal();
                        btnConfirm.disabled = false;
                        btnConfirm.textContent = origText;
                        btnConfirm.style.background = '';
                    }, 2000);
                }).catch(function (err) {
                    console.error(err);
                    btnConfirm.disabled = false;
                    btnConfirm.textContent = origText;
                    alert('Gönderilemedi. Lütfen tekrar deneyin veya doğrudan iletişime geçin.');
                });
            });
        }
    }

    // Takvim önceki/sonraki ay
    var prevBtn = document.getElementById('prev-month');
    var nextBtn = document.getElementById('next-month');
    if (prevBtn) prevBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });

});
