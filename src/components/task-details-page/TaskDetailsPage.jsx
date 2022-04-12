import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Timer from "../timer/Timer";
import "./task-details.css";

export default function TaskDetailPage() {
    const { taskId } = useParams();
    const { taskList, dispatchTaskList } = useTasks();
    const navigate = useNavigate();

    const getTaskDetails = (list, id) => list.find((task) => task.id === id);

    const task = getTaskDetails(taskList, taskId);
    const { id,title, description, isCompleted } = task;
    const toggleTask = (id) => {
        dispatchTaskList({ type: "TASK_COMPLETE",payload:{id} });
    };

    useDocumentTitle(title)

    return task ? (
        <div className="task-detail-page">
            <div className="grid-container">
                <div className="pomodoro-timer">
                    <Timer {...task}/>
                </div>
                <div className="task-details-container">
                    <h1 className="task-detail-title">{title}</h1>
                    <div className="task-detail-description">{description}</div>
                    <div className="task-details-cta">
                        <button
                            className="btn btn-primary"
                            onClick={()=>toggleTask(id)}
                        >
                            {!isCompleted ? "Done" : "Undo"}
                        </button>
                        <button className="btn btn-outline" onClick={()=>navigate("/tasks")}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>Task not present</div>
    );
}
