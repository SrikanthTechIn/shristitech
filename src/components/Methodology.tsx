import React from 'react';
import { Sparkles, Terminal, CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface MethodologyProps {
  onOpenContact: () => void;
}

export const Methodology: React.FC<MethodologyProps> = ({ onOpenContact }) => {
  const steps = [
    {
      step: '01',
      title: 'Tell Us What You Need',
      desc: 'You chat directly with founder Srikanth. Tell us about your idea, shop, or task in simple everyday words without technical jargon.',
    },
    {
      step: '02',
      title: 'AI Generates Screen Designs',
      desc: 'Our AI agent creates colorful, easy-to-use mobile screen previews within 48 hours so you can see exactly how it will look.',
    },
    {
      step: '03',
      title: 'Writing Clean App Code',
      desc: 'AI agents generate the code fast, while Srikanth adds custom logic, payment connections, and secure logins.',
    },
    {
      step: '04',
      title: 'Testing on Real Phones',
      desc: 'We test on real Android phones and devices to make sure there are zero errors, fast tap responses, and smooth offline performance.',
    },
    {
      step: '05',
      title: 'Launch & Direct Support',
      desc: 'We help you launch on Google Play Store or deploy to the web, and stay available for any future updates or questions.',
    },
  ];

  return (
    <section id="methodology" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            From Simple Idea to Finished Working App
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            By using AI tools, we build software much faster and at friendly local rates, while maintaining high quality, security, and human care.
          </p>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all"
            >
              <div>
                <span className="font-mono text-sm font-bold text-blue-600 block mb-3">
                  {item.step}.
                </span>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: Freelance vs Traditional Agency */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900">
              Why Local Businesses & Founders Choose Us
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Traditional development agencies burden you with project managers, account executives, and bloated billable hours. At Shristi Tech, you get a dedicated technical partner who codes your solution with AI-assisted efficiency.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero bloated agency overhead = honest, accessible rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Fast iteration cycles with daily video & WhatsApp progress updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Complete IP rights and cleanly documented Git repository</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-white border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase">
                <Terminal className="w-3.5 h-3.5" />
                <span>Guaranteed Sprint Standards</span>
              </div>
              <div className="text-lg font-bold font-display text-white">
                "Ideas Today • Better Tomorrow"
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Whether you need a custom Android app, a 24/7 AI WhatsApp bot, or an indie game prototype, every milestone is testable on real devices before delivery.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Founder: Srikanth</span>
              <a
                href="#contact"
                onClick={onOpenContact}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>Start conversation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
