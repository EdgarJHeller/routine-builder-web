import {useTranslation} from 'react-i18next';
import {Plus} from "lucide-react";
import {useState} from "react";
import {useFocusTrap} from "../../hooks/useFocusTrap.js";
import DeleteConfirmModal from "../common/DeleteConfirmModal.jsx";
import RoutineItem from "./RoutineItem.jsx";
import {ScreenHeader} from "../common/ScreenHeader.jsx";
import {Footer} from "../common/Footer.jsx";

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

    const confirmDelete = () => {
        if (routineToDelete) {
            onDeleteRoutine(routineToDelete.id);
            setRoutineToDelete(null);
        }
    };

    return (
        <>
            <ScreenHeader
                title={t('library.title')}
                subtitle={t('library.subtitle')}
                theme={theme}
                toggleTheme={toggleTheme}
            />

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
        </>
    );
};

export default RoutineLibrary;