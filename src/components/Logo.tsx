import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <img
      src="/assets/LogoNavbar.png"
      alt="Olynk.ai Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      style={{
        minWidth: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
        minHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
      }}
    />
  );
};

export default Logo; 