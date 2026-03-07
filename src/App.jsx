import {useEffect, useState} from "react";
import LegalModal from "./components/common/LegalModal.jsx";
import RoutineEditor from "./components/routines/RoutineEditor.jsx";
import RoutineLibrary from "./components/routines/RoutineLibrary.jsx";
import RoutineScreen from "./components/routines/RoutineScreen.jsx";
import {IMPRESSUM_CONTENT, PRIVACY_CONTENT} from "./constants/legalContent";
import {useRoutines} from "./hooks/useRoutines";
import {useMagicLink} from "./hooks/useMagicLink";
import {translations} from "./locales";
import {useTheme} from "./hooks/useTheme.js";

function App() {
    const [isTraining, setIsTraining] = useState(false);
    const [activeLegalPage, setActiveLegalPage] = useState(null);
    const [lang, setLang] = useState(() => localStorage.getItem("workout_lang") || "en");

    useEffect(() => {
        localStorage.setItem("workout_lang", lang);
    }, [lang]);

    const toggleLanguage = () => setLang((prev) => (prev === "en" ? "de" : "en"));

    const {theme, toggleTheme} = useTheme();

    const {
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
    } = useRoutines(lang);

    useMagicLink(setRoutines, lang);

    return (
        <div className="min-h-screen bg-surface-app flex justify-center items-start">
            <div className="w-full max-w-md min-h-screen bg-surface-card shadow-xl overflow-hidden relative">

                {activeLegalPage && (
                    <LegalModal
                        title={activeLegalPage === "impressum" ? "Impressum" : "Datenschutz"}
                        backText={translations[lang].ui.back}
                        onClose={() => setActiveLegalPage(null)}
                    >
                        {activeLegalPage === "impressum" ? IMPRESSUM_CONTENT : PRIVACY_CONTENT}
                    </LegalModal>
                )}

                <div className="grow h-full">
                    {!activeRoutineId ? (
                        <RoutineLibrary
                            routines={routines}
                            onSelectRoutine={setActiveRoutineId}
                            onCreateRoutine={createNewRoutine}
                            onDeleteRoutine={deleteRoutine}
                            lang={lang}
                            toggleLanguage={toggleLanguage}
                            onOpenLegal={setActiveLegalPage}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    ) : isTraining ? (
                        <RoutineScreen
                            exercises={currentExercises}
                            lang={lang}
                            onExit={() => setIsTraining(false)}
                        />
                    ) : (
                        <RoutineEditor
                            exercises={currentExercises}
                            routineName={activeRoutine?.name}
                            addExercise={addExercise}
                            deleteExercise={deleteExercise}
                            moveExercise={moveExercise}
                            updateExercise={updateExercise}
                            onUpdateRoutineName={(newName) => updateRoutineName(activeRoutineId, newName)}
                            onStart={() => setIsTraining(true)}
                            onBack={() => setActiveRoutineId(null)}
                            lang={lang}
                            toggleLanguage={toggleLanguage}
                            onOpenLegal={setActiveLegalPage}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;