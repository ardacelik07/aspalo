/**
 * Aspalo - General AI Call Center Landing
 * Mobile menu, sector badges, demo modal (takvim + form), CTA form
 */

document.addEventListener('DOMContentLoaded', function () {
    var activeSectorKey = 'Emlak';
    var renderCalendarRef = null;
    var updateSelectedDateInfoRef = null;
    var renderTimeSlotsRef = null;

    function i18n(key) {
        return window.AspaloI18n ? window.AspaloI18n.t(key) : key;
    }

    function updateCalendarWeekdayHeaders() {
        var wrap = document.getElementById('calendar-weekdays');
        if (!wrap || !window.AspaloI18n) return;
        var days = window.AspaloI18n.getWeekdaysShort();
        var cells = wrap.querySelectorAll('div');
        days.forEach(function (label, i) {
            if (cells[i]) cells[i].textContent = label;
        });
    }

    window.onAspaloLanguageChange = function () {
        updateCalendarWeekdayHeaders();
        if (renderCalendarRef) renderCalendarRef();
        if (updateSelectedDateInfoRef) updateSelectedDateInfoRef();
        if (renderTimeSlotsRef) renderTimeSlotsRef();
        var activeCard = document.querySelector('#sector-cards .sector-compat-card.active');
        if (activeCard) {
            showSectorBenefit(activeCard.getAttribute('data-sector'), false, activeCard);
        } else {
            showSectorBenefit(activeSectorKey, false, null);
        }
        if (typeof window.refreshVapiLabels === 'function') window.refreshVapiLabels();
    };
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
    var sectorCards = document.querySelectorAll('#sector-cards .sector-compat-card');
    var sectorBenefitIcon = document.getElementById('sector-benefit-icon');
    var sectorBenefitTitle = document.getElementById('sector-benefit-title');
    var sectorBenefitSubtitle = document.getElementById('sector-benefit-subtitle');
    var sectorBenefitList = document.getElementById('sector-benefit-list');
    var sectorBenefitPanel = document.getElementById('sector-benefit-panel');
    var sectorCardsGrid = document.getElementById('sector-cards');
    function isMobileView() {
        return window.innerWidth <= 900;
    }
    function showSectorBenefit(sectorKey, fromUserClick, clickedCard) {
        if (!sectorKey) return;
        activeSectorKey = sectorKey;
        var data = window.AspaloI18n ? window.AspaloI18n.getSectorBenefits(sectorKey) : null;
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
        if (isMobileView() && clickedCard && sectorBenefitPanel && sectorCardsGrid) {
            var existingPanel = clickedCard.nextElementSibling;
            if (existingPanel && existingPanel.id === 'sector-benefit-panel') {
                return;
            }
            if (sectorBenefitPanel.parentNode) {
                sectorBenefitPanel.parentNode.removeChild(sectorBenefitPanel);
            }
            clickedCard.parentNode.insertBefore(sectorBenefitPanel, clickedCard.nextSibling);
            sectorBenefitPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    sectorCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var sector = card.getAttribute('data-sector');
            if (sector) showSectorBenefit(sector, true, card);
        });
    });
    if (sectorCards.length) {
        var firstCard = sectorCards[0];
        showSectorBenefit(firstCard.getAttribute('data-sector'), false, firstCard);
    }
    window.addEventListener('resize', function () {
        if (!isMobileView() && sectorBenefitPanel && sectorCardsGrid) {
            var container = sectorCardsGrid.parentNode;
            if (sectorBenefitPanel.parentNode !== container) {
                container.appendChild(sectorBenefitPanel);
            }
        }
    });

    // Telefon mockup: mesajlaşma dili döngüsü (TR, DE, EN, AR)
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
    var demoRequestFooter = document.getElementById('demo-request-footer-brand');
    if (demoRequestFooter) demoRequestFooter.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    var pricingBasicBtn = document.getElementById('pricing-basic-btn');
    var pricingGrowthBtn = document.getElementById('pricing-growth-btn');
    var pricingProBtn = document.getElementById('pricing-pro-btn');
    if (pricingBasicBtn) pricingBasicBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (pricingGrowthBtn) pricingGrowthBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (pricingProBtn) pricingProBtn.addEventListener('click', function (e) { e.preventDefault(); openDemoModal(); });
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
    if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeDemoModal);

    // Takvim
    var currentDate = new Date();
    var selectedDate = null;
    var selectedTime = null;
    var timeFormat = '24';
    function monthNames() {
        return window.AspaloI18n ? window.AspaloI18n.getMonths() : ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    }
    function weekdaysFull() {
        return window.AspaloI18n ? window.AspaloI18n.getWeekdaysFull() : ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    }
    function weekdaysShort() {
        return window.AspaloI18n ? window.AspaloI18n.getWeekdaysShort() : ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'];
    }

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
        var months = monthNames();
        monthYear.textContent = months[month] + ' ' + year;
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
            var dayNames = weekdaysShort();
            selectedDateText.textContent = dayNames[selectedDate.getDay()] + ' ' + selectedDate.getDate();
        } else {
            selectedDateText.textContent = i18n('cal_pick_date');
        }
    }
    updateSelectedDateInfoRef = updateSelectedDateInfo;

    function renderTimeSlots() {
        var timeSlots = document.getElementById('time-slots');
        if (!timeSlots) return;
        if (!selectedDate) {
            timeSlots.innerHTML = '<p class="no-date-selected" id="no-date-selected-p">' + i18n('cal_pick_first') + '</p>';
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
        formData.append('_subject', i18n('form_subject') + payload.name);
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
                    alert(i18n('form_err_fields'));
                    return;
                }
                var dateStr = '';
                if (selectedDate) {
                    var m = monthNames();
                    var w = weekdaysFull();
                    dateStr = selectedDate.getDate() + ' ' + m[selectedDate.getMonth()] + ' ' + selectedDate.getFullYear() + ' ' + w[selectedDate.getDay()];
                }
                var payload = { name: name, email: email, company: company, date: dateStr, time: selectedTime || '', language: window.AspaloI18n ? window.AspaloI18n.getLang() : 'tr' };
                var origText = btnConfirm.textContent;
                btnConfirm.disabled = true;
                btnConfirm.textContent = i18n('form_sending');
                submitDemoRequest(payload).then(function () {
                    btnConfirm.textContent = i18n('form_success');
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
                    alert(i18n('form_err_send'));
                });
            });
        }
    }

    // Takvim önceki/sonraki ay
    var prevBtn = document.getElementById('prev-month');
    var nextBtn = document.getElementById('next-month');
    if (prevBtn) prevBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });

    renderCalendarRef = renderCalendar;
    renderTimeSlotsRef = renderTimeSlots;
    updateCalendarWeekdayHeaders();

});
