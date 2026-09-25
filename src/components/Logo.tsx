import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light' | 'auto';
}

export const LogoIcon: React.FC<{ sizeClass?: string }> = ({ sizeClass = 'w-10 h-10' }) => {
  return (
    <div className={`relative ${sizeClass} flex-shrink-0 flex items-center justify-center`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
        aria-label="Shristi Tech Logo Mark"
      >
        <defs>
          {/* Blue-Cyan-Purple upper ribbon gradient */}
          <linearGradient id="st-upper-ribbon" x1="10%" y1="10%" x2="95%" y2="85%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="80%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          {/* Warm Orange-Pink-Magenta lower petal gradient */}
          <linearGradient id="st-warm-ribbon" x1="0%" y1="30%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#f97316" />
            <stop offset="70%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Petal leaf 1 gradient */}
          <linearGradient id="st-leaf-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Petal leaf 2 gradient */}
          <linearGradient id="st-leaf-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#7e22ce" />
          </linearGradient>

          {/* Central orb gradient */}
          <radialGradient id="st-orb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </radialGradient>
        </defs>

        {/* Digital Pixel blocks floating top-right */}
        <rect x="94" y="10" width="8" height="8" rx="1.5" fill="#0284c7" />
        <rect x="98" y="22" width="12" height="12" rx="2" fill="#2563eb" />
        <rect x="80" y="24" width="8" height="8" rx="1.5" fill="#38bdf8" />
        <rect x="88" y="34" width="15" height="15" rx="3" fill="#1d4ed8" />
        <rect x="100" y="44" width="12" height="12" rx="2.5" fill="#f43f5e" />
        <rect x="82" y="52" width="7" height="7" rx="1.5" fill="#1e40af" />
        <rect x="91" y="58" width="9" height="9" rx="2" fill="#f59e0b" />

        {/* Dynamic 'S' Primary Flow Ribbon */}
        {/* Main upper spine curve */}
        <path
          d="M32 46 C 26 28, 48 14, 76 22 C 92 27, 85 46, 68 53 C 44 63, 22 72, 34 94 C 44 110, 78 114, 98 94 C 108 84, 110 70, 96 74 C 74 80, 52 100, 38 88 C 24 76, 42 62, 64 54 C 84 46, 92 32, 78 20 C 58 6, 24 16, 22 42 C 21 47, 26 49, 32 46 Z"
          fill="url(#st-upper-ribbon)"
        />

        {/* Warm lower sweeping band */}
        <path
          d="M24 48 C 36 60, 68 68, 86 78 C 104 88, 108 102, 88 112 C 68 122, 36 118, 22 100 C 14 90, 22 84, 30 87 C 46 93, 76 96, 86 86 C 94 78, 80 72, 64 65 C 44 56, 18 54, 24 48 Z"
          fill="url(#st-warm-ribbon)"
        />

        {/* Sprout Leaf left (representing Shristi / creation) */}
        <path
          d="M10 56 C 22 60, 32 74, 34 90 C 24 88, 12 76, 10 56 Z"
          fill="url(#st-leaf-1)"
        />

        {/* Sprout Leaf lower-left */}
        <path
          d="M12 76 C 22 80, 30 92, 28 104 C 18 102, 10 92, 12 76 Z"
          fill="url(#st-leaf-2)"
        />

        {/* Internal glowing seed/orb */}
        <circle cx="38" cy="72" r="7.5" fill="url(#st-orb)" />
      </svg>
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = true,
  size = 'md',
  theme = 'auto'
}) => {
  const iconSizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const brandSizeClass = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSizeClass = size === 'sm' ? 'text-[8px]' : 'text-[9px]';

  const textColor =
    theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const mutedColor =
    theme === 'dark'
      ? 'text-slate-400'
      : theme === 'light'
      ? 'text-slate-500'
      : 'text-slate-500 dark:text-slate-400';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon sizeClass={iconSizeClass} />
      <div className="flex flex-col leading-tight">
        <span className={`font-display font-bold tracking-tight ${brandSizeClass} ${textColor}`}>
          Shristi Tech
        </span>
        {showTagline && (
          <span className={`font-mono uppercase font-semibold tracking-wider ${tagSizeClass} ${mutedColor}`}>
            Ideas Today • Better Tomorrow
          </span>
        )}
      </div>
    </div>
  );
};
