import { useState } from 'react';
import { Menu, X, Code2, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <Code2 className="w-8 h-8 text-emerald-400" />
            <span>MekiTech</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <a
                  href="/admin"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  Admin
                </a>
                <button
                  onClick={handleSignOut}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : null}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-slate-300 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {user && (
              <>
                <a
                  href="/admin"
                  className="block text-slate-300 hover:text-white transition-colors py-2"
                >
                  Admin
                </a>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block text-slate-300 hover:text-white transition-colors py-2"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
