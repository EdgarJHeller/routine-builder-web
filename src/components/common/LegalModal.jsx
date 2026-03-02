import {useEffect} from "react";

export default function LegalModal({title, children, onClose, backText}) {
    // Close on Escape key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);

        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-surface-card z-100 overflow-y-auto p-8"
            role="dialog"
            aria-modal="true"
        >
            <div className="max-w-md mx-auto">
                <button
                    autoFocus
                    onClick={onClose}
                    className="mb-8 text-brand font-bold hover:text-brand-hover focus:ring-2 focus:ring-brand rounded-lg p-1 outline-none transition-all"
                    aria-label={backText}
                >
                    ← {backText}
                </button>
                <h1 className="text-3xl font-black text-content-primary mb-6">{title}</h1>
                <div className="text-content-secondary leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
