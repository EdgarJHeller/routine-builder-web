import {useTranslation} from 'react-i18next';

export default function ExerciseModal({
                                          modalRef,
                                          editingId,
                                          name,
                                          setName,
                                          duration,
                                          setDuration,
                                          isSideSwitch,
                                          setIsSideSwitch,
                                          onClose,
                                          onSave
                                      }) {
    const {t} = useTranslation();

    return (
        <div
            className="fixed inset-0 bg-surface-workout/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div ref={modalRef} className="bg-surface-card w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-black text-content-primary mb-6">
                    {editingId ? t('ui.editExercise') : t('ui.newExercise')}
                </h3>
                <div className="space-y-4">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('ui.placeholder.name')}
                        aria-label={t('ui.placeholder.name')}
                        className="modal-input"
                    />
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder={t('ui.placeholder.duration')}
                        aria-label={t('ui.placeholder.duration')}
                        className="modal-input"
                    />
                    <label className="flex items-center gap-3 p-4 bg-surface-subtle rounded-icon cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSideSwitch}
                            onChange={(e) => setIsSideSwitch(e.target.checked)}
                            className="w-5 h-5 accent-brand"
                        />
                        <span className="font-semibold text-content-secondary">
                            {t('ui.sideSwitchLabel')}
                        </span>
                    </label>
                    <div className="flex gap-3 pt-4">
                        <button onClick={onClose} className="btn-modal-ghost">
                            {t('ui.cancel')}
                        </button>
                        <button onClick={onSave}
                                className="btn-modal-primary bg-brand hover:bg-brand-hover focus:ring-brand">
                            {editingId ? t('ui.save') : t('ui.add')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}