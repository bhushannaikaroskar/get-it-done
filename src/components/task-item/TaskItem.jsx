import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditData } from "../../context/edit-task-context/EditDataProvider";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import "./taskitem.css"

const style={
    textDecoration:"line-through",
    color:"var(--GREY)"
}

export default function TaskItem({...task}) {

    const { id, title,isCompleted} = task;
    const {dispatchTaskList} = useTasks()
    const navigate = useNavigate();

    const {dispatchEditData} = useEditData()
    
    

    const deleteNote = (event)=>{
        event.stopPropagation();
        dispatchTaskList({type:"REMOVE_TASK",payload:{id}})
    }

    const editNote = (event)=>{
        event.stopPropagation();
        dispatchEditData({type:"UPDATE_DATA",payload:{...task}})
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
        </div>
    );
}
