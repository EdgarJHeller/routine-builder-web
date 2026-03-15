import {getLanguageConfig} from '../config/languages.js';

export const getVoice = (lang) => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const config = getLanguageConfig(lang);
    const locales = config.locales;

    const preferred = [
        v => locales.includes(v.lang) && v.name.includes("Google"),
        v => locales.includes(v.lang) && v.name.includes("Microsoft"),
        v => locales.includes(v.lang) && v.localService === false,
        v => locales.includes(v.lang),
        v => v.lang.startsWith(lang) && v.name.includes("Google"),
        v => v.lang.startsWith(lang) && v.name.includes("Microsoft"),
        v => v.lang.startsWith(lang),
    ];

    for (const matcher of preferred) {
        const match = voices.find(matcher);
        if (match) return match;
    }

    return null;
};