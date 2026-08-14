/**
 * Aspalo — "The Ledger"
 * Mobile nav, demo/booking modal (calendar + form), FAQ accordion, calculator engine.
 */

document.addEventListener('DOMContentLoaded', function () {
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

    // Sector cards below the calculator jump up and set the active calculator sector
    document.querySelectorAll('[data-jump-sector]').forEach(function (card) {
        card.addEventListener('click', function () {
            var sector = card.getAttribute('data-jump-sector');
            var btn = document.querySelector('.calc-sector-btn[data-sector="' + sector + '"]');
            if (btn && typeof window.setCalcSector === 'function') window.setCalcSector(btn, sector);
            var calcEl = document.getElementById('calc');
            if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Demo / call request modal (calendar + time + form) ---
    var demoModal = document.getElementById('demo-modal');
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

    document.querySelectorAll('[data-open-demo]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            if (nav) nav.classList.remove('open');
            openDemoModal();
        });
    });
    if (demoModalClose) demoModalClose.addEventListener('click', closeDemoModal);
    if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeDemoModal);

    var footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // FAQ accordion
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        var question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', function () {
            var isActive = item.classList.contains('active');
            faqItems.forEach(function (other) {
                other.classList.remove('active');
                var otherQuestion = other.querySelector('.faq-question');
                if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    if (window.location.search.indexOf('demo=1') !== -1) {
        setTimeout(openDemoModal, 400);
    }

    // Calendar
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
            headers: { 'Accept': 'application/json' }
        }).then(function (res) {
            if (!res.ok) throw new Error('Request failed');
            return res.json();
        });
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
                var phoneEl = document.getElementById('demo-phone');
                var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
                var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
                var company = (companyEl && companyEl.value) ? companyEl.value.trim() : '';
                var phone = (phoneEl && phoneEl.value) ? phoneEl.value.trim() : '';
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
                var payload = { name: name, email: email, company: company, phone: phone, date: dateStr, time: selectedTime || '', language: window.AspaloI18n ? window.AspaloI18n.getLang() : 'tr' };
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
                        if (phoneEl) phoneEl.value = '';
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

    // Calendar prev/next month
    var prevBtn = document.getElementById('prev-month');
    var nextBtn = document.getElementById('next-month');
    if (prevBtn) prevBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });

    renderCalendarRef = renderCalendar;
    renderTimeSlotsRef = renderTimeSlots;
    updateCalendarWeekdayHeaders();
});

/**
 * Missed-call cost calculator — the site's hero engine.
 */
