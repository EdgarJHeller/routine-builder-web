import {useTranslation} from 'react-i18next';
import {Plus} from "lucide-react";
import {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
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
                            onOpenLegal,
                            theme,
                            toggleTheme,
                            showToast,
                        }) => {
    const {t} = useTranslation();
    const [routineToDelete, setRoutineToDelete] = useState(null);
    const deleteModalRef = useFocusTrap(!!routineToDelete);

    const renderHeader = () => (
        <div className="bg-surface-card border-b border-stroke-default px-6 py-8 mb-6 flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-extrabold text-content-primary">
                    {t('library.title')}
                </h2>
                <p className="text-content-secondary mt-1">
                    {t('library.subtitle')}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} onToggle={toggleTheme}/>
                <LanguageToggle/>
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
        <main className="min-h-screen bg-surface-app pb-32 relative">
            {renderHeader()}

            <ul className="max-w-md mx-auto px-4 space-y-3">
                {routines.map((routine) => (
                    <RoutineItem
                        key={routine.id}
                        routine={routine}
                        onSelect={() => onSelectRoutine(routine.id)}
                        onDelete={setRoutineToDelete}
                        showToast={showToast}
                    />
                ))}

                <li>
                    <button onClick={onCreateRoutine} className="btn-add mt-4">
                        <Plus size={20}/> {t('library.addRoutine')}
                    </button>
                </li>
            </ul>

            <DeleteConfirmModal
                modalRef={deleteModalRef}
                exerciseName={routineToDelete?.name}
                onCancel={() => setRoutineToDelete(null)}
                onConfirm={confirmDelete}
            />

            <Footer onOpenLegal={onOpenLegal}/>
        </main>
    );
};

export default RoutineLibrary;