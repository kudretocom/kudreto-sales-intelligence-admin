export type WorkspaceFilter = {
  key: string;
  label: string;
  options: string[];
};

export type WorkspaceFilters = Record<string, string>;

export type ResearchLink = {
  label: string;
  href: string;
};

export type ResearchSection = {
  title: string;
  meta: string;
  items: Array<{
    title: string;
    description: string;
    links: ResearchLink[];
  }>;
};

export type WorkspaceCard = {
  id: string;
  title: string;
  meta: string;
  category: string;
  opportunityType: string;
  opportunityScore: number;
  opportunityLevel: string;
  primaryInsights: Array<{
    label: string;
    value: string;
  }>;
  recommendation: {
    label: string;
    value: string;
  };
  tone: string;
  message: string;
  externalLink?: {
    label: string;
    href: string;
  };
  researchSections: ResearchSection[];
};

export type WorkspaceConfig = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  eyebrow: string;
  filters: WorkspaceFilter[];
  initialFilters: WorkspaceFilters;
  opportunityTypes: string[];
  cardFieldLabels: string[];
  analysisPrompt: string;
  sampleCompanies: string[];
  messageToneRules: string[];
  resultTitle: string;
  resultDescription: string;
  runAnalysis: (filters: WorkspaceFilters) => WorkspaceCard[];
};
