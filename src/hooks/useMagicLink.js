import {useEffect} from "react";
import {translations} from "../locales";

export const useMagicLink = (setRoutines, lang) => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sharedRoutineData = params.get("routine");

        if (sharedRoutineData) {
            const t = translations[lang];

            window.history.replaceState({}, document.title, window.location.pathname);

            setTimeout(() => {
                try {
                    const decodedRoutine = JSON.parse(decodeURIComponent(atob(sharedRoutineData)));

                    const importedRoutine = {
                        ...decodedRoutine,
                        id: crypto.randomUUID(),
                        name: decodedRoutine.name + t.ui.importedSuffix
                    };

                    setRoutines(prev => [...prev, importedRoutine]);

                    const successMsg = t.ui.importSuccess.replace('{name}', decodedRoutine.name);
                    alert(successMsg);

                } catch (error) {
                    console.error("Fehler beim Importieren der Routine:", error);
                    alert(t.ui.importError);
                }
            }, 0);
        }
    }, [lang, setRoutines]);
};