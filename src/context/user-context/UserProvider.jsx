import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const initialState = {
    name:"",
    isVerified : false,
}

export default function UserProvider({ children }) {

    const [user,setUser] = useState(initialState)

    const addName = (name)=>{
        setUser(s => ({...s,name:name,isVerified:true}));
        localStorage.setItem("gid-name",name)
        localStorage.setItem("gid-tasks",JSON.stringify([]))
    }

    useEffect(()=>{
        const userName = localStorage.getItem("gid-name");
        if(userName){
            setUser({name:userName,isVerified:true})
        }   
    },[])

    return <UserContext.Provider value={{user,addName}}>{children}</UserContext.Provider>;
}

export const useUser = ()=>useContext(UserContext);
