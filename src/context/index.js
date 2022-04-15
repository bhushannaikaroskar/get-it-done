import ThemeProvider from "./theme-content/ThemeProvider";
import EditDataProvider from "./edit-task-context/EditDataProvider";
import TaskProvider from "./tasks-context/TaskProvider";
import UserProvider from "./user-context/UserProvider";

export { useTheme } from "./theme-content/ThemeProvider";
export { useUser } from "./user-context/UserProvider";
export { useEditData } from "./edit-task-context/EditDataProvider";
export { useTasks } from "./tasks-context/TaskProvider";
export {ThemeProvider,EditDataProvider,TaskProvider,UserProvider}