import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, MessageSquare, Check, Sparkles, Clock, ShieldCheck, Layers } from 'lucide-react';

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  days: number;
  baseCost: number;
}

const ALL_FEATURES: Record<string, FeatureOption[]> = {
  app: [
    { id: 'auth', name: 'User Login & Phone OTP', description: 'Simple 1-tap sign-in with phone number, Google, or email', days: 3, baseCost: 150 },
    { id: 'db', name: 'Database & Cloud Storage', description: 'Stores user accounts, products, and customer orders safely', days: 4, baseCost: 200 },
    { id: 'pay', name: 'Online Payments (UPI, Cards)', description: 'Accept instant payments with QR code, UPI, or credit cards', days: 4, baseCost: 220 },
    { id: 'push', name: 'Push Notifications to Phones', description: 'Send discount alerts, order updates, and news to customer phones', days: 2, baseCost: 120 },
    { id: 'offline', name: 'Offline Working Mode', description: 'App continues to work smoothly even when internet is slow or off', days: 4, baseCost: 240 },
    { id: 'admin', name: 'Owner Management Dashboard', description: 'View total sales, active users, and manage items from your laptop', days: 5, baseCost: 280 },
  ],
  ai: [
    { id: 'wa', name: '24/7 WhatsApp AI Customer Helper', description: 'Answers customer questions and takes orders automatically day and night', days: 3, baseCost: 180 },
    { id: 'rag', name: 'Company Knowledge Q&A', description: 'Teaches AI your price list, service rules, and FAQs for accurate replies', days: 4, baseCost: 220 },
    { id: 'doc', name: 'Auto Bill & Receipt Reader', description: 'Scans paper bills or invoices and saves details directly into Excel', days: 4, baseCost: 220 },
    { id: 'crm', name: 'Google Sheets & Excel Auto-Sync', description: 'Automatically saves leads and orders directly into your spreadsheets', days: 3, baseCost: 160 },
    { id: 'voice', name: 'Voice Message Understanding', description: 'Understands customer voice notes on WhatsApp and types replies', days: 3, baseCost: 190 },
  ],
  game: [
    { id: 'physics', name: 'Smooth Touch Controls', description: 'Virtual joystick, button taps, and responsive swipe controls', days: 4, baseCost: 200 },
    { id: 'ai_art', name: 'Colorful Character Art & Effects', description: 'Charming heroes, monsters, and magical visual particles', days: 3, baseCost: 170 },
    { id: 'levels', name: 'Random Level Generator', description: 'Generates new map layouts every time for endless replay fun', days: 5, baseCost: 250 },
    { id: 'leaderboard', name: 'High Score Leaderboards', description: 'Lets players compare scores and win achievement badges', days: 3, baseCost: 140 },
    { id: 'monetize', name: 'In-Game Shop & Rewards', description: 'Reward ads for bonus coins and unlockable power-ups', days: 4, baseCost: 190 },
  ],
  saas: [
    { id: 'multi_tenant', name: 'Team & Member Accounts', description: 'Add team members with custom manager or employee roles', days: 5, baseCost: 300 },
    { id: 'sub_billing', name: 'Monthly Subscriptions', description: 'Auto-charge monthly or yearly fees with automated receipts', days: 4, baseCost: 260 },
    { id: 'api', name: 'Third-Party Connectors', description: 'Connects your website to other business software and tools', days: 4, baseCost: 220 },
    { id: 'analytics', name: 'Sales Charts & PDF Reports', description: 'Clear visual charts of revenue, growth, and 1-click PDF download', days: 4, baseCost: 200 },
  ],
};

