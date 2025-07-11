import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const fallbackSvg = {
    sm: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iMyIgZmlsbD0iI0YzRjRGNiIvPgo8dGV4dCB4PSIxMiIgeT0iMTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI5IiBmaWxsPSIjNjY3MzgzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PPC90ZXh0Pgo8L3N2Zz4=',
    md: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI0YzRjRGNiIvPgo8dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NzM4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TzwvdGV4dD4KPC9zdmc+',
    lg: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI0YzRjRGNiIvPgo8dGV4dCB4PSIyNCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NzM4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TzwvdGV4dD4KPC9zdmc+'
  };

  const handleImageLoad = () => {
    console.log('Logo loaded successfully');
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.warn('Failed to load logo image, using fallback');
    setImageError(true);
    setImageLoaded(false);
  };

  const handleRetry = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setImageError(false);
      setImageLoaded(false);
    }
  };

  useEffect(() => {
    // Reset state when retry count changes
    setImageError(false);
    setImageLoaded(false);

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        console.warn('Logo loading timeout, using fallback');
        setImageError(true);
      }
    }, 3000); // 3 second timeout for smaller file

    return () => clearTimeout(timeout);
  }, [retryCount, imageLoaded, imageError]);

  // If we've tried too many times or had an error, use fallback
  if (imageError || retryCount >= 2) {
    return (
      <img
        src={fallbackSvg[size]}
        alt="Olynk.ai Logo"
        className={`${sizeClasses[size]} object-contain ${className}`}
      />
    );
  }

  // Show loading state
  if (!imageLoaded) {
    return (
      <div 
        className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
        style={{ 
          minWidth: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
          minHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
        }}
      />
    );
  }

  return (
    <img
      src="/assets/Olynk_Logo.png"
      alt="Olynk.ai Logo"
      className={`${sizeClasses[size]} object-contain ${className} ${
        !imageLoaded ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-300`}
      onLoad={handleImageLoad}
      onError={handleImageError}
      style={{ 
        minWidth: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
        minHeight: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px'
      }}
    />
  );
};

export default Logo; 