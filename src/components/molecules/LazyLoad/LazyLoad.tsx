import React, { Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  minHeight?: string;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback,
  className,
  rootMargin = '50px',
  threshold = 0.1,
  minHeight = '200px',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    rootMargin,
    threshold,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {isIntersecting ? (
        <Suspense fallback={fallback || <Skeleton className="w-full h-full" />}>
          {children}
        </Suspense>
      ) : (
        fallback || <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};