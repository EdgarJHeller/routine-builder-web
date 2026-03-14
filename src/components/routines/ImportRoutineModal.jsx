import {useTranslation} from 'react-i18next';
import {formatDuration} from "../../utils/formatDuration.js";

export function ImportRoutineModal({routine, onConfirm, onDismiss}) {
    const {t} = useTranslation();

    if (!routine) return null;

    return (
        <div
            className="fixed inset-0 bg-surface-workout/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-surface-card w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-black text-content-primary mb-1">
                    {t('ui.importTitle')}
                </h3>
                <p className="text-content-secondary text-sm mb-6">
                    {t('ui.importSubtitle')}
                </p>

                <div className="bg-surface-subtle rounded-card p-4 mb-6">
                    <p className="font-bold text-content-primary text-lg">
                        {routine.name}
                    </p>
                    <p className="text-xs text-content-secondary font-bold tracking-wider mt-1">
                        {routine.exercises?.length || 0}{" "}
                        {routine.exercises?.length === 1
                            ? t('ui.exercise')
                            : t('ui.exercises')}
                        {" · "}
                        {formatDuration(routine.exercises)}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={onDismiss} className="btn-modal-ghost">
                        {t('ui.dismiss')}
                    </button>
                    <button
                        autoFocus
                        onClick={onConfirm}
                        className="btn-modal-primary bg-brand hover:bg-brand-hover focus:ring-brand"
                    >
                        {t('ui.importConfirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}