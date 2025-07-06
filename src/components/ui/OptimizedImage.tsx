import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  lazy?: boolean;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  aspectRatio?: 'square' | 'video' | 'auto' | number;
  sizes?: string;
  priority?: boolean;
}

// Default loading component
const DefaultLoadingComponent = () => (
  <div className="flex items-center justify-center bg-gray-100 animate-pulse">
    <svg
      className="w-8 h-8 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
        clipRule="evenodd"
      />
    </svg>
  </div>
);

// Default error component
const DefaultErrorComponent = ({ alt }: { alt: string }) => (
  <div className="flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
    <div className="text-center">
      <svg
        className="w-8 h-8 mx-auto mb-2 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <p>{alt}</p>
    </div>
  </div>
);

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  loadingComponent = <DefaultLoadingComponent />,
  errorComponent = <DefaultErrorComponent alt={alt} />,
  lazy = true,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad,
  onError,
  aspectRatio = 'auto',
  sizes,
  priority = false,
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          setCurrentSrc(src);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isVisible, src, threshold, rootMargin]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setIsLoading(false);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      onError?.('Failed to load image');
    }
  }, [fallbackSrc, currentSrc, onError]);

  // Get aspect ratio classes
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'auto':
        return '';
      default:
        return typeof aspectRatio === 'number' ? `aspect-[${aspectRatio}]` : '';
    }
  };

  // Generate responsive image sizes
  const generateSizes = () => {
    if (sizes) return sizes;
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!src) return '';
    
    // This is a simplified version - in a real app, you'd generate different sizes
    const widths = [640, 1024, 1280, 1920];
    return widths
      .map(width => `${src}?w=${width} ${width}w`)
      .join(', ');
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        getAspectRatioClass(),
        className
      )}
      {...props}
    >
      {/* Loading state */}
      {isLoading && isVisible && (
        <div className="absolute inset-0 flex items-center justify-center">
          {loadingComponent}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          {errorComponent}
        </div>
      )}

      {/* Actual image */}
      {isVisible && currentSrc && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          srcSet={generateSrcSet()}
          sizes={generateSizes()}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            'object-cover w-full h-full'
          )}
        />
      )}

      {/* Placeholder for non-visible images */}
      {!isVisible && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
        </div>
      )}
    </div>
  );
};

// Hook for image preloading
export const useImagePreloader = (urls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, url]));
        resolve();
      };
      img.onerror = () => {
        setFailedImages(prev => new Set([...prev, url]));
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });
  }, []);

  const preloadImages = useCallback(async (imagesToPreload: string[]) => {
    const promises = imagesToPreload.map(url => preloadImage(url));
    await Promise.allSettled(promises);
  }, [preloadImage]);

  useEffect(() => {
    if (urls.length > 0) {
      preloadImages(urls);
    }
  }, [urls, preloadImages]);

  return {
    loadedImages,
    failedImages,
    preloadImage,
    preloadImages,
  };
};

// Progressive image loading component
export const ProgressiveImage: React.FC<OptimizedImageProps & {
  lowQualitySrc?: string;
  highQualitySrc: string;
}> = ({
  lowQualitySrc,
  highQualitySrc,
  alt,
  className,
  ...props
}) => {
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || '');

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <div className={cn('relative', className)}>
      {/* Low quality placeholder */}
      {lowQualitySrc && !isHighQualityLoaded && (
        <OptimizedImage
          {...props}
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 filter blur-sm scale-105"
          priority
        />
      )}
      
      {/* High quality image */}
      <OptimizedImage
        {...props}
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-500',
          isHighQualityLoaded ? 'opacity-100' : 'opacity-0'
        )}
        priority
      />
    </div>
  );
};

// Image gallery with lazy loading
export const ImageGallery: React.FC<{
  images: Array<{
    src: string;
    alt: string;
    thumbnail?: string;
  }>;
  onImageClick?: (index: number) => void;
  columns?: number;
  gap?: number;
}> = ({ images, onImageClick, columns = 3, gap = 4 }) => {
  const { preloadImage } = useImagePreloader([]);

  const handleImageHover = useCallback((src: string) => {
    preloadImage(src);
  }, [preloadImage]);

  return (
    <div 
      className={`grid gap-${gap}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => onImageClick?.(index)}
          onMouseEnter={() => handleImageHover(image.src)}
        >
          <OptimizedImage
            src={image.thumbnail || image.src}
            alt={image.alt}
            aspectRatio="square"
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};