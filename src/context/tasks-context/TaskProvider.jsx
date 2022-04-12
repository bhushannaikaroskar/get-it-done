import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useUser } from "../user-context/UserProvider";

const TaskContext = createContext();

const initialState = [];

const tasksReducer = (state, action) => {
	let newState;
	switch (action.type) {
		case "ADD_TASK":
			newState = [...state, action.payload];
			localStorage.setItem("gid-tasks", JSON.stringify(newState));
			return [...state, action.payload];

		case "EDIT_TASK":
			newState = [
				...state.map((task) =>
					task.id === action.payload.id ? { ...action.payload } : task
				),
			];
			localStorage.setItem("gid-tasks", JSON.stringify(newState));
			return newState;

		case "REMOVE_TASK":
			newState = [...state.filter((task) => task.id !== action.payload.id)];
			localStorage.setItem("gid-tasks", JSON.stringify(newState));
			return newState;

		case "TASK_COMPLETE":
			newState = [
				...state.map((task) =>
					task.id === action.payload.id
						? { ...task, isCompleted: !task.isCompleted }
						: task
				),
			];
			localStorage.setItem("gid-tasks", JSON.stringify(newState));
			return newState;
            

		case "GET_LOCAL_TASKS":
			newState = [...action.payload];
			return newState;

		default:
			return state;
	}
};

export default function TaskProvider({ children }) {
	const [taskList, dispatchTaskList] = useReducer(tasksReducer, initialState);
	const { user } = useUser();

	useEffect(() => {
		if (user.isVerified) {
			const list = JSON.parse(localStorage.getItem("gid-tasks"));
			dispatchTaskList({ type: "GET_LOCAL_TASKS" ,payload:list});
		}
	}, [user]);

	return (
		<TaskContext.Provider value={{ taskList, dispatchTaskList }}>
			{children}
		</TaskContext.Provider>
	);
}

export const useTasks = () => useContext(TaskContext);
