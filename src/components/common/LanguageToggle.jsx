export function LanguageToggle({lang, onToggle}) {
    return (
        <button
            onClick={onToggle}
            className="bg-surface-subtle p-1 rounded-icon flex items-center
                       border border-stroke-default shadow-card focus:ring-2 focus:ring-brand"
        >
            <div className={`px-2 py-1 rounded-lg text-[10px] font-bold
                ${lang === "en" ? "bg-surface-card text-brand shadow-card" : "text-content-secondary"}`}>
                EN
            </div>
            <div className={`px-2 py-1 rounded-lg text-[10px] font-bold
                ${lang === "de" ? "bg-surface-card text-brand shadow-card" : "text-content-secondary"}`}>
                DE
            </div>
        </button>
    );
}