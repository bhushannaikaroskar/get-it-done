import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user-context/UserProvider";
import TaskProvider from "./context/tasks-context/TaskProvider";
import EditDataProvider from "./context/edit-task-context/EditDataProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <TaskProvider>
                    <EditDataProvider>
                        <App />
                    </EditDataProvider>
                </TaskProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
