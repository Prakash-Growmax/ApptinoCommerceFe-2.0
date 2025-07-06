import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  aspectRatio?: string;
  sizes?: string;
  srcSet?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc,
  className,
  onLoad,
  onError,
  aspectRatio,
  sizes,
  srcSet,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '');
  const [imageRef, isIntersecting] = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isIntersecting && src) {
      // Preload the image
      const img = new Image();
      img.src = src;
      if (srcSet) img.srcset = srcSet;
      if (sizes) img.sizes = sizes;
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        onLoad?.();
      };
      
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
    }
  }, [isIntersecting, src, srcSet, sizes, onLoad, onError]);

  return (
    <div 
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        srcSet={isLoaded && srcSet ? srcSet : undefined}
        sizes={isLoaded && sizes ? sizes : undefined}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          {
            'opacity-0': !isLoaded && !hasError,
            'opacity-100': isLoaded || hasError,
          }
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
      {!isLoaded && !hasError && placeholderSrc && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};