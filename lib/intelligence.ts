export type OpportunityLevel = "Erken Sinyal" | "Odaklı" | "Yüksek Uyum" | "Stratejik";

export type OpportunityLayer = "Stratejik / Operasyonel" | "Arayüz / Görsel";

export type DecisionMaker = {
  name: string;
  role: string;
  linkedinUrl: string;
  googleSearchUrl: string;
  bingSearchUrl: string;
  glassdoorSearchUrl: string;
  newsSearchUrl: string;
  relevance: string;
  messageAngle: string;
};

export type IntelligenceFilters = {
  country: string;
  city: string;
  industry: string;
  companyType: string;
  productCategory: string;
  opportunityLevel: OpportunityLevel | "Tümü";
};

export type IntelligenceCard = {
  companyName: string;
  industry: string;
  location: string;
  companyType: string;
  productCategory: string;
  opportunityLevel: OpportunityLevel;
  opportunityLayer: OpportunityLayer;
  opportunityScore: number;
  companyLinkedInUrl: string;
  decisionMakers: DecisionMaker[];
  operationalPain: string;
  uxProductProblem: string;
  approachAngle: string;
  caseStudy: "WAT Mobilite" | "Payify" | "RubikPara" | "Linktera" | "Operasyonel UX örnekleri";
  communicationTone: string;
  messagePreview: string;
};

function companySearchUrl(companyName: string) {
  return `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(companyName)}`;
}

function peopleSearchUrl(companyName: string, query: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${companyName} ${query}`)}`;
}

function googlePeopleSearchUrl(companyName: string, query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`site:linkedin.com/in "${query}" "${companyName}"`)}`;
}

function bingPeopleSearchUrl(companyName: string, query: string) {
  return `https://www.bing.com/search?q=${encodeURIComponent(`site:linkedin.com/in "${query}" "${companyName}"`)}`;
}

function glassdoorSearchUrl(companyName: string, query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`site:glassdoor.com "${companyName}" "${query}"`)}`;
}

function newsSearchUrl(companyName: string, query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(`"${companyName}" "${query}" product OR digital OR operations OR design`)}`;
}

function contact(
  companyName: string,
  name: string,
  role: string,
  relevance: string,
  messageAngle: string,
  query = `${name} ${role}`,
): DecisionMaker {
  return {
    name,
    role,
    linkedinUrl: peopleSearchUrl(companyName, query),
    googleSearchUrl: googlePeopleSearchUrl(companyName, query),
    bingSearchUrl: bingPeopleSearchUrl(companyName, query),
    glassdoorSearchUrl: glassdoorSearchUrl(companyName, query),
    newsSearchUrl: newsSearchUrl(companyName, query),
    relevance,
    messageAngle,
  };
}

export const filterOptions = {
  country: ["Türkiye", "Birleşik Krallık", "Almanya", "Hollanda", "Birleşik Arap Emirlikleri"],
  city: ["İstanbul", "Ankara", "İzmir", "Londra", "Berlin", "Amsterdam", "Dubai"],
  industry: ["Tümü", "Mobilite", "Fintech", "SaaS", "Operasyonel Platformlar", "AI Ürünleri", "White-label Sistemler"],
  companyType: ["Tümü", "Scale-up", "Kurumsal girişim", "B2B platform", "Operasyonel ürün", "Finansal altyapı"],
  productCategory: [
    "Tümü",
    "EV Şarj",
    "Cüzdan / Ödeme Altyapısı",
    "Mikromobilite",
    "Lojistik Operasyon",
    "Market / Teslimat",
    "AI-native Workflow",
    "White-label Portal",
    "Arayüz Modernizasyonu",
  ],
  opportunityLevel: ["Tümü", "Erken Sinyal", "Odaklı", "Yüksek Uyum", "Stratejik"],
};

export const initialFilters: IntelligenceFilters = {
  country: "Türkiye",
  city: "İstanbul",
  industry: "Mobilite",
  companyType: "Operasyonel ürün",
  productCategory: "EV Şarj",
  opportunityLevel: "Yüksek Uyum",
};

