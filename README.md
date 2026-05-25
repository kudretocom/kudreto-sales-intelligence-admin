# Internal Growth OS

Founder-led girişimler için AI destekli fırsat araştırması, konumlanma ve stratejik büyüme istihbaratı yapan özel iç platform.

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
- `workspaces/` altında workspace-specific içgörü motorları
- İlk workspace'ler: Kudreto ve Tarlabil
- Daha sonra OpenAI veya Claude entegrasyonuna hazır analiz mimarisi
- Authentication, CRM akışı, email gönderimi veya otomasyon yok

## Workspace mimarisi

Her workspace kendi config dosyasında tanımlanır:

- `workspaces/kudreto.ts`
- `workspaces/tarlabil.ts`

Workspace config'i şunları içerir:

- name / description
- filters
- opportunityTypes
- cardFieldLabels
- analysisPrompt
- sampleCompanies
- messageToneRules
- runAnalysis

Yeni workspace eklemek için aynı contract ile yeni bir dosya oluşturup `workspaces/index.ts` içine eklemek yeterlidir.

## AI ve veri entegrasyonu

Anthropic entegrasyonu için `.env.local` dosyasına şunları ekleyin:

```bash
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
ANTHROPIC_MAX_TOKENS=420
ANTHROPIC_TEMPERATURE=0.2
ANTHROPIC_CACHE_TTL_MS=1800000
ANTHROPIC_DAILY_REQUEST_LIMIT=50
APOLLO_API_KEY=
PDL_API_KEY=
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

MVP kişi araştırması:

- Ücretsiz LinkedIn kişi arama linkleri
- Google `site:linkedin.com/in` arama linkleri
- Bing `site:linkedin.com/in` arama linkleri
- Glassdoor odaklı Google arama linkleri
- Şirket + rol bazlı genel web sinyali aramaları
- LinkedIn Jobs, Kariyer.net, Indeed, Wellfound, Lever ve Greenhouse arayış sinyalleri
- Apollo ve PDL endpoint iskeletleri korunur, ancak MVP'de zorunlu değildir
