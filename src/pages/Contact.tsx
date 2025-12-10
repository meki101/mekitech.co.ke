import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, MessageSquare, Loader } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('inquiries')
        .insert({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          client_company: formData.company,
          service_id: formData.service || null,
          project_description: formData.description,
          budget_range: formData.budget,
          timeline: formData.timeline,
        });

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        description: '',
        budget: '',
        timeline: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-5xl font-bold text-white">Let's Work Together</h1>
          <p className="text-xl text-slate-300">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="mailto:hello@mekitech.com"
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all group"
          >
            <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-slate-400">hello@mekitech.com</p>
          </a>

          <a
            href="tel:+254700000000"
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all group"
          >
            <Phone className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">Call</h3>
            <p className="text-slate-400">+254 700 000 000</p>
          </a>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all group"
          >
            <MessageSquare className="w-8 h-8 text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
            <p className="text-slate-400">Quick chat</p>
          </a>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          {submitted ? (
            <div className="text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Received!</h3>
              <p className="text-slate-400">
                Thank you for reaching out. I'll review your inquiry and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Type</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select a service</option>
                    <option value="web-software-engineering">Web & Software Engineering</option>
                    <option value="ecommerce-automation">E-Commerce & Automation</option>
                    <option value="it-consulting">IT Consulting</option>
                    <option value="digital-marketing-seo">Digital Marketing & SEO</option>
                    <option value="hardware-infrastructure">Hardware & Infrastructure</option>
                    <option value="audio-visual-production">Audio-Visual Production</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select budget</option>
                  <option value="0-50k">50,000 - 100,000 KES</option>
                  <option value="50-150k">100,000 - 200,000 KES</option>
                  <option value="150-300k">200,000 - 500,000 KES</option>
                  <option value="300k+">500,000+ KES</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Inquiry'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
