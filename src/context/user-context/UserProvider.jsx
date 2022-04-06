import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const initialState = {
    name:"",
    isVerified : false,
}

export default function UserProvider({ children }) {

    const [user,setUser] = useState(initialState)

    const addName = (name)=>{
        setUser(s => ({...s,name:name,isVerified:true}));
    }

    return <UserContext.Provider value={{user,addName}}>{children}</UserContext.Provider>;
}

export const useUser = ()=>useContext(UserContext);
