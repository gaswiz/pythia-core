"use client";

import React from "react";
import { BentoGrid, BentoGridItem, ImageHeader } from "./bento-grid";
import {
  IconDownload,
  IconDatabaseImport,
  IconUpload,
  IconChartBar,
  IconArrowBarToDown,
  IconCloudUpload,
  IconDeviceAnalytics,
} from "@tabler/icons-react";

export default function GoogleLookerModal() {
  return (
    <section className="w-full bg-neutral-900 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">
          Google Looker Studio Export Options
        </h2>

        <BentoGrid className="max-w-5xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const items = [
  {
    title: "Download as CSV",
    description: "Export your simulated campaign data as a .csv file.",
    header: <ImageHeader src="/suite.jpg" />,
    icon: <IconDownload className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Google Sheets",
    description: "Copy data to a sheet to connect with Looker Studio.",
    header: <ImageHeader src="/google-sheets.jpg" />,
    icon: <IconCloudUpload className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Community Connector",
    description: "Use a custom connector to fetch predictions in real time.",
    header: <ImageHeader src="/connector.jpg" />,
    icon: <IconDatabaseImport className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Embed Visuals",
    description: "Embed Looker Studio graphs directly into your dashboard.",
    header: <ImageHeader src="/points.jpg" />,
    icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Import to Workspace",
    description: "Bring your forecast results into a Workspace report.",
    header: <ImageHeader src="/workspace.jpg" />,
    icon: <IconArrowBarToDown className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Upload JSON",
    description: "Generate a JSON file to integrate with APIs or exports.",
    header: <ImageHeader src="/json.jpg" />,
    icon: <IconUpload className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Analytics Suite",
    description: "Send simulation data to a connected analytics platform.",
    header: <ImageHeader src="/analytics.jpg" />,
    icon: <IconDeviceAnalytics className="h-4 w-4 text-neutral-500" />,
  },
];
