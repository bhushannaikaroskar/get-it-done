import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    useEffect(() => {
        const localTheme = localStorage.getItem("gid-theme");
        if (localTheme) {
            setTheme(localTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("gid-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
