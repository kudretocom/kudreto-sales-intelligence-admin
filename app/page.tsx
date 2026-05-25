"use client";

import {
  Activity,
  Building2,
  ChevronDown,
  CircleDot,
  ExternalLink,
  FileText,
  Globe2,
  Layers3,
  Map,
  MessageSquareText,
  NotebookPen,
  PanelLeft,
  Play,
  Search,
  Settings,
  Signal,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  filterOptions,
  getOpportunitySignals,
  initialFilters,
  IntelligenceCard,
  IntelligenceFilters,
  OpportunityLevel,
  runMockAnalysis,
} from "@/lib/intelligence";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Genel Bakış", icon: Activity },
  { label: "Sales Intelligence", icon: Sparkles, active: true },
  { label: "Bölgeler", icon: Map },
  { label: "Sinyaller", icon: Signal },
  { label: "Şirketler", icon: Building2 },
  { label: "Case Eşleşmeleri", icon: FileText },
  { label: "Notlar", icon: NotebookPen },
  { label: "Ayarlar", icon: Settings },
];

const fieldLabels: Record<keyof IntelligenceFilters, string> = {
  country: "Ülke",
  city: "Şehir",
  industry: "Sektör",
  companyType: "Şirket Tipi",
  productCategory: "Ürün Kategorisi",
  opportunityLevel: "Fırsat Seviyesi",
};

