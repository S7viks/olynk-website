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

  const [imageError, setImageError] = React.useState(false);

  if (imageError) {
    // Fallback to text logo if image fails to load
    return (
      <div 
        className={`${sizeClasses[size]} flex items-center justify-center bg-red-600 text-white font-bold rounded ${className}`}
        style={{
          minWidth: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
          minHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
        }}
      >
        O
      </div>
    );
  }

  return (
    <img
      src="/assets/LogoNavbar.png"
      alt="Olynk.ai Logo"
      className={`${sizeClasses[size]} object-contain ${className}`}
      style={{
        minWidth: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
        minHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
      }}
      onError={() => setImageError(true)}
    />
  );
};

export default Logo; 