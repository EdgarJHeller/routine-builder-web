import {describe, expect, it} from 'vitest';
import {formatDuration} from '../../utils/formatDuration.js';

describe('formatDuration', () => {
    it('returns "0s" for empty array', () => {
        expect(formatDuration([])).toBe('0s');
    });

    it('returns "0s" for undefined', () => {
        expect(formatDuration(undefined)).toBe('0s');
    });

    it('returns seconds only when under 1 minute', () => {
        const exercises = [{durationSeconds: 45}];
        expect(formatDuration(exercises)).toBe('45s');
    });

    it('returns minutes only when exact', () => {
        const exercises = [{durationSeconds: 240}];
        expect(formatDuration(exercises)).toBe('4 min');
    });

    it('returns minutes and seconds when mixed', () => {
        const exercises = [
            {durationSeconds: 240},
            {durationSeconds: 30}
        ];
        expect(formatDuration(exercises)).toBe('4 min 30s');
    });

    it('handles multiple exercises correctly', () => {
        const exercises = [
            {durationSeconds: 30},
            {durationSeconds: 34},
        ];
        expect(formatDuration(exercises)).toBe('1 min 4s');
    });

    it('returns minutes even when total exceeds one hour', () => {
        const exercises = [
            {durationSeconds: 3664},
            {durationSeconds: 4},
        ];
        expect(formatDuration(exercises)).toBe('61 min 8s');
    });
});