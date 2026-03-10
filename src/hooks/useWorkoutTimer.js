import {useCallback, useEffect, useRef, useState} from 'react';
import {translations} from '../locales';
import {getVoice} from '../utils/speechUtils.js';
import {playBeep} from '../utils/audioUtils.js';

export const PREP_DURATION = 5;

const useWorkoutTimer = (exercises, lang = 'en') => {
    const t = translations[lang];
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(exercises[0]?.durationSeconds || 0);
    const [isPaused, setIsPaused] = useState(true);
    const [isPrepping, setIsPrepping] = useState(false);
    const [prepTimeLeft, setPrepTimeLeft] = useState(PREP_DURATION);
    const [isSideSwitchAlert, setIsSideSwitchAlert] = useState(false);
    const [isSideSwitchPaused, setIsSideSwitchPaused] = useState(false);
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);
    const sideSwitchTimeout = useRef(null);

    const currentExercise = exercises[currentExerciseIndex];
    const nextExercise = exercises[currentExerciseIndex + 1] || null;

    const speak = useCallback((text, language) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const langCode = language === 'de' ? 'de-DE' : 'en-US';
        utterance.lang = langCode;
        utterance.voice = getVoice(langCode.split('-')[0]);
        window.speechSynthesis.speak(utterance);
    }, []);

    // Prep countdown
    useEffect(() => {
        if (!isPrepping || isPaused) return;

        if (prepTimeLeft === PREP_DURATION) {
            speak(`${t.timer.next} ${currentExercise?.name}`, lang);
        }

        if (prepTimeLeft <= 0) {
            const id = setTimeout(() => {
                playBeep(880, 0.15);
                setIsPrepping(false);
                setPrepTimeLeft(PREP_DURATION);
            }, 0);
            return () => clearTimeout(id);
        }

        const id = setTimeout(() => setPrepTimeLeft(p => p - 1), 1000);
        return () => clearTimeout(id);
    }, [isPrepping, isPaused, prepTimeLeft, currentExercise, lang, speak, t.timer.next]);

    // Main timer
    useEffect(() => {
        if (isPaused || isWorkoutComplete || !currentExercise || isPrepping || isSideSwitchPaused) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 1) {
                    const newTime = prevTime - 1;
                    if (currentExercise.isSideSwitchRequired) {
                        const halfTime = Math.floor(currentExercise.durationSeconds / 2);
                        if (newTime === halfTime) {
                            setIsSideSwitchAlert(true);
                            setIsSideSwitchPaused(true);
                        }
                    }
                    return newTime;
                }

                if (currentExerciseIndex < exercises.length - 1) {
                    const nextIdx = currentExerciseIndex + 1;
                    setCurrentExerciseIndex(nextIdx);
                    setIsSideSwitchAlert(false);
                    setIsPrepping(true);
                    setPrepTimeLeft(PREP_DURATION);
                    return exercises[nextIdx].durationSeconds;
                } else {
                    setIsWorkoutComplete(true);
                    setIsPaused(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isPaused, isWorkoutComplete, currentExercise, currentExerciseIndex, exercises, isPrepping, isSideSwitchPaused]);

    // Side switch pause
    useEffect(() => {
        if (!isSideSwitchPaused) return;

        speak(t.timer.switchNow, lang);

        sideSwitchTimeout.current = setTimeout(() => {
            playBeep(660, 0.15);
            setIsSideSwitchAlert(false);
            setIsSideSwitchPaused(false);
        }, 3000);

        return () => clearTimeout(sideSwitchTimeout.current);
    }, [isSideSwitchPaused, lang, speak, t.timer.switchNow]);

    // Countdown speak
    useEffect(() => {
        if (isPaused || isWorkoutComplete || !currentExercise || isPrepping || isSideSwitchPaused) return;
        if (timeLeft <= 3 && timeLeft > 0) {
            speak(timeLeft.toString(), lang);
        }
    }, [timeLeft, isPaused, isWorkoutComplete, currentExercise, isPrepping, isSideSwitchPaused, lang, speak]);

    const start = useCallback(() => {
        setIsPaused(false);
        setIsPrepping(true);
        setPrepTimeLeft(PREP_DURATION);
    }, []);

    const pause = useCallback(() => setIsPaused(true), []);

    const reset = useCallback(() => {
        setIsPaused(true);
        setIsWorkoutComplete(false);
        setCurrentExerciseIndex(0);
        setTimeLeft(exercises[0]?.durationSeconds || 0);
        setIsSideSwitchAlert(false);
        setIsSideSwitchPaused(false);
        setIsPrepping(false);
        setPrepTimeLeft(PREP_DURATION);
    }, [exercises]);

    const next = useCallback(() => {
        if (currentExerciseIndex < exercises.length - 1) {
            const nextIdx = currentExerciseIndex + 1;
            setCurrentExerciseIndex(nextIdx);
            setTimeLeft(exercises[nextIdx].durationSeconds);
            setIsSideSwitchAlert(false);
            setIsSideSwitchPaused(false);
            setIsPrepping(true);
            setPrepTimeLeft(PREP_DURATION);
        } else {
            setIsWorkoutComplete(true);
            setIsPaused(true);
            setTimeLeft(0);
        }
    }, [currentExerciseIndex, exercises]);

    const prev = useCallback(() => {
        if (currentExerciseIndex > 0) {
            const prevIdx = currentExerciseIndex - 1;
            setCurrentExerciseIndex(prevIdx);
            setTimeLeft(exercises[prevIdx].durationSeconds);
            setIsSideSwitchAlert(false);
            setIsSideSwitchPaused(false);
            setIsWorkoutComplete(false);
            setIsPrepping(true);
            setPrepTimeLeft(PREP_DURATION);
        }
    }, [currentExerciseIndex, exercises]);

    return {
        currentExerciseIndex,
        currentExercise,
        nextExercise,
        timeLeft,
        prepTimeLeft,
        isPaused,
        isPrepping,
        isSideSwitchAlert,
        isSideSwitchPaused,
        isWorkoutComplete,
        start,
        pause,
        reset,
        next,
        prev,
        speak,
    };
};

export default useWorkoutTimer;