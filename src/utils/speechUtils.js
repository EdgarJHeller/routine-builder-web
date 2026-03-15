import {getLanguageConfig} from "../config/languages.js";

export const getVoice = (lang) => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const config = getLanguageConfig(lang);
    if (!config) return null;

    const locales = config.locales;

    // Try preferred locales in order
    for (const locale of locales) {
        const google = voices.find(v => v.lang === locale && v.name.includes("Google"));
        if (google) return google;
        const microsoft = voices.find(v => v.lang === locale && v.name.includes("Microsoft"));
        if (microsoft) return microsoft;
        const cloud = voices.find(v => v.lang === locale && v.localService === false);
        if (cloud) return cloud;
        const any = voices.find(v => v.lang === locale);
        if (any) return any;
    }

    // Fall back to any voice for this language
    const googleFallback = voices.find(v => v.lang.startsWith(lang) && v.name.includes("Google"));
    if (googleFallback) return googleFallback;
    const microsoftFallback = voices.find(v => v.lang.startsWith(lang) && v.name.includes("Microsoft"));
    if (microsoftFallback) return microsoftFallback;
    const anyFallback = voices.find(v => v.lang.startsWith(lang));
    if (anyFallback) return anyFallback;

    return null;
};