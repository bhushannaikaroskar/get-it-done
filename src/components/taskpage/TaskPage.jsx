import React, { useState } from "react";
import { useEditData } from "../../context/edit-task-context/EditDataProvider";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import { useUser } from "../../context/user-context/UserProvider";
import AddTask from "../add-task/AddTask";
import EditTask from "../edit-task/EditTask";
import TaskItem from "../task-item/TaskItem";
import "./taskpage.css";

export default function TaskPage() {
    const { user } = useUser();
    const { taskList } = useTasks();
    const [isModal, setIsModal] = useState();

    const {editData} = useEditData();

    const toggleModal = () => {
        setIsModal((s) => !s);
    };

    console.log(user.name, " ", Date.now());
    return (
        <div className="taskpage">
            <p className="welcome-message">
                Hey {user.name}, how you doing today?
            </p>
            <p className="font-x-large">
                You have {taskList.length} tasks remaining today
            </p>
            <div className="tasks-container">
                <div className="task-list-title">
                    <h1>Todo-Items</h1>
                    <button
                        className="btn btn-float btn-primary"
                        onClick={toggleModal}
                    >
                        <span className="material-icons">add</span>
                    </button>
                </div>
                <div className="task-list">
                    {taskList.map((task) => {
                        return (
                            <TaskItem
                                key={task.id}
                                {...task}
                            />
                        );
                    })}
                </div>
            </div>
            {isModal ? <AddTask toggleModal={toggleModal} /> : ""}
            {editData.id ? (
                <EditTask  />
            ) : (
                ""
            )}
        </div>
    );
}