export default function Home() {
  const [filters, setFilters] = useState<IntelligenceFilters>(initialFilters);
  const [analysisRun, setAnalysisRun] = useState(true);
  const [cards, setCards] = useState<IntelligenceCard[]>(() => runMockAnalysis(initialFilters));

  const activeContext = useMemo(
    () => `${filters.city} / ${filters.industry} / ${filters.productCategory}`,
    [filters.city, filters.industry, filters.productCategory],
  );

  function updateFilter<K extends keyof IntelligenceFilters>(key: K, value: IntelligenceFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value }));
    setAnalysisRun(false);
  }

  function handleRunAnalysis() {
    setCards(runMockAnalysis(filters));
    setAnalysisRun(true);
  }

  return (
    <main className="min-h-screen bg-white text-[#15171a]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[272px] shrink-0 border-r border-[#e8eaee] bg-white/92 px-5 py-5 lg:block">
          <div className="flex h-full flex-col">
            <div className="mb-9 flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-md border border-[#dfe4ea] bg-[#f8f9fb]">
                <CircleDot className="size-4 text-[#2563eb]" strokeWidth={2.3} />
              </div>
              <div>
                <div className="text-[13px] font-semibold tracking-[0.02em] text-[#111318]">Kudreto</div>
                <div className="text-[11px] text-[#7a828d]">İçgörü Sistemi</div>
              </div>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "group flex h-9 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] font-medium transition",
                    item.active
                      ? "bg-[#f2f6ff] text-[#174ea6]"
                      : "text-[#69707a] hover:bg-[#f7f8fa] hover:text-[#22262d]",
                  )}
                >
                  <item.icon className="size-4" strokeWidth={1.9} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto rounded-md border border-[#e8eaee] bg-[#fbfcfd] p-4">
              <div className="mb-2 flex items-center gap-2 text-[12px] font-medium text-[#303640]">
                <Globe2 className="size-3.5 text-[#2563eb]" />
                Founder işletim alanı
              </div>
              <p className="text-[12px] leading-5 text-[#7a828d]">
                Fırsatları anlamak, konumlanmak ve sakin bir ilk temas hazırlamak için.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <Topbar onRunAnalysis={handleRunAnalysis} />

          <div className="mx-auto w-full max-w-[1180px] px-4 pb-12 pt-7 sm:px-7 lg:px-10">
            <div className="mb-8 flex flex-col gap-5 border-b border-[#edf0f3] pb-7 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#7a828d]">
                  <PanelLeft className="size-3.5" />
                  Kudreto içgörü çalışma alanı
                </div>
                <h1 className="text-[32px] font-semibold tracking-normal text-[#111318] sm:text-[40px]">
                  Sales Intelligence
                </h1>
                <p className="mt-3 max-w-[650px] text-[15px] leading-7 text-[#69707a]">
                  Kudreto için potansiyel fırsatları, operasyonel problemleri ve stratejik yaklaşım alanlarını analiz edin.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 rounded-md border border-[#e8eaee] bg-[#fbfcfd] p-3 md:w-[330px]">
                <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a929d]">
                  <span>Aktif bağlam</span>
                  <span className={cn("rounded-full px-2 py-1", analysisRun ? "bg-[#ecfdf3] text-[#16794c]" : "bg-[#fff7ed] text-[#a45713]")}>
                    {analysisRun ? "Analiz edildi" : "Bekliyor"}
                  </span>
                </div>
                <div className="truncate text-[13px] font-medium text-[#303640]">{activeContext}</div>
              </div>
            </div>

            <FilterPanel filters={filters} onChange={updateFilter} onRunAnalysis={handleRunAnalysis} />

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-[#15171a]">Fırsat Araştırması</h2>
                <p className="mt-1 text-[13px] text-[#7a828d]">
                  Stratejik uyum, operasyonel problem ve case eşleşmesine göre sıralanır.
                </p>
              </div>
              <div className="hidden items-center gap-2 text-[12px] text-[#8a929d] sm:flex">
                <span className="size-1.5 rounded-full bg-[#2563eb]" />
                Yerel veri · API hazır
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {cards.map((card) => (
                <IntelligenceResult key={card.companyName} card={card} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Topbar({ onRunAnalysis }: { onRunAnalysis: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e8eaee] bg-white/88 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-7 lg:px-8">
        <button className="grid size-9 place-items-center rounded-md border border-[#e8eaee] text-[#69707a] transition hover:bg-[#f8f9fb] lg:hidden" aria-label="Navigasyonu aç">
          <PanelLeft className="size-4" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-[#e8eaee] bg-[#fbfcfd] px-3 py-2.5 text-[#7a828d] shadow-[0_1px_0_rgba(15,23,42,0.02)]">
          <Search className="size-4 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[13px] text-[#303640] outline-none placeholder:text-[#9aa2ad]"
            placeholder="Şirket, sinyal veya bölge ara"
          />
        </div>

        <button
          onClick={onRunAnalysis}
          className="hidden h-10 items-center gap-2 rounded-md bg-[#111318] px-4 text-[13px] font-medium text-white transition hover:bg-[#252a32] sm:flex"
        >
          <Play className="size-3.5 fill-white" />
          Analiz Başlat
        </button>

        <div className="hidden items-center gap-3 border-l border-[#edf0f3] pl-4 md:flex">
          <div className="text-right">
            <div className="text-[12px] font-medium text-[#303640]">Kudret Keskin</div>
            <div className="text-[11px] text-[#8a929d]">Stratejik Ürün Partneri</div>
          </div>
          <div className="grid size-8 place-items-center rounded-md border border-[#dfe4ea] bg-[#f8f9fb] text-[12px] font-semibold text-[#303640]">
            KK
          </div>
        </div>
      </div>
    </header>
  );
}

function FilterPanel({
  filters,
  onChange,
  onRunAnalysis,
}: {
  filters: IntelligenceFilters;
  onChange: <K extends keyof IntelligenceFilters>(key: K, value: IntelligenceFilters[K]) => void;
  onRunAnalysis: () => void;
}) {
  const entries = Object.entries(filterOptions) as Array<[keyof IntelligenceFilters, string[]]>;

  return (
    <section className="rounded-lg border border-[#e8eaee] bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.035)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[14px] font-semibold text-[#15171a]">Araştırma Filtreleri</h2>
          <p className="mt-1 text-[12px] text-[#7a828d]">Fırsat içgörüsü üretmeden önce pazar merceğini seçin.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-[#e8eaee] bg-[#fbfcfd] px-3 py-1.5 text-[11px] font-medium text-[#7a828d] sm:flex">
          <span className="size-1.5 rounded-full bg-[#2563eb]" />
          Filtreler yerel veri havuzunu sıralar
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {entries.map(([key, values]) => (
          <label key={key} className="block">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">
              {fieldLabels[key]}
            </span>
            <div className="relative">
              <select
                aria-label={fieldLabels[key]}
                value={filters[key]}
                onChange={(event) => onChange(key, event.target.value as OpportunityLevel)}
                className="h-10 w-full appearance-none rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 pr-8 text-[13px] font-medium text-[#303640] outline-none transition hover:border-[#ccd4dd] focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
              >
                {values.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8a929d]" />
            </div>
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf0f3] pt-4">
        <p className="hidden text-[12px] leading-5 text-[#7a828d] md:block">
          Seçili bağlama göre şirketleri, fırsat katmanını ve Kudreto case eşleşmesini yeniden hesaplar.
        </p>
        <button
          onClick={onRunAnalysis}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#111318] px-4 text-[13px] font-medium text-white transition hover:bg-[#252a32] sm:w-auto"
        >
          <Play className="size-3.5 fill-white" />
          Analiz Başlat
        </button>
      </div>
    </section>
  );
}

function IntelligenceResult({ card }: { card: IntelligenceCard }) {
  return (
    <article className="group rounded-lg border border-[#e8eaee] bg-white p-5 transition duration-200 hover:border-[#d5dce5] hover:shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[18px] font-semibold tracking-normal text-[#111318]">{card.companyName}</h3>
            <span className="rounded-full border border-[#dfe4ea] bg-[#fbfcfd] px-2 py-1 text-[11px] font-medium text-[#69707a]">
              {card.industry}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-[11px] font-medium",
                card.opportunityLayer === "Stratejik / Operasyonel"
                  ? "border-[#cfe0ff] bg-[#f5f8ff] text-[#174ea6]"
                  : "border-[#e6e0d6] bg-[#fcfaf7] text-[#7a5a2d]",
              )}
            >
              {card.opportunityLayer}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-[#8a929d]">
            {card.location} · {card.companyType} · {card.productCategory}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Score value={card.opportunityScore} level={card.opportunityLevel} />
          <a
            href={card.companyLinkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-[52px] items-center gap-2 rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 text-[12px] font-medium text-[#303640] transition hover:border-[#cbd5e1] hover:bg-white hover:text-[#174ea6]"
          >
            <span>Şirket LinkedIn</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionTitle icon={Layers3} label="Stratejik Okuma" />
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <InsightBlock label="Muhtemel Operasyonel Problem" value={card.operationalPain} />
            <InsightBlock label="Olası UX / Ürün Problemi" value={card.uxProductProblem} />
            <InsightBlock label="Önerilen Yaklaşım Açısı" value={card.approachAngle} className="md:col-span-2" />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InsightBlock label="Önerilen Kudreto Case Study" value={card.caseStudy} />
            <InsightBlock label="İletişim Tonu Önerisi" value={card.communicationTone} />
          </div>
        </div>

        <div className="rounded-md border border-[#edf0f3] bg-[#fbfcfd] p-4 lg:col-span-4">
          <SectionTitle icon={MessageSquareText} label="İlk Outreach Önerisi" />
          <p className="mt-3 text-[13px] leading-6 text-[#525a66]">{card.messagePreview}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section className="rounded-md border border-[#edf0f3] bg-[#fbfcfd] p-4">
          <SectionTitle icon={Signal} label="Arayış Sinyalleri" />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {getOpportunitySignals(card).map((signal) => (
              <div key={`${card.companyName}-${signal.label}`} className="rounded-md border border-[#edf0f3] bg-white p-3">
                <div className="text-[12px] font-semibold text-[#303640]">{signal.label}</div>
                <p className="mt-1.5 text-[11px] leading-4 text-[#69707a]">{signal.fit}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {signal.urls.map((url) => (
                    <ResearchLink
                      key={`${signal.label}-${url.label}`}
                      href={url.href}
                      label={url.label}
                      ariaLabel={`${card.companyName} ${signal.label} ${url.label} araması`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-[#edf0f3] bg-[#fbfcfd] p-4">
          <SectionTitle icon={UserRound} label="Kritik Kişiler" />
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            {card.decisionMakers.map((person) => (
              <div key={`${card.companyName}-${person.name}`} className="rounded-md border border-[#edf0f3] bg-white p-3">
                <div className="min-w-0">
                  <div className="truncate text-[12px] font-semibold text-[#303640]">{person.name}</div>
                  <div className="mt-1 text-[11px] leading-4 text-[#8a929d]">{person.role}</div>
                </div>
                <p className="mt-2 text-[11px] leading-4 text-[#69707a]">{person.relevance}</p>
                <p className="mt-2 text-[11px] leading-4 text-[#303640]">{person.messageAngle}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <ResearchLink href={person.linkedinUrl} label="LinkedIn" ariaLabel={`${person.name} LinkedIn kişi araması`} />
                  <ResearchLink href={person.googleSearchUrl} label="Google" ariaLabel={`${person.name} Google LinkedIn araması`} />
                  <ResearchLink href={person.bingSearchUrl} label="Bing" ariaLabel={`${person.name} Bing LinkedIn araması`} />
                  <ResearchLink href={person.glassdoorSearchUrl} label="Glassdoor" ariaLabel={`${person.name} Glassdoor araması`} />
                  <ResearchLink href={person.newsSearchUrl} label="Web Sinyali" ariaLabel={`${person.name} web sinyali araması`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function SectionTitle({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#303640]">
      <Icon className="size-3.5 text-[#2563eb]" />
      {label}
    </div>
  );
}

function ResearchLink({ href, label, ariaLabel }: { href: string; label: string; ariaLabel: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-2 text-[11px] font-medium text-[#69707a] transition hover:border-[#cbd5e1] hover:bg-white hover:text-[#174ea6]"
    >
      {label}
      <ExternalLink className="size-3" />
    </a>
  );
}

function InsightBlock({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">{label}</div>
      <p className="text-[13px] leading-6 text-[#303640]">{value}</p>
    </div>
  );
}

function Score({ value, level }: { value: number; level: OpportunityLevel }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-[#edf0f3] bg-[#fbfcfd] px-3 py-2">
      <div className="grid size-10 place-items-center rounded-md bg-white text-[14px] font-semibold text-[#174ea6] shadow-[inset_0_0_0_1px_#e8eaee]">
        {value}
      </div>
      <div>
        <div className="text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">Fırsat Skoru</div>
        <div className="mt-0.5 text-[12px] font-semibold text-[#303640]">{level}</div>
      </div>
    </div>
  );
}
