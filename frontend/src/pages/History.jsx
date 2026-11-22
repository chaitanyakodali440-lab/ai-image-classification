import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  History as HistoryIcon, 
  Trash2, 
  Search, 
  RefreshCw, 
  AlertCircle, 
  Calendar, 
  Clock, 
  FileText, 
  Layers, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import api from '../services/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [isClearingAll, setIsClearingAll] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHistory(100, 0);
      if (data.success) {
        setHistory(data.history || []);
      } else {
        setError('Failed to retrieve history records.');
      }
    } catch (err) {
      setError('Unable to connect to the backend database service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteItem = async (id) => {
    if (!window.confirm(`Are you sure you want to delete classification record #${id}?`)) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await api.deleteHistoryItem(id);
      if (res.success) {
        setHistory((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      alert('Failed to delete history record.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to permanently clear all classification history? This cannot be undone.')) {
      return;
    }
    setIsClearingAll(true);
    try {
      const res = await api.clearAllHistory();
      if (res.success) {
        setHistory([]);
      }
    } catch (err) {
      alert('Failed to clear history.');
    } finally {
      setIsClearingAll(false);
    }
  };

  const filteredHistory = history.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchCategory = item.predicted_category?.toLowerCase().includes(q);
    const matchFilename = item.filename?.toLowerCase().includes(q);
    return matchCategory || matchFilename;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            <HistoryIcon className="w-4 h-4" />
            <span>SQLite Data Lake</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-950">Classification History</h1>
          <p className="text-sm text-slate-500">
            View all historical AI inferences, confidence scores, and timestamps.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold shadow-sm transition disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-600' : ''}`} />
            <span>Refresh</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={isClearingAll}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-sm font-semibold transition disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center space-x-3 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search & Counter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by label or filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-sm"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-navy-950">{filteredHistory.length}</span> of {history.length} records
        </div>
      </div>

      {/* History Table / Cards */}
      {loading ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-brand-600 mx-auto" />
          <p className="text-slate-600 font-medium text-sm">Loading classification records from SQLite...</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-navy-950">No Classification Records</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {searchQuery ? 'No records match your search criteria.' : 'You haven’t classified any images yet.'}
            </p>
          </div>
          <Link
            to="/classify"
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Classify First Image</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">ID</th>
                  <th className="py-3.5 px-6">Image File</th>
                  <th className="py-3.5 px-6">Predicted Category</th>
                  <th className="py-3.5 px-6">Confidence</th>
                  <th className="py-3.5 px-6">Latency</th>
                  <th className="py-3.5 px-6">Timestamp (UTC)</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      #{item.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900 truncate max-w-xs flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-brand-500 flex-shrink-0" />
                        <span title={item.filename}>{item.filename}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy-950 capitalize flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item.predicted_category}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-bold text-xs border border-brand-200">
                        {item.confidence_score.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                      {item.processing_time}s
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={deletingId === item.id}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete record"
                      >
                        {deletingId === item.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
