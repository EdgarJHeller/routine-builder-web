import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getVoice} from '../../utils/speechUtils.js';

const mockVoice = (name, lang, localService = true) => ({name, lang, localService});

const setupVoices = (voices) => {
    window.speechSynthesis = {
        getVoices: vi.fn().mockReturnValue(voices),
    };
};

beforeEach(() => {
    window.speechSynthesis = {getVoices: vi.fn().mockReturnValue([])};
});

describe('getVoice', () => {
    it('returns null when no voices are available', () => {
        setupVoices([]);
        expect(getVoice('en')).toBeNull();
    });

    it('prefers Google voice over Microsoft for matching locale', () => {
        setupVoices([
            mockVoice('Microsoft David', 'en-US', true),
            mockVoice('Google US English', 'en-US', false),
        ]);
        const voice = getVoice('en');
        expect(voice.name).toBe('Google US English');
    });

    it('prefers Microsoft voice over local when no Google available', () => {
        setupVoices([
            mockVoice('Local English', 'en-US', true),
            mockVoice('Microsoft David', 'en-US', false),
        ]);
        const voice = getVoice('en');
        expect(voice.name).toBe('Microsoft David');
    });

    it('prefers preferred locale over generic language match', () => {
        setupVoices([
            mockVoice('Google US English', 'en-US', false),
            mockVoice('Google UK English', 'en-GB', false),
        ]);
        // en-GB is first in locales preference for 'en'
        const voice = getVoice('en');
        expect(voice.name).toBe('Google UK English');
    });

    it('falls back to generic language match when no preferred locale available', () => {
        setupVoices([
            mockVoice('Google Australian English', 'en-AU', false),
        ]);
        const voice = getVoice('en');
        expect(voice.name).toBe('Google Australian English');
    });

    it('returns correct voice for German', () => {
        setupVoices([
            mockVoice('Google Deutsch', 'de-DE', false),
            mockVoice('Google US English', 'en-US', false),
        ]);
        const voice = getVoice('de');
        expect(voice.name).toBe('Google Deutsch');
    });

    it('prefers es-ES over es-US for Spanish', () => {
        setupVoices([
            mockVoice('Google español de Estados Unidos', 'es-US', false),
            mockVoice('Google español', 'es-ES', false),
        ]);
        const voice = getVoice('es');
        expect(voice.name).toBe('Google español');
    });

    it('returns null when no voice matches the language', () => {
        setupVoices([
            mockVoice('Google US English', 'en-US', false),
        ]);
        expect(getVoice('ja')).toBeNull();
    });
});