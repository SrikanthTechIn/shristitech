import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, Smartphone, Bot, Gamepad2, Tv, CheckCircle2 } from 'lucide-react';
import { ThreeScene } from './ThreeScene.tsx';

interface HeroProps {
  onOpenContact: () => void;
  onExploreAiWorkflow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreAiWorkflow }) => {
  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-100/50 via-purple-100/30 to-amber-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Clear Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Friendly kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-slate-600">
              <span className="text-blue-600 font-bold uppercase tracking-wider">Shristi Tech</span>
              <span aria-hidden="true">·</span>
              <span>Local Freelance Digital Studio</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Open for Projects
              </span>
            </div>

            {/* Headline - Simple English */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.08] text-balance">
              Custom Apps, AI Work Automation & Games —{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                All Built With AI.
              </span>
            </h1>

            {/* Clear, simple prose without jargon */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Have an idea for a mobile app? Need an AI assistant to handle your WhatsApp orders and paperwork? Or want an engaging mobile game? We build working digital solutions fast and affordably using modern AI tools.
            </p>

            {/* 3 Simple Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Custom Apps</div>
                  <div className="text-[11px] text-slate-500">Android, iPhone & Web</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">AI Automation</div>
                  <div className="text-[11px] text-slate-500">WhatsApp & Daily Work</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Mobile Games</div>
                  <div className="text-[11px] text-rose-500 font-semibold">Coming Soon</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#contact"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-95"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ai-app-workflow"
                onClick={onExploreAiWorkflow}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>See How AI Builds Apps →</span>
              </a>

              <a
                href="https://wa.me/917013707890?text=Hi%20Srikanth,%20I%20am%20interested%20in%20building%20a%20custom%20app%20or%20AI%20automation%20with%20Shristi%20Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
                title="Chat directly on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span className="sm:hidden lg:inline">WhatsApp</span>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <div className="font-bold text-slate-900 font-display text-sm">Direct Founder</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Talk straight to developer Srikanth</div>
              </div>
              <div>
                <div className="font-bold text-slate-900 font-display text-sm">100% Your App</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Full ownership and source code</div>
              </div>
              <div>
                <div className="font-bold text-slate-900 font-display text-sm">Real Live Apps</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Creator of AG TV Remote</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas Scene (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl p-2">
              <ThreeScene />

              {/* Subtitle pill below 3D */}
              <div className="px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Tv className="w-3.5 h-3.5 text-blue-400" />
                  <span>AG TV Remote In-House App</span>
                </span>
                <a href="#smart-tv" className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
                  <span>Try Simulator</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
