import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Layers, 
  TrendingUp, 
  RefreshCw, 
  AlertCircle,
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getStats();
      if (data.success) {
        setStats(data.stats);
      } else {
        setError('Failed to fetch dashboard metrics.');
      }
    } catch (err) {
      setError('Unable to connect to the backend stats service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const total = stats?.total_classifications || 0;
  const avgTime = stats?.average_processing_time || 0;
  const avgConf = stats?.average_confidence || 0;
  const recent = stats?.recent_activity || [];
  const topCategories = stats?.top_categories || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <Activity className="w-4 h-4" />
            <span>DevOps Telemetry & Insights</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-950">Analytics Dashboard</h1>
          <p className="text-sm text-slate-500">
            Real-time inference performance and persistent SQLite database statistics.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold shadow-sm transition disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-600' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center space-x-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Images */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Classified</span>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-navy-950">{total}</div>
            <div className="text-xs text-slate-500 mt-1 flex items-center">
              <Database className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Saved to SQLite database
            </div>
          </div>
        </div>

        {/* Card 2: Successful Classifications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Success Rate</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-600">
              {total > 0 ? '100%' : 'N/A'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {total > 0 ? `${total} successful inferences` : 'Awaiting uploads'}
            </div>
          </div>
        </div>

        {/* Card 3: Avg Processing Time */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Latency</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-navy-950">
              {avgTime > 0 ? `${avgTime}s` : '0.00s'}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center">
              <Cpu className="w-3.5 h-3.5 mr-1 text-sky-500" />
              TensorFlow MobileNetV2
            </div>
          </div>
        </div>

        {/* Card 4: Avg Confidence */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Confidence</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-brand-600">
              {avgConf > 0 ? `${avgConf}%` : '0.0%'}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Top-1 Softmax probability
            </div>
          </div>
        </div>

      </div>

      {/* Main Sections: Top Categories & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Detected Categories (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-navy-950 text-base flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-brand-600" />
              <span>Top Detected Classes</span>
            </h3>
            <span className="text-xs text-slate-400">Frequency</span>
          </div>

          {topCategories.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No categories classified yet. Upload your first image to populate stats!
            </div>
          ) : (
            <div className="space-y-4">
              {topCategories.map((cat, idx) => {
                const pct = Math.round((cat.count / total) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-800 font-semibold capitalize">{cat.predicted_category}</span>
                      <span className="text-slate-500 font-mono">{cat.count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className="h-full bg-brand-600 rounded-full" 
                        style={{ width: `${Math.max(pct, 8)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-navy-950 text-base flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <span>Recent Classification Activity</span>
            </h3>
            <Link to="/history" className="text-xs font-semibold text-brand-600 hover:text-brand-500 flex items-center">
              <span>View Full History</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No recent activity recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recent.map((item) => (
                <div key={item.id} className="py-3.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-navy-950 capitalize">
                      {item.predicted_category}
                    </div>
                    <div className="text-xs text-slate-500 font-mono truncate max-w-xs">
                      {item.filename}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
                      {item.confidence_score.toFixed(1)}%
                    </span>
                    <div className="text-[11px] text-slate-400">
                      {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.processing_time}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
