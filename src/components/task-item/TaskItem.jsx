import React from "react";
import "./taskitem.css"

export default function TaskItem(task) {
    const {  title } = task;

    return (
        <div className="task-item" onClick={()=>{console.log("clicked")}}>
            <div className="task-title">{title}</div>
            
        </div>
    );
}
