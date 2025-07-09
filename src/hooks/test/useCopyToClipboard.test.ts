import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const mockWriteText = vi.fn();
  
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should copy text successfully', async () => {
    mockWriteText.mockResolvedValue(undefined);
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [copiedText, copy] = result.current;
    
    expect(copiedText).toBeNull();
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(true);
    });
    
    expect(mockWriteText).toHaveBeenCalledWith('test text');
    expect(result.current[0]).toBe('test text');
  });

  it('should handle clipboard API failure', async () => {
    mockWriteText.mockRejectedValue(new Error('Clipboard not available'));
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [, copy] = result.current;
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(false);
    });
    
    expect(result.current[0]).toBeNull();
  });

  it('should handle missing clipboard API', async () => {
    Object.assign(navigator, { clipboard: undefined });
    
    const { result } = renderHook(() => useCopyToClipboard());
    const [, copy] = result.current;
    
    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(false);
    });
  });
});