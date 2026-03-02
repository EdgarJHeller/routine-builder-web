import {List, Share2, Trash2} from "lucide-react";
import React from "react";

const RoutineItem = ({routine, t, onSelect, onDelete}) => {

    const handleShare = (e) => {
        e.stopPropagation();
        try {
            const encoded = btoa(encodeURIComponent(JSON.stringify(routine)));
            const shareUrl = `${window.location.origin}${window.location.pathname}?routine=${encoded}`;

            navigator.clipboard.writeText(shareUrl).then(() => {
                alert(t.ui.linkCopied); // SCHÖN SAUBER!
            });
        } catch (error) {
            console.error("Fehler beim Erstellen des Links", error);
        }
    };

    return (
        <li className="card hover:border-brand/40 transition-colors overflow-hidden flex items-center pr-2">
            <button
                onClick={onSelect}
                className="grow flex items-center gap-4 p-4 text-left focus:outline-none hover:bg-surface-app transition-colors"
                aria-label={`Edit ${routine.name}`}>
                <div
                    className="w-12 h-12 bg-surface-subtle rounded-icon flex items-center justify-center text-content-muted shrink-0">
                    <List size={24}/>
                </div>
                <div>
            <span className="font-bold text-content-primary block text-lg">
                {routine.name || t.ui.unnamedRoutine}
            </span>
                    <span className="text-xs text-content-secondary font-bold uppercase tracking-wider mt-1 block">
                {routine.exercises?.length || 0} {t.ui.exercises || "Exercises"}
            </span>
                </div>
            </button>

            <div className="flex items-center gap-1 shrink-0">
                <button onClick={handleShare}
                        className="btn-icon hover:bg-brand-subtle hover:text-brand-text focus:ring-brand">
                    <Share2 size={20}/>
                </button>
                <button onClick={() => onDelete(routine)}
                        className="btn-icon hover:bg-danger-subtle hover:text-danger-text focus:ring-danger">
                    <Trash2 size={20}/>
                </button>
            </div>
        </li>
    );
};

export default RoutineItem;