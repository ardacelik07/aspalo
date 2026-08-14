/**
 * Aspalo — TR / EN i18n
 * "The Ledger" — copy is data-forward and declarative by design.
 */
(function (global) {
    'use strict';

    var STORAGE_KEY = 'aspalo_lang';

    var T = {
        tr: {
            meta_title: 'Aspalo — Kaçırılan Aramaların Maliyetini Hesaplayın',
            meta_desc: 'Aspalo, işletmenizin gelen aramalarını 7/24 karşılayan yapay zeka çağrı asistanıdır. Sektörünüze göre kaçırdığınız aramaların yıllık maliyetini hesaplayın.',

            nav_calc: 'Hesaplayıcı',
            nav_sectors: 'Sektörler',
            nav_mechanism: 'Nasıl Çalışır',
            nav_proof: 'Referanslar',
            nav_pricing: 'Fiyatlandırma',
            nav_faq: 'Sıkça Sorulan Sorular',
            nav_cta: 'Görüşme Ayarla',
            menu_aria: 'Menü',

            hero_eyebrow: 'AI Çağrı Asistanı',
            hero_title_html: 'Cevapsız Kalan Her Arama, <span class="ink-accent">Bir Maliyettir.</span>',
            hero_sub: 'Sektörünüzü seçin, iki değeri ayarlayın. Aşağıdaki rakam, kaçırdığınız aramaların size yıllık gerçek maliyetidir — tahmin değil, hesap.',

            calc_sector_label: 'Sektörünüzü seçin',
            calc_result_label: 'Yıllık kayıp',
            calc_cta: 'Bu rakamı birlikte doğrulayalım',
            calc_disclaimer: 'Türkiye piyasa verilerine dayalı sektör ortalamaları kullanılmıştır. Kendi rakamlarınızla değiştirebilirsiniz.',

            sector_emlak: 'Emlak',
            sector_otomotiv: 'Otomotiv',
            sector_saglik: 'Sağlık',
            sector_lojistik: 'Lojistik',
            sector_eticaret: 'E-Ticaret',
            sector_otel: 'Otel Konaklama',

            sectors_badge: 'Sektörler',
            sectors_title: 'Her Sektörün Kendi Maliyeti Var',
            sectors_desc: 'Kaçan bir arama, emlakta bir komisyonu, sağlıkta bir randevuyu, otelde bir rezervasyonu götürür. Rakamlar sektöre göre değişir, sonuç değişmez.',
            sct_emlak_stat: 'Günde ort. 3–8 kaçan sorgulama',
            sct_emlak_note: 'Emlak müşterisi aynı anda birden fazla ofisi arar — ilk cevap veren kazanır.',
            sct_otomotiv_stat: 'Günde ort. 8–15 kaçan servis talebi',
            sct_otomotiv_note: 'Cevapsız kalan müşteri, dakikalar içinde başka bir bayiyi arar.',
            sct_saglik_stat: 'Günde ort. 15–40 kaçan randevu talebi',
            sct_saglik_note: 'Kaçan her çağrı, doluluk oranını doğrudan düşürür.',
            sct_lojistik_stat: 'Günde ort. 12–35 kaçan takip sorgusu',
            sct_lojistik_note: 'Yanıtsız kalan takip talepleri memnuniyetsizliğe dönüşür.',
            sct_eticaret_stat: 'Günde ort. 18–40 kaçan sipariş sorgusu',
            sct_eticaret_note: 'Hızlı yanıt alamayan müşteri bir sonraki siparişini rakibe verir.',
            sct_otel_stat: 'Günde ort. 10–25 kaçan rezervasyon talebi',
            sct_otel_note: 'Misafir adayı hemen başka bir tesisi arar — anında yanıt rezervasyona döner.',
            sct_calc_link: 'Hesaplayıcıda gör →',

            mech_badge: 'Nasıl Çalışır',
            mech_title: 'Basit Bir Mekanizma',
            mech_desc: 'Yeni bir hat yok, yeni bir donanım yok. Aspalo mevcut telefon altyapınıza bağlanır ve çalışmaya başlar.',
            mech_s1_t: 'Aramayı karşılar',
            mech_s1_p: 'Gelen her arama, mesai içi veya dışı fark etmeksizin ilk çalışta yanıtlanır.',
            mech_s2_t: 'Görüşmeyi yürütür',
            mech_s2_p: 'Soruları yanıtlar, randevu alır, bilgi verir — insan gibi konuşur, senaryoya bağlı kalır.',
            mech_s3_t: 'Kaydeder ve özetler',
            mech_s3_p: 'Her görüşme kayda alınır, yazıya dökülür ve lead olarak skorlanır.',
            mech_s4_t: 'Panelinize düşer',
            mech_s4_p: 'Görüşme, randevu ve lead verisi anlık olarak tek panelde toplanır.',
            mech_img_caption: 'Gerçek panel görünümü — kurgu değil.',

            trust_badge: 'VERİ GÜVENLİĞİ',
            trust_title: 'Verileriniz Türkiye Sınırları İçinde Kalır',
            trust_1_t: 'KVKK ve GDPR uyumlu',
            trust_1_p: 'Görüşme verileri yasal çerçeveye tam uyumlu işlenir.',
            trust_2_t: 'Veriler Türkiye\'de kalır',
            trust_2_p: 'Görüşme kayıtlarınız yurt dışına değil, Türkiye\'deki sunucularda tutulur.',
            trust_3_t: 'CLOUD Act riski yok',
            trust_3_p: 'Rakiplerimizin çoğu ABD altyapısı kullanır, bu risk taşır. Aspalo\'da yok.',

            proof_badge: 'Referanslar',
            proof_title: 'Bize Güvenen Kurumlar',
            proof_desc: 'Sağlık, turizm ve kurumsal hizmet sektörlerinden işletmeler Aspalo ile çalışıyor.',

            pricing_badge: 'Fiyatlandırma',
            pricing_title: 'Üç Paket, Tek Prensip: Size Özel',
            pricing_desc: 'Fiyat, aylık çağrı hacminize ve ihtiyacınıza göre şekillenir. Aşağıdaki tablo neyin dahil olduğunu gösterir — rakamı görüşmede netleştiririz.',
            pricing_col_basic: 'Basic',
            pricing_col_growth: 'Growth',
            pricing_col_pro: 'Pro',
            plan_basic_desc: 'Gelen aramaları karşılamak isteyen işletmeler için',
            plan_growth_desc: 'Aramayı satışa ve takibe çeviren işletmeler için',
            plan_pro_desc: 'Çoklu şube veya kurumsal ihtiyacı olan işletmeler için',
            plan_popular: 'En Popüler',
            plan_contact: 'Özel teklif',
            pricing_row_minutes: 'Dahil dakika paketi',
            pricing_row_inbound: 'Gelen aramaları AI karşılar',
            pricing_row_recording: 'Kayıt ve yazıya dökme',
            pricing_row_appointment: 'Randevu alma ve yönetme',
            pricing_row_dashboard: 'Performans paneli',
            pricing_row_outbound: 'Giden arama (hatırlatma, takip)',
            pricing_row_priority: 'Otomatik önem sıralaması',
            pricing_row_crm: 'CRM entegrasyonu',
            pricing_row_whatsapp: 'WhatsApp otomatik takip',
            pricing_row_multi: 'Çoklu asistan yönlendirme',
            pricing_row_flow: 'Özel senaryo/akış tasarımı',
            pricing_row_api: 'API erişimi',
            pricing_row_support: 'Öncelikli destek hattı',
            val_included: '1.000 dk',
            val_included_growth: '2.000 dk',
            val_included_pro: 'Size özel',
            val_dashboard_basic: 'Anlık',
            val_dashboard_growth: 'Detaylı, kırılımlı',
            pricing_cta: 'Görüş',

            faq_title: 'Aklınıza Takılan Sorular',
            faq_desc: 'Aspalo hakkında en sık sorulan soruları bir araya getirdik. Aradığınızı bulamazsanız bize doğrudan ulaşabilirsiniz.',
            faq_q1: 'Aspalo tam olarak nedir, nasıl çalışır?',
            faq_a1: 'Aspalo, işletmenizin telefon hattına bağlanan bir yapay zeka çağrı asistanıdır. Gelen aramaları karşılar, sorulara yanıt verir, randevu alır ve gerektiğinde giden aramalar yapar — tıpkı eğitilmiş bir çalışan gibi, ancak 7/24 kesintisiz.',
            faq_q2: 'Fiyatlandırma nasıl işliyor? Neden sabit bir fiyat yok?',
            faq_a2: 'Fiyatlandırma, aylık çağrı hacminize ve ihtiyacınız olan özelliklere göre şekillenir. Bu yüzden internet sitesinde tek bir rakam yerine, işletmenizle birebir görüşüp size en uygun paketi birlikte belirliyoruz. Görüşmede size özel bir teklif alırsınız.',
            faq_q3: 'Kurulum ne kadar sürer, mevcut telefon hattımı değiştirmem gerekiyor mu?',
            faq_a3: 'Hayır. Aspalo mevcut telefon altyapınızla entegre çalışır, yeni hat veya donanım gerekmez. Kurulum süreci ortalama 48 saat içinde tamamlanır.',
            faq_q4: 'Verilerimiz ve müşteri görüşmelerimiz güvende mi?',
            faq_a4: 'Evet. Tüm görüşmeler şifrelenerek işlenir ve saklanır, erişim yetkilendirme ile sınırlıdır. Detaylar için "Veri Güvenliği" bölümüne bakabilirsiniz.',
            faq_q5: 'Aspalo mevcut CRM ve araçlarımızla çalışır mı?',
            faq_a5: 'Evet. HubSpot, Salesforce, Google Sheets, Slack ve Microsoft Teams gibi sık kullanılan araçlarla doğrudan entegre olur; görüşme kayıtları ve lead bilgileri otomatik olarak sisteminize aktarılır.',
            faq_q6: 'Aspalo her aramayı tek başına mı yönetiyor, insan devreye girmesi gerekiyor mu?',
            faq_a6: 'Aspalo çoğu standart görüşmeyi (bilgi verme, randevu alma, sık sorulan sorular) uçtan uca kendisi yönetir. Karmaşık veya özel bir durumla karşılaştığında, isterseniz görüşmeyi ilgili ekibinize yönlendirecek şekilde yapılandırılabilir.',
            faq_q7: 'Türkçe aksanları ve farklı konuşma tarzlarını anlıyor mu?',
            faq_a7: 'Evet, Aspalo Türkçe üzerine özel olarak yapılandırılmıştır ve farklı ağız/aksan varyasyonlarını anlayacak şekilde çalışır.',
            faq_q8: 'Görüşmeyi nasıl ayarlayabilirim, bir taahhüt altına giriyor muyum?',
            faq_a8: '"Görüşme Ayarla" butonuna tıklayıp size uygun bir zaman seçmeniz yeterli. Görüşme herhangi bir taahhüt gerektirmez; Aspalo\'nun işletmeniz için nasıl çalışacağını birlikte inceleriz.',

            final_cta_badge: 'Sırada Ne Var',
            final_cta_title: 'Rakamı Gördünüz. Şimdi Konuşalım.',
            final_cta_sub: '30 dakikalık bir görüşmede, hesaplayıcıdaki rakamı kendi verilerinizle doğrularız ve Aspalo\'nun hattınıza nasıl bağlanacağını netleştiririz.',
            final_cta_btn: 'Görüşme Ayarla',

            footer_email_label: 'E-posta',
            footer_phone_label: 'Telefon',
            footer_phone_alt_label: 'Telefon (2)',
            footer_phone_alt2_label: 'Telefon (3)',
            footer_copy: 'Tüm hakları saklıdır.',

            modal_close: 'Kapat',
            modal_title: 'Sayılarınızı Birlikte İnceleyelim',
            modal_desc: 'Kaç arama kaçıyor, gerçek maliyeti ne, hattınıza nasıl bağlanır — 30 dakikada netleştirelim.',
            modal_confirm: 'Onay gerekli',
            modal_duration: '30 dakika',
            modal_app: 'Organizatörün varsayılan uygulaması',
            modal_tz: 'Europe/Istanbul',
            cal_pick_date: 'Tarih seçin',
            cal_pick_first: 'Lütfen önce bir tarih seçin',
            form_name: 'Adınız *',
            form_company: 'Şirket ismi',
            form_phone: 'Telefon numarası',
            form_disclaimer_html: 'Devam ederek <a href="#">Şartlar</a> ve <a href="#">Gizlilik Politikası</a>\'nı kabul etmiş olursunuz.',
            form_back: 'Geri',
            form_confirm: 'Onayla',
            form_sending: 'Gönderiliyor...',
            form_success: '✓ Talebiniz alındı',
            form_err_fields: 'Lütfen ad ve email alanlarını doldurun.',
            form_err_send: 'Gönderilemedi. Lütfen tekrar deneyin veya doğrudan iletişime geçin.',
            form_subject: 'Yeni Görüşme Talebi: ',

            vapi_idle_title: 'Hemen Konuş',
            vapi_idle_sub: 'Aspalo ile konuş',
            vapi_load_title: 'Bağlanıyor...',
            vapi_load_sub: 'Lütfen bekleyin',
            vapi_active_title: 'Görüşme Aktif',
            vapi_active_sub: 'Kapatmak için tıklayın',
            vapi_mic_err: 'Mikrofon erişimi reddedildi. Lütfen tarayıcıda bu site için mikrofon iznini verin ve tekrar deneyin.',

            live_demo_btn: 'Canlı dinleyin',
            live_demo_eyebrow: 'Canlı Yapay Zeka Demosu',
            live_demo_title: 'Aspalo\'nun bir aramayı nasıl karşıladığını dinleyin',
            live_demo_desc: 'Mikrofonunuza izin verin, "Aramayı başlat" butonuna basın — Aspalo\'nun AI asistanı gerçek bir müşteri gibi sizinle konuşacak.',
            live_demo_start: 'Aramayı başlat',
            live_demo_mic_note: 'Bu bir simülasyondur; gerçek bir görüşme kaydedilmez.',
            live_demo_connecting: 'Bağlanıyor...',
            live_demo_live: 'Canlı Görüşme',
            live_demo_end: 'Görüşmeyi bitir',
            live_demo_captured_title: 'Yakalanan bilgi',
            live_demo_captured_name: 'İsim',
            live_demo_captured_sector: 'Sektör',
            live_demo_ended_eyebrow: 'Demo tamamlandı',
            live_demo_ended_title: 'Aynısı, gerçek hattınızda da olabilir',
            live_demo_ended_desc: 'Az önce duyduğunuz deneyimi işletmenize özel kurmamız için birlikte 30 dakikalık bir görüşme ayarlayalım.',
            live_demo_ended_cta: 'Görüşme Ayarla',
            live_demo_restart: 'Tekrar dinle',

            weekdays_short: ['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'],
            weekdays_full: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
            months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
        },
        en: {
            meta_title: 'Aspalo — Calculate the Cost of Your Missed Calls',
            meta_desc: 'Aspalo is an AI call assistant that answers your business calls 24/7. Calculate the yearly cost of the calls you\'re missing, by sector.',

            nav_calc: 'Calculator',
            nav_sectors: 'Sectors',
            nav_mechanism: 'How It Works',
            nav_proof: 'References',
            nav_pricing: 'Pricing',
            nav_faq: 'FAQ',
            nav_cta: 'Schedule a Call',
            menu_aria: 'Menu',

            hero_eyebrow: 'AI Call Assistant',
            hero_title_html: 'Every Missed Call <span class="ink-accent">Has a Cost.</span>',
            hero_sub: 'Pick your sector, adjust two values. The number below is the real yearly cost of the calls you\'re missing — not a guess, a calculation.',

            calc_sector_label: 'Choose your sector',
            calc_result_label: 'Annual loss',
            calc_cta: 'Let\'s verify this number together',
            calc_disclaimer: 'Based on Turkish market sector averages. You can replace them with your own numbers.',

            sector_emlak: 'Real Estate',
            sector_otomotiv: 'Automotive',
            sector_saglik: 'Healthcare',
            sector_lojistik: 'Logistics',
            sector_eticaret: 'E-Commerce',
            sector_otel: 'Hospitality',

            sectors_badge: 'Sectors',
            sectors_title: 'Every Sector Has Its Own Cost',
            sectors_desc: 'A missed call costs a commission in real estate, an appointment in healthcare, a booking in hospitality. The numbers change; the outcome doesn\'t.',
            sct_emlak_stat: 'Avg. 3–8 missed inquiries / day',
            sct_emlak_note: 'Real estate buyers call multiple agencies at once — first to answer wins.',
            sct_otomotiv_stat: 'Avg. 8–15 missed service requests / day',
            sct_otomotiv_note: 'A missed customer calls another dealer within minutes.',
            sct_saglik_stat: 'Avg. 15–40 missed appointment requests / day',
            sct_saglik_note: 'Every missed call directly lowers your occupancy rate.',
            sct_lojistik_stat: 'Avg. 12–35 missed tracking inquiries / day',
            sct_lojistik_note: 'Unanswered follow-up requests turn into dissatisfaction.',
            sct_eticaret_stat: 'Avg. 18–40 missed order inquiries / day',
            sct_eticaret_note: 'A customer who can\'t get a fast answer gives their next order to a competitor.',
            sct_otel_stat: 'Avg. 10–25 missed booking requests / day',
            sct_otel_note: 'The prospective guest calls another property immediately — a fast answer becomes a booking.',
            sct_calc_link: 'See in calculator →',

            mech_badge: 'How It Works',
            mech_title: 'A Simple Mechanism',
            mech_desc: 'No new line, no new hardware. Aspalo connects to your existing phone infrastructure and starts working.',
            mech_s1_t: 'Answers the call',
            mech_s1_p: 'Every inbound call is answered on the first ring, in or outside business hours.',
            mech_s2_t: 'Runs the conversation',
            mech_s2_p: 'Answers questions, books appointments, gives information — sounds human, stays on script.',
            mech_s3_t: 'Records and summarizes',
            mech_s3_p: 'Every call is recorded, transcribed, and scored as a lead.',
            mech_s4_t: 'Lands in your dashboard',
            mech_s4_p: 'Call, appointment, and lead data is collected in one panel, in real time.',
            mech_img_caption: 'Real dashboard view — not a mockup.',

            trust_badge: 'DATA SECURITY',
            trust_title: 'Your Data Stays Within Turkey\'s Borders',
            trust_1_t: 'KVKK & GDPR compliant',
            trust_1_p: 'Call data is processed in full compliance with the legal framework.',
            trust_2_t: 'Your data stays in Turkey',
            trust_2_p: 'Call recordings are stored on servers in Turkey, not abroad.',
            trust_3_t: 'No CLOUD Act risk',
            trust_3_p: 'Most competitors run on US infrastructure, which carries this risk. Aspalo doesn\'t.',

            proof_badge: 'References',
            proof_title: 'Organizations That Trust Us',
            proof_desc: 'Businesses across healthcare, tourism, and corporate services work with Aspalo.',

            pricing_badge: 'Pricing',
            pricing_title: 'Three Plans, One Principle: Custom to You',
            pricing_desc: 'Price is shaped by your monthly call volume and needs. The table below shows what\'s included — we settle the number on a call.',
            pricing_col_basic: 'Basic',
            pricing_col_growth: 'Growth',
            pricing_col_pro: 'Pro',
            plan_basic_desc: 'For businesses that want to handle inbound calls',
            plan_growth_desc: 'For businesses turning calls into sales and follow-up',
            plan_pro_desc: 'For multi-branch or enterprise needs',
            plan_popular: 'Most Popular',
            plan_contact: 'Custom quote',
            pricing_row_minutes: 'Minutes included',
            pricing_row_inbound: 'AI answers inbound calls',
            pricing_row_recording: 'Recording & transcription',
            pricing_row_appointment: 'Appointment booking & management',
            pricing_row_dashboard: 'Performance dashboard',
            pricing_row_outbound: 'Outbound calls (reminders, follow-up)',
            pricing_row_priority: 'Automatic call prioritization',
            pricing_row_crm: 'CRM integration',
            pricing_row_whatsapp: 'Automatic WhatsApp follow-up',
            pricing_row_multi: 'Multi-assistant routing',
            pricing_row_flow: 'Custom flow/scenario design',
            pricing_row_api: 'API access',
            pricing_row_support: 'Priority support line',
            val_included: '1,000 min',
            val_included_growth: '2,000 min',
            val_included_pro: 'Custom',
            val_dashboard_basic: 'Real-time',
            val_dashboard_growth: 'Detailed, segmented',
            pricing_cta: 'Talk to us',

            faq_title: 'Questions You Might Have',
            faq_desc: "We've gathered the most common questions about Aspalo. Can't find what you're looking for? Reach out to us directly.",
            faq_q1: 'What exactly is Aspalo and how does it work?',
            faq_a1: "Aspalo is an AI call assistant that connects to your business's phone line. It answers inbound calls, responds to questions, books appointments, and makes outbound calls when needed — just like a trained employee, but available around the clock.",
            faq_q2: "How does pricing work? Why isn't there a fixed price?",
            faq_a2: "Pricing depends on your monthly call volume and the features you need. That's why instead of listing a single number, we talk with your business directly to find the right package together. You'll get a tailored quote on the call.",
            faq_q3: 'How long does setup take — do I need to change my current phone line?',
            faq_a3: 'No. Aspalo integrates with your existing phone infrastructure — no new line or hardware required. Setup typically takes 48 hours.',
            faq_q4: 'Is our data and customer call information secure?',
            faq_a4: 'Yes. All calls are encrypted in processing and storage, and access is permission-based. See the "Data Security" section for details.',
            faq_q5: 'Does Aspalo work with our existing CRM and tools?',
            faq_a5: 'Yes. It integrates directly with commonly used tools like HubSpot, Salesforce, Google Sheets, Slack, and Microsoft Teams — call recordings and lead information are automatically synced to your systems.',
            faq_q6: 'Does Aspalo handle every call on its own, or does a human need to step in?',
            faq_a6: 'Aspalo handles most standard calls (information requests, appointment booking, FAQs) start to finish on its own. When it encounters a complex or unusual situation, it can be configured to hand the call off to your team.',
            faq_q7: 'Does it understand Turkish accents and different speaking styles?',
            faq_a7: 'Yes, Aspalo is built specifically for Turkish and is designed to understand a range of accents and speech patterns.',
            faq_q8: 'How do I schedule a call, and am I committing to anything?',
            faq_a8: 'Just click "Schedule a Call" and pick a time that works for you. It comes with no commitment — we\'ll walk through how Aspalo would work for your business together.',

            final_cta_badge: "What's Next",
            final_cta_title: "You've Seen the Number. Let's Talk.",
            final_cta_sub: 'In a 30-minute call, we verify the calculator\'s number against your own data and map out how Aspalo connects to your line.',
            final_cta_btn: 'Schedule a Call',

            footer_email_label: 'Email',
            footer_phone_label: 'Phone',
            footer_phone_alt_label: 'Phone (2)',
            footer_phone_alt2_label: 'Phone (3)',
            footer_copy: 'All rights reserved.',

            modal_close: 'Close',
            modal_title: "Let's Look at Your Numbers",
            modal_desc: 'How many calls are you missing, what\'s the real cost, how does it connect to your line — let\'s map it out in 30 minutes.',
            modal_confirm: 'Confirmation required',
            modal_duration: '30 minutes',
            modal_app: "Organizer's default app",
            modal_tz: 'Europe/Istanbul',
            cal_pick_date: 'Pick a date',
            cal_pick_first: 'Please pick a date first',
            form_name: 'Your name *',
            form_company: 'Company name',
            form_phone: 'Phone number',
            form_disclaimer_html: 'By continuing you agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.',
            form_back: 'Back',
            form_confirm: 'Confirm',
            form_sending: 'Sending...',
            form_success: '✓ Request received',
            form_err_fields: 'Please fill in name and email.',
            form_err_send: 'Could not send. Please try again or contact us directly.',
            form_subject: 'New Call Request: ',

            vapi_idle_title: 'Talk Now',
            vapi_idle_sub: 'Talk with Aspalo',
            vapi_load_title: 'Connecting...',
            vapi_load_sub: 'Please wait',
            vapi_active_title: 'Call Active',
            vapi_active_sub: 'Click to end',
            vapi_mic_err: 'Microphone access denied. Please allow microphone for this site and try again.',

            live_demo_btn: 'Hear it live',
            live_demo_eyebrow: 'Live AI Demo',
            live_demo_title: 'Hear how Aspalo answers a call',
            live_demo_desc: 'Allow microphone access, press "Start the call" — Aspalo\'s AI assistant will talk with you like a real customer would.',
            live_demo_start: 'Start the call',
            live_demo_mic_note: 'This is a simulation; no real conversation is recorded.',
            live_demo_connecting: 'Connecting...',
            live_demo_live: 'Live Call',
            live_demo_end: 'End call',
            live_demo_captured_title: 'Captured info',
            live_demo_captured_name: 'Name',
            live_demo_captured_sector: 'Sector',
            live_demo_ended_eyebrow: 'Demo complete',
            live_demo_ended_title: 'The same can run on your real line',
            live_demo_ended_desc: 'Let\'s set up a 30-minute call to build the experience you just heard, tailored to your business.',
            live_demo_ended_cta: 'Book a call',
            live_demo_restart: 'Hear it again',

            weekdays_short: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            weekdays_full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }
    };

    var currentLang = 'tr';

    function t(key) {
        var pack = T[currentLang] || T.tr;
        return pack[key] != null ? pack[key] : (T.tr[key] || key);
    }

    function getLang() { return currentLang; }

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
