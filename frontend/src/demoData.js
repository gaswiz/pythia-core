export const demoScenarios = [
  {
    id: "search-launch",
    name: "Search Launch Sprint",
    summary: "Balanced acquisition scenario based on the median campaign profile in the repository dataset.",
    campaignType: "Search",
    channel: "Google Ads",
    audience: "Men 25-34",
    objective: "Lead generation",
    budget: 12496,
    duration: 30,
    impressions: 5517,
    clicks: 550,
    conversionRate: 0.08,
    baselineRoi: 5.01,
    notes: "Grounded on the central tendency of the marketing campaign dataset.",
  },
  {
    id: "retargeting-push",
    name: "Retargeting Push",
    summary: "Higher-intent setup tuned toward stronger conversion efficiency and higher spend tolerance.",
    campaignType: "Display",
    channel: "Instagram",
    audience: "Women 25-34",
    objective: "Reactivation",
    budget: 16264,
    duration: 45,
    impressions: 7753,
    clicks: 775,
    conversionRate: 0.12,
    baselineRoi: 6.51,
    notes: "Uses upper-quartile ranges for spend, clicks, and conversion rate.",
  },
  {
    id: "awareness-test",
    name: "Awareness Test",
    summary: "Lean top-of-funnel campaign designed to show lower-cost, shorter-duration experimentation.",
    campaignType: "Influencer",
    channel: "YouTube",
    audience: "All Ages",
    objective: "Awareness",
    budget: 8739,
    duration: 15,
    impressions: 3266,
    clicks: 325,
    conversionRate: 0.05,
    baselineRoi: 3.5,
    notes: "Based on lower-quartile campaign inputs from the dataset.",
  },
];

export const capabilityCards = [
  {
    title: "Structured campaign intake",
    description: "Campaign budget, duration, impressions, clicks, and conversion rate are normalized into the feature set used by the Flask inference API.",
  },
  {
    title: "Pre-launch forecasting",
    description: "The system estimates campaign class outcomes and expected clicks before launch so teams can compare scenarios without spending live budget.",
  },
  {
    title: "Explainable outputs",
    description: "Prediction responses can surface feature contribution data from the backend SHAP pipeline, with a demo-safe fallback for local review sessions.",
  },
  {
    title: "Experiment-backed evaluation",
    description: "The UI references actual experiment outputs committed in the repository so reviewers can inspect model quality instead of marketing claims.",
  },
];

export const workflowSteps = [
  {
    title: "Campaign payload",
    detail: "A structured input bundle is assembled from scenario presets or manual edits in the simulator.",
  },
  {
    title: "Flask inference layer",
    detail: "The frontend calls the Flask API when available. If it is offline, the demo engine preserves the interaction flow for local review.",
  },
  {
    title: "Feature normalization",
    detail: "Core model inputs map to acquisition cost, impressions, clicks, conversion rate, and duration to match the backend runtime contract.",
  },
  {
    title: "Model response",
    detail: "The result surface highlights estimated clicks, derived CTR, ROI framing, and feature influence to support interpretation.",
  },
];

export const documentationLinks = [
  {
    title: "Repository",
    href: "https://github.com/gaswiz/pythia-core",
    description: "Source code, setup context, and current project status.",
  },
  {
    title: "Backend Notes",
    href: "https://github.com/gaswiz/pythia-core/blob/main/backend.md",
    description: "Flask routes, model context, and backend implementation notes.",
  },
  {
    title: "Frontend Notes",
    href: "https://github.com/gaswiz/pythia-core/blob/main/frontend.md",
    description: "Frontend structure and local UI implementation notes.",
  },
  {
    title: "Installation",
    href: "https://github.com/gaswiz/pythia-core/blob/main/installation.md",
    description: "Local environment and startup instructions.",
  },
];

export const evaluationMetrics = [
  {
    dataset: "Advertising Standard",
    model: "LinearRegression",
    metricLabel: "R²",
    metricValue: 0.434,
    companionLabel: "MAE",
    companionValue: 0.771,
    note: "Regression baseline using click-through rate and cost-per-click features.",
  },
  {
    dataset: "Advertising Classified",
    model: "LogisticRegression",
    metricLabel: "Accuracy",
    metricValue: 0.995,
    companionLabel: "Weighted F1",
    companionValue: 0.993,
    note: "Classification output is strong overall, but the class distribution in the experiment is highly imbalanced.",
  },
  {
    dataset: "Ecommerce Shop",
    model: "LinearRegression",
    metricLabel: "R²",
    metricValue: 0.132,
    companionLabel: "MAE",
    companionValue: 487.149,
    note: "The weakest performer in the repo and a good reminder that dataset fit varies by campaign domain.",
  },
];

export const stackItems = [
  "React 19",
  "Vite 6",
  "Tailwind utility classes",
  "framer-motion",
  "Recharts",
  "@mui/x-charts",
  "@tabler/icons-react",
  "Flask inference API",
];
