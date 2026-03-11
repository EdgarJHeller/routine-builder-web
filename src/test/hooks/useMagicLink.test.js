import {beforeEach, describe, expect, it} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useMagicLink} from '../../hooks/useMagicLink.js';

const encodeRoutine = (routine) => {
    return btoa(encodeURIComponent(JSON.stringify(routine)));
};

describe('useMagicLink', () => {
    beforeEach(() => {
        // reset URL before each test
        window.history.replaceState({}, '', '/');
    });

    it('returns null when no routine param in URL', () => {
        const {result} = renderHook(() => useMagicLink());
        expect(result.current.pendingRoutine).toBeNull();
    });

    it('parses a valid routine from URL params', () => {
        const routine = {name: 'Test Routine', exercises: []};
        const encoded = encodeRoutine(routine);
        window.history.replaceState({}, '', `/?routine=${encoded}`);

        const {result} = renderHook(() => useMagicLink());
        expect(result.current.pendingRoutine).toEqual(routine);
    });

    it('clears the URL param after parsing', () => {
        const routine = {name: 'Test Routine', exercises: []};
        const encoded = encodeRoutine(routine);
        window.history.replaceState({}, '', `/?routine=${encoded}`);

        renderHook(() => useMagicLink());
        expect(window.location.search).toBe('');
    });

    it('returns null for malformed routine param', () => {
        window.history.replaceState({}, '', '/?routine=notvalidbase64!!!');

        const {result} = renderHook(() => useMagicLink());
        expect(result.current.pendingRoutine).toBeNull();
    });

    it('allows clearing pendingRoutine via setPendingRoutine', () => {
        const routine = {name: 'Test Routine', exercises: []};
        const encoded = encodeRoutine(routine);
        window.history.replaceState({}, '', `/?routine=${encoded}`);

        const {result} = renderHook(() => useMagicLink());
        expect(result.current.pendingRoutine).toEqual(routine);

        act(() => {
            result.current.setPendingRoutine(null);
        });

        expect(result.current.pendingRoutine).toBeNull();
    });
});