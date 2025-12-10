import { Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">MekiTech</h3>
            <p className="text-slate-400 text-sm">
              Building elegant solutions to complex technology challenges.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-slate-400 hover:text-white text-sm transition">Home</a></li>
              <li><a href="/portfolio" className="text-slate-400 hover:text-white text-sm transition">Portfolio</a></li>
              <li><a href="/services" className="text-slate-400 hover:text-white text-sm transition">Services</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-white text-sm transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-slate-400 hover:text-white text-sm transition">Web Development</a></li>
              <li><a href="/services" className="text-slate-400 hover:text-white text-sm transition">Consulting</a></li>
              <li><a href="/services" className="text-slate-400 hover:text-white text-sm transition">E-Commerce</a></li>
              <li><a href="/services" className="text-slate-400 hover:text-white text-sm transition">More...</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              Copyright {currentYear} MekiTech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="mailto:hello@mekitech.com" className="text-slate-400 hover:text-white text-sm transition flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@mekitech.com
              </a>
              <a href="tel:+254700000000" className="text-slate-400 hover:text-white text-sm transition flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +254 700 000 000
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
