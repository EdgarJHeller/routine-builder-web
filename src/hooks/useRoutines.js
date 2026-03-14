import {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';

export const useRoutines = () => {
    const {t} = useTranslation();

    const [routines, setRoutines] = useState(() => {
        const savedRoutines = localStorage.getItem('routines');
        if (savedRoutines) return JSON.parse(savedRoutines);

        const oldExercises = localStorage.getItem('exercises');
        if (oldExercises) {
            return [{
                id: crypto.randomUUID(),
                name: "Meine erste Routine",
                exercises: JSON.parse(oldExercises)
            }];
        }
        return [];
    });

    const [activeRoutineId, setActiveRoutineId] = useState(null);
    const activeRoutine = routines.find(r => r.id === activeRoutineId);
    const currentExercises = activeRoutine ? activeRoutine.exercises : [];

    useEffect(() => {
        localStorage.setItem('routines', JSON.stringify(routines));
    }, [routines]);

    const updateRoutineName = (id, newName) => {
        setRoutines(prev => prev.map(r => r.id === id ? {...r, name: newName} : r));
    };

    const createNewRoutine = () => {
        const newRoutine = {
            id: crypto.randomUUID(),
            name: t('ui.newRoutine'),
            exercises: []
        };
        setRoutines(prev => [...prev, newRoutine]);
        setActiveRoutineId(newRoutine.id);
    };

    const deleteRoutine = (id) => {
        setRoutines(prev => prev.filter(r => r.id !== id));
        if (activeRoutineId === id) setActiveRoutineId(null);
    };

    const updateActiveRoutineExercises = (newExercises) => {
        setRoutines(prev => prev.map(r => r.id === activeRoutineId ? {...r, exercises: newExercises} : r));
    };

    const addExercise = (ex) => updateActiveRoutineExercises([...currentExercises, ex]);

    const deleteExercise = (id) => updateActiveRoutineExercises(currentExercises.filter(ex => ex.id !== id));

    const updateExercise = (id, updatedData) => {
        updateActiveRoutineExercises(currentExercises.map(ex => ex.id === id ? {...ex, ...updatedData} : ex));
    };

    const moveExercise = (from, to) => {
        if (to < 0 || to >= currentExercises.length) return;
        const newArr = [...currentExercises];
        const item = newArr.splice(from, 1)[0];
        newArr.splice(to, 0, item);
        updateActiveRoutineExercises(newArr);
    };

    return {
        routines,
        setRoutines,
        activeRoutineId,
        setActiveRoutineId,
        activeRoutine,
        currentExercises,
        updateRoutineName,
        createNewRoutine,
        deleteRoutine,
        addExercise,
        deleteExercise,
        updateExercise,
        moveExercise
    };
};