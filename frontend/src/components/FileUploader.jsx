import React, { useCallback, useState } from 'react';
import './FileUploader.css';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FaUpload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const FileUploader = () => {
  const [status, setStatus] = useState('idle'); // idle | success | error

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setStatus('error');
      return;
    }

    const file = acceptedFiles[0];
    // Mock upload logic for now
    console.log('Uploaded file:', file);
    setStatus('success');

    // Reset after 2s
    setTimeout(() => setStatus('idle'), 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false
  });

  return (
    <motion.div
      className={`upload-container ${isDragActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="upload"
    >
      <div {...getRootProps()} className="drop-zone">
        <input {...getInputProps()} />
        <FaUpload className="upload-icon" />
        {isDragActive ? (
          <p>Drop your CSV here...</p>
        ) : (
          <p>Drag & Drop or click to upload your campaign CSV</p>
        )}
      </div>

      {status === 'success' && (
        <motion.div className="upload-feedback success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FaCheckCircle /> File uploaded successfully!
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div className="upload-feedback error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FaExclamationCircle /> Upload failed. Please try again.
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUploader;
