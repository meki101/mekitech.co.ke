import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Inquiry } from '../types';
import { MessageSquare, ChevronRight } from 'lucide-react';

export default function AdminInquiries() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchInquiries = async () => {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setInquiries(data || []);
      } catch (err) {
        console.error('Error fetching inquiries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user]);

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400',
    contacted: 'bg-yellow-500/20 text-yellow-400',
    in_progress: 'bg-purple-500/20 text-purple-400',
    completed: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Client Inquiries</h1>
          <a
            href="/admin/dashboard"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Back
          </a>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map(inquiry => (
              <div
                key={inquiry.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{inquiry.client_name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[inquiry.status] || 'bg-slate-700 text-slate-300'}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-slate-400">{inquiry.client_email}</p>
                    {inquiry.client_company && (
                      <p className="text-slate-400 text-sm">{inquiry.client_company}</p>
                    )}
                    <p className="text-slate-300 line-clamp-2">{inquiry.project_description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 pt-2">
                      {inquiry.client_phone && <span>📞 {inquiry.client_phone}</span>}
                      {inquiry.budget_range && <span>💰 {inquiry.budget_range}</span>}
                      {inquiry.timeline && <span>⏱️ {inquiry.timeline}</span>}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