(function () {
    var calcCurrentSector = 'Emlak';
    var calcPrevAnnual = 0;

    // Sector defaults grounded in Turkish market data:
    // - Real estate: statutory max commission is 4% of sale price (ex-VAT); e.g. a 5M TL
    //   sale yields ~200,000 TL total commission, split between parties (TDB / Sigorta Sözcü).
    // - Automotive: average authorized/private service invoice runs 5,000–25,000 TL.
    // - Healthcare: private clinic visit fees typically fall in the 100–1,000 TL band (TDB 2026 tariff).
    // - E-commerce: Turkey's 2025 average order value (AOV) was 1,278 TL (Ministry of Trade report).
    // - Hotel: based on average multi-night reservation value (ADR-derived estimate).
    // - Call-to-customer conversion: inbound calls convert far better than cold outreach, but a
    //   sector-specific ceiling keeps results realistic (avoids implausible outputs) while keeping
    //   each sector's worst-case band in a comparable, sensible range.
    var calcSectorConfig = {
        'Emlak':          { calls: 3,  callsMax: 8,  val: 50000, valMin: 10000, valMax: 80000, valStep: 1000, conv: 10, convMax: 20, missedUnit: 'sorgulama',
            callsLabel: 'Günlük kaçırılan sorgulama sayısı', valueLabel: 'Ortalama işlem/komisyon değeri', convLabel: 'Sorgulamadan müşteriye dönüşüm oranı' },
        'Otomotiv':       { calls: 8,  callsMax: 15, val: 9000,  valMin: 3000,  valMax: 20000, valStep: 500,  conv: 10, convMax: 25, missedUnit: 'servis talebi',
            callsLabel: 'Günlük kaçırılan servis talebi sayısı', valueLabel: 'Ortalama servis/test sürüşü değeri', convLabel: 'Talepten müşteriye dönüşüm oranı' },
        'Sağlık':         { calls: 15, callsMax: 40, val: 750,   valMin: 200,   valMax: 3000,  valStep: 50,   conv: 25, convMax: 45, missedUnit: 'randevu talebi',
            callsLabel: 'Günlük kaçırılan randevu talebi sayısı', valueLabel: 'Ortalama randevu/tedavi değeri', convLabel: 'Randevu talebinden hastaya dönüşüm oranı' },
        'Lojistik':       { calls: 12, callsMax: 35, val: 600,   valMin: 150,   valMax: 3000,  valStep: 50,   conv: 20, convMax: 40, missedUnit: 'takip sorgusu',
            callsLabel: 'Günlük kaçırılan takip sorgusu sayısı', valueLabel: 'Ortalama sevkiyat/hizmet değeri', convLabel: 'Sorgudan müşteriye dönüşüm oranı' },
        'E-Ticaret':      { calls: 18, callsMax: 40, val: 1200,  valMin: 300,   valMax: 5000,  valStep: 100,  conv: 15, convMax: 30, missedUnit: 'sipariş sorgusu',
            callsLabel: 'Günlük kaçırılan sipariş sorgusu sayısı', valueLabel: 'Ortalama sipariş değeri', convLabel: 'Sorgudan siparişe dönüşüm oranı' },
        'Otel Konaklama': { calls: 10, callsMax: 25, val: 3500,  valMin: 800,   valMax: 10000, valStep: 100,  conv: 25, convMax: 40, missedUnit: 'rezervasyon talebi',
            callsLabel: 'Günlük kaçırılan rezervasyon talebi sayısı', valueLabel: 'Ortalama rezervasyon değeri', convLabel: 'Talepten rezervasyona dönüşüm oranı' }
    };

    var calcInsights = {
        'Emlak': function (missed) { return '<strong>' + calcFmtNum(missed) + ' sorgulama</strong> bu yıl cevapsız kaldı. Emlak müşterisi aynı anda birden fazla ofisi arıyor — ilk cevap veren kazanıyor.'; },
        'Otomotiv': function (missed) { return '<strong>' + calcFmtNum(missed) + ' servis/test sürüşü talebi</strong> bu yıl cevaplanamadı. Müşteri hemen başka bir bayiyi veya servisi arıyor.'; },
        'Sağlık': function (missed) { return 'Bu yıl <strong>' + calcFmtNum(missed) + ' randevu talebi</strong> cevaplanmayan bir telefon yüzünden gitti. Doluluk oranınız her kaçırılan çağrıda düşüyor — ve hastaların büyük çoğunluğu geri aramıyor.'; },
        'Lojistik': function (missed) { return '<strong>' + calcFmtNum(missed) + ' kargo/takip sorgusu</strong> bu yıl cevapsız kaldı. Yanıtsız kalan müşteri hizmetleri çağrıları memnuniyetsizliğe ve kayba yol açıyor.'; },
        'E-Ticaret': function (missed) { return '<strong>' + calcFmtNum(missed) + ' sipariş/iade sorgusu</strong> bu yıl cevaplanamadı. Hızlı yanıt alamayan müşteri, bir sonraki siparişini rakibe veriyor.'; },
        'Otel Konaklama': function (missed) { return '<strong>' + calcFmtNum(missed) + ' rezervasyon talebi</strong> bu yıl kaçtı. Misafir adayı hemen başka bir tesisi arıyor — anında yanıt rezervasyona dönüşüyor.'; }
    };

    function calcFmt(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' M₺';
        return Math.round(n).toLocaleString('tr-TR') + ' ₺';
    }
    function calcFmtNum(n) {
        return Math.round(n).toLocaleString('tr-TR');
    }
    function calcAnimateValue(el, newVal, formatter) {
        var start = calcPrevAnnual;
        var end = newVal;
        var duration = 400;
        var startTime = performance.now();
        function update(now) {
            var progress = Math.min((now - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatter(start + (end - start) * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    window.calcCompute = function () {
        var callsEl = document.getElementById('calc-calls');
        var valEl = document.getElementById('calc-val');
        var convEl = document.getElementById('calc-conv');
        if (!callsEl || !valEl || !convEl) return;
        var calls = +callsEl.value;
        var val = +valEl.value;
        var conv = +convEl.value;

        document.getElementById('calc-calls-out').textContent = calls;
        document.getElementById('calc-value-out').textContent = Math.round(val).toLocaleString('tr-TR') + ' ₺';
        document.getElementById('calc-conv-out').textContent = '%' + conv;

        var daily = calls * (conv / 100) * val;
        var monthly = daily * 30;
        var annual = daily * 365;
        var missed = calls * 365;

        var sectorCfg = calcSectorConfig[calcCurrentSector] || calcSectorConfig['Emlak'];
        var unit = sectorCfg.missedUnit || 'çağrı';

        document.getElementById('calc-b-daily').textContent = calcFmt(daily);
        document.getElementById('calc-b-monthly').textContent = calcFmt(monthly);
        document.getElementById('calc-b-missed').textContent = calcFmtNum(missed) + ' ' + unit;
        var missedLabelEl = document.getElementById('calc-b-missed-label');
        if (missedLabelEl) missedLabelEl.textContent = 'Yıllık kaçan ' + unit;

        var annualEl = document.getElementById('calc-annual');
        calcAnimateValue(annualEl, annual, function (v) {
            if (v >= 1000000) return (v / 1000000).toFixed(2).replace('.', ',') + ' M₺';
            return Math.round(v).toLocaleString('tr-TR') + ' ₺';
        });
        calcPrevAnnual = annual;

        document.getElementById('calc-result-sub').textContent =
            '= ' + calcFmt(monthly) + ' / ay  ·  ' + calcFmtNum(missed) + ' ' + unit + ' / yıl';

        var insightFn = calcInsights[calcCurrentSector] || calcInsights['Emlak'];
        document.getElementById('calc-insight-box').innerHTML = insightFn(missed);
    };

    window.setCalcSector = function (el, sector) {
        var cfg = calcSectorConfig[sector];
        if (!cfg) return;
        document.querySelectorAll('.calc-sector-btn').forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
        });
        el.classList.add('active');
        el.setAttribute('aria-pressed', 'true');
        calcCurrentSector = sector;
        var valEl = document.getElementById('calc-val');
        valEl.min = cfg.valMin;
        valEl.max = cfg.valMax;
        valEl.step = cfg.valStep;
        valEl.value = cfg.val;
        var callsEl = document.getElementById('calc-calls');
        callsEl.max = cfg.callsMax;
        callsEl.value = cfg.calls;
        var convEl = document.getElementById('calc-conv');
        convEl.max = cfg.convMax;
        convEl.value = cfg.conv;

        var callsLabelEl = document.getElementById('calc-calls-label');
        if (callsLabelEl) callsLabelEl.textContent = cfg.callsLabel;
        var valueLabelEl = document.getElementById('calc-value-label');
        if (valueLabelEl) valueLabelEl.textContent = cfg.valueLabel;
        var convLabelEl = document.getElementById('calc-conv-label');
        if (convLabelEl) convLabelEl.textContent = cfg.convLabel;

        calcPrevAnnual = 0;
        window.calcCompute();
    };

    if (document.getElementById('calc-calls')) {
        var initialBtn = document.querySelector('.calc-sector-btn.active') || document.querySelector('.calc-sector-btn');
        if (initialBtn) {
            window.setCalcSector(initialBtn, calcCurrentSector);
        } else {
            window.calcCompute();
        }
    }
})();
