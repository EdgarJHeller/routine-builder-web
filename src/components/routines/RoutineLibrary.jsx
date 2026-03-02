import {Plus} from "lucide-react";
import React, {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
import {translations} from "../../locales/index.js";
import DeleteConfirmModal from "../common/DeleteConfirmModal.jsx";
import RoutineItem from "./RoutineItem.jsx";

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
        <div className="bg-white border-b border-slate-200 px-6 py-8 mb-6 flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900">
                    {t.ui.libraryTitle || (lang === "en" ? "My Routines" : "Meine Routinen")}
                </h2>
                <p className="text-slate-500 mt-1">
                    {t.ui.librarySubtitle || (lang === "en" ? "Choose or create a routine" : "Wähle oder erstelle eine Routine")}
                </p>
            </div>
            <button
                onClick={toggleLanguage}
                className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500"
            >
                <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${lang === "en" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
                    EN
                </div>
                <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${lang === "de" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}>
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

            <footer className="absolute bottom-8 w-full flex justify-center gap-6 text-content-muted text-xs">
                <button onClick={() => onOpenLegal("impressum")}
                        className="hover:underline focus:ring-2 focus:ring-brand">
                    {t.ui.imprint || "Impressum"}
                </button>
                <button onClick={() => onOpenLegal("privacy")}
                        className="hover:underline focus:ring-2 focus:ring-brand">
                    {t.ui.privacy || "Datenschutz"}
                </button>
            </footer>
        </div>
    );
};

export default RoutineLibrary;