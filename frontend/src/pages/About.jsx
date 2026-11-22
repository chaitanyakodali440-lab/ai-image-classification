import React from 'react';
import { 
  Cpu, 
  Layers, 
  GitBranch, 
  Box, 
  Workflow, 
  Terminal, 
  CheckCircle, 
  Zap, 
  Cloud, 
  Sparkles,
  Database,
  ArrowUpRight
} from 'lucide-react';

export default function About() {
  const modelHighlights = [
    { label: 'Architecture', value: 'MobileNetV2 (CNN)' },
    { label: 'Pretrained Dataset', value: 'ImageNet-1K (1.4M images)' },
    { label: 'Output Classes', value: '1,000 discrete categories' },
    { label: 'Input Resolution', value: '224 × 224 × 3 (RGB)' },
    { label: 'Parameters', value: '~3.4 Million weights' },
    { label: 'Key Innovation', value: 'Inverted Residuals & Linear Bottlenecks' },
  ];

  const devopsPillars = [
    {
      title: '1. Git & GitHub Version Control',
      desc: 'Structured repository splitting frontend and backend, comprehensive .gitignore, semantic versioning, and branch protection on main.',
      icon: GitBranch,
      badge: 'VCS',
    },
    {
      title: '2. Automated Pytest Testing',
      desc: 'Suite covering health check, image validation, file type gating, MobileNetV2 prediction tensors, and SQLite transaction rollback.',
      icon: Terminal,
      badge: 'QA Testing',
    },
    {
      title: '3. Docker Containerization',
      desc: 'Independent Dockerfiles for frontend (multi-stage Alpine Nginx) and backend (Python 3.12 slim), orchestrated via Docker Compose.',
      icon: Box,
      badge: 'Containers',
    },
    {
      title: '4. GitHub Actions CI/CD Pipeline',
      desc: 'Triggered on push: runs automated Pytest suite, builds production React bundle, verifies Docker builds, and executes deployment triggers.',
      icon: Workflow,
      badge: 'Automation',
    },
    {
      title: '5. Cloud Deployment (Render)',
      desc: 'Continuous deployment to Render cloud platform using containerized deployment webhooks and environment variables.',
      icon: Cloud,
      badge: 'Production',
    },
  ];

  const futureRoadmap = [
    'Transfer Learning & Custom Fine-Tuning on domain datasets (e.g., Medical, Agriculture, Manufacturing defect detection)',
    'Real-time webcam video stream classification with WebRTC',
    'Model quantization using TensorFlow Lite (TFLite) for sub-50ms CPU inference on edge devices',
    'Batch image upload processing with background Celery / Redis task queues',
    'Kubernetes Helm Chart deployment for multi-replica horizontal autoscaling',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Academic & Engineering Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
          About The Image Classification System
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Comprehensive project demonstration showcasing how cutting-edge computer vision deep learning integrates with industry-standard DevOps automation.
        </p>
      </div>

      {/* Project Objective Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-navy-950">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold">Project Objective</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          The goal of this project is to develop and deploy an end-to-end, production-ready AI image classification system that demonstrates the complete software engineering and DevOps lifecycle. By combining TensorFlow deep learning models with automated testing, containerization, and continuous deployment, the system achieves predictable releases, high availability, and measurable inference telemetry.
        </p>
      </div>

      {/* AI Model Deep Dive */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-navy-950">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Deep Learning Engine: MobileNetV2</h2>
            <p className="text-xs text-slate-500">Google Research Pretrained Neural Network</p>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed text-sm">
          MobileNetV2 is an efficient convolutional neural network architecture specifically engineered for high accuracy with minimal computational overhead. It employs <strong>depthwise separable convolutions</strong> to significantly reduce parameter count and multiply-accumulate (MAC) operations compared to standard convolutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {modelHighlights.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs text-slate-500 font-medium">{item.label}</div>
              <div className="text-sm font-bold text-navy-950 mt-1">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DevOps Implementation Section */}
      <div className="space-y-6">
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold text-navy-950">DevOps Implementation Pillars</h2>
          <p className="text-sm text-slate-500">
            How DevOps practices are integrated into every stage of development and deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devopsPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base text-navy-950">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-800 shadow-md space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600/30 text-brand-400 flex items-center justify-center border border-brand-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Future Enhancements Roadmap</h2>
            <p className="text-xs text-slate-400">Planned extensions for next releases</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {futureRoadmap.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-brand-600/40 text-brand-300 text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
