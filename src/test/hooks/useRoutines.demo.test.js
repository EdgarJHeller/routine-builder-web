import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useRoutines} from '../../hooks/useRoutines.js';

vi.mock('../../i18n.js', () => ({
    default: {
        t: (key) => key,
    },
}));

vi.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key) => key}),
}));

describe('useRoutines — demo routine seeding', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('seeds two demo routines when localStorage is empty', () => {
        const {result} = renderHook(() => useRoutines());
        expect(result.current.routines).toHaveLength(2);
    });

    it('seeds demo routines with fixed ids', () => {
        const {result} = renderHook(() => useRoutines());
        const ids = result.current.routines.map(r => r.id);
        expect(ids).toContain('demo-routine-1');
        expect(ids).toContain('demo-routine-2');
    });

    it('each demo routine has at least one exercise', () => {
        const {result} = renderHook(() => useRoutines());
        result.current.routines.forEach(routine => {
            expect(routine.exercises.length).toBeGreaterThan(0);
        });
    });

    it('demo routine exercises have required fields', () => {
        const {result} = renderHook(() => useRoutines());
        result.current.routines.forEach(routine => {
            routine.exercises.forEach(ex => {
                expect(ex).toHaveProperty('id');
                expect(ex).toHaveProperty('name');
                expect(ex).toHaveProperty('durationSeconds');
                expect(ex).toHaveProperty('isSideSwitchRequired');
            });
        });
    });

    it('does not seed demo routines when localStorage already has routines', () => {
        const existing = [{id: 'existing-1', name: 'My Routine', exercises: []}];
        localStorage.setItem('routines', JSON.stringify(existing));

        const {result} = renderHook(() => useRoutines());
        expect(result.current.routines).toHaveLength(1);
        expect(result.current.routines[0].id).toBe('existing-1');
    });

    it('demo routines are deletable and do not reappear', () => {
        const {result} = renderHook(() => useRoutines());
        expect(result.current.routines).toHaveLength(2);

        act(() => {
            result.current.deleteRoutine('demo-routine-1');
        });

        expect(result.current.routines).toHaveLength(1);
        expect(result.current.routines[0].id).toBe('demo-routine-2');

        const {result: result2} = renderHook(() => useRoutines());
        expect(result2.current.routines).toHaveLength(1);
    });
});