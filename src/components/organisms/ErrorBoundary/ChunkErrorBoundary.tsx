import { Component, ReactNode } from 'react';

interface ChunkErrorBoundaryState {
  hasError: boolean;
  chunkError: boolean;
}

interface ChunkErrorBoundaryProps {
  children: ReactNode;
}

/**
 * Specialized Error Boundary for handling chunk loading errors
 * (common with code splitting)
 */
export class ChunkErrorBoundary extends Component<
  ChunkErrorBoundaryProps,
  ChunkErrorBoundaryState
> {
  constructor(props: ChunkErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, chunkError: false };
  }

  static getDerivedStateFromError(error: Error): ChunkErrorBoundaryState {
    // Check if it's a chunk loading error
    const chunkError =
      error.message.includes('Loading chunk') ||
      error.message.includes('Loading CSS chunk') ||
      error.name === 'ChunkLoadError';

    return { hasError: true, chunkError };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    if (this.state.chunkError) {
      console.error('Chunk loading error:', error);

      // Try to reload the page to get the new chunks
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  render() {
    if (this.state.hasError && this.state.chunkError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading new version...</p>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
