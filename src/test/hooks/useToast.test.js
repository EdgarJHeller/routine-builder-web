import {describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useToast} from '../../hooks/useToast.js';

describe('useToast', () => {
    it('starts with no toast', () => {
        const {result} = renderHook(() => useToast());
        expect(result.current.toast).toBeNull();
    });

    it('shows a toast message after showToast is called', () => {
        const {result} = renderHook(() => useToast());
        act(() => {
            result.current.showToast('Hello!');
        });
        expect(result.current.toast).toBe('Hello!');
    });

    it('clears the toast after the duration', async () => {
        vi.useFakeTimers();
        const {result} = renderHook(() => useToast());

        act(() => {
            result.current.showToast('Hello!', 3000);
        });

        expect(result.current.toast).toBe('Hello!');

        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.toast).toBeNull();
        vi.useRealTimers();
    });

    it('replaces an existing toast with a new one', () => {
        const {result} = renderHook(() => useToast());

        act(() => {
            result.current.showToast('First');
        });
        act(() => {
            result.current.showToast('Second');
        });

        expect(result.current.toast).toBe('Second');
    });
});