import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {LANGUAGE_CODES} from './config/languages.js';

const locales = import.meta.glob('./locales/*.json', { eager: true });

const resources = Object.fromEntries(
    LANGUAGE_CODES.map(code => [
        code,
        { translation: locales[`./locales/${code}.json`]?.default }
    ])
);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: LANGUAGE_CODES,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'language',
        },
    });

export default i18n;