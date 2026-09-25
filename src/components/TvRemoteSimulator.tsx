import React, { useState } from 'react';
import { Power, Volume2, VolumeX, Home, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Tv, Radio, CheckCircle, Wifi, Play, Sparkles } from 'lucide-react';
import { TV_REMOTE_SHOWCASE } from '../assets/images/index.ts';

export const TvRemoteSimulator: React.FC = () => {
  const [tvPowered, setTvPowered] = useState(true);
  const [activeApp, setActiveApp] = useState<'home' | 'youtube' | 'netflix' | 'prime' | 'disney'>('home');
  const [volume, setVolume] = useState(24);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTv, setSelectedTv] = useState('Samsung 65" Neo QLED (Living Room)');
  const [isScanning, setIsScanning] = useState(false);
  const [lastAction, setLastAction] = useState<string>('Connected to Living Room TV via Local Wi-Fi');

  const appData = {
    home: {
      name: 'Google TV Home',
      bg: 'from-slate-900 via-indigo-950 to-slate-950',
      badge: 'Smart Dashboard',
      description: 'Your movies, shows, and personalized streaming apps in one place.',
    },
    youtube: {
      name: 'YouTube 4K',
      bg: 'from-red-950 via-zinc-900 to-black',
      badge: '4K HDR Streaming',
      description: 'Trending technology breakthroughs, tech podcasts, and indie game showcases.',
    },
    netflix: {
      name: 'Netflix',
      bg: 'from-black via-red-950/70 to-neutral-950',
      badge: 'Originals & Series',
      description: 'Top 10 movies and global releases streaming in Dolby Vision.',
    },
    prime: {
      name: 'Prime Video',
      bg: 'from-sky-950 via-slate-900 to-black',
      badge: 'Exclusive Cinema',
      description: 'Prime Originals, live sports, and blockbuster rental library.',
    },
    disney: {
      name: 'Disney+',
      bg: 'from-blue-950 via-indigo-950 to-black',
      badge: 'Disney • Pixar • Marvel',
      description: 'Epic sagas, cinematic adventures, and National Geographic.',
    },
  };

  const handlePower = () => {
    setTvPowered(!tvPowered);
    setLastAction(!tvPowered ? 'TV Powered On via Wake-on-LAN' : 'TV Switched to Standby Mode');
  };

  const handleVolume = (delta: number) => {
    if (!tvPowered) return;
    setIsMuted(false);
    setVolume((prev) => {
      const next = Math.max(0, Math.min(100, prev + delta));
      setLastAction(`Volume changed to ${next}%`);
      return next;
    });
  };

  const handleMute = () => {
    if (!tvPowered) return;
    setIsMuted(!isMuted);
    setLastAction(!isMuted ? 'Muted' : `Unmuted (${volume}%)`);
  };

  const handleAppLaunch = (app: 'youtube' | 'netflix' | 'prime' | 'disney') => {
    if (!tvPowered) return;
    setActiveApp(app);
    setLastAction(`Deep-linked & opened ${app.toUpperCase()} TV application`);
  };

  const handleScan = () => {
    setIsScanning(true);
    setLastAction('Broadcasting SSDP / mDNS discovery packets...');
    setTimeout(() => {
      setIsScanning(false);
      setLastAction('Discovered 4 compatible Smart TVs on 192.168.1.0/24');
    }, 1100);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-white">AG TV Remote Live Interactive Simulator</h3>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Wifi className="w-3 h-3" /> Zero-Lag Local Wi-Fi
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive sandbox demo of our featured utility app developed for Android & Smart TV ecosystems.
            </p>
          </div>
        </div>

        {/* Pairing dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTv}
            onChange={(e) => {
              setSelectedTv(e.target.value);
              setLastAction(`Paired to ${e.target.value}`);
            }}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option>Samsung 65" Neo QLED (Living Room)</option>
            <option>LG C3 55" OLED (Master Bedroom)</option>
            <option>Sony Bravia Google TV (Office)</option>
            <option>Xiaomi Mi TV Box (Guest Room)</option>
          </select>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="Scan network for TVs"
          >
            <Radio className={`w-3.5 h-3.5 text-blue-400 ${isScanning ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">{isScanning ? 'Scanning...' : 'Scan'}</span>
          </button>
        </div>
      </div>

      {/* Main dual-viewport: Simulated TV on left, Mobile Remote on right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Virtual Smart TV Screen (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* TV Bezel */}
          <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border-4 border-slate-800 shadow-2xl relative">
            {/* TV Screen Panel */}
            <div className={`aspect-video w-full rounded-lg overflow-hidden relative transition-all duration-500 ${
              tvPowered
                ? `bg-gradient-to-br ${appData[activeApp].bg}`
                : 'bg-black flex items-center justify-center'
            }`}>
              {tvPowered ? (
                <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-white relative">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white tracking-wide">{appData[activeApp].name}</span>
                      <span className="text-[10px] text-slate-400">· 2160p 60Hz</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span>Wi-Fi 5GHz</span>
                      <span>20:45</span>
                    </div>
                  </div>

                  {/* Volume HUD overlay if recently triggered */}
                  <div className="flex items-center justify-center my-auto">
                    <div className="text-center max-w-sm">
                      <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium mb-3 border border-white/20">
                        {appData[activeApp].badge}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                        {appData[activeApp].name}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                        {appData[activeApp].description}
                      </p>
                    </div>
                  </div>

                  {/* Onscreen App Row */}
                  <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center justify-between gap-2 overflow-x-auto">
                    <button
                      onClick={() => { setActiveApp('home'); setLastAction('Navigated to Home'); }}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        activeApp === 'home' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleAppLaunch('youtube')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all flex items-center gap-1 ${
                        activeApp === 'youtube' ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <Play className="w-3 h-3 fill-current" /> YouTube
                    </button>
                    <button
                      onClick={() => handleAppLaunch('netflix')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        activeApp === 'netflix' ? 'bg-red-700 text-white shadow' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      Netflix
                    </button>
                    <button
                      onClick={() => handleAppLaunch('prime')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        activeApp === 'prime' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      Prime
                    </button>
                    <button
                      onClick={() => handleAppLaunch('disney')}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        activeApp === 'disney' ? 'bg-indigo-600 text-white shadow' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      Disney+
                    </button>
                  </div>

                  {/* Volume Gauge overlay at bottom right */}
                  <div className="absolute bottom-16 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 text-xs font-mono">
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-blue-400" />
                    )}
                    <span className="text-white font-medium">
                      {isMuted ? 'MUTED' : `VOL ${volume}`}
                    </span>
                    <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isMuted ? 'bg-rose-500' : 'bg-blue-500'} transition-all`}
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                    <Power className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-slate-400">TV is in Standby Mode</div>
                  <div className="text-xs text-slate-600">Click the red Power button on the smartphone remote to wake</div>
                </div>
              )}
            </div>

            {/* Stand/Chin of TV */}
            <div className="w-24 h-2 bg-slate-800 rounded-b mx-auto mt-1" />
            <div className="w-40 h-1.5 bg-slate-700/60 rounded-full mx-auto mt-0.5" />
          </div>

          {/* Real-time telemetry log */}
          <div className="bg-slate-950/80 rounded-lg p-3 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-slate-500 text-[10px]">EVENT BUS:</span>
              <span className="text-slate-200 truncate">{lastAction}</span>
            </div>
            <span className="text-[10px] text-slate-500 uppercase flex-shrink-0 hidden sm:inline">2.4ms latency</span>
          </div>
        </div>

        {/* Right: Simulated Mobile Remote Phone Interface (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[320px] bg-slate-950 border-4 border-slate-800 rounded-[36px] p-4 shadow-2xl relative">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            </div>

            {/* Remote App Screen */}
            <div className="space-y-4">
              {/* Remote Header */}
              <div className="flex items-center justify-between px-1">
                <div>
                  <div className="text-[10px] uppercase font-mono text-blue-400 font-semibold tracking-wider">
                    AG TV REMOTE
                  </div>
                  <div className="text-xs font-semibold text-white truncate max-w-[140px]">
                    {selectedTv.split(' ')[0]} {selectedTv.split(' ')[1]}
                  </div>
                </div>
                <button
                  onClick={handlePower}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    tvPowered
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/40'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/40'
                  }`}
                  aria-label="Power Button"
                  title="Toggle Power"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>

              {/* D-Pad Directional Controller */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner">
                {/* Up */}
                <button
                  onClick={() => {
                    if (tvPowered) setLastAction('Sent D-Pad UP navigation key');
                  }}
                  className="w-12 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center transition-all"
                  aria-label="Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Left - OK - Right */}
                <div className="flex items-center gap-3 my-2">
                  <button
                    onClick={() => {
                      if (tvPowered) setLastAction('Sent D-Pad LEFT navigation key');
                    }}
                    className="w-9 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center transition-all"
                    aria-label="Left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (tvPowered) setLastAction('Sent D-Pad SELECT (OK) key');
                    }}
                    className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs tracking-wider flex items-center justify-center shadow-md transition-all"
                    aria-label="OK"
                  >
                    OK
                  </button>

                  <button
                    onClick={() => {
                      if (tvPowered) setLastAction('Sent D-Pad RIGHT navigation key');
                    }}
                    className="w-9 h-12 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center transition-all"
                    aria-label="Right"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Down */}
                <button
                  onClick={() => {
                    if (tvPowered) setLastAction('Sent D-Pad DOWN navigation key');
                  }}
                  className="w-12 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 flex items-center justify-center transition-all"
                  aria-label="Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              {/* Volume & Utility Controls */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleVolume(-2)}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span className="font-mono text-sm">−</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Vol Down</span>
                </button>
                <button
                  onClick={handleMute}
                  className={`py-2.5 px-3 border rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 active:scale-95 transition-all ${
                    isMuted
                      ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                  }`}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                  onClick={() => handleVolume(2)}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span className="font-mono text-sm">+</span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Vol Up</span>
                </button>
              </div>

              {/* Quick App Launcher Shortcuts */}
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 px-1">
                  1-Click Direct Launch
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAppLaunch('youtube')}
                    className="py-2 px-3 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 rounded-lg text-xs font-semibold text-red-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current text-red-500" />
                    <span>YouTube</span>
                  </button>
                  <button
                    onClick={() => handleAppLaunch('netflix')}
                    className="py-2 px-3 bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 rounded-lg text-xs font-semibold text-rose-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span className="text-red-500 font-bold">N</span>
                    <span>Netflix</span>
                  </button>
                  <button
                    onClick={() => handleAppLaunch('prime')}
                    className="py-2 px-3 bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/40 rounded-lg text-xs font-semibold text-sky-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>prime</span>
                  </button>
                  <button
                    onClick={() => handleAppLaunch('disney')}
                    className="py-2 px-3 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-800/40 rounded-lg text-xs font-semibold text-indigo-200 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <span>Disney+</span>
                  </button>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="pt-2 border-t border-slate-900 flex items-center justify-around text-slate-400">
                <button
                  onClick={() => { setActiveApp('home'); setLastAction('Sent HOME button'); }}
                  className="p-2 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  title="Home"
                >
                  <Home className="w-4 h-4" />
                </button>
                <div className="w-16 h-1 bg-slate-700 rounded-full" />
                <button
                  onClick={handleScan}
                  className="p-2 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                  title="Devices"
                >
                  <Tv className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights footer bar */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Universal SSDP & mDNS Auto-Discovery</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Zero Personal Data Collected</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span>Wake-on-LAN (WoL) & WebSockets</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Battery & Lightweight Optimized</span>
        </div>
      </div>
    </div>
  );
};
