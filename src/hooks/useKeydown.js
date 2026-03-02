import {useEffect} from "react";

export const useKeydown = (key, callback) => {
    useEffect(() => {
        const handler = (event) => {
            if (event.key === key) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [key, callback]);
};