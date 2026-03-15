import {Monitor, Moon, Sun} from "lucide-react";

export function ThemeToggle({theme, onToggle}) {
    const icon = theme === "dark" ? <Sun size={16}/>
        : theme === "light" ? <Moon size={16}/>
            : <Monitor size={16}/>;

    const label = theme === "dark" ? "Switch to light mode"
        : theme === "light" ? "Switch to system preference"
            : "Switch to dark mode";

    return (
        <button
            onClick={onToggle}
            className="bg-surface-subtle p-2 flex items-center justify-center
               rounded-icon border border-stroke-default shadow-card
               text-content-muted hover:text-content-primary
               focus:ring-2 focus:ring-brand transition-colors"
            aria-label={label}
        >
            {icon}
        </button>
    );
}