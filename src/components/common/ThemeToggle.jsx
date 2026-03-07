import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ theme, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="bg-surface-subtle p-2 rounded-icon border border-stroke-default
                       shadow-card text-content-muted hover:text-content-primary
                       focus:ring-2 focus:ring-brand transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    );
}