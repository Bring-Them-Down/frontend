import React from 'react';

interface ShootProps {
  color?: string;
  size?: number | string;
  className?: string;
}

const Shoot: React.FC<ShootProps> = ({ 
  color = "#000000", 
  size = 24, 
  className 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <path d="M2 12L5 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M19 12L22 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M12 22L12 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M12 5L12 2" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M10 12H12H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
        <path d="M12 14L12 12L12 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path> 
      </g>
    </svg>
  );
};
export default Shoot;