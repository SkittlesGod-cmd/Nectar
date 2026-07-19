import React from 'react';

export default function Marquee() {
  const text = "ORGANIC · ZERO SUGAR · REAL FRUIT · SPARKLING · NATURAL · CRAFTED IN SMALL BATCHES · ";
  const repeatedText = Array(4).fill(text).join('');

  const renderText = () => repeatedText.split('·').map((part, i, arr) => (
    <React.Fragment key={i}>
      {part}
      {i < arr.length - 1 && <span className="text-primary mx-2">·</span>}
    </React.Fragment>
  ));

  return (
    <div className="w-full overflow-hidden bg-[#121212] border-y border-border py-4 relative z-20">
      <style>
        {`
          @keyframes marquee-seamless {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
      <div className="flex flex-nowrap" style={{ width: 'fit-content' }}>
        <div 
          className="flex whitespace-nowrap text-sm tracking-[0.2em] uppercase font-bold text-white"
          style={{ animation: 'marquee-seamless 25s linear infinite' }}
        >
          {renderText()}
        </div>
        <div 
          className="flex whitespace-nowrap text-sm tracking-[0.2em] uppercase font-bold text-white"
          style={{ animation: 'marquee-seamless 25s linear infinite' }}
        >
          {renderText()}
        </div>
      </div>
    </div>
  );
}