import React from 'react';
import { TvRemoteSimulator } from './TvRemoteSimulator.tsx';
import { Tv, ShieldCheck, Zap, Wifi, Play, Download, Smartphone } from 'lucide-react';

interface TvRemoteSpotlightProps {
  onOpenContact: () => void;
}

export const TvRemoteSpotlight: React.FC<TvRemoteSpotlightProps> = ({ onOpenContact }) => {
  return (
    <section id="smart-tv" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 uppercase tracking-wider mb-2">
              <Tv className="w-3.5 h-3.5" />
              <span>Flagship Utility Software</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              AG TV Remote: Control Smart TVs from Your Phone
            </h2>
            <p className="text-base text-slate-600 mt-3">
              Developed in-house by Shristi Tech. A lightweight, privacy-focused universal remote control supporting Google TV, Android TV, Samsung Tizen, LG webOS, and more.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get the App / Inquire</span>
            </a>
            <a
              href="https://wa.me/917013707890?text=Hi%20Srikanth,%20I%20have%20a%20question%20about%20the%20AG%20TV%20Remote%20app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition-all"
            >
              <span>Support & Questions</span>
            </a>
          </div>
        </div>

        {/* The Interactive Sandbox Simulator */}
        <TvRemoteSimulator />

        {/* Feature Specs */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Wifi className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Automatic Wi-Fi Detection</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Finds your Smart TV on your home Wi-Fi instantly. No complicated setup, codes, or technical steps required.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">100% Private & Ad-Free</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              We never track what you watch. The remote works directly between your phone and your TV with zero spying or annoying popup ads.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900">Works With Most TV Brands</h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tested on Android TV, Google TV, Samsung, LG, and popular streaming sticks with quick 1-click app buttons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
