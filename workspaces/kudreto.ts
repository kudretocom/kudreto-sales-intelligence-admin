import type { WorkspaceCard, WorkspaceConfig, WorkspaceFilters } from "./types";
import { bingSearchUrl, clampScore, googleSearchUrl, linkedinCompanySearchUrl, linkedinPeopleSearchUrl } from "./utils";

const filters = [
  { key: "country", label: "Ülke", options: ["Tümü", "Türkiye", "Birleşik Krallık", "Almanya", "Hollanda", "Birleşik Arap Emirlikleri"] },
  { key: "city", label: "Şehir", options: ["Tümü", "İstanbul", "Ankara", "İzmir", "Londra", "Berlin", "Amsterdam", "Dubai"] },
  { key: "sector", label: "Sektör", options: ["Tümü", "Mobilite", "Fintech", "SaaS", "Operasyonel Platformlar", "AI Ürünleri", "White-label Sistemler"] },
  { key: "companyType", label: "Şirket Tipi", options: ["Tümü", "Scale-up", "Kurumsal girişim", "B2B platform", "Operasyonel ürün", "Finansal altyapı"] },
  { key: "productCategory", label: "Ürün Kategorisi", options: ["Tümü", "EV Şarj", "Cüzdan / Ödeme Altyapısı", "Mikromobilite", "Market / Teslimat", "Operasyonel Platform", "AI-native Workflow", "White-label Portal", "Arayüz Modernizasyonu"] },
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
  kudretoCard({
    id: "sektorsoft",
    title: "SektorSoft",
    meta: "Ankara, Türkiye · B2B platform · SaaS",
    category: "SaaS",
    type: "Stratejik Ürün Fırsatı",
    score: 82,
    level: "Odaklı",
    companyType: "B2B platform",
    productCategory: "Arayüz Modernizasyonu",
    insights: [
      ["Muhtemel Operasyonel Problem", "B2B SaaS ürünlerinde onboarding, yetki yapıları, raporlama ve müşteri destek akışları büyüdükçe ürün karmaşıklığı görünür hale gelir."],
      ["Olası UX / Arayüz Problemi", "Arayüz eski kaldığında güçlü ürün değeri yeterince algılanmaz; bilgi mimarisi ve design system ihtiyacı oluşur."],
      ["Önerilen Yaklaşım Açısı", "Kudreto burada hızlı redesign değil, ürün mimarisi ve B2B kullanım kalitesini birlikte iyileştiren stratejik partner olarak konumlanmalı."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Sakin, B2B ürün gerçekliğini anlayan, pratik",
    message: "B2B SaaS ürünlerinde arayüz yenileme çoğu zaman yalnızca görsel bir ihtiyaç değil; onboarding, yetki, raporlama ve destek yükünü azaltan bir ürün netliği meselesi oluyor. Bu katmanı birlikte daha okunabilir hale getirmek değer yaratabilir.",
  }),
  kudretoCard({
    id: "metis-bilisim",
    title: "Metis Bilişim",
    meta: "Ankara, Türkiye · B2B platform · White-label Portal",
    category: "White-label Sistemler",
    type: "Design System Fırsatı",
    score: 85,
    level: "Yüksek Uyum",
    companyType: "B2B platform",
    productCategory: "White-label Portal",
    insights: [
      ["Muhtemel Operasyonel Problem", "Farklı müşteri ve kurum ihtiyaçları white-label ürünlerde konfigürasyon, izin ve rol yönetimini zorlaştırabilir."],
      ["Olası UX / Arayüz Problemi", "Tekrarlayan müşteri varyasyonları tasarım sistemi olmadan yönetildiğinde UI tutarlılığı ve geliştirme hızı düşer."],
      ["Önerilen Yaklaşım Açısı", "Linktera benzeri white-label mimari deneyimi üzerinden sistemleşen arayüz ve ürün yönetimi anlatılmalı."],
    ],
    caseStudy: "Linktera",
    tone: "Yapısal, teknik bağlamı bilen, güven veren",
    message: "White-label ürünlerde büyüme çoğu zaman müşteri sayısıyla değil, varyasyon sayısıyla karmaşıklaşır. Bu noktada tasarım sistemi ve ürün mimarisi birlikte ele alındığında hem geliştirme hızı hem de müşteri deneyimi daha tutarlı hale gelir.",
  }),
  kudretoCard({
    id: "sobuman",
    title: "Sobuman Yazılım",
    meta: "Ankara, Türkiye · B2B platform · White-label Portal",
    category: "White-label Sistemler",
    type: "Design System Fırsatı",
    score: 84,
    level: "Yüksek Uyum",
    companyType: "B2B platform",
    productCategory: "White-label Portal",
    insights: [
      ["Muhtemel Operasyonel Problem", "ERP, MRP, B2B/B2C ve depo yönetimi gibi modüller çoğaldıkça bayi, stok, sipariş ve yetki akışları karmaşıklaşabilir."],
      ["Olası UX / Arayüz Problemi", "Bayi düzeyi e-ticaret ve yönetim panelleri farklı kullanıcı tipleri için aynı anda net, hızlı ve güvenilir olmak zorunda."],
      ["Önerilen Yaklaşım Açısı", "B2B platform mimarisi, modüler arayüz sistemi ve bayi operasyonlarını sadeleştiren ürün partnerliği."],
    ],
    caseStudy: "Linktera",
    tone: "Operasyonel, pratik, platform mantığını bilen",
    message: "B2B/ERP platformlarında asıl zorluk çoğu zaman tek bir ekran değil; bayi, sipariş, stok, yetki ve raporlama akışlarının ortak bir ürün dilinde birleşmesi. Bu katmanı daha ölçeklenebilir ve modern bir arayüz sistemine taşımak değer yaratabilir.",
  }),
  kudretoCard({
    id: "hetabil",
    title: "Hetabil Yazılım",
    meta: "Ankara, Türkiye · B2B platform · White-label Portal",
    category: "White-label Sistemler",
    type: "Stratejik Ürün Fırsatı",
    score: 81,
    level: "Odaklı",
    companyType: "B2B platform",
    productCategory: "White-label Portal",
    insights: [
      ["Muhtemel Operasyonel Problem", "B2B, B2C, C2C ve B2G e-ticaret platformları farklı müşteri segmentleri için ayrı akışlar ve konfigürasyon ihtiyaçları doğurur."],
      ["Olası UX / Arayüz Problemi", "Platform mantığı büyüdükçe müşteri paneli, yönetici paneli ve entegrasyon akışlarında tutarlılık kaybı yaşanabilir."],
      ["Önerilen Yaklaşım Açısı", "White-label ve çok segmentli platform deneyimini tasarım sistemi, bilgi mimarisi ve kullanıcı rolleri üzerinden yeniden okumak."],
    ],
    caseStudy: "Linktera",
    tone: "Yapısal, sakin, teknik olmayan ama derin",
    message: "Çok segmentli e-ticaret platformlarında iyi UX, yalnızca daha modern görünmek değil; farklı kullanıcı tiplerinin aynı sistem içinde kaybolmadan çalışabilmesi demek. Kudreto bu noktada ürün mimarisi ve arayüz sistemi tarafında katkı sağlayabilir.",
  }),
  kudretoCard({
    id: "gelisimpark",
    title: "GelişimPark",
    meta: "Ankara, Türkiye · B2B platform · Operasyonel Platform",
    category: "Operasyonel Platformlar",
    type: "Operasyonel UX Fırsatı",
    score: 87,
    level: "Yüksek Uyum",
    companyType: "B2B platform",
    productCategory: "Operasyonel Platform",
    insights: [
      ["Muhtemel Operasyonel Problem", "Entegre lojistik destek, bakım yönetimi ve tedarik optimizasyonu gibi sistemlerde karar yüzeyleri hızla karmaşıklaşabilir."],
      ["Olası UX / Arayüz Problemi", "Operasyon ekipleri için veri yoğun panellerde öncelik, istisna ve aksiyon hiyerarşisi net değilse karar yükü artar."],
      ["Önerilen Yaklaşım Açısı", "Savunma/lojistik operasyonlarını sade, karar odaklı ürün yüzeylerine dönüştüren operasyonel UX partnerliği."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Ciddi, teknik bağlamı anlayan, karar odaklı",
    message: "Lojistik ve bakım yönetimi sistemlerinde arayüzün asıl değeri, karmaşık veriyi daha fazla göstermek değil; doğru istisnayı ve doğru aksiyonu görünür kılmak. Bu karar yüzeylerini sadeleştirmek Kudreto’nun güçlü katkı verebileceği bir alan.",
  }),
  kudretoCard({
    id: "milsoft",
    title: "MilSOFT",
    meta: "Ankara, Türkiye · B2B platform · Operasyonel Platform",
    category: "Operasyonel Platformlar",
    type: "Operasyonel UX Fırsatı",
    score: 86,
    level: "Yüksek Uyum",
    companyType: "B2B platform",
    productCategory: "Operasyonel Platform",
    insights: [
      ["Muhtemel Operasyonel Problem", "Komuta-kontrol, coğrafi bilgi, mesajlaşma ve görev kritik sistemlerde kullanıcı hatası toleransı düşüktür."],
      ["Olası UX / Arayüz Problemi", "Görev kritik yazılımlarda arayüz yoğunluğu ve durum farkındalığı eksikliği operasyonel karar kalitesini etkileyebilir."],
      ["Önerilen Yaklaşım Açısı", "Görsel estetikten çok görev kritik karar netliği ve sistem kullanılabilirliği üzerinden konumlanmalı."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Kıdemli, hassas, görev kritik sistem gerçekliğine uygun",
    message: "Görev kritik sistemlerde UX konusu klasik kullanıcı kolaylığından daha derin; doğru anda doğru sinyali anlayabilmek ve hataya alan bırakmamakla ilgili. Bu karar yüzeylerini daha okunabilir hale getirmek stratejik bir tasarım alanı olabilir.",
  }),
  kudretoCard({
    id: "endorfyn",
    title: "Endorfyn",
    meta: "Ankara, Türkiye · B2B platform · AI-native Workflow",
    category: "AI Ürünleri",
    type: "AI Workflow Fırsatı",
    score: 83,
    level: "Odaklı",
    companyType: "B2B platform",
    productCategory: "AI-native Workflow",
    insights: [
      ["Muhtemel Operasyonel Problem", "Savunma ve kamu yazılımlarında özel geliştirme, gerçek zamanlı veri ve taktik arayüz ihtiyaçları yüksek bağlam gerektirir."],
      ["Olası UX / Arayüz Problemi", "Mühendislik gücü yüksek ürünlerde kullanıcı rolü, karar akışı ve durum görünürlüğü tasarım borcu olarak birikebilir."],
      ["Önerilen Yaklaşım Açısı", "Mühendislik yoğun ürünlerde karar yüzeyi, arayüz mimarisi ve AI destekli workflow tasarımıyla tamamlayıcı partnerlik."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Teknik bağlama saygılı, araştırmacı, sakin",
    message: "Mühendislik yoğun ürünlerde tasarımın değeri görsel katmandan çok, karmaşık sistemleri insanın karar verebileceği netlikte sunabildiği yerde ortaya çıkıyor. Bu alanda ürün arayüzü ve karar workflow’u birlikte ele alınabilir.",
  }),
  kudretoCard({
    id: "rein-teknoloji",
    title: "Rein Teknoloji",
    meta: "Ankara, Türkiye · Scale-up · SaaS",
    category: "SaaS",
    type: "Stratejik Ürün Fırsatı",
    score: 79,
    level: "Erken Sinyal",
    companyType: "Scale-up",
    productCategory: "Arayüz Modernizasyonu",
    insights: [
      ["Muhtemel Operasyonel Problem", "ERP, SaaS platform ve sektörel çözüm ürünlerinde farklı müşteri ihtiyaçları ürün yüzeylerini hızla çoğaltabilir."],
      ["Olası UX / Arayüz Problemi", "SaaS arayüzleri ürün olgunlaştıkça bilgi mimarisi, navigasyon ve tasarım sistemi tarafında modernizasyon ihtiyacı doğurur."],
      ["Önerilen Yaklaşım Açısı", "Arayüz modernizasyonunu ürün stratejisi ve ölçeklenebilir tasarım sistemi ile birlikte ele almak."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Pratik, sade, ürünleşme odağında",
    message: "SaaS ürünlerinde belli bir olgunluktan sonra arayüz modernizasyonu yalnızca görsel yenileme değil; ürünün nasıl anlaşılacağını, satılacağını ve destekleneceğini etkileyen bir mimari meseleye dönüşüyor.",
  }),
  kudretoCard({
    id: "izmir-ai-labs",
    title: "İzmir AI Labs",
    meta: "İzmir, Türkiye · Scale-up · AI-native Workflow",
    category: "AI Ürünleri",
    type: "AI Workflow Fırsatı",
    score: 80,
    level: "Erken Sinyal",
    companyType: "Scale-up",
    productCategory: "AI-native Workflow",
    insights: [
      ["Muhtemel Operasyonel Problem", "AI workflow ürünlerinde karar önerisi, insan onayı, istisna yönetimi ve güven katmanları netleşmeden ürün ölçeklenemez."],
      ["Olası UX / Arayüz Problemi", "Prompt veya otomasyon arayüzü güçlü olsa bile review, correction ve audit akışları zayıf kalabilir."],
      ["Önerilen Yaklaşım Açısı", "Kudreto AI ürünlerini yalnızca arayüz değil, güvenilir karar sistemi olarak konumlandıran UX partneri olabilir."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Araştırmacı, sakin, AI jargonuna kaçmayan",
    message: "AI ürünlerinde asıl tasarım sorusu genelde modelin ne ürettiği değil; insanın o çıktıyı nasıl gözden geçirdiği, düzelttiği ve operasyona dahil ettiği oluyor. Bu katmanda daha güvenilir bir workflow dili kurmak değerli olabilir.",
  }),
  kudretoCard({
    id: "london-opsgrid",
    title: "OpsGrid",
    meta: "Londra, Birleşik Krallık · B2B platform · AI-native Workflow",
    category: "Operasyonel Platformlar",
    type: "Operasyonel UX Fırsatı",
    score: 83,
    level: "Odaklı",
    companyType: "B2B platform",
    productCategory: "AI-native Workflow",
    insights: [
      ["Muhtemel Operasyonel Problem", "Operasyon ekipleri farklı sistemlerden gelen istisna, görev ve karar sinyallerini tek bir yüzeyde yorumlamak zorunda kalabilir."],
      ["Olası UX / Arayüz Problemi", "Dashboard yoğunluğu karar netliğini azaltır; öncelik, istisna ve aksiyon hiyerarşisi yeniden düşünülmelidir."],
      ["Önerilen Yaklaşım Açısı", "Kudreto, yoğun operasyon panellerini daha karar odaklı ve sakin ürün yüzeylerine dönüştüren partner olarak konumlanmalı."],
    ],
    caseStudy: "Operasyonel UX örnekleri",
    tone: "Analitik, operasyon diliyle konuşan, düşük basınçlı",
    message: "Operasyonel platformlarda değer çoğu zaman daha fazla veri göstermekten değil, hangi sinyalin aksiyona dönüşmesi gerektiğini netleştirmekten geliyor. Bu karar yüzeyini birlikte sadeleştirmek ilginç olabilir.",
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
    city: "Tümü",
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
      .filter((card) => matchesKudretoFilters(card, filters))
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

function matchesKudretoFilters(card: WorkspaceCard, filters: WorkspaceFilters) {
  const rules = [
    filters.country === "Tümü" || card.meta.includes(filters.country),
    filters.city === "Tümü" || card.meta.includes(filters.city),
    filters.sector === "Tümü" || card.category === filters.sector,
    filters.companyType === "Tümü" || card.meta.includes(filters.companyType),
    filters.productCategory === "Tümü" || card.meta.includes(filters.productCategory),
    filters.opportunityLevel === "Tümü" || card.opportunityLevel === filters.opportunityLevel,
  ];

  return rules.every(Boolean);
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
