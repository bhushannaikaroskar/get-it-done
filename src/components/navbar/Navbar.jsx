import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/theme-content/ThemeProvider";
import "./navbar.css"

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <NavLink to="/tasks">
                    Get It <span className="font-primary">Done</span>
                </NavLink>
            </div>
            <div className="nav-items">
                <button
                    className="btn btn-link-secondary justify-content-start"
                    onClick={toggleTheme}
                >
                    <div className="badge-container flex flex-column">
                        {theme === "light" ? (
                            <span className="material-icons font-x-large">
                                dark_mode
                            </span>
                        ) : (
                            <span className="material-icons font-x-large">
                                light_mode
                            </span>
                        )}
                    </div>
                </button>
            </div>
        </nav>
    );
}
