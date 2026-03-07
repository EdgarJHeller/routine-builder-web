import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        // 1. Check localStorage first
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        // 2. Fall back to system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        // Apply to <html> element
        document.documentElement.setAttribute("data-theme", theme);
        // Save preference
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

    return {theme, toggleTheme};
}