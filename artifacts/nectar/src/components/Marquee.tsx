import React from 'react';

const TEXT = "ORGANIC · ZERO SUGAR · REAL FRUIT · SPARKLING · NATURAL · SMALL BATCH · ";

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[#111] border-y border-border py-3.5 relative z-20 select-none">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[11px] font-bold uppercase tracking-[0.22em] whitespace-nowrap pr-0">
            {TEXT.split('·').map((part, j, arr) => (
              <React.Fragment key={j}>
                <span className="text-white">{part}</span>
                {j < arr.length - 1 && <span className="text-[#F2C94C]">·</span>}
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
