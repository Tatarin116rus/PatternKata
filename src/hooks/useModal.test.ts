import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useModal } from './useModal';

describe('useModal', () => {
  it('следует инициализировать с закрытым состоянием', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('должен открываться модально при вызове функции open()', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('должен закрываться модально при вызове функции close()', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.open();
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });
});