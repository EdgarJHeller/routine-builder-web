import {describe, expect, it} from 'vitest';
import {getLanguageConfig, LANGUAGE_CODES, LANGUAGES} from '../../config/languages.js';

describe('LANGUAGE_CODES', () => {
    it('contains all supported language codes', () => {
        expect(LANGUAGE_CODES).toContain('en');
        expect(LANGUAGE_CODES).toContain('de');
        expect(LANGUAGE_CODES).toContain('fr');
        expect(LANGUAGE_CODES).toContain('es');
    });

    it('has the same length as LANGUAGES', () => {
        expect(LANGUAGE_CODES.length).toBe(LANGUAGES.length);
    });
});

describe('getLanguageConfig', () => {
    it('returns correct config for en', () => {
        const config = getLanguageConfig('en');
        expect(config.code).toBe('en');
        expect(config.bcp47).toBe('en-US');
        expect(config.locales).toContain('en-GB');
    });

    it('returns correct config for de', () => {
        const config = getLanguageConfig('de');
        expect(config.code).toBe('de');
        expect(config.bcp47).toBe('de-DE');
    });

    it('returns correct config for fr', () => {
        const config = getLanguageConfig('fr');
        expect(config.code).toBe('fr');
        expect(config.bcp47).toBe('fr-FR');
    });

    it('returns correct config for es', () => {
        const config = getLanguageConfig('es');
        expect(config.code).toBe('es');
        expect(config.bcp47).toBe('es-ES');
    });

    it('returns null for unknown code', () => {
        const config = getLanguageConfig('ja');
        expect(config).toBeNull();
    });

    it('each language has required fields', () => {
        LANGUAGES.forEach(lang => {
            expect(lang.code).toBeDefined();
            expect(lang.label).toBeDefined();
            expect(lang.locales).toBeDefined();
            expect(lang.bcp47).toBeDefined();
            expect(lang.locales.length).toBeGreaterThan(0);
        });
    });
});