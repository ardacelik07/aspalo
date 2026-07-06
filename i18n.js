/**
 * Aspalo landing — TR / EN i18n
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'aspalo_lang';

    var T = {
        tr: {
            meta_title: 'Aspalo — Her Sektör İçin AI Çağrı Merkezi',
            meta_desc: 'Gelen ve giden her türlü aramayı 7/24 karşılayan AI çağrı merkezi. Randevu, bilgi, kampanya, müşteri hizmetleri — tek platform.',
            nav_what: 'Ne Sunuyoruz',
            nav_how: 'Nasıl Çalışır',
            nav_features: 'Özellikler',
            nav_plans: 'Planlar',
            nav_demo: 'Demo İste',
            menu_aria: 'Menü',
            hero_badge: 'Sektörünüze önceden uyumlu',
            sectors_aria: 'Sektörler',
            sector_emlak: 'Emlak',
            sector_otomotiv: 'Otomotiv',
            sector_saglik: 'Sağlık',
            sector_lojistik: 'Lojistik',
            sector_eticaret: 'E-Ticaret',
            sector_otel: 'Otel Konaklama',
            hero_title_html: 'Hiçbir Çağrıyı Kaçırmayın, <span class="gradient-text">Tüm Müşteri Görüşmelerini Yapay Zeka ile Yönetin.</span>',
            hero_sub: 'Her çağrıyı anında yanıtlayan, potansiyel müşterileri analiz eden, randevu planlayan ve süreci satışa taşıyan yapay zeka telefon asistanı. 7/24, çok dilli altyapı ile.',
            hero_cta_demo: 'Ücretsiz Demo Başlat',
            hero_cta_listen: 'Canlı Örnek Dinle',
            hero_how_aria: 'Nasıl çalışır',
            hero_how_1: '<strong>AI gelen ve giden aramaları</strong> yanıtlar ve yapar.',
            hero_how_2: '<strong>Görüşmeyi analiz eder</strong>, lead skorlar.',
            hero_how_3: '<strong>Lead ve özet</strong> panelinizde takip edilir.',
            stat_answered: 'yanıtlanan arama',
            stat_cost: 'maliyet azaltımı',
            stat_revenue: 'aylık getiri',
            stat_appointments: 'Daha fazla randevu',
            phone_status: 'Görüşme devam ediyor...',
            phone_speaker_customer: 'Arayan:',
            phone_msg_1: 'Merhaba, size nasıl yardımcı olabilirim?',
            phone_msg_2: 'Randevu almak istiyorum.',
            phone_msg_3: 'Tabii, hangi gün uygun?',
            connecting: 'Bağlantı yapılıyor',
            dash_badge: 'Dashboard',
            dash_title_html: 'Tüm Veriler <span class="gradient-text">Tek Ekranda</span>',
            dash_desc: 'Görüşmeler, randevular ve lead skorlarını anlık takip edin. Şirketinizin bilgilerine göre çalışan, kurumunuza uygun yanıt veren AI asistanınız.',
            dash_menu_calls: 'Görüşmeler',
            dash_menu_appts: 'Randevular',
            dash_features_title: 'Özellikler',
            dash_f1: 'Lead skorlaması',
            dash_f2: 'Görüşme özeti',
            dash_f3: 'Şirketinizin bilgilerine göre çalışır',
            dash_f4: 'Aramadan sonra isteğe bağlı WhatsApp takibi',
            dash_card_calls: 'Toplam Arama',
            dash_card_appts: 'Randevu',
            dash_card_score: 'Ort. Lead Skoru',
            lead_hot: 'Sıcak 12',
            lead_warm: 'Ilımlı 8',
            lead_cold: 'Soğuk 4',
            sectors_badge: 'Sektörel uyum',
            sectors_title: 'Sektörel Uyumluluk Kartları',
            sectors_desc: 'Hangi sektörü seçerseniz (veya üzerine gelirseniz) o sektöre özel kullanım senaryosu görünür.',
            scen_emlak: 'Portföy Bilgisi & Görüşme Randevusu',
            scen_otomotiv: 'Servis Randevusu & Test Sürüşü',
            scen_saglik: 'Hasta Kaydı & Randevu Hatırlatma',
            scen_lojistik: 'Kargo Takibi & Müşteri Hizmetleri',
            scen_eticaret: 'Sipariş Desteği & İade Yönetimi',
            scen_otel: 'Rezervasyon & Misafir Hizmetleri',
            benefit_subtitle: 'Aspalo bu sektörde nasıl fayda sağlar?',
            cmp_badge: 'Karşılaştırma',
            cmp_title_html: 'İnsan mı, <span class="gradient-text">Aspalo mı?</span>',
            cmp_desc: 'Aynı işi yaparken insan operatörle Aspalo arasındaki fark. Daha fazla satış, kaçırılmayan çağrılar, artan gelir.',
            cmp_sales: 'Satış artışı',
            cmp_sales_desc: 'Aspalo kullanan ekiplerde ortalama satış artışı (insan ekibine kıyasla).',
            cmp_missed: 'Kaçırılan çağrı',
            cmp_missed_desc: 'İnsan mesai dışı veya meşgulken çağrı kaçırır; Aspalo 7/24 açar, hiçbir aramayı kaçırmaz.',
            cmp_revenue: 'Artan gelir',
            cmp_revenue_val: '+Gelir',
            cmp_revenue_desc: 'Kaçırılmayan her çağrı potansiyel satış; insana kıyasla daha yüksek dönüşüm ve ek gelir.',
            cmp_table_aria: 'İnsan ve Aspalo karşılaştırması',
            cmp_th_human: 'İnsan operatör',
            cmp_row_missed: 'Kaçırılan çağrı',
            cmp_bad_missed: 'Mesai dışı / meşgulken kaçırır',
            cmp_good_missed: '7/24 açar, kaçırmaz',
            cmp_row_concurrent: 'Eşzamanlı görüşme',
            cmp_bad_one: 'Tek çağrı',
            cmp_good_unlimited: 'Sınırsız paralel çağrı',
            cmp_row_sales: 'Satış & dönüşüm',
            cmp_ok_human: 'İnsan performansına bağlı',
            cmp_good_consistent: 'Tutarlı, şirket bilgisine göre',
            cmp_row_hours: 'Çalışma saatleri',
            cmp_bad_hours: 'Mesai saatleri',
            cmp_good_hours: '7/24 kesintisiz',
            how_badge: 'Nasıl Çalışır?',
            how_title_html: '3 Adımda Kurulum ve <span class="gradient-text">Aspalo 48 Saatte Aktif</span>',
            how_s1_t: 'Altyapı Bağlantısı',
            how_s1_p: 'Mevcut telefon hattınız veya santral altyapınız Aspalo\'ya entegre edilir. Ek donanım gerektirmez, mevcut sistemle çalışır.',
            how_s2_t: 'Kuruma Özel Bilgi ve Senaryo Tanımlama',
            how_s2_p: 'Fiyat listeleri, kampanyalar, hizmet detayları ve konuşma akışları sisteme tanımlanır. Aspalo, işletmenize özel yapılandırılır.',
            how_s3_t: 'CRM ve Süreç Entegrasyonu',
            how_s3_p: 'HubSpot, Salesforce veya mevcut CRM sisteminizle veri senkronizasyonu sağlanır. Tüm görüşmeler kayıt altına alınır ve otomatik olarak işlenir.',
            feat_badge: 'Özellikler',
            feat_title: 'Neden Aspalo?',
            feat_desc: 'Kurumsal ölçek için tasarlanmış çağrı otomasyonu.',
            feat_1_t: 'Tek Platform, Tüm Süreç',
            feat_1_p: 'Randevu, bilgi aktarımı, kampanya duyuruları ve destek görüşmeleri tek altyapı üzerinden yönetilir. Dağınık sistemler yerine merkezi kontrol.',
            feat_2_t: 'Ölçeklenebilir Gelir Artışı',
            feat_2_p: 'Yeni personel maliyeti olmadan çağrı kapasitenizi artırın. Aynı ekip, daha fazla satış fırsatı.',
            feat_3_t: 'Kolay entegrasyon',
            feat_3_p: 'Mevcut telefon altyapınız ve CRM\'inizle uyumlu çalışır.',
            feat_4_t: 'Ölçülebilir Performans',
            feat_4_p: 'Hangi kampanya kaç satış getirdi? Hangi saatlerde daha çok dönüşüm var? Gelirinizi veriyle yönetin.',
            ref_badge: 'Referanslarımız',
            ref_title: 'Bize Güvenen Markalar',
            ref_desc: 'Sağlık, turizm ve kurumsal hizmet sektörlerinden lider işletmeler Aspalo ile çalışıyor.',
            plans_badge: 'Planlar',
            plans_title: 'İşletmenize Uygun AI Çağrı Planı',
            plans_desc: 'Çağrı hacminize göre size en uygun paketi birlikte belirleyelim. Demo randevusu için hemen iletişime geçin.',
            plan_contact: 'Size özel teklif için bizimle görüşün',
            plan_cta: 'Bizimle İletişime Geç',
            plan_popular: 'En Popüler',
            plan_plus: 'Basic\'deki her şey dahil',
            plan_b1: '1.000 dakika dahil', plan_b2: 'Gelen arama AI yanıtı', plan_b3: 'Kayıt & transkript', plan_b4: 'Randevu alma', plan_b5: 'Anlık dashboard analitiği',
            plan_g1: '2.000 dakika dahil', plan_g2: 'Gelen + giden AI aramaları', plan_g3: 'Lead skorlama', plan_g4: 'CRM entegrasyonları', plan_g5: 'WhatsApp takibi', plan_g6: 'Gelişmiş analitik dashboard',
            plan_p1: 'Özel dakika paketleri', plan_p2: 'Çoklu ajan yönlendirme', plan_p3: 'Özel iş akışları', plan_p4: 'API erişimi', plan_p5: 'Özel destek',
            footer_tag: 'Her türlü çağrıyı karşılayan AI.',
            footer_links_title: 'Bağlantılar',
            footer_contact_title: 'İletişim',
            footer_contact_lead: 'Sorularınız ve demo talepleri için bize ulaşın.',
            footer_email_label: 'E-posta',
            footer_phone_label: 'Telefon',
            footer_phone_alt_label: 'Telefon (2)',
            footer_demo: 'Demo İste',
            footer_copy: '© Aspalo. Tüm hakları saklıdır.',
            modal_close: 'Kapat',
            modal_title: 'Aspalo Canlı Demo',
            modal_desc: 'Sesli AI asistanın nasıl arama yanıtladığını, lead skorladığını ve görüşmeyi özetlediğini canlı izleyin.',
            modal_confirm: 'Onay gerekli',
            modal_duration: '30 dakika',
            modal_app: 'Organizatörün varsayılan uygulaması',
            modal_tz: 'Europe/Istanbul',
            cal_pick_date: 'Tarih seçin',
            cal_pick_first: 'Lütfen önce bir tarih seçin',
            form_name: 'Adınız *',
            form_company: 'Şirket ismi',
            form_disclaimer_html: 'Devam ederek <a href="#">Şartlar</a> ve <a href="#">Gizlilik Politikası</a>\'nı kabul etmiş olursunuz.',
            form_back: 'Geri',
            form_confirm: 'Onayla',
            form_sending: 'Gönderiliyor...',
            form_success: '✓ Talebiniz alındı',
            form_err_fields: 'Lütfen ad ve email alanlarını doldurun.',
            form_err_send: 'Gönderilemedi. Lütfen tekrar deneyin veya doğrudan iletişime geçin.',
            form_subject: 'Yeni Demo Talebi: ',
            vapi_idle_title: 'Hemen Konuş',
            vapi_idle_sub: 'Aspalo ile konuş',
            vapi_load_title: 'Bağlanıyor...',
            vapi_load_sub: 'Lütfen bekleyin',
            vapi_active_title: 'Görüşme Aktif',
            vapi_active_sub: 'Kapatmak için tıklayın',
            vapi_mic_err: 'Mikrofon erişimi reddedildi. Lütfen tarayıcıda bu site için mikrofon iznini verin ve tekrar deneyin.',
            weekdays_short: ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'],
            weekdays_full: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
            months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        },
        en: {
            meta_title: 'Aspalo — AI Call Center for Every Industry',
            meta_desc: 'AI call center that handles all inbound and outbound calls 24/7. Appointments, information, campaigns, customer service — one platform.',
            nav_what: 'What We Offer',
            nav_how: 'How It Works',
            nav_features: 'Features',
            nav_plans: 'Plans',
            nav_demo: 'Request Demo',
            menu_aria: 'Menu',
            hero_badge: 'Pre-adapted to your industry',
            sectors_aria: 'Industries',
            sector_emlak: 'Real Estate',
            sector_otomotiv: 'Automotive',
            sector_saglik: 'Healthcare',
            sector_lojistik: 'Logistics',
            sector_eticaret: 'E-Commerce',
            sector_otel: 'Hospitality',
            hero_title_html: 'Never Miss a Call, <span class="gradient-text">Manage Every Customer Conversation with AI.</span>',
            hero_sub: 'An AI phone assistant that answers every call instantly, analyzes prospects, schedules appointments, and moves the process toward a sale. 24/7, multilingual infrastructure.',
            hero_cta_demo: 'Start Free Demo',
            hero_cta_listen: 'Listen to Live Sample',
            hero_how_aria: 'How it works',
            hero_how_1: '<strong>AI answers and makes</strong> inbound and outbound calls.',
            hero_how_2: '<strong>Analyzes conversations</strong> and scores leads.',
            hero_how_3: '<strong>Leads and summaries</strong> tracked in your dashboard.',
            stat_answered: 'calls answered',
            stat_cost: 'cost reduction',
            stat_revenue: 'monthly revenue',
            stat_appointments: 'More appointments',
            phone_status: 'Call in progress...',
            phone_speaker_customer: 'Caller:',
            phone_msg_1: 'Hello, how can I help you?',
            phone_msg_2: "I'd like to make an appointment.",
            phone_msg_3: 'Sure, which day works for you?',
            connecting: 'Connecting',
            dash_badge: 'Dashboard',
            dash_title_html: 'All Data <span class="gradient-text">On One Screen</span>',
            dash_desc: 'Track calls, appointments, and lead scores in real time. Your AI assistant works with your company information and responds appropriately.',
            dash_menu_calls: 'Calls',
            dash_menu_appts: 'Appointments',
            dash_features_title: 'Features',
            dash_f1: 'Lead scoring',
            dash_f2: 'Call summary',
            dash_f3: 'Works with your company data',
            dash_f4: 'Optional WhatsApp follow-up after calls',
            dash_card_calls: 'Total Calls',
            dash_card_appts: 'Appointments',
            dash_card_score: 'Avg. Lead Score',
            lead_hot: 'Hot 12',
            lead_warm: 'Warm 8',
            lead_cold: 'Cold 4',
            sectors_badge: 'Industry fit',
            sectors_title: 'Industry Compatibility Cards',
            sectors_desc: 'Select (or hover over) an industry to see a tailored use case.',
            scen_emlak: 'Portfolio Info & Viewing Appointments',
            scen_otomotiv: 'Service Booking & Test Drive',
            scen_saglik: 'Patient Registration & Reminders',
            scen_lojistik: 'Shipment Tracking & Support',
            scen_eticaret: 'Order Support & Returns',
            scen_otel: 'Reservations & Guest Services',
            benefit_subtitle: 'How does Aspalo help in this industry?',
            cmp_badge: 'Comparison',
            cmp_title_html: 'Human or <span class="gradient-text">Aspalo?</span>',
            cmp_desc: 'The difference between a human operator and Aspalo doing the same job. More sales, no missed calls, growing revenue.',
            cmp_sales: 'Sales increase',
            cmp_sales_desc: 'Average sales increase for teams using Aspalo (vs. human teams).',
            cmp_missed: 'Missed calls',
            cmp_missed_desc: 'Humans miss calls after hours or when busy; Aspalo answers 24/7 and never misses a call.',
            cmp_revenue: 'Revenue growth',
            cmp_revenue_val: '+Revenue',
            cmp_revenue_desc: 'Every answered call is a potential sale; higher conversion and extra revenue vs. humans alone.',
            cmp_table_aria: 'Human vs Aspalo comparison',
            cmp_th_human: 'Human operator',
            cmp_row_missed: 'Missed calls',
            cmp_bad_missed: 'Misses after hours / when busy',
            cmp_good_missed: 'Answers 24/7, never misses',
            cmp_row_concurrent: 'Concurrent calls',
            cmp_bad_one: 'One call at a time',
            cmp_good_unlimited: 'Unlimited parallel calls',
            cmp_row_sales: 'Sales & conversion',
            cmp_ok_human: 'Depends on human performance',
            cmp_good_consistent: 'Consistent, based on company data',
            cmp_row_hours: 'Working hours',
            cmp_bad_hours: 'Business hours only',
            cmp_good_hours: '24/7 non-stop',
            how_badge: 'How It Works?',
            how_title_html: 'Live in <span class="gradient-text">48 Hours with 3 Steps</span>',
            how_s1_t: 'Infrastructure Connection',
            how_s1_p: 'Your existing phone line or PBX is integrated with Aspalo. No extra hardware — works with your current system.',
            how_s2_t: 'Custom Knowledge & Scenarios',
            how_s2_p: 'Price lists, campaigns, service details, and conversation flows are configured. Aspalo is tailored to your business.',
            how_s3_t: 'CRM & Process Integration',
            how_s3_p: 'Sync with HubSpot, Salesforce, or your CRM. All calls are recorded and processed automatically.',
            feat_badge: 'Features',
            feat_title: 'Why Aspalo?',
            feat_desc: 'Call automation built for enterprise scale.',
            feat_1_t: 'One Platform, Full Process',
            feat_1_p: 'Appointments, information, campaigns, and support calls on one infrastructure. Central control instead of scattered tools.',
            feat_2_t: 'Scalable Revenue Growth',
            feat_2_p: 'Increase call capacity without hiring. Same team, more sales opportunities.',
            feat_3_t: 'Easy integration',
            feat_3_p: 'Works with your phone infrastructure and CRM.',
            feat_4_t: 'Measurable Performance',
            feat_4_p: 'Which campaign drove sales? When do conversions peak? Manage revenue with data.',
            ref_badge: 'Our References',
            ref_title: 'Brands That Trust Us',
            ref_desc: 'Leading businesses in healthcare, tourism, and corporate services work with Aspalo.',
            plans_badge: 'Plans',
            plans_title: 'AI Call Plan for Your Business',
            plans_desc: 'Let\'s find the right package for your call volume together. Contact us for a demo appointment.',
            plan_contact: 'Contact us for a custom quote',
            plan_cta: 'Contact Us',
            plan_popular: 'Most Popular',
            plan_plus: 'Everything in Basic included',
            plan_b1: '1,000 minutes included', plan_b2: 'Inbound AI call handling', plan_b3: 'Recording & transcript', plan_b4: 'Appointment booking', plan_b5: 'Real-time dashboard analytics',
            plan_g1: '2,000 minutes included', plan_g2: 'Inbound + outbound AI calls', plan_g3: 'Lead scoring', plan_g4: 'CRM integrations', plan_g5: 'WhatsApp follow-up', plan_g6: 'Advanced analytics dashboard',
            plan_p1: 'Custom minute packages', plan_p2: 'Multi-agent routing', plan_p3: 'Custom workflows', plan_p4: 'API access', plan_p5: 'Dedicated support',
            footer_tag: 'AI that handles every type of call.',
            footer_links_title: 'Links',
            footer_contact_title: 'Contact',
            footer_contact_lead: 'Reach out for questions or to book a demo.',
            footer_email_label: 'Email',
            footer_phone_label: 'Phone',
            footer_phone_alt_label: 'Phone (2)',
            footer_demo: 'Request Demo',
            footer_copy: '© Aspalo. All rights reserved.',
            modal_close: 'Close',
            modal_title: 'Aspalo Live Demo',
            modal_desc: 'See live how the voice AI answers calls, scores leads, and summarizes conversations.',
            modal_confirm: 'Confirmation required',
            modal_duration: '30 minutes',
            modal_app: 'Organizer\'s default app',
            modal_tz: 'Europe/Istanbul',
            cal_pick_date: 'Select a date',
            cal_pick_first: 'Please select a date first',
            form_name: 'Your name *',
            form_company: 'Company name',
            form_disclaimer_html: 'By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.',
            form_back: 'Back',
            form_confirm: 'Confirm',
            form_sending: 'Sending...',
            form_success: '✓ Request received',
            form_err_fields: 'Please fill in name and email.',
            form_err_send: 'Could not send. Please try again or contact us directly.',
            form_subject: 'New Demo Request: ',
            vapi_idle_title: 'Talk Now',
            vapi_idle_sub: 'Talk with Aspalo',
            vapi_load_title: 'Connecting...',
            vapi_load_sub: 'Please wait',
            vapi_active_title: 'Call Active',
            vapi_active_sub: 'Click to end',
            vapi_mic_err: 'Microphone access denied. Please allow microphone for this site and try again.',
            weekdays_short: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            weekdays_full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    };

    var SECTOR_KEYS = {
        'Emlak': 'emlak', 'Otomotiv': 'otomotiv', 'Sağlık': 'saglik',
        'Lojistik': 'lojistik', 'E-Ticaret': 'eticaret', 'Otel Konaklama': 'otel'
    };

    var SECTOR_BENEFITS = {
        tr: {
            Emlak: { icon: '🏠', benefits: ['7/24 emlak bilgisi ve fiyat sunumu', 'Görüşme ve ev gezisi randevusu alma', 'Lead nitelendirme (sıcak / ılık müşteri)', 'Portföy özeti ve kampanya bilgisi', 'Kaçırılan aramaları geri dönüşümle değerlendirme'] },
            Otomotiv: { icon: '🚗', benefits: ['Servis randevusu ve test sürüşü planlama', 'Model, fiyat ve kampanya bilgisi 7/24', 'Müşteri geri arama ve takip', 'Bayi stok ve teslimat süresi bilgisi', 'Satış sonrası hizmet yönlendirme'] },
            Sağlık: { icon: '🏥', benefits: ['Randevu alma ve hatırlatma aramaları', 'Hasta kaydı ve ön bilgi toplama', 'Poliklinik ve doktor bilgisi', 'Acil olmayan sorularda yönlendirme', 'Randevu iptal ve erteletme'] },
            Lojistik: { icon: '📦', benefits: ['Kargo takip bilgisi 7/24', 'Teslimat erteletme ve adres güncelleme', 'Şikayet ve kayıp bildirimi alma', 'Müşteri hizmetleri ön eleme', 'Geri arama talebi kaydı'] },
            'E-Ticaret': { icon: '🛒', benefits: ['Sipariş durumu ve kargo bilgisi', 'İade ve değişim talebi alma', 'Ürün bilgisi ve stok sorgulama', 'Kampanya ve kupon bilgisi', 'Müşteri memnuniyeti ölçümü'] },
            'Otel Konaklama': { icon: '🏨', benefits: ['Oda rezervasyonu ve fiyat bilgisi', 'Check-in / check-out ve hizmet sorguları', 'Erken rezervasyon ve grup talepleri', 'Misafir istekleri ve yönlendirme', '7/24 rezervasyon merkezi desteği'] }
        },
        en: {
            Emlak: { icon: '🏠', benefits: ['24/7 property and pricing information', 'Viewing and tour appointments', 'Lead qualification (hot / warm)', 'Portfolio summary and campaigns', 'Recover missed calls with follow-up'] },
            Otomotiv: { icon: '🚗', benefits: ['Service booking and test drives', 'Model, pricing, and campaigns 24/7', 'Customer callback and follow-up', 'Dealer stock and delivery times', 'After-sales service routing'] },
            Sağlık: { icon: '🏥', benefits: ['Appointment booking and reminders', 'Patient registration and intake', 'Clinic and doctor information', 'Non-urgent triage and routing', 'Cancel and reschedule appointments'] },
            Lojistik: { icon: '📦', benefits: ['24/7 shipment tracking', 'Delivery reschedule and address updates', 'Complaints and lost parcel reports', 'Customer service pre-screening', 'Callback request logging'] },
            'E-Ticaret': { icon: '🛒', benefits: ['Order status and shipping info', 'Returns and exchange requests', 'Product and stock inquiries', 'Campaigns and coupon info', 'Customer satisfaction tracking'] },
            'Otel Konaklama': { icon: '🏨', benefits: ['Room reservations and pricing', 'Check-in/out and service inquiries', 'Early booking and group requests', 'Guest requests and routing', '24/7 reservation center support'] }
        }
    };

    var currentLang = 'tr';

    function t(key) {
        var pack = T[currentLang] || T.tr;
        return pack[key] != null ? pack[key] : (T.tr[key] || key);
    }

    function getLang() { return currentLang; }

    function getSectorBenefits(sectorKey) {
        var pack = SECTOR_BENEFITS[currentLang] || SECTOR_BENEFITS.tr;
        var data = pack[sectorKey];
        if (!data) return null;
        var sk = SECTOR_KEYS[sectorKey];
        return {
            icon: data.icon,
            title: sk ? t('sector_' + sk) : sectorKey,
            subtitle: t('benefit_subtitle'),
            benefits: data.benefits
        };
    }

    function applyLanguage(lang) {
        if (!T[lang]) lang = 'tr';
        currentLang = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

        document.documentElement.lang = lang;
        document.title = t('meta_title');
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', t('meta_desc'));

        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            el.innerHTML = t(el.getAttribute('data-i18n-html'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
        });

        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        if (typeof global.onAspaloLanguageChange === 'function') {
            global.onAspaloLanguageChange(lang);
        }
    }

    function initLanguageSwitcher() {
        var saved = null;
        try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
        applyLanguage(saved === 'en' ? 'en' : 'tr');
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                applyLanguage(btn.getAttribute('data-lang'));
            });
        });
    }

    global.AspaloI18n = {
        t: t, getLang: getLang, applyLanguage: applyLanguage,
        getSectorBenefits: getSectorBenefits,
        getMonths: function () { return t('months'); },
        getWeekdaysShort: function () { return t('weekdays_short'); },
        getWeekdaysFull: function () { return t('weekdays_full'); }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
    } else {
        initLanguageSwitcher();
    }
})(window);
