import React from "react";

interface StampButtonProps {
  text: string;
  className?: string; 
  colorClass?: string;
  textColorClass?: string;
}

const StampButton: React.FC<StampButtonProps> = ({
  text,
  className = "",
  colorClass = "",
  textColorClass = "",
}) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center ${textColorClass} px-6 py-2 rounded-lg overflow-visible ${className}`}
    >
      <span className="relative z-10 text-2xl p-6">{text}</span>

      {/* Stamp Border SVG */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${colorClass}`}
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <filter id="stampRough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id="innerRough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="1"
              seed="8"
              result="n2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n2"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Outer jagged border */}
        <g
          filter="url(#stampRough)"
          stroke="currentColor"
          fill="none"
          strokeWidth="12"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <rect x="12" y="12" width="576" height="136" rx="22" ry="22" />
        </g>

        {/* Speckle imperfections */}
        <g opacity="0.18" fill="currentColor">
          <circle cx="70" cy="30" r="1.6" />
          <circle cx="120" cy="45" r="1.2" />
          <circle cx="220" cy="26" r="1.8" />
          <circle cx="380" cy="120" r="1.4" />
          <circle cx="510" cy="70" r="1.1" />
        </g>
      </svg>
    </button>
  );
};

export default StampButton;
