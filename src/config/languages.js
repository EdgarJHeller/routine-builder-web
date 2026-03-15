export const LANGUAGES = [
    {
        code: 'en',
        label: 'EN',
        locales: ['en-GB', 'en-US', 'en-AU'],
        bcp47: 'en-US',
    },
    {
        code: 'de',
        label: 'DE',
        locales: ['de-DE', 'de-AT', 'de-CH'],
        bcp47: 'de-DE',
    },
    {
        code: 'fr',
        label: 'FR',
        locales: ['fr-FR', 'fr-CA', 'fr-BE'],
        bcp47: 'fr-FR',
    },
    {
        code: 'es',
        label: 'ES',
        locales: ['es-ES', 'es-MX', 'es-US'],
        bcp47: 'es-ES',
    },
];

export const LANGUAGE_CODES = LANGUAGES.map(l => l.code);

export const getLanguageConfig = (code) =>
    LANGUAGES.find(l => l.code === code) ?? null;