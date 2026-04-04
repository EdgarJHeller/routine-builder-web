import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook, waitFor} from '@testing-library/react';
import {useMagicLink} from '../../hooks/useMagicLink.js';

const mockRoutine = {name: 'Test Routine', exercises: []};

describe('useMagicLink', () => {
    beforeEach(() => {
        window.history.replaceState({}, '', '/');
        vi.restoreAllMocks();
    });

    it('returns null and not loading when no param in URL', () => {
        const {result} = renderHook(() => useMagicLink());
        expect(result.current.pendingRoutine).toBeNull();
        expect(result.current.isLoadingSharedRoutine).toBe(false);
    });

    it('fetches routine by id and sets pendingRoutine', async () => {
        window.history.replaceState({}, '', '/?r=test-uuid');
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockRoutine,
        }));

        const {result} = renderHook(() => useMagicLink());

        expect(result.current.isLoadingSharedRoutine).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoadingSharedRoutine).toBe(false);
        });

        expect(fetch).toHaveBeenCalledWith('/api/share?id=test-uuid');
        expect(result.current.pendingRoutine).toEqual(mockRoutine);
    });

    it('clears the URL param after fetching', async () => {
        window.history.replaceState({}, '', '/?r=test-uuid');
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockRoutine,
        }));

        renderHook(() => useMagicLink());

        await waitFor(() => {
            expect(window.location.search).toBe('');
        });
    });

    it('returns null when fetch returns 404', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        window.history.replaceState({}, '', '/?r=expired-uuid');
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
        }));

        const {result} = renderHook(() => useMagicLink());

        await waitFor(() => {
            expect(result.current.isLoadingSharedRoutine).toBe(false);
        });

        expect(result.current.pendingRoutine).toBeNull();
        consoleSpy.mockRestore();
    });

    it('returns null when fetch throws', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        window.history.replaceState({}, '', '/?r=bad-uuid');
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

        const {result} = renderHook(() => useMagicLink());

        await waitFor(() => {
            expect(result.current.isLoadingSharedRoutine).toBe(false);
        });

        expect(result.current.pendingRoutine).toBeNull();
        consoleSpy.mockRestore();
    });

    it('allows clearing pendingRoutine via setPendingRoutine', async () => {
        window.history.replaceState({}, '', '/?r=test-uuid');
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockRoutine,
        }));

        const {result} = renderHook(() => useMagicLink());

        await waitFor(() => {
            expect(result.current.pendingRoutine).toEqual(mockRoutine);
        });

        act(() => {
            result.current.setPendingRoutine(null);
        });

        expect(result.current.pendingRoutine).toBeNull();
    });
});