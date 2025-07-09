import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showPageNumbers = true,
  maxVisiblePages = 5,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = (): number[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <nav 
      role="navigation" 
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={handlePreviousPage}
        disabled={isPreviousDisabled}
        aria-label="Go to previous page"
        className={`
          flex items-center justify-center w-10 h-10 rounded-md border transition-colors
          ${isPreviousDisabled 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
            : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }
        `}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <>
          {/* First page and ellipsis */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label="Go to page 1"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                  ...
                </span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`
                flex items-center justify-center w-10 h-10 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                ${page === currentPage
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
            >
              {page}
            </button>
          ))}

          {/* Last page and ellipsis */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="flex items-center justify-center w-10 h-10 text-gray-500">
                  ...
                </span>
              )}
              <button
                onClick={() => handlePageClick(totalPages)}
                className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </>
      )}

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        disabled={isNextDisabled}
        aria-label="Go to next page"
        className={`
          flex items-center justify-center w-10 h-10 rounded-md border transition-colors
          ${isNextDisabled 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' 
            : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }
        `}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-gray-600" aria-live="polite">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};