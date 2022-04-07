import React from "react";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import "./taskitem.css"

export default function TaskItem(task) {
    const { id, title } = task;
    const {dispatchTaskList} = useTasks()

    const editNote = (event)=>{
        event.stopPropagation();
        console.log("edited note")
    }

    const deleteNote = (event)=>{
        event.stopPropagation();
        dispatchTaskList({type:"REMOVE_TASK",payload:{id}})
    }
    return (
        <div className="task-item" onClick={()=>{console.log("clicked")}}>
            <div className="task-title">{title}</div>
            <div className="task-item-cta">
                <button className="btn btn-icon" onClick={editNote}>
                    <span className="material-icons">edit_note</span>
                </button>
                <button className="btn btn-icon">
                    <span className="material-icons" onClick={deleteNote}>delete</span>
                </button>
            </div>
        </div>
    );
}
