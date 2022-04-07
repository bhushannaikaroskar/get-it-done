import React, { useState } from "react";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import "../add-task/addtask.css"

export default function EditTask({toggleModal,id,title:titleValue,description:descValue,time:timeValue,isCompleted}) {
    const { dispatchTaskList } = useTasks();
    const [title, setTitle] = useState(titleValue??"");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState(descValue??"");
    const [descriptionError, setDescriptionError] = useState("");
    const [time, setTime] = useState(timeValue??undefined);
    const [timeError, setTimeError] = useState();

    const resetTask = () => {
        setDescription("");
        setTitle("");
        setTime();
    };

    const editTask = () => {
        if (title.length < 1) {
            setTitleError("Enter Title");
            return;
        } else {
            setTitleError("");
        }

        if (description.length < 1) {
            setDescriptionError("Enter description");
            return;
        } else {
            setDescriptionError("");
        }

        if (time < 10 || time > 60 || !time) {
            setTimeError("Time should be between 10 to 60 minutes");
            return;
        } else {
            setTimeError("");
        }

        dispatchTaskList({
            type: "EDIT_TASK",
            payload: {
                id,
                title,
                description,
                time,
                isCompleted,
            },
        });
        toggleModal();
        resetTask();
    };

    return (
        <div className="modal-container modal-center modal-active">
            <div className="add-task-container">
                <div className="p-2 ">
                    <div className="task-input-wrapper">
                        <h2 className="card-title">Add Task</h2>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                className={
                                    "input-title " +
                                    (titleError
                                        ? "input-field input-color-error"
                                        : "")
                                }
                                placeholder="Add Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <span className="input-message">{titleError}</span>
                        </div>
                        <div className="input-wrapper">
                            <textarea
                                type="text"
                                className={
                                    "input-description " +
                                    (descriptionError
                                        ? "input-field input-color-error"
                                        : "")
                                }
                                placeholder="Add Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <span className="input-message">
                                {descriptionError}
                            </span>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                className={
                                    "input-time " +
                                    (timeError
                                        ? "input-field input-color-error"
                                        : "")
                                }
                                placeholder="Add Time (in Minutes)"
                                value={time}
                                onChange={(e) =>
                                    setTime(Number(e.target.value))
                                }
                            />
                            <span className="input-message">{timeError}</span>
                        </div>
                    </div>
                    <div className="add-task-cta w-100">
                        <button
                            className="btn btn-primary card-btn"
                            onClick={() => {
                                editTask();
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-outline btn-outline-primary card-btn "
                            onClick={toggleModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
