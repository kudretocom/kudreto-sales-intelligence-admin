import type { WorkspaceCard, WorkspaceConfig, WorkspaceFilters } from "./types";
import { bingSearchUrl, clampScore, googleSearchUrl, linkedinCompanySearchUrl, linkedinPeopleSearchUrl } from "./utils";

const filters = [
  { key: "country", label: "Ülke", options: ["Türkiye", "Birleşik Krallık", "Almanya", "Hollanda", "Birleşik Arap Emirlikleri"] },
  { key: "city", label: "Şehir", options: ["İstanbul", "Ankara", "İzmir", "Londra", "Berlin", "Amsterdam", "Dubai"] },
  { key: "sector", label: "Sektör", options: ["Tümü", "Mobilite", "Fintech", "SaaS", "Operasyonel Platformlar", "AI Ürünleri", "White-label Sistemler"] },
  { key: "companyType", label: "Şirket Tipi", options: ["Tümü", "Scale-up", "Kurumsal girişim", "B2B platform", "Operasyonel ürün", "Finansal altyapı"] },
  { key: "productCategory", label: "Ürün Kategorisi", options: ["Tümü", "EV Şarj", "Cüzdan / Ödeme Altyapısı", "Mikromobilite", "Market / Teslimat", "AI-native Workflow", "White-label Portal", "Arayüz Modernizasyonu"] },
  { key: "opportunityLevel", label: "Fırsat Seviyesi", options: ["Tümü", "Erken Sinyal", "Odaklı", "Yüksek Uyum", "Stratejik"] },
];

