# Kudreto Sales Intelligence

Kudreto için AI destekli stratejik satış içgörüsü, fırsat araştırması ve konumlanma hazırlığı yapan özel iç uygulama.

## Lokal çalıştırma

```bash
npm install
npm run dev
```

`http://127.0.0.1:3000` adresini açın.

## Kontroller

```bash
npm run lint
npm run typecheck
npm run build
```

## MVP kapsamı

- Next.js App Router
- TailwindCSS
- TypeScript
- `lib/intelligence.ts` içinde gerçek şirket referanslarına dayalı yerel içgörü verisi
- Daha sonra OpenAI veya Claude entegrasyonuna hazır analiz mimarisi
- Authentication, CRM akışı, email gönderimi veya otomasyon yok

## AI ve veri entegrasyonu

Anthropic entegrasyonu için `.env.local` dosyasına şunları ekleyin:

```bash
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
ANTHROPIC_MAX_TOKENS=420
ANTHROPIC_TEMPERATURE=0.2
ANTHROPIC_CACHE_TTL_MS=1800000
ANTHROPIC_DAILY_REQUEST_LIMIT=50
APOLLO_API_KEY=...
PDL_API_KEY=...
ADMIN_EMAIL=kudret@kudreto.com
ADMIN_PASSWORD_HASH=...
AUTH_SECRET=...
```

Ekonomik varsayılanlar:

- Haiku modeli kullanılır.
- Yanıt uzunluğu `420` token ile sınırlıdır.
- Aynı analiz isteği 30 dakika yerel cache'ten döner.
- Günlük Anthropic istek limiti varsayılan olarak `50`dir.
- Token kullanımı endpoint cevabında `usage` alanıyla döner.

Admin şifresi için hash üretin:

```bash
npm run auth:hash -- "sececeginiz-sifre"
```

Üretilen değeri `ADMIN_PASSWORD_HASH` olarak Vercel environment variables içine ekleyin. `AUTH_SECRET` için uzun rastgele bir değer kullanın.

Hazır endpoint'ler:

```bash
POST /api/intelligence
POST /api/prospects
```

LinkedIn ve kişi verisi için önerilen yol:

- Apollo People API: hedef şirket içindeki kişi/rol araması için
- Apollo Organization API: şirket doğrulama ve firma bilgisi için
- People Data Labs: kişi ve şirket enrichment, LinkedIn URL doğrulama ve firmografik veri için
- LinkedIn resmi API: kısıtlı erişimli olduğu için doğrudan prospecting/veri zenginleştirme için genellikle pratik değildir
