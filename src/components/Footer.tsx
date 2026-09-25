import React from 'react';
import { Logo } from './Logo.tsx';
import { MessageSquare, Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo theme="dark" size="md" showTagline={true} />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-2">
              Independent digital product & automation studio. Building bespoke mobile apps, autonomous AI agent pipelines, and indie mobile games with 10x velocity.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs font-mono text-slate-400">
              <a
                href="mailto:Srikanth12231@gmail.com"
                className="hover:text-blue-400 flex items-center gap-2 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Srikanth12231@gmail.com</span>
              </a>
              <a
                href="https://wa.me/917013707890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +91 70137 07890</span>
              </a>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">Custom Mobile Apps</a>
              </li>
              <li>
                <a href="#ai-app-workflow" className="hover:text-white transition-colors">How AI Builds Apps</a>
              </li>
              <li>
                <a href="#automation" className="hover:text-white transition-colors">24/7 AI Work Automation</a>
              </li>
              <li>
                <a href="#games" className="hover:text-white transition-colors">Mobile Games (Coming Soon)</a>
              </li>
              <li>
                <a href="#smart-tv" className="hover:text-white transition-colors">AG TV Remote App</a>
              </li>
            </ul>
          </div>

          {/* Column 3: In-House & Demos */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              Featured Apps
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#smart-tv" className="hover:text-white transition-colors">AG TV Remote (Live Demo)</a>
              </li>
              <li>
                <a href="#automation" className="hover:text-white transition-colors">AI Sales Agent Playground</a>
              </li>
              <li>
                <a href="#games" className="hover:text-white transition-colors">RogueShift 2D Mobile</a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">Interactive Scope Estimator</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
              Studio & Direct
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">Development Process</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Request a Proposal</a>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-white transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-white transition-colors text-left">
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Shristi Tech. All rights reserved. Founded & engineered by Srikanth.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors">
              Terms of Use
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
