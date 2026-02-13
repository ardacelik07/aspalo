# Aspalo — Genel AI Çağrı Merkezi Landing Page

Sektörden bağımsız, çok sektörlü AI çağrı merkezi ürünü için landing page. Hastane randevusu, otel rezervasyonu, kampanya, perakende vb. tüm sektörler için tek platform.

## Çalıştırma

```bash
cd landing-page-general
python -m http.server 3000
```

Tarayıcıda: http://localhost:3000

## Yapı

- `index.html` — Ana sayfa (Hero, Sektörler, Nasıl Çalışır, Özellikler, Demo formu)
- `styles.css` — Stiller (Plus Jakarta Sans, cyan/teal tema)
- `script.js` — Mobil menü, form submit
- `images/` — Görseller (logo vb. eklenebilir)

## Not

Bu sayfa **genel** (horizontal) ürün içindir. Otomotiv odaklı dikey ürün için `landing-page/` klasörü kullanılır.
