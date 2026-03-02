import { useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

export const useWakeLock = (isActive) => {
    // Wir speichern die NoSleep-Instanz, damit wir immer dieselbe nutzen
    const noSleepRef = useRef(null);

    useEffect(() => {
        // Einmalig initialisieren
        if (!noSleepRef.current) {
            noSleepRef.current = new NoSleep();
        }

        const noSleep = noSleepRef.current;

        if (isActive) {
            // enable() startet das unsichtbare Video.
            // WICHTIG: Browser erlauben das nur kurz nach einem Nutzer-Klick (z.B. auf "Workout starten").
            // Da das Workout direkt nach dem Klick lädt, klappt das hier perfekt.
            noSleep.enable()
                .then(() => console.log("Bulletproof Wake Lock (NoSleep) aktiviert! ☀️"))
                .catch(err => console.warn("NoSleep konnte nicht starten:", err));
        } else {
            // disable() stoppt das Video wieder
            noSleep.disable();
            console.log("Wake Lock beendet. 🌙");
        }

        // Cleanup, wenn der Workout-Screen geschlossen wird
        return () => {
            noSleep.disable();
        };
    }, [isActive]);
};