import {describe, expect, it, vi, beforeEach} from 'vitest';

vi.mock('../../i18n.js', () => ({
    default: {
        t: (key) => {
            const translations = {
                'demo.routine1.name': 'Musiker-Handwarm-up (Demo)',
                'demo.routine2.name': 'Schreibtisch-Reset (Demo)',
            };
            return translations[key] ?? key;
        },
    },
}));

describe('getDemoRoutines — language', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('uses the active i18n language for demo routine names', async () => {
        const {getDemoRoutines} = await import('../../data/demoRoutines.js');
        const routines = getDemoRoutines();
        expect(routines[0].name).toBe('Musiker-Handwarm-up (Demo)');
        expect(routines[1].name).toBe('Schreibtisch-Reset (Demo)');
    });
});