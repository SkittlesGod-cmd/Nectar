import React from 'react';

export default function Marquee() {
  const text = "ORGANIC · ZERO SUGAR · REAL FRUIT · SPARKLING · NATURAL · CRAFTED IN SMALL BATCHES · ";
  const repeatedText = Array(4).fill(text).join('');

  return (
    <div className="w-full overflow-hidden bg-[#121212] border-y border-border py-4 relative z-20">
      <div className="flex w-[200%] sm:w-[150%] md:w-[200%] animate-[marqueeScroll_30s_linear_infinite]">
        <div className="flex-1 whitespace-nowrap text-sm tracking-[0.2em] uppercase font-bold text-white">
          {repeatedText.split('·').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-primary mx-2">·</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="flex-1 whitespace-nowrap text-sm tracking-[0.2em] uppercase font-bold text-white">
          {repeatedText.split('·').map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-primary mx-2">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
