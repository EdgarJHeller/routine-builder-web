import {useState} from "react";

export const useMagicLink = () => {
    const [pendingRoutine, setPendingRoutine] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const sharedRoutineData = params.get("routine");

        if (sharedRoutineData) {
            window.history.replaceState({}, document.title, window.location.pathname);
            try {
                return JSON.parse(decodeURIComponent(atob(sharedRoutineData)));
            } catch (error) {
                console.error("Fehler beim Importieren der Routine:", error);
            }
        }
        return null;
    });

    return {pendingRoutine, setPendingRoutine};
};