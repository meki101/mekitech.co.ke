import { ArrowRight, Code2, Zap, Shield, Target } from 'lucide-react';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <section className="min-h-screen flex items-center">
            <div className="w-full space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
                  Building the
                  <span className="block text-emerald-400">Future,</span>
                  <span className="block">One Line at a Time</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                  I'm Mathew Imulia, a full-stack technology architect and innovator. I transform complex challenges into elegant, scalable solutions that drive real business impact.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/portfolio"
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/50 flex items-center gap-2 group"
                >
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/services"
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all flex items-center gap-2"
                >
                  Explore Services
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-all"
                >
                  Let's Talk
                </a>
              </div>

              <div className="pt-8 flex gap-8 text-slate-400">
                <div>
                  <div className="text-3xl font-bold text-emerald-400">50+</div>
                  <div className="text-sm">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">8+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">30+</div>
                  <div className="text-sm">Happy Clients</div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 border-t border-slate-700">
            <h2 className="text-4xl font-bold text-white mb-12">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Code2,
                  title: 'Full-Stack Development',
                  description: 'Web apps, APIs, and scalable systems'
                },
                {
                  icon: Zap,
                  title: 'Smart Automation',
                  description: 'Business process automation and integration'
                },
                {
                  icon: Shield,
                  title: 'Security & Performance',
                  description: 'Secure, fast, and reliable systems'
                },
                {
                  icon: Target,
                  title: 'Strategic Consulting',
                  description: 'Technology strategy and architecture'
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all"
                  >
                    <Icon className="w-8 h-8 text-emerald-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <TestimonialsCarousel />

          <section className="py-24 border-t border-slate-700">
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Ready to Transform Your Vision?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Let's collaborate on your next project and create something extraordinary together.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/50"
              >
                Start a Conversation
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
