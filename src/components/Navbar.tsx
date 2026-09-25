import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { MessageSquare, ArrowRight, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenEstimator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'What We Do', href: '#capabilities' },
    { label: 'How AI Builds Apps', href: '#ai-app-workflow' },
    { label: 'AG TV Remote', href: '#smart-tv' },
    { label: 'AI Automation', href: '#automation' },
    { label: 'Games (Coming Soon)', href: '#games' },
    { label: 'Price Calculator', href: '#estimator' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a href="#top" className="flex items-center group focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg">
          <Logo size="md" showTagline={true} />
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-blue-600 transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Quick Chat */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/917013707890?text=Hi%20Srikanth,%20I%20want%20to%20discuss%20a%20project%20with%20Shristi%20Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Direct</span>
          </a>

          <a
            href="#contact"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="https://wa.me/917013707890"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2.5">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-md"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/917013707890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 70137 07890)</span>
            </a>
            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              <span>Get Free Project Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
