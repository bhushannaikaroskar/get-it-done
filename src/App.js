import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage, TaskDetailPage, TaskPage } from "./components";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route element={<PrivateRoute />}>
					<Route path="/tasks" element={<TaskPage />} />
					<Route path="/tasks/:taskId" element={<TaskDetailPage />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
