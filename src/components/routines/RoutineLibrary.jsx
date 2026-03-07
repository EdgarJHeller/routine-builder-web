import {Plus} from "lucide-react";
import React, {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
import {translations} from "../../locales/index.js";
import DeleteConfirmModal from "../common/DeleteConfirmModal.jsx";
import RoutineItem from "./RoutineItem.jsx";
import {Footer} from "../common/Footer.jsx";

const RoutineLibrary = ({
                            routines,
                            onSelectRoutine,
                            onCreateRoutine,
                            onDeleteRoutine,
                            lang,
                            toggleLanguage,
                            onOpenLegal,
                        }) => {
    const t = translations[lang];
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const deleteModalRef = useFocusTrap(!!routineToDelete);

    const renderHeader = () => (
        <div className="bg-surface-card border-b border-stroke-default px-6 py-8 mb-6 flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-extrabold text-content-primary">
                    {t.ui.libraryTitle || (lang === "en" ? "My Routines" : "Meine Routinen")}
                </h2>
                <p className="text-content-secondary mt-1">
                    {t.ui.librarySubtitle || (lang === "en" ? "Choose or create a routine" : "Wähle oder erstelle eine Routine")}
                </p>
            </div>
            <button
                onClick={toggleLanguage}
                className="bg-surface-subtle p-1 rounded-icon flex items-center border border-stroke-default shadow-card focus:ring-2 focus:ring-brand">
                <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${lang === "en" ? "bg-surface-card text-brand shadow-card" : "text-content-muted"}`}>
                    EN
                </div>
                <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${lang === "de" ? "bg-surface-card text-brand shadow-card" : "text-content-muted"}`}>
                    DE
                </div>
            </button>
        </div>
    );

    const confirmDelete = () => {
        if (routineToDelete) {
            onDeleteRoutine(routineToDelete.id);
            setRoutineToDelete(null);
        }
    };

    return (
        <div className="min-h-screen bg-surface-app pb-32 relative">
            {renderHeader()}

            <ul className="max-w-md mx-auto px-4 space-y-3">
                {routines.map((routine) => (
                    <RoutineItem
                        key={routine.id}
                        routine={routine}
                        t={t}
                        onSelect={() => onSelectRoutine(routine.id)}
                        onDelete={setRoutineToDelete}
                    />
                ))}

                <button onClick={onCreateRoutine} className="btn-add mt-4">
                    <Plus size={20}/> {t.ui.addRoutine || (lang === "en" ? "Add Routine" : "Routine hinzufügen")}
                </button>
            </ul>

            <DeleteConfirmModal
                modalRef={deleteModalRef}
                exerciseName={routineToDelete?.name}
                t={t}
                onCancel={() => setRoutineToDelete(null)}
                onConfirm={confirmDelete}
            />

            <Footer onOpenLegal={onOpenLegal} t={t}/>
        </div>
    );
};

export default RoutineLibrary;