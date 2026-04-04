import {useState} from "react";

const fetchSharedRoutine = async (id) => {
    const res = await fetch(`/api/share?id=${id}`);
    if (!res.ok) throw new Error("Routine not found or expired");
    return res.json();
};

export const useMagicLink = () => {
    const [pendingRoutine, setPendingRoutine] = useState(null);
    const [isLoadingSharedRoutine, setIsLoadingSharedRoutine] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return !!params.get("r");
    });

    useState(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("r");
        if (!id) return;
        window.history.replaceState({}, document.title, window.location.pathname);
        fetchSharedRoutine(id)
            .then(setPendingRoutine)
            .catch((err) => console.error("Fehler beim Importieren der Routine:", err))
            .finally(() => setIsLoadingSharedRoutine(false));
    });

    return {pendingRoutine, setPendingRoutine, isLoadingSharedRoutine};
};