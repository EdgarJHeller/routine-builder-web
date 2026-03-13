import {List, Share2, Trash2} from "lucide-react";
import React from "react";
import {formatDuration} from "../../utils/formatDuration.js";

const RoutineItem = ({routine, t, onSelect, onDelete, showToast}) => {

    const handleShare = (e) => {
        e.stopPropagation();
        try {
            const encoded = btoa(encodeURIComponent(JSON.stringify(routine)));
            const shareUrl = `${window.location.origin}${window.location.pathname}?routine=${encoded}`;

            navigator.clipboard.writeText(shareUrl).then(() => {
                showToast(t.ui.linkCopied);
            });
        } catch (error) {
            console.error("Fehler beim Erstellen des Links", error);
        }
    };

    return (
        <li className="card hover:bg-surface-subtle hover:border-brand/40 transition-colors overflow-hidden flex items-center pr-2">
            <button
                onClick={onSelect}
                className="grow flex items-center gap-4 p-4 text-left focus:outline-none transition-colors"
                aria-label={`Edit ${routine.name}`}>
                <div
                    className="w-12 h-12 bg-surface-subtle rounded-icon flex items-center justify-center text-content-muted shrink-0">
                    <List size={24}/>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-content-primary text-lg">
                        {routine.name || t.ui.unnamedRoutine}
                    </span>
                    <span className="text-xs text-content-secondary font-bold tracking-wider mt-1">
                        {routine.exercises?.length || 0}{" "}
                        {routine.exercises?.length === 1 ? t.ui.exercise || "Exercise" : t.ui.exercises || "Exercises"}
                        {" · "}
                        {formatDuration(routine.exercises)}
                    </span>
                </div>
            </button>

            <div className="flex items-center gap-1 shrink-0">
                <button onClick={handleShare} className="btn-icon-secondary"
                        aria-label={t.ui.shareRoutine || "Share routine"}>
                    <Share2 size={20}/>
                </button>
                <button onClick={() => onDelete(routine)} className="btn-icon-danger"
                        aria-label={t.ui.deleteRoutine || "Delete routine"}>
                    <Trash2 size={20}/>
                </button>
            </div>
        </li>
    );
};

export default RoutineItem;