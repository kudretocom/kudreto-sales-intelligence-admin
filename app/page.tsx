"use client";

import {
  Activity,
  Building2,
  ChevronDown,
  ChevronRight,
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
import { cn } from "@/lib/utils";
import { getWorkspace, workspaces, type WorkspaceCard, type WorkspaceConfig, type WorkspaceFilters } from "@/workspaces";

const navigation = [
  { label: "Genel Bakış", icon: Activity },
  { label: "Büyüme İstihbaratı", icon: Sparkles, active: true },
  { label: "Bölgeler", icon: Map },
  { label: "Sinyaller", icon: Signal },
  { label: "Şirketler", icon: Building2 },
  { label: "Case Eşleşmeleri", icon: FileText },
  { label: "Notlar", icon: NotebookPen },
  { label: "Ayarlar", icon: Settings },
];

export default function Home() {
  const [workspaceId, setWorkspaceId] = useState(workspaces[0].id);
  const workspace = getWorkspace(workspaceId);
  const [filters, setFilters] = useState<WorkspaceFilters>(workspace.initialFilters);
  const [analysisRun, setAnalysisRun] = useState(true);
  const [cards, setCards] = useState<WorkspaceCard[]>(() => workspace.runAnalysis(workspace.initialFilters));

  const activeContext = useMemo(() => getActiveContext(workspace, filters), [filters, workspace]);

  function updateFilter(key: string, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    setAnalysisRun(false);
  }

  function handleRunAnalysis() {
    setCards(workspace.runAnalysis(filters));
    setAnalysisRun(true);
  }

  function handleWorkspaceChange(nextWorkspaceId: string) {
    const nextWorkspace = getWorkspace(nextWorkspaceId);

    setWorkspaceId(nextWorkspace.id);
    setFilters(nextWorkspace.initialFilters);
    setCards(nextWorkspace.runAnalysis(nextWorkspace.initialFilters));
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
                <div className="text-[13px] font-semibold tracking-[0.02em] text-[#111318]">Internal Growth OS</div>
                <div className="text-[11px] text-[#7a828d]">Private Intelligence</div>
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
                  {workspace.eyebrow}
                </div>
                <h1 className="text-[32px] font-semibold tracking-normal text-[#111318] sm:text-[40px]">Internal Growth OS</h1>
                <p className="mt-3 max-w-[650px] text-[15px] leading-7 text-[#69707a]">
                  {workspace.description}
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

            <WorkspaceSwitcher activeId={workspace.id} onChange={handleWorkspaceChange} />

            <FilterPanel filters={filters} onChange={updateFilter} onRunAnalysis={handleRunAnalysis} workspace={workspace} />

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-semibold text-[#15171a]">{workspace.resultTitle}</h2>
                <p className="mt-1 text-[13px] text-[#7a828d]">{workspace.resultDescription}</p>
              </div>
              <div className="hidden items-center gap-2 text-[12px] text-[#8a929d] sm:flex">
                <span className="size-1.5 rounded-full bg-[#2563eb]" />
                Yerel veri · API hazır
              </div>
            </div>

            <div className="mt-4 grid gap-4">
              {cards.map((card) => (
                <IntelligenceResult key={card.id} card={card} />
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

function WorkspaceSwitcher({ activeId, onChange }: { activeId: string; onChange: (workspaceId: string) => void }) {
  return (
    <section className="mb-5 flex flex-col gap-3 rounded-lg border border-[#e8eaee] bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.025)] sm:flex-row">
      {workspaces.map((workspace) => (
        <button
          key={workspace.id}
          onClick={() => onChange(workspace.id)}
          className={cn(
            "flex flex-1 items-center justify-between rounded-md px-4 py-3 text-left transition",
            activeId === workspace.id ? "bg-[#f2f6ff] text-[#174ea6]" : "text-[#69707a] hover:bg-[#f8f9fb] hover:text-[#303640]",
          )}
        >
          <span>
            <span className="block text-[13px] font-semibold">{workspace.name}</span>
            <span className="mt-1 block text-[11px] text-current/70">{workspace.eyebrow}</span>
          </span>
          <span className={cn("size-2 rounded-full", activeId === workspace.id ? "bg-[#2563eb]" : "bg-[#d7dde5]")} />
        </button>
      ))}
    </section>
  );
}

function FilterPanel({
  filters,
  onChange,
  onRunAnalysis,
  workspace,
}: {
  filters: WorkspaceFilters;
  onChange: (key: string, value: string) => void;
  onRunAnalysis: () => void;
  workspace: WorkspaceConfig;
}) {
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
        {workspace.filters.map((filter) => (
          <label key={filter.key} className="block">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.07em] text-[#8a929d]">
              {filter.label}
            </span>
            <div className="relative">
              <select
                aria-label={filter.label}
                value={filters[filter.key]}
                onChange={(event) => onChange(filter.key, event.target.value)}
                className="h-10 w-full appearance-none rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 pr-8 text-[13px] font-medium text-[#303640] outline-none transition hover:border-[#ccd4dd] focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
              >
                {filter.options.map((value) => (
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
          Seçili workspace bağlamına göre fırsatları, sinyalleri ve mesaj önerilerini yeniden hesaplar.
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

function IntelligenceResult({ card }: { card: WorkspaceCard }) {
  const [isSignalsOpen, setIsSignalsOpen] = useState(false);
  const [isPeopleOpen, setIsPeopleOpen] = useState(false);
  const [firstSection, secondSection] = card.researchSections;

  return (
    <article className="group rounded-lg border border-[#e8eaee] bg-white p-5 transition duration-200 hover:border-[#d5dce5] hover:shadow-[0_22px_60px_rgba(15,23,42,0.055)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[18px] font-semibold tracking-normal text-[#111318]">{card.title}</h3>
            <span className="rounded-full border border-[#dfe4ea] bg-[#fbfcfd] px-2 py-1 text-[11px] font-medium text-[#69707a]">
              {card.category}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-1 text-[11px] font-medium",
                card.opportunityType.includes("Operasyonel") || card.opportunityType.includes("Tedarik")
                  ? "border-[#cfe0ff] bg-[#f5f8ff] text-[#174ea6]"
                  : "border-[#e6e0d6] bg-[#fcfaf7] text-[#7a5a2d]",
              )}
            >
              {card.opportunityType}
            </span>
          </div>
          <p className="mt-1 text-[12px] text-[#8a929d]">{card.meta}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Score value={card.opportunityScore} level={card.opportunityLevel} />
          {card.externalLink ? (
            <a
              href={card.externalLink.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-[52px] items-center gap-2 rounded-md border border-[#dfe4ea] bg-[#fbfcfd] px-3 text-[12px] font-medium text-[#303640] transition hover:border-[#cbd5e1] hover:bg-white hover:text-[#174ea6]"
            >
              <span>{card.externalLink.label}</span>
              <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionTitle icon={Layers3} label="Stratejik Okuma" />
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {card.primaryInsights.map((insight, index) => (
              <InsightBlock
                key={insight.label}
                label={insight.label}
                value={insight.value}
                className={index === 2 ? "md:col-span-2" : undefined}
              />
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <InsightBlock label={card.recommendation.label} value={card.recommendation.value} />
            <InsightBlock label="İletişim Tonu" value={card.tone} />
          </div>
        </div>

        <div className="rounded-md border border-[#edf0f3] bg-[#fbfcfd] p-4 lg:col-span-4">
          <SectionTitle icon={MessageSquareText} label="İlk Mesaj Önerisi" />
          <p className="mt-3 text-[13px] leading-6 text-[#525a66]">{card.message}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {firstSection ? (
          <CollapsiblePanel
            icon={Signal}
            isOpen={isSignalsOpen}
            meta={firstSection.meta}
            title={firstSection.title}
            onToggle={() => setIsSignalsOpen((current) => !current)}
          >
            <ResearchSectionGrid cardTitle={card.title} section={firstSection} />
          </CollapsiblePanel>
        ) : null}

        {secondSection ? (
          <CollapsiblePanel
            icon={UserRound}
            isOpen={isPeopleOpen}
            meta={secondSection.meta}
            title={secondSection.title}
            onToggle={() => setIsPeopleOpen((current) => !current)}
          >
            <ResearchSectionGrid cardTitle={card.title} section={secondSection} compact />
          </CollapsiblePanel>
        ) : null}
      </div>
    </article>
  );
}

function ResearchSectionGrid({ cardTitle, compact, section }: { cardTitle: string; compact?: boolean; section: WorkspaceCard["researchSections"][number] }) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-2", compact && "xl:grid-cols-1")}>
      {section.items.map((item) => (
        <div key={`${cardTitle}-${section.title}-${item.title}`} className="rounded-md border border-[#edf0f3] bg-white p-3">
          <div className="text-[12px] font-semibold text-[#303640]">{item.title}</div>
          <p className="mt-1.5 text-[11px] leading-4 text-[#69707a]">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.links.map((url) => (
              <ResearchLink
                key={`${item.title}-${url.label}`}
                href={url.href}
                label={url.label}
                ariaLabel={`${cardTitle} ${item.title} ${url.label} araması`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CollapsiblePanel({
  children,
  icon: Icon,
  isOpen,
  meta,
  onToggle,
  title,
}: {
  children: React.ReactNode;
  icon: LucideIcon;
  isOpen: boolean;
  meta: string;
  onToggle: () => void;
  title: string;
}) {
  return (
    <section className="rounded-md border border-[#edf0f3] bg-[#fbfcfd]">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
        onClick={onToggle}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon className="size-3.5 text-[#2563eb]" />
          <span className="text-[12px] font-semibold text-[#303640]">{title}</span>
          <span className="hidden text-[11px] text-[#8a929d] sm:inline">{meta}</span>
        </span>
        <ChevronRight className={cn("size-4 text-[#8a929d] transition", isOpen && "rotate-90")} />
      </button>

      {isOpen ? <div className="border-t border-[#edf0f3] p-4">{children}</div> : null}
    </section>
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

function Score({ value, level }: { value: number; level: string }) {
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

function getActiveContext(workspace: WorkspaceConfig, filters: WorkspaceFilters) {
  const selected = workspace.filters
    .map((filter) => filters[filter.key])
    .filter((value) => value && value !== "Tümü")
    .slice(0, 3);

  return selected.length ? selected.join(" / ") : `${workspace.shortName} / Tüm fırsatlar`;
}
