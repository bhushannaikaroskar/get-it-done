import React, { useLayoutEffect, useState } from "react";
import { useEditData } from "../../context/edit-task-context/EditDataProvider";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import { useUser } from "../../context/user-context/UserProvider";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import AddTask from "../add-task/AddTask";
import EditTask from "../edit-task/EditTask";
import TaskItem from "../task-item/TaskItem";
import "./taskpage.css";

export default function TaskPage() {
    const { user } = useUser();
    const { taskList } = useTasks();
    const [isModal, setIsModal] = useState();
    const { editData } = useEditData();
    const [filteredTask, setFilteredTask] = useState([...taskList]);

    const uniqueTags = taskList.reduce((uniqueTags, task) => {
        const tagsArr = [];
        task.tags.forEach((tag) => {
            if (!uniqueTags.find((t) => t === tag)) {
                tagsArr.push(tag);
            }
        });
        return [...uniqueTags, ...tagsArr];
    }, []);

    useDocumentTitle("Tasks");

    const toggleModal = () => {
        setIsModal((s) => !s);
    };

    useLayoutEffect(() => {
        setFilteredTask([...taskList]);
    }, [taskList]);

    const filterHandler = (event) => {
        if (!(event.target.value === "All")) {
            setFilteredTask([...taskList]);
            setFilteredTask((s) =>
                [...s].filter((t) =>
                    t.tags.find((tagValue) => tagValue === event.target.value)
                )
            );
        } else {
            setFilteredTask([...taskList]);
        }
    };

    return (
        <div className="taskpage">
            <p className="welcome-message">
                Hey {user.name}, how you doing today?
            </p>
            <p className="font-x-large">
                You have {taskList.length} {taskList.length>1 ? "tasks" : "task"} remaining today
            </p>
            <div className="tasks-container">
                <div className="task-list-title">
                    <h1>Todo-Items</h1>
                    <div>
                        <span className="fw-600 font-large">Filters: </span>
                        <select
                            className="filter-tag"
                            name="filters"
                            id="filters"
                            onChange={filterHandler}
                            value="All"
                        >
                            <option value="All" >
                                All
                            </option>
                            {uniqueTags.map((tag) => {
                                return (
                                    <option id={tag} value={tag}>
                                        {tag}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button
                        className="btn btn-float btn-primary"
                        onClick={toggleModal}
                    >
                        <span className="material-icons btn-icon-lg">add</span>
                    </button>
                </div>
                <div className="task-list">
                    {filteredTask.map((task) => {
                        return <TaskItem key={task.id} {...task} />;
                    })}
                </div>
            </div>
            {isModal && <AddTask toggleModal={toggleModal} />}
            {editData.id && <EditTask />}
        </div>
    );
}
