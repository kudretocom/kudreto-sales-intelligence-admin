import type { WorkspaceCard, WorkspaceConfig, WorkspaceFilters } from "./types";
import { clampScore, googleSearchUrl, linkedinCompanySearchUrl } from "./utils";

const filters = [
  { key: "province", label: "İl", options: ["Tümü", "İzmir", "Aydın", "Muğla", "Antalya", "Mersin", "Bursa", "Balıkesir", "Konya"] },
  { key: "district", label: "İlçe", options: ["Tümü", "Tire", "Ödemiş", "Nazilli", "Milas", "Finike", "Silifke", "Karacabey", "Akşehir"] },
  { key: "crop", label: "Ürün / Mahsul", options: ["Tümü", "Zeytin", "İncir", "Domates", "Süt Ürünleri", "Kurutulmuş Gıda", "Narenciye", "Sebze / Meyve", "Tarımsal Hizmetler"] },
  { key: "companyType", label: "Firma Tipi", options: ["Tümü", "Gıda üreticisi", "Perakende / Market", "İhracatçı", "HoReCa tedarikçisi", "Kooperatif", "Tarımsal hizmet"] },
  { key: "supplyRisk", label: "Tedarik Riski", options: ["Tümü", "Düşük", "Orta", "Yüksek", "Kritik"] },
  { key: "opportunityLevel", label: "Fırsat Seviyesi", options: ["Tümü", "Erken Sinyal", "Odaklı", "Yüksek Uyum", "Stratejik"] },
];

const seed: WorkspaceCard[] = [
  tarlabilCard({
    id: "ege-gida",
    title: "Ege Gıda İhracat",
    region: "Aydın / Nazilli",
    crop: "İncir",
    companyType: "İhracatçı",
    risk: "Yüksek",
    type: "Tedarik Riski Fırsatı",
    score: 91,
    level: "Stratejik",
    insights: [
      ["Muhtemel Tedarik Problemi", "İncirde kalite standardı, sezonluk arz ve üretici güvenilirliği ihracat sözleşmelerinde risk yaratabilir."],
      ["Bölgesel Risk / Fırsat", "Nazilli ve çevresinde güçlü üretim potansiyeli var; ancak üretici ağı görünürlüğü ve parti bazlı kalite takibi kritik."],
      ["Önerilen Yaklaşım Açısı", "Tarlabil, bölgesel üretici ağı ve tedarik riskini görünür kılan karar destek katmanı olarak konumlanmalı."],
    ],
    value: "Doğru üretici eşleşmesi, sezonluk arz görünürlüğü ve kalite riskini önceden okuma.",
    tone: "Güven veren, ticari, bölgeyi bilen",
    message: "İncir tedarikinde asıl mesele yalnızca ürün bulmak değil; kalite, zamanlama ve üretici güvenilirliğini birlikte yönetebilmek. Tarlabil bu noktada bölgesel üretim bilgisini daha karar verilebilir bir tedarik akışına çevirebilir.",
  }),
  tarlabilCard({
    id: "akdeniz-fresh",
    title: "Akdeniz Fresh",
    region: "Antalya / Finike",
    crop: "Narenciye",
    companyType: "Gıda üreticisi",
    risk: "Orta",
    type: "Bölgesel Üretim Fırsatı",
    score: 86,
    level: "Yüksek Uyum",
    insights: [
      ["Muhtemel Tedarik Problemi", "Narenciye tarafında hasat zamanı, kalite sınıfları ve lojistik planlama alıcı tarafında belirsizlik yaratabilir."],
      ["Bölgesel Risk / Fırsat", "Finike çevresi marka ve ürün kalitesi açısından güçlü; doğru üretici segmentasyonu değer yaratır."],
      ["Önerilen Yaklaşım Açısı", "Bölge bazlı ürün bulunurluğu ve üretici ağı eşleşmesi üzerinden tedarik güveni önerilmeli."],
    ],
    value: "Ürün, bölge ve üretici bilgisini ticari satın alma kararına bağlayan sourcing intelligence.",
    tone: "Pratik, saha gerçekliğine yakın, sakin",
    message: "Narenciye tedarikinde doğru bölgeyi bilmek tek başına yetmiyor; üretici kapasitesi, kalite sınıfı ve zamanlama birlikte okunmalı. Tarlabil bu görünürlüğü daha kontrollü bir satın alma kararına çevirebilir.",
  }),
  tarlabilCard({
    id: "marmara-retail",
    title: "Marmara Market Grubu",
    region: "Bursa / Karacabey",
    crop: "Sebze / Meyve",
    companyType: "Perakende / Market",
    risk: "Kritik",
    type: "Alıcı Firma Fırsatı",
    score: 93,
    level: "Stratejik",
    insights: [
      ["Muhtemel Tedarik Problemi", "Perakende tarafında düzenli hacim, fiyat dalgalanması, fire ve sevkiyat sürekliliği ana riskleri oluşturur."],
      ["Bölgesel Risk / Fırsat", "Karacabey sebze üretimi açısından güçlü; perakende için planlı üretici ağı ve arz güvenliği fırsatı var."],
      ["Önerilen Yaklaşım Açısı", "Tarlabil, satın alma ekiplerine bölge bazlı alternatif tedarik havuzu ve risk erken uyarısı sunmalı."],
    ],
    value: "Tedarik belirsizliğini azaltan bölgesel üretici ağı ve alıcı odaklı karar destek.",
    tone: "Operasyonel, net, satın alma diline yakın",
    message: "Market tedarikinde kritik konu çoğu zaman tek bir üretici değil; devamlılık, fire ve alternatif kaynak görünürlüğü oluyor. Tarlabil burada satın alma ekiplerine bölgesel ve daha öngörülebilir bir tedarik katmanı sağlayabilir.",
  }),
  tarlabilCard({
    id: "tire-sut",
    title: "Tire Süt Kooperatifi",
    region: "İzmir / Tire",
    crop: "Süt Ürünleri",
    companyType: "Kooperatif",
    risk: "Orta",
    type: "Kooperatif / Üretici Ağı Fırsatı",
    score: 84,
    level: "Odaklı",
    insights: [
      ["Muhtemel Tedarik Problemi", "Süt ürünlerinde kalite sürekliliği, soğuk zincir ve üretici kapasitesi düzenli alıcı ilişkisi için belirleyicidir."],
      ["Bölgesel Risk / Fırsat", "Tire çevresinde güçlü üretici ağı var; veriyle görünürlük sağlandığında yeni alıcı eşleşmeleri oluşabilir."],
      ["Önerilen Yaklaşım Açısı", "Kooperatifin üretici ağı kapasitesini alıcı firmalara daha şeffaf ve güvenilir göstermek."],
    ],
    value: "Üretici ağı gücünü veriyle alıcı firmalara anlatan tedarik ve eşleşme katmanı.",
    tone: "Güvenilir, yerel, ilişki odaklı",
    message: "Kooperatiflerin güçlü tarafı üretici ağı; zor tarafı ise bu kapasiteyi alıcı firmaya düzenli, ölçülebilir ve güven veren şekilde göstermek. Tarlabil bu ağı daha görünür bir ticari avantaja çevirebilir.",
  }),
];

