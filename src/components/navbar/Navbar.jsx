import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/theme-content/ThemeProvider";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            
                <NavLink className="nav-logo" to="/tasks">
                    {theme === "dark" ? <img src="/images/gid-light-logo.png" alt="logo"/> : <img src="/images/gid-dark-logo.png" alt="logo"/>}
                    {/* Get It <span className="font-primary">Done</span> */}
                </NavLink>
            
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
