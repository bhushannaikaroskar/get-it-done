import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Timer from "../timer/Timer";
import "./task-details.css";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export default function TaskDetailPage() {
    const { taskId } = useParams();
    const { taskList, dispatchTaskList } = useTasks();
    const navigate = useNavigate();
    const [width,setWidth] = useState(0)

    const getTaskDetails = (list, id) => list.find((task) => task.id === id);

    const task = getTaskDetails(taskList, taskId);
    const { id, title, description, isCompleted, tags,date } = task;
    const toggleTask = (id) => {
        dispatchTaskList({ type: "TASK_COMPLETE", payload: { id } });
    };

    const newDate = new Date(date)

    useDocumentTitle(title);
    const ref = useRef(null);

    useEffect(()=>{
        console.log("width",ref.current?ref.current.offsetWidth:0)
        setWidth(ref?.current?.offsetWidth ?? 0)
    },[ref])

    console.log(date)

    return task ? (
        <div className="task-detail-page">
            <div ref={ref} className="grid-container">
                <div className="pomodoro-timer">
                    <Timer {...task} width={width-62} />
                </div>
                <div className="task-details-container">
                    <h1 className="task-detail-title" title={title}>{title}</h1>
                    <div className="task-detail-description">{description}</div>
                    <div className="task-detail-tags">Tags:</div>
                    <div className="tags-container">
                        {tags.map((tag) => {
                            return (
                                <div key={tag} className="tag">
                                    <div className="tag-title">{tag}</div>
                                </div>
                            );
                        })}
                        {tags.length === 0 && (
                            <div className="font-grey font-normal">No tags</div>
                        )}
                    </div>
                    <div className="p-2"></div>
                    <div className="task-details-cta">
                        <button
                            className="btn btn-primary"
                            onClick={() => toggleTask(id)}
                        >
                            {!isCompleted ? "Done" : "Undo"}
                        </button>
                        <button
                            className="btn btn-outline btn-outline-primary"
                            onClick={() => navigate("/tasks")}
                        >
                            Go Back
                        </button>
                    </div>
                    {date && <div className="font-normal font-dark-gray fw-500">Date created: {`${newDate.getDate()} ${months[newDate.getMonth()]}, ${1900+ newDate.getYear()}`}</div>}
                </div>
            </div>
        </div>
    ) : (
        <div>Task not present</div>
    );
}
