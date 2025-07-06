import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [ref: React.RefObject<T | null>, isIntersecting: boolean] {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry?.isIntersecting ?? false;
        setIsIntersecting(isElementIntersecting);

        // If freezeOnceVisible is true and element is visible, disconnect observer
        if (isElementIntersecting && freezeOnceVisible) {
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return [elementRef, isIntersecting];
}