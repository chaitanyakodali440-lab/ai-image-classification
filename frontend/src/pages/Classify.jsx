import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Clock, 
  Sparkles, 
  Layers, 
  BarChart3, 
  ArrowRight,
  FileCheck,
  X
} from 'lucide-react';
import api from '../services/api';

export default function Classify() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported file type. Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10MB limit. Please choose a smaller image.');
      return;
    }

    setError(null);
    setResult(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const data = await api.classifyImage(selectedFile, (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (data.success) {
        setResult(data);
      } else {
        setError(data.message || 'Image classification failed.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Inference server error. Please ensure backend is running.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MobileNetV2 Deep Neural Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">AI Image Classifier</h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Upload any image from your computer to analyze visual contents and compute confidence probabilities across ImageNet classes.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 shadow-sm animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-sm">
            <span className="font-semibold">Classification Error: </span>
            {error}
          </div>
          <button onClick={() => setError(null)} className="text-rose-500 hover:text-rose-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Working Zone */}
      {!result ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden p-6 sm:p-10 transition-all">
          {!previewUrl ? (
            /* Drag and Drop Zone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-4 ${
                isDragging
                  ? 'border-brand-500 bg-brand-50/60 scale-[0.99]'
                  : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
                <UploadCloud className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-navy-950">
                  Drag & drop your image here, or <span className="text-brand-600 underline">browse files</span>
                </p>
                <p className="text-xs text-slate-500">Supports JPG, JPEG, PNG (up to 10MB)</p>
              </div>
            </div>
          ) : (
            /* Image Preview & Classify Action */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-700 font-medium">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  <span className="truncate max-w-xs sm:max-w-md">{selectedFile?.name}</span>
                  <span className="text-slate-400 text-xs">
                    ({(selectedFile?.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-rose-600 flex items-center space-x-1 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Choose Different</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center max-h-[420px] shadow-inner">
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="max-h-[420px] w-auto object-contain mx-auto transition-transform duration-300"
                />
              </div>

              {/* Upload Progress Bar if processing */}
              {loading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center">
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin text-brand-600" />
                      Classifying with TensorFlow MobileNetV2...
                    </span>
                    <span>Processing</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-600 to-cyan-400 rounded-full animate-pulse w-full"></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleClassify}
                  disabled={loading}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-60 transition duration-150 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Classifying Image...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Classify Image</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Section (Side-by-side or stacked on mobile) */
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden p-6 sm:p-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Uploaded Image Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
                <img
                  src={previewUrl}
                  alt={result.predicted_category}
                  className="w-full max-h-[380px] object-contain"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span className="font-mono truncate max-w-[200px]">{result.filename}</span>
                <span className="flex items-center text-slate-500">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Latency: {result.processing_time}s
                </span>
              </div>
            </div>

            {/* Right Col: Prediction Details & Top 3 Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Primary Prediction Badge */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-sky-50/50 border border-brand-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                    Top Prediction
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-600 text-white text-xs font-bold shadow-sm">
                    {result.confidence_score.toFixed(1)}% Confidence
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-navy-950 tracking-tight capitalize">
                  {result.predicted_category}
                </h2>
                <p className="text-xs text-slate-500">
                  ImageNet Class matched using MobileNetV2 neural weights.
                </p>
              </div>

              {/* Top 3 Predictions Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-brand-600" />
                  <span>Top 3 Candidate Categories</span>
                </h3>

                <div className="space-y-3">
                  {result.top_predictions.map((pred, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition duration-150 space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 font-semibold text-navy-950">
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold">
                            #{pred.rank}
                          </span>
                          <span>{pred.label}</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-700">
                          {pred.confidence.toFixed(1)}%
                        </span>
                      </div>
                      
                      {/* Confidence Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            idx === 0 
                              ? 'bg-brand-600' 
                              : idx === 1 
                              ? 'bg-sky-500' 
                              : 'bg-slate-400'
                          }`}
                          style={{ width: `${Math.max(pred.confidence, 4)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow transition duration-150 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Classify Another Image</span>
                </button>

                <a
                  href="/history"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition duration-150 text-center"
                >
                  View in History
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
