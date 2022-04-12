import "./homepage.css";
import React, { useState } from "react";
import { useUser } from "../../context/user-context/UserProvider";
import {  Navigate, useNavigate } from "react-router-dom";

export default function HomePage() {
    const { addName } = useUser();
    const [name, setName] = useState();
    const [error,setError] = useState();
    const navigate = useNavigate();
    const {user} = useUser()

    const updateName = (event)=>{
        if(event.charCode === 13){
            if(name.length>=2){
                addName(name);
                navigate("/tasks")
            }else{
                setError("Please enter a valid name")
                setTimeout(()=>setError(""),5000)
            }
        }
    } 

    return user.isVerified?<Navigate to="/tasks"/>:(
        <div className="homepage">
            <h1>What's your name?</h1>
            <input
                className="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={updateName}
            />
             <div className="error-text">{error}</div>
        </div>
    );
}
