import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { BarChart3, FileText, MessageSquare, CreditCard, Settings, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    inquiries: 0,
    payments: 0,
    testimonials: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const [projects, inquiries, payments, testimonials] = await Promise.all([
          supabase.from('projects').select('id', { count: 'exact' }),
          supabase.from('inquiries').select('id', { count: 'exact' }),
          supabase.from('payments').select('id', { count: 'exact' }),
          supabase.from('testimonials').select('id', { count: 'exact' }),
        ]);

        setStats({
          projects: projects.count || 0,
          inquiries: inquiries.count || 0,
          payments: payments.count || 0,
          testimonials: testimonials.count || 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const adminSections = [
    { id: 'projects', label: 'Projects', icon: FileText, count: stats.projects },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: stats.inquiries },
    { id: 'payments', label: 'Payments', icon: CreditCard, count: stats.payments },
    { id: 'testimonials', label: 'Testimonials', icon: BarChart3, count: stats.testimonials },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminSections.map(section => {
            const Icon = section.icon;
            return (
              <a
                key={section.id}
                href={`/admin/${section.id}`}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{section.label}</h3>
                  <p className="text-3xl font-bold text-emerald-400">{section.count}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Add Project', href: '/admin/projects/new' },
              { label: 'Add Service', href: '/admin/services' },
              { label: 'View Inquiries', href: '/admin/inquiries' },
              { label: 'Manage Testimonials', href: '/admin/testimonials' },
            ].map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">System Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Database Connection</span>
              <span className="text-green-400 font-semibold">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Authentication</span>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Storage</span>
              <span className="text-green-400 font-semibold">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
