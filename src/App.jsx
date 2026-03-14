import {useTranslation} from 'react-i18next';
import {useState} from "react";
import LegalModal from "./components/common/LegalModal.jsx";
import RoutineEditor from "./components/routines/RoutineEditor.jsx";
import RoutineLibrary from "./components/routines/RoutineLibrary.jsx";
import RoutineScreen from "./components/routines/RoutineScreen.jsx";
import {IMPRESSUM_CONTENT, PRIVACY_CONTENT} from "./constants/legalContent";
import {useRoutines} from "./hooks/useRoutines";
import {useTheme} from "./hooks/useTheme.js";
import {useMagicLink} from "./hooks/useMagicLink.js";
import {useToast} from "./hooks/useToast.js";
import {Toast} from "./components/common/Toast.jsx";
import {ImportRoutineModal} from "./components/routines/ImportRoutineModal.jsx";

function App() {
    const {t} = useTranslation();
    const [isTraining, setIsTraining] = useState(false);
    const [activeLegalPage, setActiveLegalPage] = useState(null);

    const {theme, toggleTheme} = useTheme();
    const {pendingRoutine, setPendingRoutine} = useMagicLink();
    const {toast, showToast} = useToast();

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
    } = useRoutines();

    const handleImportConfirm = () => {
        const importedRoutine = {
            ...pendingRoutine,
            id: crypto.randomUUID(),
            name: pendingRoutine.name + t('library.importedSuffix'),
        };
        setRoutines(prev => [...prev, importedRoutine]);
        setPendingRoutine(null);
        showToast(t('library.importSuccess', {name: pendingRoutine.name}));
    };

    return (
        <div className="min-h-screen bg-surface-app flex justify-center items-start">
            <div className="w-full max-w-md min-h-screen bg-surface-card shadow-xl overflow-hidden relative">

                {activeLegalPage && (
                    <LegalModal
                        title={activeLegalPage === "impressum" ? "Impressum" : "Datenschutz"}
                        backText={t('editor.back')}
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
                            onOpenLegal={setActiveLegalPage}
                            theme={theme}
                            toggleTheme={toggleTheme}
                            showToast={showToast}
                        />
                    ) : isTraining ? (
                        <RoutineScreen
                            exercises={currentExercises}
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
                            onOpenLegal={setActiveLegalPage}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                </div>
                <ImportRoutineModal
                    routine={pendingRoutine}
                    onConfirm={handleImportConfirm}
                    onDismiss={() => setPendingRoutine(null)}
                />
                <Toast message={toast}/>
            </div>
        </div>
    );
}

export default App;