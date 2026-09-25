import React, { useState } from 'react';
import { Gamepad2, Sparkles, Clock, Bell, Check, ArrowRight, MessageSquare, Flame } from 'lucide-react';
import { GAMES_COMING_SOON, MOBILE_GAME_PREVIEW } from '../assets/images/index.ts';

interface GamesProps {
  onOpenContact: () => void;
}

export const GamesSection: React.FC<GamesProps> = ({ onOpenContact }) => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const upcomingGames = [
    {
      id: 'rogueshift',
      title: 'RogueShift: Cyber Odyssey',
      category: '2D Action Roguelite',
      status: 'Coming Soon',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      description: 'Fast-paced mobile dungeon runner with glowing lasers, smooth 60fps touch joystick controls, and infinite randomized levels.',
      features: ['Touch joystick & swipe dash', 'Random dungeon maps', 'Unlockable hero skins'],
      releaseEstimate: 'Early 2027 Beta',
    },
    {
      id: 'galactic-runner',
      title: 'Galactic Runner 3D',
      category: 'Endless 3D Casual Runner',
      status: 'In Development',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      description: 'Dodge planetary asteroids, collect plasma crystals, and upgrade your spaceship. Built with smooth 3D physics and catchy synth music.',
      features: ['Tilt & swipe controls', 'Global friend leaderboards', 'Daily coin challenges'],
      releaseEstimate: 'Q2 2027',
    },
    {
      id: 'pixel-kingdom',
      title: 'Pixel Kingdom Quest',
      category: 'Retro Puzzle Adventure',
      status: 'Coming Soon',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      description: 'Charming pixel-art puzzle game where you rebuild a village, solve brain teasers, and rescue friendly kingdom creatures.',
      features: ['Relaxing offline gameplay', '120+ clever brain puzzles', 'Zero forced pop-up ads'],
      releaseEstimate: 'Q3 2027',
    },
  ];

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotified(true);
  };

  return (
    <section id="games" className="py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-rose-500/10 via-purple-500/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider mb-2">
              <Gamepad2 className="w-4 h-4 text-rose-400" />
              <span>Mobile Game Development</span>
              <span aria-hidden="true">·</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px]">
                Coming Soon
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Exciting Mobile Games in Development
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              We are using modern AI tools to bring fun, high-speed mobile games to life faster than traditional studios. From quick casual time-killers to action adventures, our indie titles are coming soon to Google Play and the App Store.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917013707890?text=Hi%20Srikanth,%20I%20have%20an%20idea%20for%20a%20mobile%20game%20I%20want%20to%20build"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-950/40 transition-all active:scale-95"
            >
              <span>Pitch Your Game Idea</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Featured Coming Soon Hero Showcase */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3 h-3" /> Coming Soon to Mobile
              </span>
              <span className="text-slate-400">Powered by Godot & AI Asset Workflows</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Fun, Lightweight Games Built For Every Smartphone
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Big studios spend millions and years to launch simple mobile games. By using AI to create beautiful character sprites, sound effects, and level ideas, we build addictive games with small file sizes that run smoothly on budget Android devices.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs text-slate-300 font-medium">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-base font-bold text-rose-400 font-mono">60 FPS</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Smooth Touch Gameplay</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-base font-bold text-purple-400 font-mono">&lt;35 MB</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Tiny Download Size</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="text-base font-bold text-amber-400 font-mono">Offline</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Play Without Internet</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-700/80 aspect-[16/10] bg-slate-950 group shadow-xl">
            <img
              src={GAMES_COMING_SOON}
              alt="Shristi Tech mobile games coming soon promo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = MOBILE_GAME_PREVIEW;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-bold">Shristi Game Labs</span>
                <span className="text-rose-400 font-mono font-semibold">Teasers Releasing Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Games Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingGames.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    {game.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${game.badgeColor}`}>
                    {game.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  {game.title}
                </h4>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {game.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  {game.features.map((f, i) => (
                    <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500 text-[11px]">Target: {game.releaseEstimate}</span>
                <span className="text-rose-400 font-medium">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>

        {/* Early Access / Notify Me Box */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Want Early Playtest Access?</span>
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              Be the first to test our new mobile games before they hit the Play Store. Drop your email or message us on WhatsApp for private APK beta invites.
            </p>
          </div>

          <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {notified ? (
              <div className="px-4 py-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're on the early VIP beta list!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
                >
                  Notify Me
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