export const ProjectEstimator: React.FC = () => {
  const [projectType, setProjectType] = useState<'app' | 'ai' | 'game' | 'saas'>('app');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth', 'db']);
  const [timelineUrgency, setTimelineUrgency] = useState<'standard' | 'express'>('standard');

  const baseSpecs = {
    app: { name: 'Custom Mobile App (Android & iPhone)', baseDays: 10, baseCost: 550, stack: 'Android & iOS App' },
    ai: { name: '24/7 AI Work Automation & WhatsApp Agent', baseDays: 7, baseCost: 400, stack: 'Smart AI Agent' },
    game: { name: 'Mobile Game (Coming Soon)', baseDays: 12, baseCost: 600, stack: 'Casual Mobile Game' },
    saas: { name: 'Business Web App & Dashboard', baseDays: 14, baseCost: 750, stack: 'Cloud Web Platform' },
  };

  const currentFeatures = ALL_FEATURES[projectType];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const spec = baseSpecs[projectType];
    let totalDays = spec.baseDays;
    let totalCost = spec.baseCost;

    currentFeatures.forEach((feat) => {
      if (selectedFeatures.includes(feat.id)) {
        totalDays += feat.days;
        totalCost += feat.baseCost;
      }
    });

    if (timelineUrgency === 'express') {
      totalDays = Math.max(5, Math.round(totalDays * 0.65));
      totalCost = Math.round(totalCost * 1.25);
    }

    return {
      days: totalDays,
      weeks: (totalDays / 6).toFixed(1),
      cost: totalCost,
      spec,
    };
  }, [projectType, selectedFeatures, timelineUrgency]);

  const handleShareWhatsApp = () => {
    const activeNames = currentFeatures
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => `• ${f.name}`)
      .join('\n');

    const message = `Hello Srikanth! I configured my project on the Shristi Tech estimator:\n\n*Project:* ${baseSpecs[projectType].name}\n*Tech Stack:* ${baseSpecs[projectType].stack}\n*Urgency:* ${timelineUrgency === 'express' ? 'Express Delivery' : 'Standard Sprint'}\n*Selected Features:*\n${activeNames}\n*Estimated Delivery:* ~${calculation.weeks} weeks\n\nI would like to discuss next steps and confirm the scope!`;

    const url = `https://wa.me/917013707890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    const activeNames = currentFeatures
      .filter((f) => selectedFeatures.includes(f.id))
      .map((f) => `• ${f.name}`)
      .join('\n');

    const subject = encodeURIComponent(`Project Scope Inquiry: ${baseSpecs[projectType].name}`);
    const body = encodeURIComponent(
      `Hi Srikanth,\n\nI used the Shristi Tech Scope Calculator for my upcoming project:\n\nProject Category: ${baseSpecs[projectType].name}\nUrgency: ${timelineUrgency}\nSelected Features:\n${activeNames}\nEstimated Delivery: ~${calculation.weeks} weeks\n\nPlease let me know your availability for a brief call to finalize requirements.\n\nBest regards,`
    );

    window.location.href = `mailto:Srikanth12231@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm relative">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Scope & Delivery Calculator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
          Plan Your Project Scope & Timeline
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Select your desired components to get transparent turnaround estimates. No vague quotes or hidden delays — direct founder engineering powered by modern AI tooling.
        </p>
      </div>

      {/* Step 1: Project Type Tabs */}
      <div className="mt-8">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
          1. Select Project Category
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'app', label: 'Custom App', sub: 'Android / iOS / Web' },
            { id: 'ai', label: 'AI Agent & Automation', sub: 'WhatsApp, n8n, CRM' },
            { id: 'game', label: 'Indie Game Dev', sub: '2D/3D Mobile Games' },
            { id: 'saas', label: 'Full SaaS Platform', sub: 'Web App & Dashboards' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setProjectType(tab.id as any);
                setSelectedFeatures(ALL_FEATURES[tab.id].slice(0, 2).map((f) => f.id));
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                projectType === tab.id
                  ? 'bg-blue-50/80 border-blue-600 text-slate-900 ring-2 ring-blue-600/20'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-sm text-slate-900">{tab.label}</div>
              <div className="text-xs text-slate-500 mt-1">{tab.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Feature Modules */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            2. Choose Capabilities & Modules
          </label>
          <span className="text-xs text-slate-500">
            {selectedFeatures.length} of {currentFeatures.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentFeatures.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            return (
              <div
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-400 text-slate-900 shadow-sm'
                    : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">{feature.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {feature.description}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                  +{feature.days}d
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Speed / Urgency */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
          3. Delivery Pace
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setTimelineUrgency('standard')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              timelineUrgency === 'standard'
                ? 'bg-blue-50/60 border-blue-600 ring-1 ring-blue-600 text-slate-900'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs">Standard Agile Sprint</span>
              <span className="text-[11px] text-slate-500">Thorough QA & Polish</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Regular milestone reviews with continuous integration.</p>
          </button>

          <button
            onClick={() => setTimelineUrgency('express')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              timelineUrgency === 'express'
                ? 'bg-blue-50/60 border-blue-600 ring-1 ring-blue-600 text-slate-900'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs flex items-center gap-1 text-blue-700">
                <Sparkles className="w-3.5 h-3.5" /> Express Rapid Launch
              </span>
              <span className="text-[11px] font-semibold text-blue-600 font-mono">35% Faster</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Dedicated priority sprint for urgent market drops and MVPs.</p>
          </button>
        </div>
      </div>

      {/* Calculation Summary Bar */}
      <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase">
            <span>Estimated Scope Summary</span>
            <span aria-hidden="true">·</span>
            <span>Direct Founder Engineering</span>
          </div>
          <div className="text-xl sm:text-2xl font-display font-bold text-white">
            {calculation.spec.name}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-blue-400" />
              Turnaround: ~{calculation.weeks} weeks ({calculation.days} business days)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Layers className="w-4 h-4 text-purple-400" />
              Stack: {calculation.spec.stack}
            </span>
          </div>
        </div>

        {/* 1-Click Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </button>

          <button
            onClick={handleShareEmail}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 transition-all active:scale-95"
          >
            <span>Email This Scope</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
