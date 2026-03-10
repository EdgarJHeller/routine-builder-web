import {Pause, Play, RotateCcw, SkipBack, SkipForward, X, Zap,} from "lucide-react";
import {useKeydown} from "../../hooks/useKeydown.js";
import {useWakeLock} from "../../hooks/useWakeLock.js";
import useWorkoutTimer, {PREP_DURATION} from "../../hooks/useWorkoutTimer.js";
import {translations} from "../../locales/index.js";

const RoutineScreen = ({exercises, lang, onExit}) => {
    const t = translations[lang];

    const iconBtnBase =
        "p-2 text-content-workout hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand rounded-lg";
    const controlBtnBase =
        "flex justify-center p-4 text-content-workout hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand rounded-full";
    const mainPlayBtn =
        "flex justify-center items-center w-20 h-20 bg-surface-card text-content-primary rounded-full shadow-xl active:scale-90 transition-transform mx-auto focus:outline-none focus:ring-4 focus:ring-brand";
    const {
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
        prepTimeLeft,
        isPrepping,
    } = useWorkoutTimer(exercises, lang);

    useWakeLock(!isWorkoutComplete);

    useKeydown(" ", () => {
        if (isPaused) {
            start();
        } else {
            pause();
        }
    });

    useKeydown("Escape", onExit);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const progress = currentExercise
        ? (timeLeft / currentExercise.durationSeconds) * 100
        : 0;

    if (isWorkoutComplete) {
        return (
            <div
                className="min-h-screen bg-surface-workout flex flex-col items-center justify-center p-6 text-center"
                role="alert"
            >
                <div
                    className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Zap size={48} className="text-success" fill="currentColor"/>
                </div>
                <h2 className="text-4xl font-black text-white mb-2">
                    {t.timer.complete}
                </h2>
                <button
                    autoFocus
                    onClick={onExit}
                    className="w-full py-4 bg-surface-card text-content-primary font-bold rounded-card shadow-card-lg active:scale-95 focus:ring-4 focus:ring-success outline-none"
                >
                    {t.ui.backToEditor || "Back to Editor"}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-workout text-white flex flex-col p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <button onClick={onExit} aria-label="Exit Workout" className={iconBtnBase}>
                    <X size={24}/>
                </button>
                <span className="text-xs font-bold tracking-widest text-content-workout uppercase">
            {t.ui.workoutScreenTitle}
        </span>
                <button onClick={reset} aria-label="Reset Timer" className={iconBtnBase}>
                    <RotateCcw size={20}/>
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-content-workout mb-2 uppercase tracking-tight">
                    {isPrepping
                        ? t.timer.getReady || "Get Ready"
                        : currentExercise?.name}
                </h1>

                <div className="relative flex items-center justify-center w-64 h-64"
                     aria-live="polite" aria-atomic="true">
                    <svg className="absolute w-full h-full -rotate-90">
                        <circle cx="128" cy="128" r="120"
                                stroke="currentColor" strokeWidth="8" fill="transparent"
                                className="text-ring-track"/>
                        <circle cx="128" cy="128" r="120"
                                stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={754}
                                strokeDashoffset={754 - (754 * (isPrepping
                                    ? (prepTimeLeft / PREP_DURATION) * 100
                                    : progress)) / 100}
                                className="text-ring-progress transition-all duration-1000 ease-linear"
                                strokeLinecap="round"/>
                    </svg>
                    <span className="text-7xl font-black tabular-nums tracking-tighter">
                        {isPrepping ? prepTimeLeft : formatTime(timeLeft)}
                    </span>
                </div>

                <div className="h-12 mt-6" aria-live="assertive">
                    {isSideSwitchAlert && (
                        <div className="bg-warning text-white px-4 py-1 rounded-pill font-bold text-sm
                                animate-pulse flex items-center gap-2">
                            <RotateCcw size={16}/> {t.timer.switch}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center mb-12">
                <button onClick={prev} aria-label="Previous Exercise" className={controlBtnBase}>
                    <SkipBack size={32}/>
                </button>
                <button onClick={isPaused ? start : pause}
                        aria-label={isPaused ? "Start Timer" : "Pause Timer"}
                        className={mainPlayBtn}>
                    {isPaused ? <Play size={36} fill="currentColor"/> : <Pause size={36} fill="currentColor"/>}
                </button>
                <button onClick={next} aria-label="Next Exercise" className={controlBtnBase}>
                    <SkipForward size={32}/>
                </button>
            </div>

            {nextExercise && (
                <div className="bg-surface-workout-muted border border-stroke-workout p-4 rounded-card
                        flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-content-workout uppercase">
                            {t.ui.workoutScreenNextUp}
                        </p>
                        <p className="font-bold text-white">{nextExercise.name}</p>
                    </div>
                    <span className="text-content-workout font-bold">
                {nextExercise.durationSeconds}s
            </span>
                </div>
            )}
        </div>
    );
};

export default RoutineScreen;
