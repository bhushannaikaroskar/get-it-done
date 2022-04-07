import React, { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const initialState = [];

const tasksReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            console.log(action.payload)
            return [...state, action.payload];
        case "EDIT_TASK":
            return [...state.map((task)=>task.id === action.payload.id ? action.payload : task)];
        case "REMOVE_TASK":
            return [...state.filter((task)=>task.id !== action.payload.id)];
        default:
            return state;
    }
};

export default function TaskProvider({ children }) {
    const [taskList, dispatchTaskList] = useReducer(tasksReducer, initialState);

    return (
        <TaskContext.Provider value={{ taskList, dispatchTaskList }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => useContext(TaskContext);
