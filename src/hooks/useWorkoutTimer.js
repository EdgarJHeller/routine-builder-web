import {useCallback, useEffect, useState} from 'react';
import {translations} from '../locales';
import {getVoice} from '../utils/speechUtils.js';

/**
 * Custom hook to manage a workout timer.
 *
 * @param {Array} exercises - List of exercise objects.
 * @param lang
 * @returns {Object} - The current state of the workout and control functions.
 */
const useWorkoutTimer = (exercises, lang = 'en') => {
    const t = translations[lang];
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(exercises[0]?.durationSeconds || 0);
    const [isPaused, setIsPaused] = useState(true);
    const [isSideSwitchAlert, setIsSideSwitchAlert] = useState(false);
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
    const currentExercise = exercises[currentExerciseIndex];
    const nextExercise = exercises[currentExerciseIndex + 1] || null;

    useEffect(() => {
        if (isPaused || isWorkoutComplete || !currentExercise) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 1) {
                    const newTime = prevTime - 1;
                    if (currentExercise.isSideSwitchRequired) {
                        const halfTime = Math.floor(currentExercise.durationSeconds / 2);
                        setIsSideSwitchAlert(newTime === halfTime);
                    }
                    return newTime;
                }

                if (currentExerciseIndex < exercises.length - 1) {
                    const nextIdx = currentExerciseIndex + 1;
                    setCurrentExerciseIndex(nextIdx);
                    setIsSideSwitchAlert(false);
                    return exercises[nextIdx].durationSeconds;
                } else {
                    setIsWorkoutComplete(true);
                    setIsPaused(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isPaused, isWorkoutComplete, currentExercise, currentExerciseIndex, exercises]);

    const speak = useCallback((text, language) => {
        if (!window.speechSynthesis || isPaused) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = language === 'de' ? 'de-DE' : 'en-US';
        utterance.lang = langCode;
        utterance.voice = getVoice(langCode.split('-')[0]);
        window.speechSynthesis.speak(utterance);
    }, [isPaused]);

    // Controls
    const start = useCallback(() => {
        speak("");
        setIsPaused(false);
    }, [speak]);
    const pause = useCallback(() => setIsPaused(true), []);

    const reset = useCallback(() => {
        setIsPaused(true);
        setIsWorkoutComplete(false);
        setCurrentExerciseIndex(0);
        setTimeLeft(exercises[0]?.durationSeconds || 0);
        setIsSideSwitchAlert(false);
    }, [exercises]);

    const next = useCallback(() => {
        if (currentExerciseIndex < exercises.length - 1) {
            const nextIndex = currentExerciseIndex + 1;
            setCurrentExerciseIndex(nextIndex);
            setTimeLeft(exercises[nextIndex].durationSeconds);
            setIsSideSwitchAlert(false);
        } else {
            setIsWorkoutComplete(true);
            setIsPaused(true);
            setTimeLeft(0);
        }
    }, [currentExerciseIndex, exercises]);

    const prev = useCallback(() => {
        if (currentExerciseIndex > 0) {
            const prevIndex = currentExerciseIndex - 1;
            setCurrentExerciseIndex(prevIndex);
            setTimeLeft(exercises[prevIndex].durationSeconds);
            setIsSideSwitchAlert(false);
            setIsWorkoutComplete(false);
        }
    }, [currentExerciseIndex, exercises]);

    useEffect(() => {
        if (isPaused || isWorkoutComplete || !currentExercise) return;

        if (timeLeft === currentExercise.durationSeconds) {
            speak(`${t.timer.next} ${currentExercise.name}`, lang);
        }

        if (timeLeft <= 3 && timeLeft > 0) {
            speak(timeLeft.toString(), lang);
        }

        if (isSideSwitchAlert) {
            speak(t.timer.switchNow, lang);
        }
    }, [timeLeft, isPaused, isWorkoutComplete, isSideSwitchAlert, lang, currentExercise, speak, t.timer.next, t.timer.switchNow]);

    return {
        currentExerciseIndex,
        currentExercise,
        nextExercise,
        timeLeft,
        isPaused,
        isSideSwitchAlert,
        isWorkoutComplete,
        start,
        pause,
        reset,
        next,
        prev,
        speak
    };
};

export default useWorkoutTimer;
