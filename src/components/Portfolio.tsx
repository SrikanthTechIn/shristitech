import React from 'react';
import { ExternalLink, Check, Tv, Bot, Gamepad2, Store, ArrowUpRight } from 'lucide-react';
import { TV_REMOTE_SHOWCASE, MOBILE_GAME_PREVIEW, AI_WORKFLOW_PIPELINE } from '../assets/images/index.ts';

interface PortfolioProps {
  onOpenContact: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenContact }) => {
  const caseStudies = [
    {
      id: 'ag-remote',
      tag: 'Utility Software & Mobile App',
      title: 'AG TV Remote: Zero-Latency Smart TV Controller',
      client: 'In-House Shristi Tech Flagship',
      impact: '0ms local latency · 100% private · Multi-brand protocol support',
      summary:
        'A streamlined smart TV remote mobile application replacing clunky physical remotes. Communicates directly over local subnet using mDNS and WebSockets without tracking user telemetry.',
      metrics: [
        { label: 'Network Discovery', value: '<250ms' },
        { label: 'Data Harvested', value: '0 Bytes' },
        { label: 'Supported Brands', value: '4+ Major OS' },
      ],
      img: TV_REMOTE_SHOWCASE,
      link: '#smart-tv',
      linkText: 'Explore Interactive TV Demo',
    },
    {
      id: 'autolead',
      tag: 'AI Agent & Work Automation',
      title: 'AutoLead: 24/7 WhatsApp AI Sales Qualifier',
      client: 'Local Specialized Healthcare Clinic',
      impact: '85% fewer manual calls · 24/7 immediate response · CRM auto-sync',
      summary:
        'Integrated n8n automation and Gemini 2.5 Flash to automatically qualify patient inquiries, answer consultation FAQs, and auto-book open calendar slots directly on WhatsApp.',
      metrics: [
        { label: 'Response Time', value: '<3.2s' },
        { label: 'Manual Hours Saved', value: '18 hrs/wk' },
        { label: 'Conversion Lift', value: '+42%' },
      ],
      img: AI_WORKFLOW_PIPELINE,
      link: '#automation',
      linkText: 'View Automation Pipeline',
    },
    {
      id: 'rogueshift',
      tag: 'Mobile Game Development',
      title: 'RogueShift 2D: Mobile Action Roguelite',
      client: 'Indie Game Project',
      impact: '60 FPS locked · AI-generated sprite atlas · Procedural dungeons',
      summary:
        'Built with Godot 2D and custom AI diffusion pipelines for sprite sheets, tilemaps, and atmospheric audio. Delivered high replayability with minimal indie development cost.',
      metrics: [
        { label: 'Frame Rate', value: '60 FPS' },
        { label: 'Asset Turnaround', value: '4 Days' },
        { label: 'Android Size', value: '<28 MB' },
      ],
      img: MOBILE_GAME_PREVIEW,
      link: '#games',
      linkText: 'Review Game Architecture',
    },
  ];

  return (
    <section id="work" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
            <span>Case Studies & Shipped Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Proven Results Across Apps, Automation & Games
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Real software built for real users. Every project adheres to high technical standards, direct founder communication, and verifiable performance metrics.
          </p>
        </div>

        {/* Case study cards */}
        <div className="space-y-12">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              className="bg-slate-50/70 rounded-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 hover:border-slate-300 transition-all"
            >
              {/* Media Preview (5 cols) */}
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-900">
                <img
                  src={study.img}
                  alt={study.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white font-medium border border-white/10">
                  Case 0{idx + 1}
                </div>
              </div>

              {/* Content & Metrics (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold uppercase tracking-wider">
                    <span>{study.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500">{study.client}</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900 mt-1.5 tracking-tight">
                    {study.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {study.summary}
                  </p>
                </div>

                {/* Quantitative Impact Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
                  {study.metrics.map((m, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-200/80">
                      <div className="text-lg font-bold font-mono text-slate-900">{m.value}</div>
                      <div className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={study.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>{study.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={onOpenContact}
                    className="text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
                  >
                    Need a similar solution? →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
