import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {ThemeProvider,UserProvider,EditDataProvider,TaskProvider} from "./context"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<UserProvider>
					<TaskProvider>
						<EditDataProvider>
							<App />
						</EditDataProvider>
					</TaskProvider>
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
