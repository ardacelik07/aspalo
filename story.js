/**
 * Homepage product story — one call, followed through the system.
 */
(function () {
    'use strict';

    function t(key) {
        return window.AspaloI18n ? window.AspaloI18n.t(key) : key;
    }

    function lang() {
        return (window.AspaloI18n && window.AspaloI18n.getLang()) || 'tr';
    }

    function L(value) {
        if (value == null) return '';
        if (typeof value === 'string' || typeof value === 'number') return String(value);
        return value[lang()] || value.tr || '';
    }

    var DEV_NODES = [
        { k: { tr: 'Gelen ses', en: 'Incoming audio' }, v: { tr: 'Hat', en: 'Line' } },
        { k: { tr: 'Konuşma → metin', en: 'Speech-to-text' }, v: 'STT' },
        { k: { tr: 'Dil modeli', en: 'Language model' }, v: 'LLM' },
        { k: { tr: 'Niyet', en: 'Intent detection' }, v: { tr: 'Randevu', en: 'Intent' } },
        { k: { tr: 'İş kuralı', en: 'Business logic' }, v: { tr: 'Müsaitlik', en: 'Availability' } },
        { k: { tr: 'API', en: 'API layer' }, v: { tr: 'Yazma', en: 'Write' } },
        { k: 'CRM', v: { tr: 'Kayıt', en: 'Record' } },
        { k: { tr: 'Metin → ses', en: 'Text-to-speech' }, v: 'TTS' },
        { k: { tr: 'Yanıt', en: 'Audio response' }, v: 'ADA' }
    ];

    var ICONS = {
        hubspot: '/images/hubspot.svg',
        salesforce: '/images/salesforce.svg',
        slack: '/images/slack.svg',
        teams: '/images/microsoftteams.svg',
        sheets: '/images/googlesheets.svg'
    };

    var STORY = {
        healthcare: {
            caller: 'Ayşe Kaya',
            place: { tr: 'Aspalo Klinik', en: 'Aspalo Clinic' },
            quote: { tr: 'Yarın nöroloji için <mark>randevu</mark> almak istiyorum.', en: 'I\'d like a neurology <mark>appointment</mark> for tomorrow.' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Randevu', en: 'Appointment' } },
                { k: { tr: 'Tarih', en: 'Date' }, v: { tr: 'Yarın', en: 'Tomorrow' } },
                { k: { tr: 'Saat', en: 'Time' }, v: '14:30' },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Ayşe Kaya' },
                { k: { tr: 'Telefon', en: 'Phone' }, v: '•••• 19 08' }
            ],
            think: [
                { tr: 'Cümleyi çözüyorum…', en: 'Reading the request…' },
                { tr: 'Müsaitliği kontrol ediyorum…', en: 'Checking availability…' },
                { tr: 'Kaydı buluyorum…', en: 'Finding the customer…' },
                { tr: 'Yanıtı hazırlıyorum…', en: 'Preparing the reply…' }
            ],
            business: [
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Ayşe Kaya' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Randevu', en: 'Appointment' }, v: { tr: 'Alındı', en: 'Booked' } },
                { k: 'CRM', v: { tr: 'Güncellendi', en: 'Updated' } },
                { k: 'SMS', v: { tr: 'Gönderildi', en: 'Sent' } }
            ],
            ints: [
                { icon: 'hubspot', name: 'HubSpot' },
                { icon: 'sheets', name: 'Google Calendar' },
                { icon: 'slack', name: 'Slack' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 124, to: 125, delta: '+1' },
                { k: { tr: 'Randevular', en: 'Appointments' }, from: 41, to: 42, delta: '+1' },
                { k: { tr: 'Yanıt süresi', en: 'Response time' }, from: 4.2, to: 1.1, suffix: 's', delta: { tr: 'düştü', en: 'down' } },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 9, to: 8, delta: '−1' }
            ]
        },
        hotel: {
            caller: 'Elif Demir',
            place: { tr: 'Aspalo Otel', en: 'Aspalo Hotel' },
            quote: { tr: 'Bu hafta sonu iki gece, deniz manzaralı <mark>oda</mark> arıyorum.', en: 'I need a sea-view <mark>room</mark> for two nights this weekend.' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Rezervasyon', en: 'Reservation' } },
                { k: { tr: 'Tarih', en: 'Dates' }, v: { tr: '22–24 Ağustos', en: '22–24 August' } },
                { k: { tr: 'Oda', en: 'Room' }, v: { tr: 'Deluxe deniz', en: 'Deluxe sea view' } },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Elif Demir' },
                { k: { tr: 'Telefon', en: 'Phone' }, v: '•••• 02 31' }
            ],
            think: [
                { tr: 'Tarih aralığını okuyorum…', en: 'Reading the dates…' },
                { tr: 'Oda stoğuna bakıyorum…', en: 'Checking room inventory…' },
                { tr: 'Fiyatı hesaplıyorum…', en: 'Pricing the stay…' },
                { tr: 'Opsiyonu tutuyorum…', en: 'Holding the room…' }
            ],
            business: [
                { k: { tr: 'Misafir', en: 'Guest' }, v: 'Elif Demir' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Rezervasyon', en: 'Reservation' }, v: { tr: 'Alındı', en: 'Booked' } },
                { k: 'PMS', v: { tr: 'İşlendi', en: 'Written' } },
                { k: { tr: 'E-posta', en: 'Email' }, v: { tr: 'Onay', en: 'Confirm' } }
            ],
            ints: [
                { icon: 'sheets', name: 'Google Calendar' },
                { icon: 'slack', name: 'Slack' },
                { icon: 'teams', name: 'Microsoft Teams' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 86, to: 87, delta: '+1' },
                { k: { tr: 'Rezervasyon', en: 'Reservations' }, from: 19, to: 20, delta: '+1' },
                { k: { tr: 'Doluluk', en: 'Occupancy' }, from: 71, to: 72, suffix: '%', delta: '+1' },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 6, to: 5, delta: '−1' }
            ]
        },
        realestate: {
            caller: 'Mehmet Yılmaz',
            place: { tr: 'Aspalo Emlak', en: 'Aspalo Realty' },
            quote: { tr: 'Kadıköy\'de 3+1, deniz manzaralı bir <mark>daire</mark> var mı?', en: 'Do you have a 3-bed with a sea view in <mark>Kadıköy</mark>?' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Portföy', en: 'Inquiry' } },
                { k: { tr: 'Semt', en: 'Area' }, v: 'Kadıköy' },
                { k: { tr: 'Tip', en: 'Type' }, v: '3+1' },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Mehmet Yılmaz' },
                { k: { tr: 'Gezme', en: 'Viewing' }, v: '11:00' }
            ],
            think: [
                { tr: 'Portföyü tarıyorum…', en: 'Scanning the listings…' },
                { tr: 'Uygun ilanı seçiyorum…', en: 'Matching a property…' },
                { tr: 'Danışman takvimine bakıyorum…', en: 'Checking the agent calendar…' },
                { tr: 'Gezme saatini kilitliyorum…', en: 'Locking the viewing…' }
            ],
            business: [
                { k: { tr: 'Alıcı', en: 'Buyer' }, v: 'Mehmet Yılmaz' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Gezme', en: 'Viewing' }, v: { tr: 'Kilitlendi', en: 'Booked' } },
                { k: 'CRM', v: { tr: 'Lead', en: 'Lead' } },
                { k: 'SMS', v: { tr: 'Adres', en: 'Address' } }
            ],
            ints: [
                { icon: 'hubspot', name: 'HubSpot' },
                { icon: 'sheets', name: 'Google Calendar' },
                { icon: 'teams', name: 'Microsoft Teams' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 53, to: 54, delta: '+1' },
                { k: { tr: 'Gezmeler', en: 'Viewings' }, from: 12, to: 13, delta: '+1' },
                { k: { tr: 'Yeni lead', en: 'New leads' }, from: 7, to: 8, delta: '+1' },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 11, to: 10, delta: '−1' }
            ]
        },
        automotive: {
            caller: 'Can Öztürk',
            place: { tr: 'Aspalo Oto', en: 'Aspalo Auto' },
            quote: { tr: 'Periyodik bakım ve yağ değişimi için <mark>randevu</mark> istiyorum.', en: 'I need an <mark>appointment</mark> for a service and oil change.' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Servis', en: 'Service' } },
                { k: { tr: 'Araç', en: 'Vehicle' }, v: 'Tiguan 2022' },
                { k: { tr: 'Saat', en: 'Time' }, v: '09:30' },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Can Öztürk' },
                { k: { tr: 'Plaka', en: 'Plate' }, v: '34 CNO 122' }
            ],
            think: [
                { tr: 'Servis türünü anlıyorum…', en: 'Reading the job type…' },
                { tr: 'Usta takvimine bakıyorum…', en: 'Checking the workshop…' },
                { tr: 'İkame araç bakıyorum…', en: 'Looking for a courtesy car…' },
                { tr: 'İş emrini açıyorum…', en: 'Opening the work order…' }
            ],
            business: [
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Can Öztürk' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Servis', en: 'Service' }, v: { tr: 'Alındı', en: 'Booked' } },
                { k: 'DMS', v: { tr: 'İş emri', en: 'Work order' } },
                { k: 'SMS', v: { tr: 'Hatırlatma', en: 'Reminder' } }
            ],
            ints: [
                { icon: 'salesforce', name: 'Salesforce' },
                { icon: 'sheets', name: 'Google Calendar' },
                { icon: 'slack', name: 'Slack' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 67, to: 68, delta: '+1' },
                { k: { tr: 'Servis', en: 'Service jobs' }, from: 22, to: 23, delta: '+1' },
                { k: { tr: 'Yanıt süresi', en: 'Response time' }, from: 5.1, to: 1.4, suffix: 's', delta: { tr: 'düştü', en: 'down' } },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 8, to: 7, delta: '−1' }
            ]
        },
        logistics: {
            caller: 'Zeynep Acar',
            place: { tr: 'Aspalo Lojistik', en: 'Aspalo Logistics' },
            quote: { tr: '<mark>TR-448291</mark>. Kargo nerede? Saat 12\'den önce gelebilir mi?', en: '<mark>TR-448291</mark>. Where is the shipment? Can it arrive before 12:00?' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Takip', en: 'Tracking' } },
                { k: { tr: 'Gönderi', en: 'Shipment' }, v: 'TR-448291' },
                { k: { tr: 'Durum', en: 'Status' }, v: 'Gebze' },
                { k: { tr: 'Pencere', en: 'Window' }, v: '10:00–12:00' },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Zeynep Acar' }
            ],
            think: [
                { tr: 'Takip numarasını okuyorum…', en: 'Reading the tracking number…' },
                { tr: 'Sevkiyatı sorguluyorum…', en: 'Querying the shipment…' },
                { tr: 'Teslim penceresini daraltıyorum…', en: 'Narrowing the window…' },
                { tr: 'Sürücüye yazıyorum…', en: 'Noting the driver…' }
            ],
            business: [
                { k: { tr: 'Alıcı', en: 'Recipient' }, v: 'Zeynep Acar' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Takip', en: 'Tracking' }, v: { tr: 'Bulundu', en: 'Found' } },
                { k: 'WMS', v: { tr: 'Güncellendi', en: 'Updated' } },
                { k: 'SMS', v: { tr: 'Link', en: 'Link' } }
            ],
            ints: [
                { icon: 'slack', name: 'Slack' },
                { icon: 'sheets', name: 'Google Sheets' },
                { icon: 'teams', name: 'Microsoft Teams' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 201, to: 202, delta: '+1' },
                { k: { tr: 'Çözülen takip', en: 'Resolved' }, from: 148, to: 149, delta: '+1' },
                { k: { tr: 'Yanıt süresi', en: 'Response time' }, from: 3.8, to: 1.0, suffix: 's', delta: { tr: 'düştü', en: 'down' } },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 14, to: 13, delta: '−1' }
            ]
        },
        restaurant: {
            caller: 'Selin Arı',
            place: { tr: 'Aspalo Mutfak', en: 'Aspalo Kitchen' },
            quote: { tr: 'Bu akşam 20:30, dört kişilik <mark>teras masası</mark> var mı?', en: 'Do you have a <mark>terrace table</mark> for four tonight at 20:30?' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Rezervasyon', en: 'Reservation' } },
                { k: { tr: 'Saat', en: 'Time' }, v: '20:30' },
                { k: { tr: 'Kişi', en: 'Party' }, v: { tr: '4 kişi', en: '4 guests' } },
                { k: { tr: 'Alan', en: 'Area' }, v: { tr: 'Teras', en: 'Terrace' } },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Selin Arı' }
            ],
            think: [
                { tr: 'Masa planına bakıyorum…', en: 'Reading the floor plan…' },
                { tr: 'Teras stoğunu kontrol ediyorum…', en: 'Checking terrace tables…' },
                { tr: 'İsmi kaydediyorum…', en: 'Saving the name…' },
                { tr: 'Onayı hazırlıyorum…', en: 'Preparing confirmation…' }
            ],
            business: [
                { k: { tr: 'Misafir', en: 'Guest' }, v: 'Selin Arı' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Masa', en: 'Table' }, v: { tr: 'Ayrıldı', en: 'Held' } },
                { k: { tr: 'Rezervasyon', en: 'Book' }, v: { tr: 'Yazıldı', en: 'Written' } },
                { k: 'SMS', v: { tr: 'Onay', en: 'Confirm' } }
            ],
            ints: [
                { icon: 'sheets', name: 'Google Calendar' },
                { icon: 'slack', name: 'Slack' },
                { icon: 'hubspot', name: 'HubSpot' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 38, to: 39, delta: '+1' },
                { k: { tr: 'Masalar', en: 'Covers' }, from: 64, to: 68, delta: '+4' },
                { k: { tr: 'No-show riski', en: 'No-show risk' }, from: 12, to: 11, suffix: '%', delta: '−1' },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 5, to: 4, delta: '−1' }
            ]
        },
        support: {
            caller: 'Deniz Koç',
            place: { tr: 'Aspalo Mağaza', en: 'Aspalo Store' },
            quote: { tr: '<mark>7A19</mark> siparişim hâlâ kargoya verilmemiş.', en: 'My order <mark>7A19</mark> still hasn\'t shipped.' },
            tokens: [
                { k: { tr: 'Niyet', en: 'Intent' }, v: { tr: 'Sipariş', en: 'Support' } },
                { k: { tr: 'Sipariş', en: 'Order' }, v: '7A19' },
                { k: { tr: 'Durum', en: 'Status' }, v: { tr: 'Bugün 16:00 kargo', en: 'Ships 16:00' } },
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Deniz Koç' },
                { k: { tr: 'Takip', en: 'Tracking' }, v: 'ASP-7A19-882' }
            ],
            think: [
                { tr: 'Siparişi açıyorum…', en: 'Opening the order…' },
                { tr: 'Stok ve kargoyu kontrol ediyorum…', en: 'Checking stock and shipping…' },
                { tr: 'Teslim gününü hesaplıyorum…', en: 'Estimating delivery…' },
                { tr: 'Takip numarasını yazıyorum…', en: 'Writing the tracking number…' }
            ],
            business: [
                { k: { tr: 'Müşteri', en: 'Customer' }, v: 'Deniz Koç' },
                { k: 'ADA', v: { tr: 'Karşıladı', en: 'Answered' } },
                { k: { tr: 'Sipariş', en: 'Order' }, v: { tr: 'Netleşti', en: 'Resolved' } },
                { k: 'CRM', v: { tr: 'Not', en: 'Noted' } },
                { k: 'SMS', v: { tr: 'Takip', en: 'Tracking' } }
            ],
            ints: [
                { icon: 'hubspot', name: 'HubSpot' },
                { icon: 'salesforce', name: 'Salesforce' },
                { icon: 'slack', name: 'Slack' }
            ],
            dash: [
                { k: { tr: 'Bugünün aramaları', en: 'Today\'s calls' }, from: 176, to: 177, delta: '+1' },
                { k: { tr: 'Çözülen', en: 'Resolved' }, from: 131, to: 132, delta: '+1' },
                { k: { tr: 'Yanıt süresi', en: 'Response time' }, from: 6.4, to: 1.3, suffix: 's', delta: { tr: 'düştü', en: 'down' } },
                { k: { tr: 'Kaçan arama', en: 'Missed calls' }, from: 17, to: 16, delta: '−1' }
            ]
        }
    };

    function initProductStory() {
        var root = document.querySelector('[data-story]');
        if (!root) return null;

        var stage = root.querySelector('[data-call-stage]');
        var phone = root.querySelector('[data-story-phone]');
        var acceptBtn = root.querySelector('[data-story-accept]');
        var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var current = 'healthcare';
        var view = 'business';
        var live = false;
        var acceptTimer = null;
        var sceneTimers = [];
        var played = {};
        var visible = {};

        function data() {
            return STORY[current] || STORY.healthcare;
        }

        function clearSceneTimers() {
            sceneTimers.forEach(function (id) { clearTimeout(id); });
            sceneTimers = [];
        }

        function later(fn, ms) {
            var id = setTimeout(fn, ms);
            sceneTimers.push(id);
            return id;
        }

        function setPhone() {
            var d = data();
            var nameEl = root.querySelector('[data-story-caller]');
            var placeEl = root.querySelector('[data-story-place]');
            var initEl = root.querySelector('[data-story-initial]');
            if (nameEl) nameEl.textContent = d.caller;
            if (placeEl) placeEl.textContent = L(d.place);
            if (initEl) initEl.textContent = d.caller.charAt(0);
        }

        function setChips() {
            root.querySelectorAll('.story-ind').forEach(function (btn) {
                var on = btn.getAttribute('data-industry') === current;
                btn.classList.toggle('is-on', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
        }

        function renderExtract() {
            var d = data();
            var quote = root.querySelector('[data-story-quote]');
            var box = root.querySelector('[data-story-tokens]');
            if (quote) quote.innerHTML = L(d.quote);
            if (!box) return;
            box.textContent = '';
            d.tokens.forEach(function (tok) {
                var el = document.createElement('div');
                el.className = 'story-token';
                el.innerHTML = '<small></small><b></b>';
                el.querySelector('small').textContent = L(tok.k);
                el.querySelector('b').textContent = L(tok.v);
                box.appendChild(el);
            });
        }

        function renderThink() {
            var list = root.querySelector('[data-story-think]');
            if (!list) return;
            list.textContent = '';
            data().think.forEach(function (step, i) {
                var li = document.createElement('li');
                li.innerHTML = '<span class="story-think-num"></span><span></span>';
                li.querySelector('.story-think-num').textContent = String(i + 1).padStart(2, '0');
                li.querySelector('span:last-child').textContent = L(step);
                list.appendChild(li);
            });
        }

        function renderRail() {
            var rail = root.querySelector('[data-story-rail]');
            if (!rail) return;
            rail.textContent = '';
            var nodes = view === 'developer' ? DEV_NODES : data().business;
            nodes.forEach(function (node) {
                var el = document.createElement('div');
                el.className = 'story-node';
                el.innerHTML = '<small></small><b></b>';
                el.querySelector('small').textContent = L(node.k);
                el.querySelector('b').textContent = L(node.v);
                rail.appendChild(el);
            });
        }

        function renderInts() {
            var row = root.querySelector('[data-story-ints]');
            if (!row) return;
            row.textContent = '';
            data().ints.forEach(function (item) {
                var el = document.createElement('div');
                el.className = 'story-int';
                var img = document.createElement('img');
                img.src = ICONS[item.icon] || ICONS.slack;
                img.alt = '';
                var name = document.createElement('span');
                name.textContent = item.name;
                var rec = document.createElement('em');
                rec.textContent = t('story_int_got');
                el.appendChild(img);
                el.appendChild(name);
                el.appendChild(rec);
                row.appendChild(el);
            });
        }

        function renderDash() {
            var grid = root.querySelector('[data-story-dash]');
            if (!grid) return;
            grid.textContent = '';
            data().dash.forEach(function (m) {
                var el = document.createElement('div');
                el.className = 'story-metric';
                el.innerHTML = '<small></small><b data-from data-to></b><i></i>';
                el.querySelector('small').textContent = L(m.k);
                var b = el.querySelector('b');
                b.setAttribute('data-from', m.from);
                b.setAttribute('data-to', m.to);
                if (m.suffix) b.setAttribute('data-suffix', m.suffix);
                b.textContent = formatMetric(m.from, m.suffix);
                el.querySelector('i').textContent = L(m.delta);
                grid.appendChild(el);
            });
        }

        function formatMetric(n, suffix) {
            var s = typeof n === 'number' && String(n).indexOf('.') !== -1 ? n.toFixed(1) : String(n);
            return suffix ? s + suffix : s;
        }

        function playExtract() {
            var tokens = root.querySelectorAll('[data-story-tokens] .story-token');
            if (reduced) {
                tokens.forEach(function (el) { el.classList.add('is-on'); });
                return;
            }
            tokens.forEach(function (el, i) {
                later(function () { el.classList.add('is-on'); }, 160 + i * 220);
            });
        }

        function playThink() {
            var items = root.querySelectorAll('[data-story-think] li');
            if (reduced) {
                items.forEach(function (el) { el.classList.add('is-on', 'is-done'); });
                return;
            }
            items.forEach(function (el, i) {
                later(function () { el.classList.add('is-on'); }, 200 + i * 720);
                later(function () { el.classList.add('is-done'); }, 200 + i * 720 + 560);
            });
        }

        function playFlow() {
            var nodes = root.querySelectorAll('[data-story-rail] .story-node');
            if (reduced) {
                nodes.forEach(function (el) { el.classList.add('is-on'); });
                return;
            }
            nodes.forEach(function (el, i) {
                later(function () { el.classList.add('is-on'); }, 180 + i * 380);
            });
        }

        function playInts() {
            var cards = root.querySelectorAll('[data-story-ints] .story-int');
            if (reduced) {
                cards.forEach(function (el) { el.classList.add('is-on'); });
                return;
            }
            cards.forEach(function (el, i) {
                later(function () { el.classList.add('is-on'); }, 220 + i * 420);
            });
        }

        function playDash() {
            var metrics = root.querySelectorAll('[data-story-dash] .story-metric b');
            metrics.forEach(function (el, i) {
                var from = parseFloat(el.getAttribute('data-from'));
                var to = parseFloat(el.getAttribute('data-to'));
                var suffix = el.getAttribute('data-suffix') || '';
                if (reduced || isNaN(from) || isNaN(to)) {
                    el.textContent = formatMetric(to, suffix);
                    return;
                }
                later(function () { countTo(el, from, to, suffix); }, 200 + i * 140);
            });
        }

        function countTo(el, from, to, suffix) {
            var start = performance.now();
            var dur = 900;
            var dec = String(to).indexOf('.') !== -1 || String(from).indexOf('.') !== -1;
            function frame(now) {
                var p = Math.min(1, (now - start) / dur);
                var eased = 1 - Math.pow(1 - p, 3);
                var val = from + (to - from) * eased;
                el.textContent = formatMetric(dec ? Math.round(val * 10) / 10 : Math.round(val), suffix);
                if (p < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }

        var players = {
            extract: playExtract,
            think: playThink,
            flow: playFlow,
            integrations: playInts,
            dash: playDash
        };

        function playScene(name) {
            if (played[name] || !visible[name]) return;
            played[name] = true;
            if (players[name]) players[name]();
        }

        function resetScenes() {
            clearSceneTimers();
            played = {};
            root.querySelectorAll('.story-token, .story-think-list li, .story-node, .story-int').forEach(function (el) {
                el.classList.remove('is-on', 'is-done');
            });
            renderExtract();
            renderThink();
            renderRail();
            renderInts();
            renderDash();
            Object.keys(visible).forEach(function (name) {
                if (visible[name]) playScene(name);
            });
        }

        function acceptCall() {
            if (live) return;
            live = true;
            if (acceptTimer) clearTimeout(acceptTimer);
            if (window.AspaloHero && typeof window.AspaloHero.unlock === 'function') {
                window.AspaloHero.unlock();
            }
            if (stage) stage.classList.add('is-live');
            if (window.AspaloHero && typeof window.AspaloHero.pickup === 'function') {
                window.AspaloHero.pickup();
            }
            setTimeout(function () {
                if (window.AspaloHero && typeof window.AspaloHero.play === 'function') {
                    window.AspaloHero.play(current);
                }
            }, 180);
        }

        function armPhone() {
            if (acceptTimer) clearTimeout(acceptTimer);
            if (live || reduced) {
                acceptCall();
                return;
            }
            if (window.AspaloHero && typeof window.AspaloHero.ring === 'function') {
                window.AspaloHero.ring();
            }
            document.addEventListener('pointerdown', function onFirst() {
                if (live) return;
                if (window.AspaloHero && typeof window.AspaloHero.unlock === 'function') {
                    window.AspaloHero.unlock();
                }
                if (window.AspaloHero && typeof window.AspaloHero.ring === 'function') {
                    window.AspaloHero.ring();
                }
            }, { capture: true, once: true });
            acceptTimer = setTimeout(acceptCall, 2400);
        }

        function setIndustry(id) {
            if (!STORY[id]) return;
            current = id;
            setChips();
            setPhone();
            if (live && window.AspaloHero && typeof window.AspaloHero.play === 'function') {
                window.AspaloHero.play(current, { pickup: true });
            }
            resetScenes();
        }

        function setView(next) {
            if (view === next) return;
            view = next;
            root.querySelectorAll('.story-view-btn').forEach(function (btn) {
                var on = btn.getAttribute('data-view') === view;
                btn.classList.toggle('is-on', on);
                btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            renderRail();
            played.flow = false;
            if (visible.flow) playScene('flow');
        }

        root.querySelectorAll('.story-ind').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setIndustry(btn.getAttribute('data-industry'));
            });
        });
        root.querySelectorAll('.story-view-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setView(btn.getAttribute('data-view'));
            });
        });
        if (acceptBtn) acceptBtn.addEventListener('click', acceptCall);
        if (phone) phone.addEventListener('click', function (e) {
            if (e.target.closest('[data-story-accept]') || e.currentTarget === phone) acceptCall();
        });

        if (typeof IntersectionObserver === 'function') {
            root.querySelectorAll('[data-scene]').forEach(function (scene) {
                var name = scene.getAttribute('data-scene');
                var io = new IntersectionObserver(function (entries) {
                    var entry = entries[0];
                    visible[name] = !!(entry && entry.isIntersecting);
                    if (visible[name]) playScene(name);
                }, { threshold: 0.32 });
                io.observe(scene);
            });
        }

        setPhone();
        setChips();
        renderExtract();
        renderThink();
        renderRail();
        renderInts();
        renderDash();
        armPhone();

        return {
            refresh: function () {
                setPhone();
                resetScenes();
                if (live && window.AspaloHero && typeof window.AspaloHero.play === 'function') {
                    window.AspaloHero.play(current, { pickup: true });
                }
            },
            setIndustry: setIndustry
        };
    }

    var story = null;
    function boot() {
        story = initProductStory();
        window.AspaloStory = story;
        var prev = window.onAspaloLanguageChange;
        window.onAspaloLanguageChange = function (lang) {
            if (typeof prev === 'function') prev(lang);
            if (story && typeof story.refresh === 'function') story.refresh();
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