export const tarlabilWorkspace: WorkspaceConfig = {
  id: "tarlabil",
  name: "Tarlabil",
  shortName: "Tarlabil",
  eyebrow: "Tarım, tedarik ve bölgesel fırsat istihbaratı",
  description: "B2B müşteri adaylarını, bölgesel tarımsal fırsatları ve tedarik odaklı satış açılarını analiz edin.",
  filters,
  initialFilters: {
    province: "Tümü",
    district: "Tümü",
    crop: "Tümü",
    companyType: "Tümü",
    supplyRisk: "Tümü",
    opportunityLevel: "Tümü",
  },
  opportunityTypes: ["Tedarik Riski Fırsatı", "Bölgesel Üretim Fırsatı", "Alıcı Firma Fırsatı", "Kooperatif / Üretici Ağı Fırsatı", "Veriyle Karar Destek Fırsatı"],
  cardFieldLabels: ["Firma Adı", "Bölge", "Ürün / Mahsul", "Firma Tipi", "Fırsat Skoru", "Muhtemel Tedarik Problemi", "Bölgesel Risk / Fırsat", "Önerilen Yaklaşım Açısı", "Tarlabil Değer Önerisi", "İletişim Tonu", "İlk Mesaj Önerisi"],
  analysisPrompt: "Tarlabil için bölge bazlı üretim potansiyeli, mahsul uygunluğu, tedarik riski, alıcı firma ihtiyacı ve üretici ağı fırsatını birlikte değerlendir.",
  sampleCompanies: seed.map((card) => card.title),
  messageToneRules: ["Ticari ama sakin", "Satın alma diline yakın", "Bölgesel gerçekliği bilen", "Abartısız değer önerisi"],
  resultTitle: "Tarlabil Fırsatları",
  resultDescription: "Bölge, mahsul, tedarik riski ve alıcı firma uyumuna göre sıralanır.",
  runAnalysis(filters) {
    return seed
      .map((card) => scoreTarlabilCard(card, filters))
      .sort((a, b) => b.opportunityScore - a.opportunityScore)
      .slice(0, 5);
  },
};

