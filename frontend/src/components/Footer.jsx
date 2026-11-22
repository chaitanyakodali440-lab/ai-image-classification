import React from 'react';
import { GitBranch, Box, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-navy-800 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500"></span>
              <span>AI-Based Image Classification System</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An enterprise-grade deep learning solution powered by TensorFlow MobileNetV2 and integrated with automated DevOps CI/CD pipelines, Docker containerization, and SQLite analytics tracking.
            </p>
            <div className="flex items-center space-x-3 mt-4 text-xs text-slate-500">
              <span className="flex items-center"><Box className="w-3.5 h-3.5 mr-1 text-sky-400" /> Docker</span>
              <span>•</span>
              <span className="flex items-center"><GitBranch className="w-3.5 h-3.5 mr-1 text-emerald-400" /> GitHub Actions</span>
              <span>•</span>
              <span className="flex items-center"><Terminal className="w-3.5 h-3.5 mr-1 text-brand-400" /> Pytest</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/classify" className="hover:text-white transition">Image Classifier</a></li>
              <li><a href="/dashboard" className="hover:text-white transition">Analytics Dashboard</a></li>
              <li><a href="/history" className="hover:text-white transition">Classification History</a></li>
              <li><a href="/about" className="hover:text-white transition">About Project & DevOps</a></li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Frontend: <span className="text-slate-200">React 18, Vite, Tailwind</span></li>
              <li>Backend: <span className="text-slate-200">Python Flask REST API</span></li>
              <li>Deep Learning: <span className="text-slate-200">TensorFlow MobileNetV2</span></li>
              <li>Database: <span className="text-slate-200">SQLite History DB</span></li>
              <li>CI/CD: <span className="text-slate-200">GitHub Actions & Docker</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AI VisionOps — B.Tech Project Demonstration.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="flex items-center text-emerald-400">
              <ShieldCheck className="w-4 h-4 mr-1" /> Automated Testing Passing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
