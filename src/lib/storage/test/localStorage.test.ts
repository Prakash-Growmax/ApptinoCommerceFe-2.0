import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem(key: string) {
        return store[key] || null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
      removeItem(key: string) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with initial value if nothing in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should initialize with value from localStorage if present', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should update value and localStorage when setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should handle function updater', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem('count')).toBe('1');
  });

  it('should handle JSON parse errors gracefully', () => {
    window.localStorage.setItem('badKey', 'not-json');

    const { result } = renderHook(() => useLocalStorage('badKey', 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });
});
