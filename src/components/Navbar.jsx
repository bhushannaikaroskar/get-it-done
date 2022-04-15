import React from "react";
import { useTheme } from "../context/theme-content/ThemeProvider";

const logoStyle = {
	display: "flex", 
	justifyCOntent: "center",
	alignItems: "center",
};

export default function Navbar() {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav class="navbar">
			<div style={logoStyle} class="nav-logo">
				<h1 style={{ color: "var(--OFF-BLACK)" }}>
					Get It <span className="font-primary">Done</span>
				</h1>
			</div>
			<div class="nav-items">
				<button
					class="btn btn-link-secondary justify-content-start"
					onClick={toggleTheme}
				>
					<div class="badge-container flex flex-column">
						{theme === "light" ? (
							<span class="material-icons font-x-large">dark_mode</span>
						) : (
							<span class="material-icons font-x-large">light_mode</span>
						)}
					</div>
				</button>
			</div>
		</nav>
	);
}
