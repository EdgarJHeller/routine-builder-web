export const getVoice = (lang) => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.lang.startsWith(lang) && v.name.includes("Google"))
        || voices.find(v => v.lang.startsWith(lang))
        || null;
};