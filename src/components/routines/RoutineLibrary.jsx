import {Plus} from "lucide-react";
import React, {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
import {translations} from "../../locales/index.js";
import DeleteConfirmModal from "../common/DeleteConfirmModal.jsx";
import RoutineItem from "./RoutineItem.jsx";
import {Footer} from "../common/Footer.jsx";
import {LanguageToggle} from "../common/LanguageToggle.jsx";
import {ThemeToggle} from "../common/ThemeToggle.jsx";

const RoutineLibrary = ({
                            routines,
                            onSelectRoutine,
                            onCreateRoutine,
                            onDeleteRoutine,
                            lang,
                            toggleLanguage,
                            onOpenLegal,
                            theme,
                            toggleTheme,
                            showToast,
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
            <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} onToggle={toggleTheme}/>
                <LanguageToggle lang={lang} onToggle={toggleLanguage}/>
            </div>
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
                        showToast={showToast}
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