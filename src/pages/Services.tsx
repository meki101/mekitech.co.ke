import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Service, PricingTier } from '../types';
import { getIconComponent } from '../lib/icons';
import { Check, ArrowRight } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [pricingTiers, setPricingTiers] = useState<Record<string, PricingTier[]>>({});
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('order_position');

        if (servicesError) throw servicesError;

        const { data: tiersData, error: tiersError } = await supabase
          .from('pricing_tiers')
          .select('*')
          .order('order_position');

        if (tiersError) throw tiersError;

        setServices(servicesData || []);

        const tiersByService: Record<string, PricingTier[]> = {};
        tiersData?.forEach(tier => {
          if (!tiersByService[tier.service_id]) {
            tiersByService[tier.service_id] = [];
          }
          tiersByService[tier.service_id].push(tier);
        });
        setPricingTiers(tiersByService);
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 flex items-center justify-center">
        <div className="text-slate-400">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Comprehensive solutions tailored to your business needs. From web development to strategic consulting.
          </p>
        </div>

        <div className="space-y-8">
          {services.map(service => {
            const Icon = getIconComponent(service.icon_name);
            const tiers = pricingTiers[service.id] || [];
            const isExpanded = expandedService === service.id;

            return (
              <div
                key={service.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedService(isExpanded ? null : service.id)}
                  className="w-full p-6 hover:bg-slate-700/30 transition-colors text-left flex items-start justify-between"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8 text-emerald-400" />
                      <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                    </div>
                    <p className="text-slate-400">{service.description}</p>
                  </div>
                  <div className="text-emerald-400 ml-4">
                    {isExpanded ? '−' : '+'}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-700 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {tiers.map(tier => (
                        <div
                          key={tier.id}
                          className={`rounded-lg p-6 space-y-4 ${
                            tier.is_featured
                              ? 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border-2 border-emerald-500/50 relative'
                              : 'bg-slate-900/50 border border-slate-600'
                          }`}
                        >
                          {tier.is_featured && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Most Popular
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                            <p className="text-slate-400 text-sm mt-1">{tier.description}</p>
                          </div>

                          <div className="py-2 border-t border-slate-600">
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-bold text-emerald-400">
                                {tier.price.toLocaleString()}
                              </span>
                              <span className="text-slate-400">{tier.currency}</span>
                            </div>
                          </div>

                          <ul className="space-y-3">
                            {tier.features?.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-300 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <a
                            href="/contact"
                            className="w-full mt-4 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all text-center"
                          >
                            Get Started
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Custom Solutions</h2>
          <p className="text-slate-300">Need something tailored to your specific needs?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
          >
            Let's Discuss
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
