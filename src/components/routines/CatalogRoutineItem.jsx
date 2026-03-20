import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronUp, Download} from 'lucide-react';
import {useState} from 'react';
import {formatDuration} from '../../utils/formatDuration.js';

const CatalogRoutineItem = ({catalogRoutine, onImport}) => {
    const {t, i18n} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const lang = i18n.language?.slice(0, 2);
    const translation = catalogRoutine.translations[lang] ?? catalogRoutine.translations['en'];
    const {name, exercises} = translation;

    return (
        <li className="card list-none">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left focus:outline-none"
                aria-expanded={isOpen}
            >
                <div className="flex flex-col">
                    <span className="font-bold text-content-primary text-lg">{name}</span>
                    <span className="text-xs text-content-secondary font-bold tracking-wider mt-1">
                        {exercises.length}{" "}
                        {exercises.length === 1 ? t('library.exercise') : t('library.exercises')}
                        {" · "}
                        {formatDuration(exercises)}
                    </span>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-content-muted shrink-0"/> :
                    <ChevronDown size={20} className="text-content-muted shrink-0"/>}
            </button>

            {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-2">
                    <ul className="space-y-1 mb-3">
                        {exercises.map(ex => (
                            <li key={ex.id} className="text-sm text-content-secondary flex justify-between">
                                <span>{ex.name}</span>
                                <span className="text-content-muted">{ex.durationSeconds}s</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => onImport(translation)}
                        className="btn-primary bg-brand hover:bg-brand-hover focus:ring-2 focus:ring-brand"
                    >
                        <Download size={16}/> {t('catalog.import')}
                    </button>
                </div>
            )}
        </li>
    );
};

export default CatalogRoutineItem;