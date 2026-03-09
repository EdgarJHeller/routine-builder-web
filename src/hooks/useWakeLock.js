import { useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

export const useWakeLock = (isActive) => {
    const noSleepRef = useRef(null);

    useEffect(() => {
        if (!noSleepRef.current) {
            noSleepRef.current = new NoSleep();
        }

        const noSleep = noSleepRef.current;

        if (isActive) {
            noSleep.enable()
                .then(() => console.log("Bulletproof Wake Lock (NoSleep) aktiviert! ☀️"))
                .catch(err => console.warn("NoSleep konnte nicht starten:", err));
        } else {
            noSleep.disable();
            console.log("Wake Lock beendet. 🌙");
        }

        return () => {
            noSleep.disable();
        };
    }, [isActive]);
};