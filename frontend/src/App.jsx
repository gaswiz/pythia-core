import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  IconArrowRight,
  IconBinaryTree2,
  IconBook2,
  IconBrandGoogle,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandYoutube,
  IconChartHistogram,
  IconCircleCheckFilled,
  IconClockHour4,
  IconDatabase,
  IconFileAnalytics,
  IconFlask2,
  IconLayoutKanban,
  IconPlayerPlayFilled,
  IconSparkles,
} from "@tabler/icons-react";

import {
  capabilityCards,
  demoScenarios,
  documentationLinks,
  evaluationMetrics,
  stackItems,
  workflowSteps,
} from "./demoData";


const API_BASE = (import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000").replace(/\/$/, "");
const MEDIANS = {
  budget: 12496,
  duration: 30,
  impressions: 5517,
  clicks: 550,
  conversionRate: 0.08,
  roi: 5.01,
};

const motionIn = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const chartFont = "\"IBM Plex Sans\", \"Inter\", \"Segoe UI\", sans-serif";
const chartTickStyle = {
  fill: "#94a3b8",
  tickLine: false,
  axisLine: false,
  fontFamily: chartFont,
  fontSize: 12,
};

function getChannelBadge(channel) {
  switch (channel) {
    case "Google Ads":
      return { label: "Google", icon: <IconBrandGoogle className="h-3.5 w-3.5" /> };
    case "Instagram":
      return { label: "Instagram", icon: <IconBrandInstagram className="h-3.5 w-3.5" /> };
    case "YouTube":
      return { label: "YouTube", icon: <IconBrandYoutube className="h-3.5 w-3.5" /> };
    default:
      return { label: channel, icon: null };
  }
}

const MotionSection = motion.section;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function formatPercent(value, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

function toFormState(scenario) {
  return {
    campaignType: scenario.campaignType,
    channel: scenario.channel,
    audience: scenario.audience,
    objective: scenario.objective,
    budget: scenario.budget,
    duration: scenario.duration,
    impressions: scenario.impressions,
    clicks: scenario.clicks,
    conversionRate: scenario.conversionRate,
    baselineRoi: scenario.baselineRoi,
  };
}

function buildFallbackPrediction(formState, scenario) {
  const ctrBase = formState.clicks / Math.max(formState.impressions, 1);
  const budgetFactor = Math.log10(formState.budget) / Math.log10(MEDIANS.budget);
  const durationFactor = formState.duration / MEDIANS.duration;
  const conversionFactor = formState.conversionRate / MEDIANS.conversionRate;
  const rawCtr =
    ctrBase * 0.72 +
    0.034 * conversionFactor +
    0.012 * durationFactor +
    0.009 * budgetFactor;

  const predictedCtr = clamp(rawCtr, 0.025, 0.18);
  const estimatedClicks = Math.round(formState.impressions * predictedCtr);
  const estimatedConversions = Math.max(1, Math.round(estimatedClicks * formState.conversionRate));
  const estimatedCpc = formState.budget / Math.max(estimatedClicks, 1);
  const estimatedRoi = clamp(
    formState.baselineRoi * 0.55 +
      (estimatedClicks / Math.max(formState.clicks, 1)) * 1.85 +
      conversionFactor * 1.65 -
      (estimatedCpc / 25) * 0.2,
    1.5,
    8,
  );
  const confidence = clamp(
    0.88 -
      Math.abs(formState.budget - MEDIANS.budget) / 42000 -
      Math.abs(formState.duration - MEDIANS.duration) / 120 -
      Math.abs(formState.impressions - MEDIANS.impressions) / 25000,
    0.52,
    0.92,
  );

  const contributions = [
    {
      label: "Conversion rate",
      value: Number((conversionFactor * 0.28).toFixed(3)),
      rationale: "Higher conversion rate increases forecast efficiency and lifts ROI framing.",
    },
    {
      label: "Impression volume",
      value: Number(((formState.impressions / MEDIANS.impressions) * 0.19).toFixed(3)),
      rationale: "More reach expands the potential click ceiling for the same campaign duration.",
    },
    {
      label: "Historical click prior",
      value: Number(((formState.clicks / MEDIANS.clicks) * 0.17).toFixed(3)),
      rationale: "The current simulator uses click history as a benchmark input for expected demand.",
    },
    {
      label: "Budget depth",
      value: Number((budgetFactor * 0.14).toFixed(3)),
      rationale: "Budget shapes delivery headroom, but does not dominate the forecast on its own.",
    },
    {
      label: "Campaign duration",
      value: Number((durationFactor * 0.11).toFixed(3)),
      rationale: "Longer duration smooths pacing and can raise total response volume.",
    },
  ].sort((a, b) => b.value - a.value);

  const payload = {
    Acquisition_Cost: formState.budget,
    Impressions: formState.impressions,
    Clicks: formState.clicks,
    Conversion_Rate: formState.conversionRate,
    Duration: formState.duration,
  };

  return {
    source: "Demo mode",
    mode: "fallback",
    scenarioName: scenario?.name || "Custom scenario",
    estimatedClicks,
    predictedCtr: predictedCtr * 100,
    estimatedRoi,
    estimatedConversions,
    estimatedCpc,
    confidence,
    roiCategory: estimatedRoi >= 5 ? "High ROI cohort" : estimatedRoi >= 3.5 ? "Balanced ROI cohort" : "Watchlist cohort",
    shapExplanation: contributions,
    payload,
    summary:
      "Fallback demo output is generated locally when the Flask API is unavailable. The UX stays aligned with the backend contract so it can be swapped to live inference without changing the interface.",
  };
}

async function requestPrediction(formState, scenario) {
  const payload = {
    Acquisition_Cost: Number(formState.budget),
    Impressions: Number(formState.impressions),
    Clicks: Number(formState.clicks),
    Conversion_Rate: Number(formState.conversionRate),
    Duration: Number(formState.duration),
  };

  try {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2600);
    const response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    window.clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Prediction request failed with ${response.status}`);
    }

    const data = await response.json();
    const estimatedClicks = Number(data.Estimated_Clicks || 0);
    const predictedCtr = (estimatedClicks / Math.max(payload.Impressions, 1)) * 100;
    const estimatedConversions = Math.round(estimatedClicks * payload.Conversion_Rate);
    const estimatedCpc = payload.Acquisition_Cost / Math.max(estimatedClicks, 1);
    const estimatedRoi = clamp(
      (scenario?.baselineRoi || MEDIANS.roi) * 0.68 +
        (estimatedClicks / Math.max(payload.Clicks, 1)) * 1.95 +
        (payload.Conversion_Rate / MEDIANS.conversionRate) * 1.2,
      1.5,
      8,
    );

    const shapExplanation = Object.entries(data.SHAP_Explanation || {})
      .map(([label, value]) => ({
        label: label.replaceAll("_", " "),
        value: Number(value),
        rationale: "Returned directly from the Flask prediction endpoint.",
      }))
      .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    return {
      source: "Flask API",
      mode: "live",
      scenarioName: scenario?.name || "Custom scenario",
      estimatedClicks,
      predictedCtr,
      estimatedRoi,
      estimatedConversions,
      estimatedCpc,
      confidence: 0.91,
      roiCategory: data.ROI_Category === 1 ? "High ROI cohort" : "Watchlist cohort",
      shapExplanation,
      payload,
      summary:
        "Live backend inference succeeded. KPI cards and feature influence are grounded in the Flask API response, with derived presentation metrics layered on top.",
    };
  } catch {
    return buildFallbackPrediction(formState, scenario);
  }
}

function buildProjection(result, duration) {
  const checkpoints = [0, 0.25, 0.5, 0.75, 1];
  return checkpoints.map((point, index) => ({
    step: index === 0 ? "Start" : `Day ${Math.max(1, Math.round(duration * point))}`,
    clicks: Math.round(result.estimatedClicks * point),
    conversions: Math.round(result.estimatedConversions * point),
    roi: Number((result.estimatedRoi * (0.35 + point * 0.65)).toFixed(2)),
  }));
}

function buildScenarioComparison() {
  return demoScenarios.map((scenario) => ({
    name: scenario.name.replace(" ", "\n"),
    roi: scenario.baselineRoi,
    clicks: scenario.clicks,
    ctr: Number(((scenario.clicks / scenario.impressions) * 100).toFixed(2)),
  }));
}

function buildPerformancePlot() {
  return evaluationMetrics.map((metric) => ({
    dataset: metric.dataset,
    primary: metric.metricValue,
    companion: metric.companionLabel === "MAE" ? Math.log10(metric.companionValue + 1) : metric.companionValue,
  }));
}

function App() {
  const defaultScenario = demoScenarios[0];
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id);
  const [formState, setFormState] = useState(() => toFormState(defaultScenario));
  const [result, setResult] = useState(() => buildFallbackPrediction(toFormState(defaultScenario), defaultScenario));
  const [isRunning, setIsRunning] = useState(false);

  const selectedScenario = demoScenarios.find((scenario) => scenario.id === selectedScenarioId) || defaultScenario;
  const comparisonData = useMemo(() => buildScenarioComparison(), []);
  const performancePlot = useMemo(() => buildPerformancePlot(), []);
  const projectionData = useMemo(() => buildProjection(result, formState.duration), [result, formState.duration]);

  useEffect(() => {
    const nextScenario = demoScenarios.find((scenario) => scenario.id === selectedScenarioId);
    if (!nextScenario) {
      return;
    }
    const nextForm = toFormState(nextScenario);
    setFormState(nextForm);
    setResult(buildFallbackPrediction(nextForm, nextScenario));
  }, [selectedScenarioId]);

  const handleFieldChange = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]:
        field === "campaignType" || field === "channel" || field === "audience" || field === "objective"
          ? value
          : Number(value),
    }));
  };

  const handleRunPrediction = async () => {
    setIsRunning(true);
    const nextResult = await requestPrediction(formState, selectedScenario);
    setResult(nextResult);
    setIsRunning(false);
  };

  return (
    <div className="app-shell text-slate-100">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <Hero result={result} />

    <MotionSection id="overview" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" {...motionIn}>
          <SectionFrame className="overflow-hidden">
            <SectionIntro
              eyebrow="Overview"
              title="Digital campaign forecasting, positioned as a credible product demo"
              description="P.Y.T.H.I.A. is framed here as an interactive pre-launch analytics surface: structured inputs in, forecast outputs out, model quality visible, and backend integration ready when the Flask API is online."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {capabilityCards.map((card) => (
                <div key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-base font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame>
            <SectionIntro
              eyebrow="Dataset pulse"
              title="Repository data anchors the demo presets"
              description="The simulator presets use the actual ranges found in the project dataset rather than decorative placeholder values."
            />
            <dl className="mt-8 space-y-4">
              <MetricRow label="Budget range" value="$5k - $20k" caption="Observed in marketing_campaign_dataset.csv" />
              <MetricRow label="Duration range" value="15 - 60 days" caption="Median campaign duration is 30 days" />
              <MetricRow label="Conversion rate" value="1% - 15%" caption="Upper quartile begins around 12%" />
              <MetricRow label="Clicks benchmark" value="100 - 1000" caption="Median campaign prior is roughly 550 clicks" />
            </dl>
          </SectionFrame>
        </MotionSection>

        <MotionSection id="demo" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]" {...motionIn}>
          <SectionFrame className="sticky-card">
            <SectionIntro
              eyebrow="Demo workspace"
              title="Run a scenario through the same backend contract used by Flask"
              description="Preset campaigns give reviewers a fast path into the product. Manual overrides keep the page useful even when the backend is offline."
            />

            <div className="mt-6 grid gap-3">
              {demoScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedScenarioId === scenario.id
                      ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{scenario.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-300">{scenario.summary}</p>
                    </div>
                    <span
                      className="flex items-center justify-center rounded-full border border-white/10 bg-black/30 px-2 py-1"
                      title={getChannelBadge(scenario.channel).label}
                      aria-label={getChannelBadge(scenario.channel).label}
                    >
                      <span className="text-slate-200">{getChannelBadge(scenario.channel).icon}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Field label="Campaign type">
                <select
                  value={formState.campaignType}
                  onChange={(event) => handleFieldChange("campaignType", event.target.value)}
                  className="field-input"
                >
                  {["Search", "Display", "Influencer", "Email", "Social Media"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
              <Field label="Channel">
                <select
                  value={formState.channel}
                  onChange={(event) => handleFieldChange("channel", event.target.value)}
                  className="field-input"
                >
                  {["Google Ads", "Instagram", "YouTube", "Email", "Website"].map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </Field>
              <Field label="Target audience">
                <input
                  value={formState.audience}
                  onChange={(event) => handleFieldChange("audience", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Objective">
                <input
                  value={formState.objective}
                  onChange={(event) => handleFieldChange("objective", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Budget">
                <input
                  type="number"
                  value={formState.budget}
                  onChange={(event) => handleFieldChange("budget", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Duration (days)">
                <input
                  type="number"
                  min="15"
                  max="60"
                  value={formState.duration}
                  onChange={(event) => handleFieldChange("duration", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Impressions">
                <input
                  type="number"
                  value={formState.impressions}
                  onChange={(event) => handleFieldChange("impressions", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Click prior">
                <input
                  type="number"
                  value={formState.clicks}
                  onChange={(event) => handleFieldChange("clicks", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Conversion rate">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="0.2"
                  value={formState.conversionRate}
                  onChange={(event) => handleFieldChange("conversionRate", event.target.value)}
                  className="field-input"
                />
              </Field>
              <Field label="Baseline ROI">
                <input
                  type="number"
                  step="0.01"
                  value={formState.baselineRoi}
                  onChange={(event) => handleFieldChange("baselineRoi", event.target.value)}
                  className="field-input"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={handleRunPrediction} className="primary-button" disabled={isRunning}>
                <IconPlayerPlayFilled className="h-4 w-4" />
                {isRunning ? "Running prediction..." : "Run prediction"}
              </button>
              <a href="#architecture" className="secondary-button">
                <IconBinaryTree2 className="h-4 w-4" />
                View inference flow
              </a>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">API mode</p>
              <p className="mt-1 leading-6">
                The simulator first attempts <code>{API_BASE}/predict</code>. If the Flask API is unavailable, the page switches to a local demo engine with the same payload shape.
              </p>
            </div>
          </SectionFrame>

          <div className="grid gap-6">
            <SectionFrame>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className={`status-pill ${result.mode === "live" ? "status-live" : "status-demo"}`}>{result.source}</span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">Prediction output</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{result.summary}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">ROI cohort</div>
                  <div className="mt-2 text-base font-semibold">{result.roiCategory}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <KpiCard label="Estimated clicks" value={formatNumber(result.estimatedClicks)} detail={`Scenario: ${result.scenarioName}`} />
                <KpiCard label="Predicted CTR" value={formatPercent(result.predictedCtr, 2)} detail={`Impressions: ${formatNumber(formState.impressions)}`} />
                <KpiCard label="Estimated ROI" value={`${result.estimatedRoi.toFixed(2)}x`} detail={`Baseline: ${formState.baselineRoi.toFixed(2)}x`} />
                <KpiCard label="Confidence band" value={formatPercent(result.confidence * 100, 0)} detail={`Conversions: ${formatNumber(result.estimatedConversions)}`} />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-1">
                <ChartPanel title="Forecast pacing" subtitle="Derived projection of clicks, conversions, and ROI over campaign runtime.">
                  <ResponsiveContainer width="100%" height={420}>
                    <LineChart data={projectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
                      <XAxis dataKey="step" {...chartTickStyle} />
                      <YAxis yAxisId="left" {...chartTickStyle} />
                      <YAxis yAxisId="right" orientation="right" {...chartTickStyle} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Legend wrapperStyle={{ fontFamily: chartFont }} />
                      <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="#22d3ee" strokeWidth={3} dot={false} />
                      <Line yAxisId="left" type="monotone" dataKey="conversions" name="Conversions" stroke="#f97316" strokeWidth={2} dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI" stroke="#facc15" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartPanel>

                <ChartPanel title="Feature influence" subtitle="Live mode uses SHAP from the API when available. Demo mode exposes a deterministic fallback.">
                  <ResponsiveContainer width="100%" height={420}>
                    <BarChart data={result.shapExplanation}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
                      <XAxis type="number" {...chartTickStyle} />
                      <YAxis dataKey="label" type="category" width={135} {...chartTickStyle} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="value" radius={[0, 10, 10, 0]}>
                        {result.shapExplanation.map((entry, index) => (
                          <Cell key={entry.label} fill={index % 2 === 0 ? "#22d3ee" : "#7dd3fc"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPanel>
              </div>
            </SectionFrame>

          <SectionFrame>
            <SectionIntro
              eyebrow="Payload + scenario compare"
              title="What the backend sees and where it lands"
              description="The backend request contract stays visible in one place, with scenario benchmarking right next to it."
            />
            <pre className="mt-6 overflow-auto rounded-xl border border-white/10 bg-slate-950/90 p-5 text-xs leading-6 text-slate-300">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
            <div className="mt-8">
              <ResponsiveContainer width="100%" height={390}>
                <AreaChart data={comparisonData}>
                  <defs>
                    <linearGradient id="roiGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
                  <XAxis dataKey="name" {...chartTickStyle} />
                  <YAxis {...chartTickStyle} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: chartFont }} />
                  <Area type="monotone" dataKey="roi" stroke="#22d3ee" fill="url(#roiGradient)" name="ROI baseline" />
                  <Line type="monotone" dataKey="ctr" stroke="#f59e0b" name="CTR %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SectionFrame>
          </div>
        </MotionSection>

        <MotionSection id="insights" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]" {...motionIn}>
          <SectionFrame>
            <SectionIntro
              eyebrow="Model insights"
              title="Evaluation metrics from the committed experiment outputs"
              description="These panels use the experiment results already stored in the repository. They describe what the project can support today, including one weak regression case and one high-accuracy but imbalanced classifier."
            />

            <div className="mt-8 grid gap-4">
              {evaluationMetrics.map((metric) => (
                <div key={metric.dataset} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{metric.dataset}</h3>
                      <p className="mt-1 text-sm text-slate-300">{metric.model}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-right">
                      <MetricBadge label={metric.metricLabel} value={metric.metricValue} />
                      <MetricBadge label={metric.companionLabel} value={metric.companionValue} />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{metric.note}</p>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame>
            <SectionIntro
              eyebrow="Performance profile"
              title="Repository experiment snapshot"
              description="The chart below puts the three available experiment summaries side by side. Companion values use a log scale when MAE units are too large to compare directly."
            />
            <div className="mt-8">
              <ResponsiveContainer width="100%" height={390}>
                <BarChart data={performancePlot}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.12)" />
                  <XAxis dataKey="dataset" {...chartTickStyle} />
                  <YAxis {...chartTickStyle} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontFamily: chartFont }} />
                  <Bar dataKey="primary" name="Primary metric" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="companion" name="Companion metric / log10(MAE)" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
              <strong>Interpretation note:</strong> the classified advertising experiment reports 99.5% accuracy, but the underlying test support is heavily skewed. The UI deliberately keeps that caveat visible instead of presenting the number as a blanket performance claim.
            </div>
          </SectionFrame>
        </MotionSection>

        <MotionSection id="architecture" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" {...motionIn}>
          <SectionFrame>
            <SectionIntro
              eyebrow="Architecture"
              title="From simulation input to interpreted output"
              description="The product flow is designed to make the Python backend legible to reviewers without pretending this is already a production SaaS platform."
            />
            <div className="mt-8 grid gap-4">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                      0{index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame>
            <SectionIntro
              eyebrow="Tech stack"
              title="Frontend and backend foundation"
              description="The redesign stays inside the repo’s current stack instead of swapping frameworks or layering on a fake dashboard shell."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {stackItems.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoTile icon={<IconLayoutKanban className="h-5 w-5" />} title="Product shell">
                Sticky navigation, section anchors, and a coherent review flow instead of disconnected template blocks.
              </InfoTile>
              <InfoTile icon={<IconFlask2 className="h-5 w-5" />} title="Backend ready">
                Live prediction attempts route to Flask first, then degrade gracefully to demo mode when the API is not reachable.
              </InfoTile>
              <InfoTile icon={<IconChartHistogram className="h-5 w-5" />} title="Evidence visible">
                Evaluation metrics, scenario comparisons, and feature influence are surfaced as first-class content.
              </InfoTile>
              <InfoTile icon={<IconDatabase className="h-5 w-5" />} title="Repo grounded">
                Scenario presets and metric ranges are tied back to the repository dataset and experiment outputs.
              </InfoTile>
            </div>
          </SectionFrame>
        </MotionSection>

        <MotionSection id="documentation" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" {...motionIn}>
          <SectionFrame>
            <SectionIntro
              eyebrow="Documentation"
              title="Project references for reviewers and supervisors"
              description="This section keeps the portfolio/demo experience anchored to the underlying repository material."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {documentationLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-white">{link.title}</h3>
                    <IconArrowRight className="h-4 w-4 text-slate-300 transition group-hover:text-cyan-300" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{link.description}</p>
                </a>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame>
            <SectionIntro
              eyebrow="Academic context"
              title="Final-year project, presented with stronger product discipline"
              description="The frontend keeps the project grounded as an academic ML prototype rather than overstating commercial maturity."
            />
            <dl className="mt-8 space-y-4">
              <MetricRow label="Institution" value="University of East London" caption="BSc Computer Science final-year project context" />
              <MetricRow label="System focus" value="Pre-launch digital ad forecasting" caption="Regression and classification outputs around campaign performance" />
              <MetricRow label="Backend" value="Python / Flask" caption="Prediction, recommendation, upload, and health endpoints" />
              <MetricRow label="Frontend role" value="Interactive review surface" caption="Product demo, scenario simulation, model evidence, and documentation routing" />
            </dl>
          </SectionFrame>
        </MotionSection>
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  const items = [
    { label: "Overview", href: "#overview" },
    { label: "Demo", href: "#demo" },
    { label: "Model Insights", href: "#insights" },
    { label: "Documentation", href: "#documentation" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
            <IconSparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">P.Y.T.H.I.A.</div>
            <div className="text-xs text-slate-400">Predict Your Trends, Harnessing Intelligent Analytics</div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-cyan-300">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#demo" className="secondary-button hidden md:inline-flex">
            <IconPlayerPlayFilled className="h-4 w-4" />
            Try demo
          </a>
          <a
            href="https://github.com/gaswiz/pythia-core"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button"
          >
            <IconBrandGithub className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ result }) {
  return (
    <MotionSection id="top" className="hero-panel overflow-hidden" {...motionIn}>
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="status-pill status-demo">ML product demo for digital advertising forecasting</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Predict campaign performance before launch, then explain the result like a reviewer expects.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            P.Y.T.H.I.A. packages the project’s Flask inference workflow into a product-facing demo: campaign inputs, forecast outputs, evaluation evidence, feature influence, and architecture context in one review-ready interface.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demo" className="primary-button">
              <IconPlayerPlayFilled className="h-4 w-4" />
              Try demo
            </a>
            <a href="#architecture" className="secondary-button">
              <IconBinaryTree2 className="h-4 w-4" />
              View architecture
            </a>
            <a
              href="https://github.com/gaswiz/pythia-core"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button"
            >
              <IconBrandGithub className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-white/10 bg-slate-950/75 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current preview</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{result.scenarioName}</h2>
              </div>
              <span className={`status-pill ${result.mode === "live" ? "status-live" : "status-demo"}`}>{result.source}</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PreviewCard label="Estimated clicks" value={formatNumber(result.estimatedClicks)} icon={<IconFileAnalytics className="h-4 w-4" />} />
              <PreviewCard label="Predicted CTR" value={formatPercent(result.predictedCtr, 2)} icon={<IconChartHistogram className="h-4 w-4" />} />
              <PreviewCard label="Estimated ROI" value={`${result.estimatedRoi.toFixed(2)}x`} icon={<IconCircleCheckFilled className="h-4 w-4" />} />
              <PreviewCard label="Confidence" value={formatPercent(result.confidence * 100, 0)} icon={<IconClockHour4 className="h-4 w-4" />} />
            </div>
          </div>
          <div className="hero-video-frame">
            <video
              className="h-full w-full object-cover"
              src="/hero-main.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="video-overlay">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Reviewer path</p>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-200">
                  Open the demo, load a scenario, inspect the payload, compare the output with experiment metrics, and trace how the Flask API would process the request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-300">P.Y.T.H.I.A.</div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
            Predictive analytics for digital advertising campaigns, presented as a more credible product demo without pretending to be a finished commercial platform.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Sections</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li><a href="#overview" className="transition hover:text-cyan-300">Overview</a></li>
            <li><a href="#demo" className="transition hover:text-cyan-300">Demo</a></li>
            <li><a href="#insights" className="transition hover:text-cyan-300">Model Insights</a></li>
            <li><a href="#documentation" className="transition hover:text-cyan-300">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">Project links</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>
              <a href="https://github.com/gaswiz/pythia-core" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">
                Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/gaswiz" target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">
                GitHub profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SectionFrame({ children, className = "" }) {
  return <section className={`section-frame ${className}`}>{children}</section>;
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="block text-xs uppercase tracking-[0.22em] text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function KpiCard({ label, value, detail }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{detail}</div>
    </div>
  );
}

function PreviewCard({ label, value, icon }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function ChartPanel({ title, subtitle, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function MetricRow({ label, value, caption }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <div>
        <dt className="text-xs uppercase tracking-[0.22em] text-slate-400">{label}</dt>
        <dd className="mt-2 text-sm text-slate-300">{caption}</dd>
      </div>
      <div className="text-right text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function MetricBadge({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white">{typeof value === "number" ? value.toFixed(3) : value}</div>
    </div>
  );
}

function InfoTile({ icon, title, children }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3 text-cyan-300">
        {icon}
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  borderRadius: "12px",
  color: "#e2e8f0",
  fontFamily: chartFont,
};

export default App;
