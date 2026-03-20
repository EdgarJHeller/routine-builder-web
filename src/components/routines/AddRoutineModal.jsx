import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import {Plus, X} from 'lucide-react';
import {useFocusTrap} from '../../hooks/useFocusTrap.js';
import {useCatalog} from '../../hooks/useCatalog.js';
import CatalogRoutineItem from './CatalogRoutineItem.jsx';

const AddRoutineModal = ({onClose, onCreateEmpty, onImportFromCatalog}) => {
    const {t} = useTranslation();
    const modalRef = useFocusTrap(true);
    const {routines, loading, error, fetchCatalog} = useCatalog();

    useEffect(() => {
        fetchCatalog();
    }, [fetchCatalog]);

    return (
        <div
            className="fixed inset-0 bg-surface-routine/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div ref={modalRef}
                 className="bg-surface-card w-full max-w-sm h-[80vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">

                <div className="flex items-center justify-between p-6 pb-4 shrink-0">
                    <h2 className="text-2xl font-black text-content-primary">{t('catalog.title')}</h2>
                    <button onClick={onClose} className="btn-icon-secondary" aria-label={t('editor.cancel')}>
                        <X size={20}/>
                    </button>
                </div>

                <div className="overflow-y-auto min-h-0 px-4 pb-6 flex flex-col gap-3 catalog-scroll">
                    {/* Empty routine option */}
                    <li className="card hover:bg-surface-subtle hover:border-brand/40 transition-colors list-none">
                        <button
                            onClick={onCreateEmpty}
                            className="w-full flex items-center gap-4 p-4 text-left focus:outline-none"
                        >
                            <div
                                className="w-12 h-12 bg-surface-subtle rounded-icon flex items-center justify-center text-content-muted shrink-0">
                                <Plus size={24}/>
                            </div>
                            <span className="font-bold text-content-primary text-lg">{t('library.newRoutine')}</span>
                        </button>
                    </li>

                    {/* Catalog routines */}
                    {loading && (
                        <p className="text-content-secondary text-sm text-center py-4">{t('catalog.loading')}</p>
                    )}
                    {error && (
                        <p className="text-danger text-sm text-center py-4">{t('catalog.error')}</p>
                    )}
                    {!loading && !error && routines.map(routine => (
                        <CatalogRoutineItem
                            key={routine.id}
                            catalogRoutine={routine}
                            onImport={(translated) => {
                                onImportFromCatalog(translated, routine.id);
                                onClose();
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddRoutineModal;