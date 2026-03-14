import {useEffect, useState} from "react";

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "system";
    });

    useEffect(() => {
        if (theme === "system") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.removeItem("theme");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(t => {
            if (t === "system") return "light";
            if (t === "light") return "dark";
            return "system";
        });
    };

    return {theme, toggleTheme};
}