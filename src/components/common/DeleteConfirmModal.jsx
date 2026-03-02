export default function DeleteConfirmModal({
                                               modalRef,
                                               exerciseName,
                                               t,
                                               onCancel,
                                               onConfirm,
                                           }) {
    if (!exerciseName) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl"
            >
                <h3 className="text-2xl font-black text-content-primary mb-4">
                    Delete Exercise?
                </h3>
                <p className="text-content-secondary mb-6">
                    {t.ui.deleteWarning}{" "}
                    <span className="font-bold text-content-primary">{exerciseName}</span>?
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="btn-modal-ghost">
                        {t.ui.cancel}
                    </button>
                    <button onClick={onConfirm}
                            className="btn-modal-primary bg-danger hover:bg-danger-text focus:ring-danger">
                        {t.ui.deleteButton}
                    </button>
                </div>
            </div>
        </div>
    );
}
