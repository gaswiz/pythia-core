"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function GoogleLookerModal({ data }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="mt-4 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700">
          Export to Looker Studio
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-xl text-black dark:text-white">
          <Dialog.Title className="text-lg font-bold mb-4">Export to Google Looker Studio</Dialog.Title>
          <Dialog.Description className="text-sm mb-4">
            Use the following options to export your simulated campaign data to a Google Looker Studio-compatible format.
          </Dialog.Description>

          <div className="text-sm space-y-3">
            <p className="font-semibold">Suggested Actions:</p>
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

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-sm text-neutral-500 hover:text-neutral-800 dark:hover:text-white">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
