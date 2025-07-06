import { useState, useCallback, useRef, useEffect } from 'react';
import { useDebounce } from './useDebounce';

interface UseOptimizedSearchOptions {
  debounceMs?: number;
  minLength?: number;
  onSearch?: (term: string) => void;
  onClear?: () => void;
}

export const useOptimizedSearch = ({
  debounceMs = 300,
  minLength = 2,
  onSearch,
  onClear,
}: UseOptimizedSearchOptions = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  const previousSearchTerm = useRef('');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.length >= minLength) {
      setIsSearching(true);
    }
  }, [minLength]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setIsSearching(false);
    onClear?.();
  }, [onClear]);

  useEffect(() => {
    if (debouncedSearchTerm !== previousSearchTerm.current) {
      previousSearchTerm.current = debouncedSearchTerm;
      
      if (debouncedSearchTerm.length >= minLength) {
        onSearch?.(debouncedSearchTerm);
      } else if (debouncedSearchTerm.length === 0) {
        onClear?.();
      }
      
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, minLength, onSearch, onClear]);

  return {
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    handleSearch,
    clearSearch,
  };
};

// Optimized API call hook with automatic retries and cancellation
export const useOptimizedApiCall = <T>(
  apiCall: (signal: AbortSignal) => Promise<T>,
  options: {
    retries?: number;
    retryDelay?: number;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  const { retries = 3, retryDelay = 1000, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);
    retryCountRef.current = 0;

    const attemptCall = async (): Promise<T> => {
      try {
        const result = await apiCall(signal);
        return result;
      } catch (err) {
        if (signal.aborted) {
          throw err;
        }

        if (retryCountRef.current < retries) {
          retryCountRef.current++;
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attemptCall();
        }

        throw err;
      }
    };

    try {
      const result = await attemptCall();
      
      if (!signal.aborted) {
        setData(result);
        onSuccess?.(result);
      }
    } catch (err) {
      if (!signal.aborted) {
        const error = err as Error;
        setError(error);
        onError?.(error);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [apiCall, retries, retryDelay, onSuccess, onError]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    data,
    loading,
    error,
    execute,
    cancel,
  };
};

// Optimized pagination hook
export const useOptimizedPagination = <T>(
  items: T[],
  pageSize: number = 10
) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  
  const currentItems = items.slice(startIndex, endIndex);
  
  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);
  
  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, []);
  
  const reset = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    reset,
    hasNext: currentPage < totalPages - 1,
    hasPrev: currentPage > 0,
  };
};

// Optimized infinite scroll hook
export const useOptimizedInfiniteScroll = <T>(
  fetchMore: (page: number) => Promise<T[]>,
  options: {
    threshold?: number;
    rootMargin?: string;
    pageSize?: number;
    onError?: (error: Error) => void;
  } = {}
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const pageRef = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { threshold = 1.0, rootMargin = '0px', pageSize = 20, onError } = options;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newItems = await fetchMore(pageRef.current);
      
      if (newItems.length === 0 || newItems.length < pageSize) {
        setHasMore(false);
      }

      setItems(prev => [...prev, ...newItems]);
      pageRef.current += 1;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, fetchMore, pageSize, onError]);

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold, rootMargin }
    );

    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, loadMore, threshold, rootMargin]);

  const reset = useCallback(() => {
    setItems([]);
    setHasMore(true);
    setError(null);
    pageRef.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    items,
    loading,
    hasMore,
    error,
    lastElementRef,
    reset,
    loadMore,
  };
};