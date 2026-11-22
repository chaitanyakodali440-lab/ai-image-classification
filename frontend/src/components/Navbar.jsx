import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Cpu, 
  Layers, 
  BarChart3, 
  History, 
  Info, 
  Menu, 
  X, 
  Activity, 
  GitBranch, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import api from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState('checking'); // 'healthy' | 'unhealthy' | 'checking'

  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const data = await api.checkHealth();
        if (data.status === 'healthy') {
          setHealthStatus('healthy');
        } else {
          setHealthStatus('unhealthy');
        }
      } catch (err) {
        setHealthStatus('unhealthy');
      }
    };

    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Cpu },
    { name: 'Classify Image', path: '/classify', icon: Layers },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'History', path: '/history', icon: History },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="bg-navy-950 text-white sticky top-0 z-50 shadow-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-300">
                AI Vision
              </span>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <span>MobileNetV2</span>
                <span>•</span>
                <span className="text-brand-400 font-medium flex items-center">
                  Image Classifier
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* System Health Badge & Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-800 text-xs">
              <span className="relative flex h-2 w-2">
                {healthStatus === 'healthy' ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                )}
              </span>
              <span className="text-slate-300 font-medium">
                {healthStatus === 'healthy' ? 'API Online' : 'Connecting API...'}
              </span>
            </div>

            <Link
              to="/classify"
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 flex items-center space-x-1.5"
            >
              <span>Try Classifier</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-navy-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