function tarlabilCard(input: {
  id: string;
  title: string;
  region: string;
  crop: string;
  companyType: string;
  risk: string;
  type: string;
  score: number;
  level: string;
  insights: Array<[string, string]>;
  value: string;
  tone: string;
  message: string;
}): WorkspaceCard {
  return {
    id: input.id,
    title: input.title,
    meta: `${input.region} · ${input.companyType} · ${input.crop} · ${input.risk} risk`,
    category: input.crop,
    opportunityType: input.type,
    opportunityScore: input.score,
    opportunityLevel: input.level,
    primaryInsights: input.insights.map(([label, value]) => ({ label, value })),
    recommendation: { label: "Tarlabil Değer Önerisi", value: input.value },
    tone: input.tone,
    message: input.message,
    externalLink: { label: "Firma Araması", href: googleSearchUrl(`"${input.title}" ${input.crop} tedarik satın alma`) },
    researchSections: [
      {
        title: "Tedarik Sinyalleri",
        meta: "4 sinyal grubu",
        items: [
          signalItem(input.title, input.crop, "Açık alım / ihale / tedarik araması", "Firma veya ürün bazlı alım, ihale ve tedarik izleri alıcı ihtiyacını gösterebilir."),
          signalItem(input.title, input.crop, "Bölgesel üretim izi", "İlçe ve mahsul bazlı üretim haberleri, arz yoğunluğu ve sezon sinyali verebilir."),
          signalItem(input.title, input.crop, "Satın alma / procurement rolleri", "Satın alma ekiplerinin büyümesi tedarik karar destek ihtiyacına işaret edebilir."),
          signalItem(input.title, input.crop, "Kooperatif / üretici ağı izi", "Üretici ağı, birlik ve kooperatif bağlantıları Tarlabil için kanal fırsatı olabilir."),
        ],
      },
      {
        title: "Kritik Kişiler",
        meta: "2 kişi tipi",
        items: [
          personItem(input.title, "Satın Alma / Procurement Lideri", "Tedarikçi seçimi, hacim planlama ve fiyat/kalite riskini taşıyan kişi olabilir."),
          personItem(input.title, "Operasyon / Tedarik Zinciri Lideri", "Lojistik, süreklilik ve alternatif kaynak görünürlüğü problemlerini sahiplenebilir."),
        ],
      },
    ],
  };
}

function scoreTarlabilCard(card: WorkspaceCard, filters: WorkspaceFilters): WorkspaceCard {
  const provinceMatch = filters.province === "Tümü" ? 0 : card.meta.includes(filters.province) ? 10 : -5;
  const districtMatch = filters.district === "Tümü" ? 0 : card.meta.includes(filters.district) ? 8 : -3;
  const cropMatch = filters.crop === "Tümü" ? 0 : card.category === filters.crop ? 12 : -6;
  const typeMatch = filters.companyType === "Tümü" ? 0 : card.meta.includes(filters.companyType) ? 6 : 0;
  const riskMatch = filters.supplyRisk === "Tümü" ? 0 : card.meta.includes(`${filters.supplyRisk} risk`) ? 6 : 0;
  const levelMatch = filters.opportunityLevel === "Tümü" ? 0 : card.opportunityLevel === filters.opportunityLevel ? 3 : 0;

  return { ...card, opportunityScore: clampScore(card.opportunityScore + provinceMatch + districtMatch + cropMatch + typeMatch + riskMatch + levelMatch) };
}

function signalItem(company: string, crop: string, title: string, description: string) {
  return {
    title,
    description,
    links: [
      { label: "Google", href: googleSearchUrl(`"${company}" "${crop}" "${title}"`) },
      { label: "Kariyer", href: googleSearchUrl(`"${company}" satın alma tedarik kariyer`) },
      { label: "Haber", href: googleSearchUrl(`"${company}" "${crop}" tedarik OR üretim OR alım`) },
    ],
  };
}

function personItem(company: string, title: string, description: string) {
  return {
    title,
    description,
    links: [
      { label: "LinkedIn", href: googleSearchUrl(`site:linkedin.com/in "${title}" "${company}"`) },
      { label: "Google", href: googleSearchUrl(`"${company}" "${title}"`) },
      { label: "Firma", href: linkedinCompanySearchUrl(company) },
    ],
  };
}
