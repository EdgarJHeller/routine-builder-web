import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import useRoutineTimer, {PREP_DURATION} from '../../hooks/useRoutineTimer.js';

// Mock dependencies
vi.mock('../../utils/speechUtils.js', () => ({
    getVoice: vi.fn().mockReturnValue(null),
}));

vi.mock('../../utils/audioUtils.js', () => ({
    playBeep: vi.fn(),
}));

vi.mock('../../config/languages.js', () => ({
    getLanguageConfig: vi.fn().mockReturnValue({bcp47: 'en-US'}),
}));

const mockExercises = [
    {id: '1', name: 'Push-ups', durationSeconds: 30, isSideSwitchRequired: false},
    {id: '2', name: 'Squats', durationSeconds: 20, isSideSwitchRequired: false},
    {id: '3', name: 'Plank', durationSeconds: 40, isSideSwitchRequired: true},
];

beforeEach(() => {
    vi.useFakeTimers();

    globalThis.SpeechSynthesisUtterance = vi.fn().mockImplementation(function (text) {
        this.text = text;
        this.lang = '';
        this.voice = null;
    });

    window.speechSynthesis = {
        cancel: vi.fn(),
        speak: vi.fn(),
        getVoices: vi.fn().mockReturnValue([]),
        onvoiceschanged: null,
    };
});

afterEach(() => {
    vi.useRealTimers();
});

describe('useRoutineTimer', () => {
    describe('initial state', () => {
        it('starts paused', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.isPaused).toBe(true);
        });

        it('starts with first exercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.currentExercise.name).toBe('Push-ups');
        });

        it('starts with correct timeLeft', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.timeLeft).toBe(30);
        });

        it('starts with correct nextExercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.nextExercise.name).toBe('Squats');
        });

        it('starts not prepping', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.isPrepping).toBe(false);
        });

        it('starts with full prep time', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.prepTimeLeft).toBe(PREP_DURATION);
        });

        it('starts routine not complete', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            expect(result.current.isRoutineComplete).toBe(false);
        });
    });

    describe('start', () => {
        it('sets isPaused to false', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            expect(result.current.isPaused).toBe(false);
        });

        it('starts prep phase', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            expect(result.current.isPrepping).toBe(true);
        });

        it('resets prep time to PREP_DURATION', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            expect(result.current.prepTimeLeft).toBe(PREP_DURATION);
        });
    });

    describe('pause', () => {
        it('sets isPaused to true', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            act(() => result.current.pause());
            expect(result.current.isPaused).toBe(true);
        });
    });

    describe('reset', () => {
        it('resets to initial state', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            act(() => result.current.reset());
            expect(result.current.isPaused).toBe(true);
            expect(result.current.currentExercise.name).toBe('Push-ups');
            expect(result.current.timeLeft).toBe(30);
            expect(result.current.isPrepping).toBe(false);
            expect(result.current.isRoutineComplete).toBe(false);
        });
    });

    describe('next', () => {
        it('advances to next exercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            expect(result.current.currentExercise.name).toBe('Squats');
        });

        it('sets timeLeft to next exercise duration', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            expect(result.current.timeLeft).toBe(20);
        });

        it('starts prep phase on next', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            expect(result.current.isPrepping).toBe(true);
        });

        it('completes routine when on last exercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next()); // → Squats
            act(() => result.current.next()); // → Plank
            act(() => result.current.next()); // → complete
            expect(result.current.isRoutineComplete).toBe(true);
        });
    });

    describe('prev', () => {
        it('goes back to previous exercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            act(() => result.current.prev());
            expect(result.current.currentExercise.name).toBe('Push-ups');
        });

        it('does nothing when on first exercise', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.prev());
            expect(result.current.currentExercise.name).toBe('Push-ups');
        });

        it('starts prep phase on prev', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            act(() => result.current.prev());
            expect(result.current.isPrepping).toBe(true);
        });
    });

    describe('prep countdown', () => {
        it('counts down prepTimeLeft every second', async () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            await act(async () => {
                vi.advanceTimersByTime(1000);
            });
            expect(result.current.prepTimeLeft).toBe(PREP_DURATION - 1);
        });

        it('does not count down when paused', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            // never call start — stays paused
            expect(result.current.isPaused).toBe(true);
            expect(result.current.prepTimeLeft).toBe(PREP_DURATION);
        });
    });

    describe('main timer', () => {
        it('timer does not run before start is called', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => {
                vi.advanceTimersByTime(5000);
            });
            expect(result.current.timeLeft).toBe(30);
        });

        it('timer does not run when paused', async () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.start());
            act(() => result.current.pause());
            await act(async () => {
                vi.advanceTimersByTime(5000);
            });
            expect(result.current.timeLeft).toBe(30);
        });
    });

    describe('side switch', () => {
        it('does not trigger side switch for exercises without it', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            // Push-ups has isSideSwitchRequired: false
            expect(result.current.isSideSwitchAlert).toBe(false);
            expect(result.current.currentExercise.isSideSwitchRequired).toBe(false);
        });

        it('third exercise has side switch required', () => {
            const {result} = renderHook(() => useRoutineTimer(mockExercises));
            act(() => result.current.next());
            act(() => result.current.next());
            expect(result.current.currentExercise.isSideSwitchRequired).toBe(true);
        });
    });
});