import React from 'react';

type BrandLogoProps = {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: {icon: 'h-8 w-8', text: 'text-xl'},
  md: {icon: 'h-10 w-10', text: 'text-2xl'},
  lg: {icon: 'h-16 w-16', text: 'text-5xl'},
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900';
  const s: (typeof sizeMap)[keyof typeof sizeMap] = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="StreetChef">
      <img src="/streetchef-icon.svg" alt="" className={`${s.icon} rounded-full shrink-0`} />
      <span className={`${s.text} font-bold ${textColor} tracking-tight`} aria-hidden="true">
        Street<span className="text-orange-500">Chef</span>
      </span>
    </div>
  );
};