const seed: WorkspaceCard[] = [
  kudretoCard({
    id: "wat-mobilite",
    title: "WAT Mobilite",
    meta: "İstanbul, Türkiye · Kurumsal girişim · EV Şarj",
    category: "Mobilite",
    type: "Operasyonel UX Fırsatı",
    score: 96,
    level: "Stratejik",
    companyType: "Kurumsal girişim",
    productCategory: "EV Şarj",
    insights: [
      ["Muhtemel Operasyonel Problem", "Şarj ağı, saha operasyonları, ödeme durumları ve gerçek zamanlı kullanıcı akışları birlikte yönetildiğinde operasyonel görünürlük kritik hale gelir."],
      ["Olası UX / Arayüz Problemi", "Mobil uygulama, istasyon durumu, ödeme güveni ve servis akışları arasında tutarlı bir ürün dili korunmazsa deneyim parçalı hissedebilir."],
      ["Önerilen Yaklaşım Açısı", "Şarj deneyimi, operasyonel sistemler, white-label yapılar ve tasarım sistemi katmanlarını birlikte okuyabilen uzun vadeli ürün partnerliği."],
    ],
    caseStudy: "WAT Mobilite",
    tone: "Sistem odaklı, sakin, mevcut bağlamı anlayan",
    message: "WAT Mobilite gibi fiziksel dünya operasyonlarıyla çalışan ürünlerde tasarım yalnızca ekran değil; saha, ödeme, güven ve gerçek zamanlı karar akışlarının ortak dili oluyor. Bu katmanda daha net ve ölçeklenebilir bir sistem kurgusu üzerine konuşmak isterim.",
  }),
  kudretoCard({
    id: "param",
    title: "Param",
    meta: "İstanbul, Türkiye · Finansal altyapı · Cüzdan / Ödeme Altyapısı",
    category: "Fintech",
    type: "Stratejik Ürün Fırsatı",
    score: 90,
    level: "Yüksek Uyum",
    companyType: "Finansal altyapı",
    productCategory: "Cüzdan / Ödeme Altyapısı",
    insights: [
      ["Muhtemel Operasyonel Problem", "Kart, cüzdan, ödeme, bayi, merchant ve raporlama katmanları büyüdükçe ürün kararları regülasyon ve operasyon arasında sıkışabilir."],
      ["Olası UX / Arayüz Problemi", "Finansal ürünlerde bilgi yoğunluğu, güven hissi ve işlem açıklığı aynı arayüz içinde dengelenmezse kullanıcı destek yükü artar."],
      ["Önerilen Yaklaşım Açısı", "Payify ve Linktera deneyimleri üzerinden ödeme altyapısı, panel deneyimi ve tasarım sistemi birlikte konuşulmalı."],
    ],
    caseStudy: "Payify",
    tone: "Ciddi, güven veren, sade",
    message: "Fintech ürünlerinde tasarımın asıl değeri karmaşık finansal akışları daha anlaşılır ve güvenilir hale getirdiği yerde ortaya çıkıyor. Param tarafında ödeme, cüzdan ve operasyonel panel katmanlarını birlikte okumak değerli olabilir.",
  }),
  kudretoCard({
    id: "linktera",
    title: "Linktera",
    meta: "İstanbul, Türkiye · B2B platform · White-label Portal",
    category: "White-label Sistemler",
    type: "Design System Fırsatı",
    score: 94,
    level: "Stratejik",
    companyType: "B2B platform",
    productCategory: "White-label Portal",
    insights: [
      ["Muhtemel Operasyonel Problem", "Partner ihtiyaçları, izin yapıları, raporlama, treasury ve risk akışları zamanla karmaşık bir ürün ekosistemine dönüşür."],
      ["Olası UX / Arayüz Problemi", "Birden fazla ürün ve panel için yeniden kullanılabilir UX/UI sistemi kurulmazsa tutarlılık ve geliştirme hızı zayıflar."],
      ["Önerilen Yaklaşım Açısı", "Kudreto proje teslim eden bir tasarımcı değil; uzun vadeli, ekip içinde düşünen stratejik ürün partneri olarak konumlanmalı."],
    ],
    caseStudy: "Linktera",
    tone: "Kıdemli, içeriden biri gibi, süreç odaklı",
    message: "White-label finansal sistemlerde ürün değeri çoğu zaman arayüzden önce karar netliğinde ve yeniden kullanılabilir sistem mantığında ortaya çıkıyor. Bu alan Kudreto’nun uzun vadeli ürün partnerliği yaklaşımıyla doğal örtüşüyor.",
  }),
  kudretoCard({
    id: "getir",
    title: "Getir",
    meta: "İstanbul, Türkiye · Operasyonel ürün · Market / Teslimat",
    category: "Operasyonel Platformlar",
    type: "AI Workflow Fırsatı",
    score: 88,
    level: "Stratejik",
    companyType: "Operasyonel ürün",
    productCategory: "Market / Teslimat",
    insights: [
      ["Muhtemel Operasyonel Problem", "Depo, kurye, stok, kampanya, teslimat süresi ve müşteri destek kararları aynı ürün ekosistemi içinde yüksek hızda çalışır."],
      ["Olası UX / Arayüz Problemi", "İç operasyon panellerinde karar netliği, istisna yönetimi ve görünürlük büyük kaldıraç yaratır."],
      ["Önerilen Yaklaşım Açısı", "Görünmeyen operasyonel UX katmanlarını sadeleştiren dış düşünce partneri olarak konumlanmalı."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Yüksek bağlamlı, operasyonu anlayan, sakin",
    message: "Hızlı teslimat ürünlerinde asıl karmaşıklık çoğu zaman müşterinin görmediği operasyon katmanlarında birikiyor. Bu panellerde karar netliği ve istisna yönetimi üzerine daha sade bir sistem dili kurmak ciddi fark yaratabilir.",
  }),
];

export const kudretoWorkspace: WorkspaceConfig = {
  id: "kudreto",
  name: "Kudreto",
  shortName: "Kudreto",
  eyebrow: "Stratejik ürün ve UX istihbaratı",
  description: "B2B danışmanlık, ürün tasarımı, operasyonel UX, arayüz ve AI-native ürün fırsatlarını analiz edin.",
  filters,
  initialFilters: {
    country: "Türkiye",
    city: "İstanbul",
    sector: "Tümü",
    companyType: "Tümü",
    productCategory: "Tümü",
    opportunityLevel: "Tümü",
  },
  opportunityTypes: ["Stratejik Ürün Fırsatı", "Operasyonel UX Fırsatı", "Arayüz / Redesign Fırsatı", "Design System Fırsatı", "AI Workflow Fırsatı"],
  cardFieldLabels: ["Şirket Adı", "Sektör", "Fırsat Skoru", "Fırsat Tipi", "Muhtemel Operasyonel Problem", "Olası UX / Arayüz Problemi", "Önerilen Yaklaşım Açısı", "Önerilen Kudreto Case Study", "İletişim Tonu", "İlk Mesaj Önerisi"],
  analysisPrompt: "Kudreto için ürün karmaşıklığı, UX olgunluğu, arayüz yenileme ihtiyacı, operasyonel workflow ve AI fırsatlarını birlikte değerlendir.",
  sampleCompanies: seed.map((card) => card.title),
  messageToneRules: ["Sakin", "Kurucuya yazıyor gibi", "Stratejik ama satış kokmayan", "Görsel/interface fırsatlarını küçümsemeyen"],
  resultTitle: "Kudreto Fırsatları",
  resultDescription: "Stratejik uyum, operasyonel problem ve case eşleşmesine göre sıralanır.",
  runAnalysis(filters) {
    return seed
      .map((card) => scoreKudretoCard(card, filters))
      .sort((a, b) => b.opportunityScore - a.opportunityScore)
      .slice(0, 5);
  },
};

function kudretoCard(input: {
  id: string;
  title: string;
  meta: string;
  category: string;
  type: string;
  score: number;
  level: string;
  companyType: string;
  productCategory: string;
  insights: Array<[string, string]>;
  caseStudy: string;
  tone: string;
  message: string;
}): WorkspaceCard {
  return {
    id: input.id,
    title: input.title,
    meta: input.meta,
    category: input.category,
    opportunityType: input.type,
    opportunityScore: input.score,
    opportunityLevel: input.level,
    primaryInsights: input.insights.map(([label, value]) => ({ label, value })),
    recommendation: { label: "Önerilen Kudreto Case Study", value: input.caseStudy },
    tone: input.tone,
    message: input.message,
    externalLink: { label: "Şirket LinkedIn", href: linkedinCompanySearchUrl(input.title) },
    researchSections: [
      {
        title: "Arayış Sinyalleri",
        meta: "4 sinyal grubu",
        items: [
          signalItem(input.title, "Product / UX arayışı", "Açık ürün, UX veya product design rolleri; redesign, tasarım sistemi ve ürün netliği ihtiyacına işaret edebilir.", ["LinkedIn Jobs", "Kariyer.net", "Indeed"]),
          signalItem(input.title, "Operasyon / iç sistem arayışı", "Operations, internal tools veya platform rolleri; operasyonel UX ve karar yüzeyi fırsatı olabilir.", ["Google", "Glassdoor", "ATS"]),
          signalItem(input.title, "AI / data workflow arayışı", "AI, data veya automation rolleri; AI-native workflow ve açıklanabilir karar sistemi fırsatı doğurabilir.", ["Google", "LinkedIn Jobs", "Wellfound"]),
          signalItem(input.title, "Kariyer sayfası / ATS izi", "Kendi kariyer sayfası ve ATS izleri hangi ekiplerin büyüdüğünü gösterir.", ["Career Page", "Lever", "Greenhouse"]),
        ],
      },
      {
        title: "Kritik Kişiler",
        meta: "2 kişi tipi",
        items: [
          personItem(input.title, "Ürün / Dijital Deneyim Lideri", "Ürün deneyimi, arayüz kalitesi ve dijital akışların sahibi olabilir."),
          personItem(input.title, "Operasyon / Platform Lideri", "Operasyonel workflow, iç araçlar ve sistem görünürlüğü problemlerini taşıyabilir."),
        ],
      },
    ],
  };
}

function scoreKudretoCard(card: WorkspaceCard, filters: WorkspaceFilters): WorkspaceCard {
  const sectorMatch = filters.sector === "Tümü" ? 0 : card.category === filters.sector ? 12 : -7;
  const categoryMatch = filters.productCategory === "Tümü" ? 0 : card.meta.includes(filters.productCategory) ? 10 : -4;
  const typeMatch = filters.companyType === "Tümü" ? 0 : card.meta.includes(filters.companyType) ? 5 : 0;
  const levelMatch = filters.opportunityLevel === "Tümü" ? 0 : card.opportunityLevel === filters.opportunityLevel ? 3 : 0;

  return { ...card, opportunityScore: clampScore(card.opportunityScore + sectorMatch + categoryMatch + typeMatch + levelMatch) };
}

function signalItem(company: string, title: string, description: string, labels: string[]) {
  return {
    title,
    description,
    links: labels.map((label) => ({ label, href: googleSearchUrl(`"${company}" "${title}" ${label}`) })),
  };
}

function personItem(company: string, title: string, description: string) {
  return {
    title,
    description,
    links: [
      { label: "LinkedIn", href: linkedinPeopleSearchUrl(company, title) },
      { label: "Google", href: googleSearchUrl(`site:linkedin.com/in "${title}" "${company}"`) },
      { label: "Bing", href: bingSearchUrl(`site:linkedin.com/in "${title}" "${company}"`) },
      { label: "Glassdoor", href: googleSearchUrl(`site:glassdoor.com "${company}" "${title}"`) },
    ],
  };
}
