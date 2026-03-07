import {ArrowLeft, Play, Plus} from "lucide-react"; // ArrowLeft hinzugefügt!
import {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
import {useKeydown} from "../../hooks/useKeydown.js";
import {translations} from "../../locales/index.js";
import DeleteConfirmModal from "../common/DeleteConfirmModal.jsx";
import ExerciseItem from "../exercises/ExerciseItem.jsx";
import ExerciseModal from "../exercises/ExerciseModal.jsx";
import {Footer} from "../common/Footer.jsx";
import {LanguageToggle} from "../common/LanguageToggle.jsx";

const RoutineEditor = ({
                           exercises = [],
                           routineName,
                           onUpdateRoutineName,
                           onBack,
                           lang,
                           toggleLanguage,
                           addExercise,
                           deleteExercise,
                           moveExercise,
                           updateExercise,
                           onStart,
                           onOpenLegal,
                       }) => {
    const t = translations[lang];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [isSideSwitch, setIsSideSwitch] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [exerciseToDelete, setExerciseToDelete] = useState(null);

    const editModalRef = useFocusTrap(isModalOpen);
    const deleteModalRef = useFocusTrap(!!exerciseToDelete);

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setName("");
        setDuration("");
        setIsSideSwitch(false);
    };

    useKeydown("Escape", () => {
        if (isModalOpen) closeModal();
        if (exerciseToDelete) setExerciseToDelete(null);
    });

    const handleSave = () => {
        if (!name || !duration) return;
        const exerciseData = {
            name,
            durationSeconds: parseInt(duration, 10) || 0,
            isSideSwitchRequired: isSideSwitch,
        };

        if (editingId) {
            updateExercise(editingId, exerciseData);
        } else {
            addExercise({id: crypto.randomUUID(), ...exerciseData});
        }
        closeModal();
    };

    const handleEdit = (exercise) => {
        setEditingId(exercise.id);
        setName(exercise.name);
        setDuration(exercise.durationSeconds.toString());
        setIsSideSwitch(exercise.isSideSwitchRequired);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (exerciseToDelete) {
            deleteExercise(exerciseToDelete.id);
            setExerciseToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-surface-app pb-32">
            <div className="bg-surface-card border-b border-stroke-default px-6 pt-6 pb-8 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-content-secondary font-bold
                           hover:text-content-primary transition-colors
                           focus:outline-none focus:ring-2 focus:ring-brand rounded-icon pr-2"
                    >
                        <ArrowLeft size={20}/>
                        {lang === "en" ? "Back" : "Zurück"}
                    </button>

                    <LanguageToggle lang={lang} onToggle={toggleLanguage}/>
                </div>

                <div>
                    <input
                        type="text"
                        value={routineName || ""}
                        onChange={(e) => onUpdateRoutineName(e.target.value)}
                        placeholder={lang === "en" ? "Routine Name..." : "Routinen-Name..."}
                        className="text-3xl font-extrabold text-content-primary bg-transparent outline-none w-full
                           border-b-2 border-transparent focus:border-brand transition-colors
                           placeholder:text-content-muted pb-1"
                    />
                    <p className="text-content-secondary mt-2">{t.ui.editorSubtitle || "Design your routine"}</p>
                </div>
            </div>

            <ul className="max-w-md mx-auto px-4 space-y-3">
                {exercises.map((ex, idx) => (
                    <ExerciseItem
                        key={ex.id}
                        exercise={ex}
                        index={idx}
                        totalExercises={exercises.length}
                        t={t}
                        onMove={moveExercise}
                        onEdit={handleEdit}
                        onDelete={setExerciseToDelete}
                    />
                ))}

                <button onClick={() => {
                    closeModal();
                    setIsModalOpen(true);
                }}
                        className="btn-add">
                    <Plus size={20}/> {t.ui.addExercise}
                </button>

                {exercises.length > 0 && (
                    <button onClick={onStart} className="btn-primary mt-8 bg-success hover:bg-success-hover">
                        <Play size={20} fill="currentColor"/> {lang === "en" ? "Start Routine" : "Routine Starten"}
                    </button>
                )}
            </ul>

            {isModalOpen && (
                <ExerciseModal
                    modalRef={editModalRef}
                    editingId={editingId}
                    t={t}
                    name={name} setName={setName}
                    duration={duration} setDuration={setDuration}
                    isSideSwitch={isSideSwitch} setIsSideSwitch={setIsSideSwitch}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}

            <DeleteConfirmModal
                modalRef={deleteModalRef}
                exerciseName={exerciseToDelete?.name}
                t={t}
                onCancel={() => setExerciseToDelete(null)}
                onConfirm={confirmDelete}
            />

            <Footer onOpenLegal={onOpenLegal} t={t}/>
        </div>
    );
};

export default RoutineEditor;