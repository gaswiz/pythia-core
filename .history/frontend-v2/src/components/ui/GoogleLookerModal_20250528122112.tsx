"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";


export default function GoogleLookerModal({ data }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700">
          Export to Looker Studio
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-xl max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 shadow-xl text-black dark:text-white">
        <h3 className="text-lg font-bold mb-4">Export to Google Looker Studio</h3>
        <p className="text-sm mb-4">
          Use the following options to export your simulated campaign data to a Google Looker Studio-compatible format.
        </p>

        <div className="text-sm space-y-3">
          <p><strong>Suggested Actions:</strong></p>
          <ul className="list-disc list-inside text-neutral-700 dark:text-neutral-300">
            <li>Download CSV file and upload it manually to Looker Studio.</li>
            <li>Use Google Sheets as a data connector and paste the values there.</li>
            <li>Use Looker Studio's community connector to fetch predictions directly.</li>
          </ul>

          <div className="mt-4">
            <button className="px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700">
              Download CSV
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
