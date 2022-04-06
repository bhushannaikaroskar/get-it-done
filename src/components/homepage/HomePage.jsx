import "./homepage.css";
import React, { useState } from "react";
import { useUser } from "../../context/user-context/UserProvider";
import {  useNavigate } from "react-router-dom";

export default function HomePage() {
    const { addName } = useUser();
    const [name, setName] = useState();
    const navigate = useNavigate();

    const updateName = (event)=>{
        if(event.charCode === 13){
            if(name.length>=2){
                addName(name);
                navigate("/tasks")
            }else{
                console.log("Please enter valid name")
            }
        }
    } 

    return (
        <div className="homepage">
            <h1>What's your name?</h1>
            <input
                className="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={updateName}
            />
        </div>
    );
}
