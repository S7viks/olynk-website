import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <img
      src="/assets/Olynk_Logo.png"
      alt="Olynk Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
    />
  );
};

export default Logo; 