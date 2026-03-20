import {useState, useCallback} from 'react';

export const useCatalog = () => {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCatalog = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/catalog.json');
            if (!res.ok) {
                setError('Failed to fetch catalog');
                return;
            }
            const data = await res.json();
            setRoutines(data.routines);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return {routines, loading, error, fetchCatalog};
};