// File: src/components/ui/file-upload-demo.tsx

"use client";

import React, { useState } from "react";
import { FileUpload } from "./file-upload"; // ✅ only one correct import

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log("Uploaded files:", files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}