import React from 'react';
import { Smartphone, Bot, Gamepad2, Store, ArrowRight, Check, Zap, Sparkles, MessageSquare, Clock } from 'lucide-react';
import { MOBILE_GAME_PREVIEW, AI_WORKFLOW_PIPELINE } from '../assets/images/index.ts';

interface ServicesProps {
  onOpenContact: () => void;
  onExploreAiWorkflow: () => void;
}

export const ServicesSection: React.FC<ServicesProps> = ({ onOpenContact, onExploreAiWorkflow }) => {
  return (
    <section id="capabilities" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Simple Digital Solutions for Your Business
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              We turn your ideas into working apps, automate your daily repetitive computer tasks with AI, and build engaging mobile games.
            </p>
          </div>

          <a
            href="#contact"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl shadow-xs transition-all whitespace-nowrap self-start md:self-auto"
          >
            <span>Ask About Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Custom App Development (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wider">
                  01. Custom Mobile & Web Apps
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900">
                Apps Made Specifically for Your Needs
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Whether you need an app for your customers to order products, a dashboard to manage your team, or a utility tool like our <strong>AG TV Remote</strong>. We build apps that are fast, easy to use, and work on both Android and iPhones.
              </p>

              {/* Simple plain English checklist */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Works on Android phones, iPhones & computers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Easy login with mobile OTP or Google</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Accept online payments (UPI, Cards, Wallets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Works even when your internet is slow</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-mono">Turnaround: 1 to 2 weeks for most apps</span>
              <a
                href="#ai-app-workflow"
                onClick={onExploreAiWorkflow}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>See how AI builds this app</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: AI Agent & Work Automation (col-span-5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-2xl p-7 sm:p-9 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                  02. AI Work Automation
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Bot className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-white">
                Automate Your Daily Repetitive Work
              </h3>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                Stop wasting hours every day copying data, replying to repetitive customer questions, or making invoices. We set up smart AI agents that work for your business 24/7 without taking breaks.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>24/7 WhatsApp AI Assistant to answer customer questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>Auto-read receipts, bills, and save into Excel/Sheets</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                  <span>Automatic reminder messages to clients for payments</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Save 10+ hours weekly</span>
              <a href="#automation" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                <span>Try interactive test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Mobile Games (Coming Soon) (col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                  <span>03. Mobile Games</span>
                  <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Coming Soon
                  </span>
                </span>
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Gamepad2 className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900">
                Fun Games for Your Phone
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                We are developing exciting casual and 2D mobile games. AI helps us design lively characters, colorful game worlds, and fun sound effects in a fraction of traditional time.
              </p>

              <div className="mt-5 rounded-xl overflow-hidden border border-slate-200 relative group">
                <img
                  src={MOBILE_GAME_PREVIEW}
                  alt="Mobile games coming soon"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[11px] font-mono text-rose-300 font-semibold">
                    New titles in development for Android & iOS
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Small download, big fun</span>
              <a href="#games" className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
                <span>View upcoming games</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 4: Local Business Digital Solutions (col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  04. Local Business Tools
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Store className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900">
                Simple Tools for Neighborhood Businesses
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Generic big-brand software is expensive and too complicated. We make simple tools tailored to your exact store, clinic, restaurant, or service business.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">Grocery & Retail Stores</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Mobile product catalog, WhatsApp orders, and instant billing.</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">Clinics & Doctors</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Quick patient appointment booking with automated WhatsApp reminders.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Affordable local rates</span>
              <a
                href="#contact"
                onClick={onOpenContact}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Discuss your business tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
