import {useTranslation} from 'react-i18next';
import {ChevronDown, ChevronUp, Edit2, Trash2} from "lucide-react";

export default function ExerciseItem({exercise, index, totalExercises, onMove, onEdit, onDelete}) {
    const {t} = useTranslation();

    return (
        <li className="card p-4 flex items-center gap-4 transition-all active:scale-[0.98]">
            <div className="flex flex-col border-r border-stroke-subtle pr-2">
                <button
                    onClick={() => onMove(index, index - 1)}
                    disabled={index === 0}
                    className="p-1 disabled:opacity-20 text-brand
                       focus:outline-none focus:ring-2 focus:ring-brand rounded"
                    aria-label={t('editor.moveUp')}
                >
                    <ChevronUp size={20}/>
                </button>
                <button
                    onClick={() => onMove(index, index + 1)}
                    disabled={index === totalExercises - 1}
                    className="p-1 disabled:opacity-20 text-brand
                       focus:outline-none focus:ring-2 focus:ring-brand rounded"
                    aria-label={t('editor.moveDown')}
                >
                    <ChevronDown size={20}/>
                </button>
            </div>

            <div className="flex-1">
                <h3 className="font-bold text-content-primary text-lg">{exercise.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="badge bg-brand-subtle text-brand-text">
                        {exercise.durationSeconds}s
                    </span>
                    {exercise.isSideSwitchRequired && (
                        <span className="badge bg-warning-subtle text-warning-text">
                            {t('editor.sideSwitchBadge')}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1">
                <button onClick={() => onEdit(exercise)} className="btn-icon-secondary"
                        aria-label={t('editor.editExercise')}>
                    <Edit2 size={20}/>
                </button>
                <button onClick={() => onDelete(exercise)} className="btn-icon-danger"
                        aria-label={t('ui.deleteExercise')}>
                    <Trash2 size={20}/>
                </button>
            </div>
        </li>
    );
}