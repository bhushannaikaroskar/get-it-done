import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import AddTask from "../add-task/AddTask";
import EditTask from "../edit-task/EditTask";
import "./taskitem.css"

const style={
    textDecoration:"line-through",
    color:"var(--GREY)"
}

export default function TaskItem({toggle,setTaskValues,...task}) {
    const { id, title,description,isCompleted,time } = task;
    console.log("task item",task)
    const {dispatchTaskList} = useTasks()
    const [isModal,setIsModal] = useState(false);
    const navigate = useNavigate();
    
    

    const deleteNote = (event)=>{
        event.stopPropagation();
        dispatchTaskList({type:"REMOVE_TASK",payload:{id}})
    }

    const editNote = (event)=>{
        event.stopPropagation();
        toggle()
        setTaskValues(id,title,description,time,isCompleted)
    }

    return (
        <div className="task-item" onClick={()=>{navigate(`/tasks/${id}`)}}>
            <div style={isCompleted?style:{}}  className="task-title">{title}</div>
            <div className="task-item-cta">
                <button className="btn btn-icon" onClick={editNote}>
                    <span className="material-icons">edit_note</span>
                </button>
                <button className="btn btn-icon">
                    <span className="material-icons" onClick={deleteNote}>delete</span>
                </button>
            </div>
            {isModal && <EditTask toggleModal {...task}/>}
        </div>
    );
}
