"use client";

import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import ScatterDataset from "../../components/ScatterDataset";

import {
  IconBrandGoogle,
  IconBrandMeta,
} from "@tabler/icons-react";

export default function CampaignSimulationForm() {
  const [formData, setFormData] = useState({
    industry: "",
    budget: 0,
    duration: 0,
    impressions: 0,
  });
  const [simulationData, setSimulationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === "industry" ? value : Number(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulated backend ML logic
    const results = [
      {
        x: formData.budget,
        y: Math.random() * 100,
        label: "Predicted CTR",
      },
      {
        x: formData.duration,
        y: Math.random() * 10,
        label: "Predicted ROI",
      },
    ];

    setTimeout(() => {
      setSimulationData(results);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Run Your Campaign Simulation
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Enter your campaign details below to forecast CTR, CPC, ROI and more.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="industry">Select Industry</Label>
            <Input id="industry" onChange={handleChange} placeholder="e.g. Tech, Retail, Finance..." type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="budget">Budget (€)</Label>
            <Input id="budget" onChange={handleChange} placeholder="e.g. 5000" type="number" />
          </LabelInputContainer>
        </div>

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="duration">Duration (days)</Label>
            <Input id="duration" onChange={handleChange} placeholder="e.g. 30" type="number" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="impressions">Target Impressions</Label>
            <Input id="impressions" onChange={handleChange} placeholder="e.g. 100000" type="number" />
          </LabelInputContainer>
        </div>

        <button
          disabled={loading}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 disabled:opacity-50"
          type="submit"
        >
          {loading ? "Running..." : "Run Simulation →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <a
            href="https://marketingplatform.google.com/about/analytics/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </a>
          <a
            href="https://business.meta.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900"
          >
            <IconBrandMeta className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Meta
            </span>
            <BottomGradient />
          </a>
        </div>
      </form>

      {simulationData && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Simulation Output
          </h3>
          <ScatterDataset data={simulationData} />
        </div>
      )}
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