const intelligenceSeed: IntelligenceCard[] = [
  {
    companyName: "WAT Mobilite",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Kurumsal girişim",
    productCategory: "EV Şarj",
    opportunityLevel: "Stratejik",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 96,
    companyLinkedInUrl: "https://www.linkedin.com/company/watmobilite/",
    decisionMakers: [
      contact("WAT Mobilite", "Ürün / Dijital Deneyim Lideri", "Product, UX veya Dijital Kanallar", "Ürün deneyimi ve şarj akışlarının sahibi olabilir.", "WAT Mobilite case'i üzerinden operasyonel UX ve mobil deneyim sürekliliği."),
      contact("WAT Mobilite", "Operasyon Lideri", "Şarj ağı operasyonları", "Saha, destek ve istasyon görünürlüğü problemlerini taşıyan kişi olabilir.", "Şarj ağı büyüdükçe operasyonel kontrol yüzeylerini sadeleştirme."),
    ],
    operationalPain:
      "Şarj istasyonu ağı, saha operasyonları, ödeme durumları ve gerçek zamanlı kullanıcı akışları birlikte yönetildiğinde operasyonel görünürlük kritik hale gelir.",
    uxProductProblem:
      "Mobil uygulama, istasyon durumu, ödeme güveni ve servis akışları arasında tutarlı bir ürün dili korunmazsa deneyim parçalı hissedebilir.",
    approachAngle:
      "Kudreto burada şarj deneyimi, operasyonel sistemler, white-label yapılar ve tasarım sistemi katmanlarını birlikte okuyabilen uzun vadeli ürün partneri olarak konumlanmalı.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Sistem odaklı, sakin, mevcut bağlamı anlayan",
    messagePreview:
      "WAT Mobilite gibi fiziksel dünya operasyonlarıyla çalışan ürünlerde tasarım yalnızca ekran değil; saha, ödeme, güven ve gerçek zamanlı karar akışlarının ortak dili oluyor. Bu katmanda daha net ve ölçeklenebilir bir sistem kurgusu üzerine konuşmak isterim.",
  },
  {
    companyName: "ZES",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "EV Şarj",
    opportunityLevel: "Yüksek Uyum",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 91,
    companyLinkedInUrl: "https://uk.linkedin.com/company/zorluenergysolutions",
    decisionMakers: [
      contact("ZES", "Dijital Ürün Lideri", "Product veya Digital Channels", "Harita, ödeme ve istasyon durumu deneyimlerinin sahibi olabilir.", "EV şarj akışlarında güven ve durum görünürlüğü."),
      contact("ZES", "Müşteri Deneyimi Lideri", "Customer Experience", "Destek yükü ve kullanıcı güveni problemlerini görebilir.", "Kullanıcı destek maliyetini azaltan daha net deneyim dili."),
    ],
    operationalPain:
      "Genişleyen şarj ağı; istasyon erişilebilirliği, arıza görünürlüğü, ödeme kurtarma ve müşteri destek yükünü aynı anda büyütebilir.",
    uxProductProblem:
      "Kullanıcı tarafında harita, soket uygunluğu, fiyat bilgisi ve ödeme durumu yeterince net değilse güven kaybı hızlı oluşur.",
    approachAngle:
      "WAT Mobilite deneyimi üzerinden EV şarj akışlarının güven, görünürlük ve operasyonel kontrol katmanlarıyla ele alınması önerilmeli.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Operasyonel, net, deneyim kalitesine duyarlı",
    messagePreview:
      "EV şarj ürünlerinde en kritik deneyim anı çoğu zaman uygulamanın en küçük durum bilgisinde ortaya çıkıyor: uygunluk, ödeme, arıza ve güven. Kudreto tarafında bu akışları operasyonel sistem mantığıyla sadeleştirme deneyimim var.",
  },
  {
    companyName: "Eşarj",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "EV Şarj",
    opportunityLevel: "Yüksek Uyum",
    opportunityLayer: "Arayüz / Görsel",
    opportunityScore: 86,
    companyLinkedInUrl: companySearchUrl("Eşarj"),
    decisionMakers: [
      contact("Eşarj", "Pazarlama / Marka Lideri", "Marketing veya Brand", "Premium algı ve mobil deneyim modernizasyonu için doğru kapı olabilir.", "WAT Mobilite benzeri daha güven veren mobil arayüz dili."),
      contact("Eşarj", "Mobil Ürün Sorumlusu", "Mobile Product", "Harita, soket ve ödeme deneyiminin ürün sahibi olabilir.", "Şarj deneyiminde mikro durumların kullanıcı güvenine etkisi."),
    ],
    operationalPain:
      "Şarj ağı olgunlaştıkça kullanıcı desteği, abonelik, kampanya, filo ve istasyon yönetimi gibi farklı beklentiler aynı deneyime yük bindirir.",
    uxProductProblem:
      "Mobil arayüz modernizasyonu, harita deneyimi ve durum göstergeleri daha premium ve güven veren bir yapıya taşınabilir.",
    approachAngle:
      "Bu fırsat yalnızca stratejik dönüşüm değil; WAT Mobilite benzeri premium mobil deneyim ve tasarım sistemi yenileme talebi olarak da okunmalı.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Görsel kaliteyi küçümsemeyen, ürün odaklı",
    messagePreview:
      "EV şarj deneyiminde premium algı, yalnızca marka diliyle değil; harita, istasyon durumu ve ödeme anındaki arayüz netliğiyle kuruluyor. WAT Mobilite benzeri bir yenileme beklentisi varsa bunu hem görsel kalite hem ürün sistemi olarak ele alabiliriz.",
  },
  {
    companyName: "Trugo",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Kurumsal girişim",
    productCategory: "EV Şarj",
    opportunityLevel: "Stratejik",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 89,
    companyLinkedInUrl: "https://www.linkedin.com/company/trugocharging/",
    decisionMakers: [
      contact("Trugo", "Dijital Ürün Lideri", "Product veya Digital", "Araç, uygulama ve istasyon deneyimi arasındaki bütünlüğü sahiplenebilir.", "Premium mobilite deneyiminde operasyonel güven katmanı."),
      contact("Trugo", "Operasyon / Network Lideri", "Charging Network Operations", "İstasyon performansı ve saha görünürlüğü kararlarında etkili olabilir.", "Şarj ağı görünürlüğü ve hata toleransı düşük akışların sadeleşmesi."),
    ],
    operationalPain:
      "Yüksek hızlı şarj ağı marka vaadi güçlü olduğu için operasyonel hata toleransı düşüktür; istasyon durumu ve ödeme akışı doğrudan güven algısını etkiler.",
    uxProductProblem:
      "Araç, uygulama, istasyon ve destek deneyimi arasında kesintisiz bir kullanıcı hikayesi kurulması gerekir.",
    approachAngle:
      "Kudreto; mobilite, gerçek zamanlı durum yönetimi ve premium arayüz beklentisini birlikte çözebilen dış ürün partneri olarak önerilmeli.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Premium, stratejik, marka hassasiyetini bilen",
    messagePreview:
      "Trugo gibi marka vaadi yüksek mobilite ürünlerinde kullanıcı deneyimi, istasyon ekranından uygulamadaki en küçük durum mesajına kadar tek bir güven hissi üretmeli. Bu katmanda hem operasyonel UX hem premium arayüz dili birlikte düşünülmeli.",
  },
  {
    companyName: "Param",
    industry: "Fintech",
    location: "İstanbul, Türkiye",
    companyType: "Finansal altyapı",
    productCategory: "Cüzdan / Ödeme Altyapısı",
    opportunityLevel: "Yüksek Uyum",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 90,
    companyLinkedInUrl: "https://www.linkedin.com/company/paramcomtr",
    decisionMakers: [
      contact("Param", "Ürün Direktörü", "Product Director", "Cüzdan, ödeme ve merchant akışlarının ürün kararlarını taşıyabilir.", "Payify ve Linktera üzerinden fintech operasyonlarını sadeleştirme."),
      contact("Param", "Dijital Kanallar Lideri", "Digital Channels", "Bireysel ve kurumsal arayüz kalitesinden sorumlu olabilir.", "Finansal ürünlerde güven, netlik ve arayüz sistemi."),
    ],
    operationalPain:
      "Kart, cüzdan, ödeme, bayi, merchant ve raporlama katmanları büyüdükçe ürün kararları regülasyon ve operasyon arasında sıkışabilir.",
    uxProductProblem:
      "Finansal ürünlerde bilgi yoğunluğu, güven hissi ve işlem açıklığı aynı arayüz içinde dengelenmezse kullanıcı destek yükü artar.",
    approachAngle:
      "Payify ve Linktera deneyimleri üzerinden ödeme altyapısı, panel deneyimi ve tasarım sistemi birlikte konuşulmalı.",
    caseStudy: "Payify",
    communicationTone: "Ciddi, güven veren, sade",
    messagePreview:
      "Fintech ürünlerinde tasarımın asıl değeri karmaşık finansal akışları daha anlaşılır ve güvenilir hale getirdiği yerde ortaya çıkıyor. Param tarafında ödeme, cüzdan ve operasyonel panel katmanlarını birlikte okumak değerli olabilir.",
  },
  {
    companyName: "RubikPara",
    industry: "Fintech",
    location: "İstanbul, Türkiye",
    companyType: "Finansal altyapı",
    productCategory: "Cüzdan / Ödeme Altyapısı",
    opportunityLevel: "Yüksek Uyum",
    opportunityLayer: "Arayüz / Görsel",
    opportunityScore: 88,
    companyLinkedInUrl: companySearchUrl("RubikPara"),
    decisionMakers: [
      contact("RubikPara", "Kurucu / Genel Müdür", "Founder CEO", "Arayüz modernizasyonu ve ürün algısı kararını hızlı sahiplenebilir.", "RubikPara case diliyle tasarım değerini somutlaştırma."),
      contact("RubikPara", "Ürün Sorumlusu", "Product Manager", "Başvuru ve finansal akış netliğinin doğrudan sahibi olabilir.", "KOBİ finansal ürünlerinde karar netliği ve güven."),
    ],
    operationalPain:
      "KOBİ ve işletme odaklı finansal akışlarda onboarding, işlem takibi, belge ve raporlama adımları hızla karmaşıklaşabilir.",
    uxProductProblem:
      "Arayüz modernizasyonu, bilgi mimarisi ve güven veren görsel sistem iyileştirmesi doğrudan algılanan ürün kalitesini artırabilir.",
    approachAngle:
      "RubikPara case’i hem fintech arayüz dili hem de karmaşık finansal akışların sadeleştirilmesi için referans olarak kullanılmalı.",
    caseStudy: "RubikPara",
    communicationTone: "Yakın, pratik, tasarım değerini net anlatan",
    messagePreview:
      "RubikPara benzeri finansal ürünlerde iyi tasarım, yalnızca daha modern görünmek değil; işletme sahibinin ne olduğunu hızlıca anlamasını sağlamak. Bu nedenle arayüz yenilemesini ürün netliği ve güven hissiyle birlikte ele almak isterim.",
  },
  {
    companyName: "Colendi",
    industry: "Fintech",
    location: "İstanbul, Türkiye",
    companyType: "Finansal altyapı",
    productCategory: "Cüzdan / Ödeme Altyapısı",
    opportunityLevel: "Stratejik",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 87,
    companyLinkedInUrl: "https://gb.linkedin.com/company/colendi",
    decisionMakers: [
      contact("Colendi", "AI / Data Product Lideri", "AI Data Product", "Skorlama ve karar sistemleri için doğru muhatap olabilir.", "AI kararlarının açıklanabilirliği ve operasyonel UX."),
      contact("Colendi", "Fintech Ürün Lideri", "Fintech Product", "Cüzdan, kredi ve partner entegrasyonları arasında ürün netliğini yönetebilir.", "Finansal karar sistemlerini kullanıcı ve operasyon ekiplerine anlatmak."),
    ],
    operationalPain:
      "Kredi skorlama, cüzdan, ödeme ve partner entegrasyonları arttıkça karar sistemleri ve kullanıcıya açıklanabilirlik kritik hale gelir.",
    uxProductProblem:
      "AI destekli finansal kararların kullanıcıya ve operasyon ekiplerine nasıl gösterileceği güven ve benimseme açısından belirleyicidir.",
    approachAngle:
      "Linktera’daki AI scoring ve fintech platform deneyimi üzerinden karar sistemleri, açıklanabilirlik ve operasyonel UX açısı önerilmeli.",
    caseStudy: "Linktera",
    communicationTone: "Analitik, sistem bilen, ileri görüşlü",
    messagePreview:
      "AI destekli finansal sistemlerde ürünün asıl meselesi sadece karar üretmek değil, o kararın kullanıcı ve operasyon ekipleri tarafından anlaşılabilir olması. Bu kesişimde tasarım, güven ve ölçeklenebilirlik için kritik bir katman haline geliyor.",
  },
  {
    companyName: "Figopara",
    industry: "Fintech",
    location: "İstanbul, Türkiye",
    companyType: "Finansal altyapı",
    productCategory: "Cüzdan / Ödeme Altyapısı",
    opportunityLevel: "Odaklı",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 82,
    companyLinkedInUrl: "https://cg.linkedin.com/company/figopara",
    decisionMakers: [
      contact("Figopara", "Ürün Lideri", "Product Lead", "Başvuru, teklif ve takip akışlarını sahiplenebilir.", "KOBİ finansmanında aşama netliği ve güven."),
      contact("Figopara", "Büyüme / İş Geliştirme Lideri", "Growth Business Development", "Dönüşüm ve lead kalitesiyle ilgilenebilir.", "Ürün netliğiyle ticari dönüşümü destekleme."),
    ],
    operationalPain:
      "Tedarikçi finansmanı ve nakit akışı ürünlerinde başvuru, değerlendirme, teklif ve takip adımları çok paydaşlı bir yapıya dönüşür.",
    uxProductProblem:
      "KOBİ kullanıcısı için finansal süreçlerin dili fazla teknik kalırsa ürün güçlü olsa bile karar vermek zorlaşır.",
    approachAngle:
      "Fintech operasyonlarını sadeleştiren bilgi mimarisi, başvuru akışı ve panel deneyimi üzerinden konumlanılmalı.",
    caseStudy: "Payify",
    communicationTone: "Sadeleştirici, empatik, ticari bağlamı anlayan",
    messagePreview:
      "KOBİ finansmanı ürünlerinde en kritik tasarım konusu çoğu zaman form değil, karar netliği oluyor. Kullanıcının hangi aşamada olduğunu ve neye güvenebileceğini daha açık hale getirmek ürün değerini doğrudan görünür kılabilir.",
  },
  {
    companyName: "Martı",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "Mikromobilite",
    opportunityLevel: "Odaklı",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 84,
    companyLinkedInUrl: "https://www.linkedin.com/company/marti-technologies/",
    decisionMakers: [
      contact("Martı", "Ürün Lideri", "Product Lead", "Sürüş başlatma, harita ve güvenlik akışlarının sahibi olabilir.", "Mobilite operasyonları ile kullanıcı deneyimini aynı sistemde düşünme."),
      contact("Martı", "Operasyon Lideri", "Operations", "Saha, araç bulunabilirliği ve regülasyon akışlarını sahiplenebilir.", "Operasyonel görünürlüğü dijital ürün yüzeyine taşıma."),
    ],
    operationalPain:
      "Saha operasyonları, araç bulunabilirliği, park düzeni, bakım ve regülasyon baskısı ürün deneyiminin arka planını sürekli etkiler.",
    uxProductProblem:
      "Kullanıcı akışı basit görünse de harita, ücret, güvenlik, sürüş başlatma ve sorun bildirme adımlarında yüksek netlik gerekir.",
    approachAngle:
      "Mobilite operasyonlarını dijital ürünle birleştiren görünürlük, karar ve destek katmanları üzerinden stratejik UX önerilmeli.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Operasyonel gerçekliği bilen, direkt",
    messagePreview:
      "Mikromobilite ürünlerinde deneyimin görünen kısmı çok basit; fakat arka tarafta saha, regülasyon, bakım ve destek akışları sürekli ürün kararına dönüşüyor. Bu karmaşıklığı daha okunabilir bir sisteme çevirmek değer yaratabilir.",
  },
  {
    companyName: "BinBin",
    industry: "Mobilite",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "Mikromobilite",
    opportunityLevel: "Odaklı",
    opportunityLayer: "Arayüz / Görsel",
    opportunityScore: 79,
    companyLinkedInUrl: companySearchUrl("BinBin"),
    decisionMakers: [
      contact("BinBin", "Mobil Ürün Lideri", "Mobile Product", "Uygulama kalitesi ve sürüş akışlarının sahibi olabilir.", "Daha tutarlı ve premium mobil deneyim dili."),
      contact("BinBin", "Marka / Büyüme Lideri", "Brand Growth", "Arayüz kalitesinin marka algısına etkisini sahiplenebilir.", "Görsel modernizasyonu büyüme ve güven üzerinden konumlamak."),
    ],
    operationalPain:
      "Farklı şehirlerde büyüyen mikromobilite operasyonu, yerel kullanım alışkanlıkları ve destek senaryoları nedeniyle ürün dilini zorlayabilir.",
    uxProductProblem:
      "Mobil deneyimde görsel hiyerarşi, durum mesajları ve sürüş sonrası akışlar daha rafine bir tasarım sistemiyle güçlendirilebilir.",
    approachAngle:
      "Bu fırsat, premium arayüz modernizasyonu ve daha tutarlı mobil ürün dili olarak ele alınmalı.",
    caseStudy: "WAT Mobilite",
    communicationTone: "Genç ama sakin, uygulama kalitesine odaklı",
    messagePreview:
      "BinBin gibi sık kullanılan mobilite ürünlerinde küçük arayüz kararları bile güven, hız ve marka algısını etkiliyor. Daha tutarlı ve premium bir mobil deneyim katmanı üzerine kısa bir değerlendirme paylaşmak isterim.",
  },
  {
    companyName: "Getir",
    industry: "Operasyonel Platformlar",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "Market / Teslimat",
    opportunityLevel: "Stratejik",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 88,
    companyLinkedInUrl: "https://www.linkedin.com/company/getir",
    decisionMakers: [
      contact("Getir", "Operasyon Ürün Lideri", "Operations Product", "Depo, kurye ve stok karar yüzeylerinin sahibi olabilir.", "Görünmeyen operasyon panellerinde karar netliği."),
      contact("Getir", "İç Sistemler / Platform Lideri", "Internal Tools Platform", "İç operasyon sistemleri ve ekip verimliliğiyle ilgilenebilir.", "Operasyonel UX'in hız ve istisna yönetimine etkisi."),
    ],
    operationalPain:
      "Depo, kurye, stok, kampanya, teslimat süresi ve müşteri destek kararları aynı ürün ekosistemi içinde yüksek hızda çalışır.",
    uxProductProblem:
      "Müşteri uygulaması güçlü olsa bile iç operasyon panellerinde karar netliği, istisna yönetimi ve görünürlük büyük kaldıraç yaratır.",
    approachAngle:
      "Kudreto, görünmeyen operasyonel UX katmanlarını sadeleştiren dış düşünce partneri olarak konumlanmalı.",
    caseStudy: "Operasyonel UX örnekleri",
    communicationTone: "Yüksek bağlamlı, operasyonu anlayan, sakin",
    messagePreview:
      "Hızlı teslimat ürünlerinde asıl karmaşıklık çoğu zaman müşterinin görmediği operasyon katmanlarında birikiyor. Bu panellerde karar netliği ve istisna yönetimi üzerine daha sade bir sistem dili kurmak ciddi fark yaratabilir.",
  },
  {
    companyName: "istegelsin",
    industry: "Operasyonel Platformlar",
    location: "İstanbul, Türkiye",
    companyType: "Operasyonel ürün",
    productCategory: "Market / Teslimat",
    opportunityLevel: "Odaklı",
    opportunityLayer: "Arayüz / Görsel",
    opportunityScore: 78,
    companyLinkedInUrl: companySearchUrl("istegelsin"),
    decisionMakers: [
      contact("istegelsin", "E-ticaret Ürün Lideri", "Ecommerce Product", "Kategori, sepet ve teslimat slotu akışlarından sorumlu olabilir.", "Arayüz modernizasyonunu dönüşüm ve karar kolaylığıyla bağlamak."),
      contact("istegelsin", "Pazarlama / CRM Lideri", "Marketing CRM", "Kampanya görünürlüğü ve kullanıcı tekrarını sahiplenebilir.", "Kampanya yoğunluğunu sakin bir ürün diliyle yönetmek."),
    ],
    operationalPain:
      "Market teslimatı tarafında ürün bulunurluğu, teslimat slotları ve ikame kararları kullanıcı beklentisini doğrudan etkiler.",
    uxProductProblem:
      "Mobil ve web deneyiminde kategori mimarisi, sepet akışı ve kampanya görünürlüğü modernizasyon potansiyeli taşıyabilir.",
    approachAngle:
      "Klasik stratejik dönüşüm yerine, kullanıcı arayüzü yenileme ve ürün akışlarını sakinleştirme fırsatı olarak takip edilmeli.",
    caseStudy: "Operasyonel UX örnekleri",
    communicationTone: "Pratik, kullanıcı deneyimi odaklı, sıcak",
    messagePreview:
      "Online market deneyiminde arayüzün sade, güven veren ve hızlı karar aldıran bir yapıya sahip olması doğrudan dönüşüme etki ediyor. İsterseniz mevcut akışları premium bir redesign perspektifiyle birlikte değerlendirebiliriz.",
  },
  {
    companyName: "Linktera",
    industry: "White-label Sistemler",
    location: "İstanbul, Türkiye",
    companyType: "B2B platform",
    productCategory: "White-label Portal",
    opportunityLevel: "Stratejik",
    opportunityLayer: "Stratejik / Operasyonel",
    opportunityScore: 94,
    companyLinkedInUrl: companySearchUrl("Linktera"),
    decisionMakers: [
      contact("Linktera", "Fintech Platform Lideri", "Platform Product", "White-label altyapı ve partner deneyimi kararlarında etkili olabilir.", "White-label ürünlerde yeniden kullanılabilir sistem mantığı."),
      contact("Linktera", "AI / Risk Ürün Lideri", "AI Risk Product", "Scoring, risk analytics ve reporting akışlarını sahiplenebilir.", "AI destekli karar sistemlerinde açıklanabilirlik ve arayüz netliği."),
    ],
    operationalPain:
      "White-label fintech altyapılarında partner ihtiyaçları, izin yapıları, raporlama, treasury ve risk akışları zamanla karmaşık bir ürün ekosistemine dönüşür.",
    uxProductProblem:
      "Birden fazla ürün ve panel için yeniden kullanılabilir UX/UI sistemi kurulmazsa tutarlılık ve geliştirme hızı zayıflar.",
    approachAngle:
      "Kudreto burada proje teslim eden bir tasarımcı değil; uzun vadeli, ekip içinde düşünen stratejik ürün partneri olarak konumlanmalı.",
    caseStudy: "Linktera",
    communicationTone: "Kıdemli, içeriden biri gibi, süreç odaklı",
    messagePreview:
      "White-label finansal sistemlerde ürün değeri çoğu zaman arayüzden önce karar netliğinde ve yeniden kullanılabilir sistem mantığında ortaya çıkıyor. Bu alan Kudreto’nun uzun vadeli ürün partnerliği yaklaşımıyla çok doğal örtüşüyor.",
  },
];

export function runMockAnalysis(filters: IntelligenceFilters) {
  const scored = intelligenceSeed
    .map((card) => {
      const countryMatch = card.location.includes(filters.country) ? 3 : 0;
      const cityMatch = card.location.includes(filters.city) ? 4 : 0;
      const industryMatch = filters.industry === "Tümü" ? 0 : card.industry === filters.industry ? 13 : -7;
      const categoryMatch = filters.productCategory === "Tümü" ? 0 : card.productCategory === filters.productCategory ? 10 : -4;
      const typeMatch = filters.companyType === "Tümü" ? 0 : card.companyType === filters.companyType ? 5 : 0;
      const levelMatch = filters.opportunityLevel === "Tümü" ? 0 : card.opportunityLevel === filters.opportunityLevel ? 3 : 0;

      return {
        ...card,
        opportunityScore: Math.max(
          61,
          Math.min(98, card.opportunityScore + countryMatch + cityMatch + industryMatch + categoryMatch + typeMatch + levelMatch),
        ),
      };
    })
    .sort((a, b) => b.opportunityScore - a.opportunityScore);

  return scored.slice(0, 5);
}
