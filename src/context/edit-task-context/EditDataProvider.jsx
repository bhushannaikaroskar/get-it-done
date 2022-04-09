import { createContext, useContext, useReducer } from "react";

const EditDataContext = createContext();

const initialState = {
    id: "",
    title: "",
    description: "",
    time: undefined,
    isCompleted: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_DATA":
            return { ...state, ...action.payload };
        case "RESET":
            return { ...initialState};
        default:
            return state;
    }
};

export default function EditDataProvider({ children }) {
    const [editData, dispatchEditData] = useReducer(reducer, {
        ...initialState,
    });

    return (
        <EditDataContext.Provider value={{ editData, dispatchEditData }}>
            {children}
        </EditDataContext.Provider>
    );
}

export const useEditData = ()=>useContext(EditDataContext)