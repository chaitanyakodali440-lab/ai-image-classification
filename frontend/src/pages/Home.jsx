import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  UploadCloud, 
  Cpu, 
  BarChart, 
  ShieldCheck, 
  GitBranch, 
  Box, 
  Workflow, 
  Layers, 
  Database, 
  CheckCircle, 
  Zap, 
  Sparkles,
  Server
} from 'lucide-react';

export default function Home() {
  const steps = [
    {
      number: '01',
      title: 'Upload Image',
      desc: 'Drag & drop or browse any JPG, JPEG, or PNG image up to 10MB into the high-speed intake zone.',
      icon: UploadCloud,
    },
    {
      number: '02',
      title: 'Neural Tensor Processing',
      desc: 'The image is preprocessed to 224×224 pixels and fed into a deep convolutional MobileNetV2 neural network.',
      icon: Cpu,
    },
    {
      number: '03',
      title: 'Top-3 ImageNet Inference',
      desc: 'Extract probabilities across 1,000 object categories with precision confidence scoring in milliseconds.',
      icon: Zap,
    },
    {
      number: '04',
      title: 'SQLite Logging & Analytics',
      desc: 'Inference results, latency metrics, and image metadata are persistently saved to the SQLite database.',
      icon: Database,
    },
  ];

  const techStack = [
    { name: 'React 18 & Vite', category: 'Frontend', desc: 'Blazing-fast single-page interface with hot module reloading.' },
    { name: 'Tailwind CSS', category: 'UI/UX', desc: 'Modern responsive styling, custom navy design system, and sleek cards.' },
    { name: 'Flask REST API', category: 'Backend', desc: 'Lightweight, asynchronous-ready Python web service with CORS.' },
    { name: 'TensorFlow MobileNetV2', category: 'Deep Learning', desc: 'Pretrained on 1.4M images from ImageNet-1K with depthwise convolutions.' },
    { name: 'SQLite3', category: 'Database', desc: 'Self-contained zero-configuration ACID relational history storage.' },
    { name: 'Docker & Compose', category: 'DevOps Containerization', desc: 'Reproducible multi-stage container builds for frontend and backend.' },
    { name: 'GitHub Actions', category: 'CI/CD Automation', desc: 'Automated test execution, linting, Docker verification, and deployment.' },
    { name: 'Pytest Suite', category: 'DevOps QA', desc: 'Comprehensive unit, integration, and endpoint validation tests.' },
  ];

  const devopsPipeline = [
    { stage: 'Version Control', tool: 'Git & GitHub', detail: 'Feature branch workflow, pull requests, semantic commit tracking.' },
    { stage: 'Automated Testing', tool: 'Pytest', detail: 'Validates API endpoints, file security, image parsing, and database transactions.' },
    { stage: 'Continuous Integration', tool: 'GitHub Actions', detail: 'Triggers on push to main: installs deps, runs tests, builds frontend.' },
    { stage: 'Containerization', tool: 'Docker & Compose', detail: 'Isolates runtime environments, mounts persistent volumes, links services.' },
    { stage: 'Continuous Deployment', tool: 'Render Cloud', detail: 'Automatic webhook deployment of Docker containers into production.' },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-slate-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 border-b border-navy-800">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered • DevOps Engineered • Production Ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            AI-Based Image Classification <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-sky-300 to-blue-200">
              System
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            Upload any image to classify objects instantly with a pretrained deep learning model.
            Engineered using continuous integration, automated Pytest suites, Docker containerization, and GitHub Actions CI/CD.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/classify"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Get Started & Classify</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-navy-800/80 hover:bg-navy-700/80 text-slate-200 font-semibold text-base border border-navy-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              <BarChart className="w-5 h-5 text-brand-400" />
              <span>View Analytics</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 text-left">
              <div className="text-2xl font-bold text-white">MobileNetV2</div>
              <div className="text-xs text-slate-400 mt-1">Pretrained CNN Backbone</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 text-left">
              <div className="text-2xl font-bold text-brand-400">1,000</div>
              <div className="text-xs text-slate-400 mt-1">ImageNet Classes Recognized</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 text-left">
              <div className="text-2xl font-bold text-emerald-400">&lt; 150ms</div>
              <div className="text-xs text-slate-400 mt-1">Average Inference Latency</div>
            </div>
            <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 text-left">
              <div className="text-2xl font-bold text-sky-400">100% CI/CD</div>
              <div className="text-xs text-slate-400 mt-1">Automated Test & Deployment</div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">Workflow</h2>
          <h3 className="text-3xl font-bold text-navy-950 sm:text-4xl">How The Classification Works</h3>
          <p className="text-slate-600 text-base">
            From raw pixel intake to probability normalization and persistent telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-brand-300 transition duration-200 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-200">{step.number}</span>
                </div>
                <h4 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DevOps Workflow Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-600/20 text-brand-400 text-xs font-semibold uppercase tracking-wider border border-brand-500/30">
              <Workflow className="w-3.5 h-3.5 mr-1" /> DevOps Lifecycle
            </span>
            <h3 className="text-3xl font-bold text-white sm:text-4xl">Continuous Integration & Deployment</h3>
            <p className="text-slate-400 text-base">
              Industry standard DevOps practices are embedded across the entire software development lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {devopsPipeline.map((pipe, idx) => (
              <div 
                key={idx} 
                className="bg-navy-950/70 rounded-xl p-5 border border-slate-800 hover:border-brand-500/40 transition duration-200 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">
                    Step {idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{pipe.stage}</h4>
                  <div className="inline-block px-2 py-0.5 rounded bg-brand-900/50 text-cyan-300 text-xs font-mono mb-3 border border-brand-700/50">
                    {pipe.tool}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{pipe.detail}</p>
                </div>
                {idx < devopsPipeline.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600">Components</h2>
          <h3 className="text-3xl font-bold text-navy-950 sm:text-4xl">Technology Stack Overview</h3>
          <p className="text-slate-600 text-base">
            Curated modern tech stack combining lightweight edge deep learning with enterprise DevOps tooling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech) => (
            <div 
              key={tech.name} 
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition duration-200 hover:-translate-y-0.5"
            >
              <div className="text-xs font-semibold text-brand-600 mb-1">{tech.category}</div>
              <h4 className="text-base font-bold text-navy-950 mb-2">{tech.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-navy-900 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to classify your first image?</h3>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Experience the live MobileNetV2 deep neural network in action with immediate confidence score breakdown and history logging.
            </p>
          </div>
          <Link
            to="/classify"
            className="whitespace-nowrap px-8 py-3.5 rounded-xl bg-white text-navy-950 font-bold hover:bg-slate-100 shadow-md hover:shadow-lg transition duration-150 flex items-center space-x-2"
          >
            <span>Launch Classifier</span>
            <ArrowRight className="w-5 h-5 text-brand-600" />
          </Link>
        </div>
      </section>

    </div>
  );
}
