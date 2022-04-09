import React, { useState } from "react";
import { useEditData } from "../../context/edit-task-context/EditDataProvider";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import "../add-task/addtask.css";

export default function EditTask() {
    const { editData, dispatchEditData } = useEditData();

    const { dispatchTaskList } = useTasks();
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [timeError, setTimeError] = useState();


    const editTask = () => {
        if (editData.title.length < 1) {
            setTitleError("Enter Title");
            return;
        } else {
            setTitleError("");
        }

        if (editData.description.length < 1) {
            setDescriptionError("Enter description");
            return;
        } else {
            setDescriptionError("");
        }

        if (editData.time < 10 || editData.time > 60 || !editData.time) {
            setTimeError("Time should be between 10 to 60 minutes");
            return;
        } else {
            setTimeError("");
        }

        dispatchTaskList({
            type: "EDIT_TASK",
            payload: {
                id:editData.id,
                title:editData.title,
                description:editData.description,
                time:editData.time,
                isCompleted:editData.isCompleted,
            },
        });
        dispatchEditData({type:"RESET"})
        // toggleModal();
        // resetTask();
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
                                value={editData.title}
                                onChange={(e) =>
                                    dispatchEditData({
                                        type: "UPDATE_DATA",
                                        payload: {
                                            ...editData,
                                            title: e.target.value,
                                        },
                                    })
                                }
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
                                value={editData.description}
                                onChange={(e) =>
                                    dispatchEditData({
                                        type: "UPDATE_DATA",
                                        payload: {
                                            ...editData,
                                            description: e.target.value,
                                        },
                                    })
                                }
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
                                value={editData.time}
                                onChange={(e) =>
                                    dispatchEditData({
                                        type: "UPDATE_DATA",
                                        payload: {
                                            ...editData,
                                            time: e.target.value,
                                        },
                                    })
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
                            onClick={() => dispatchEditData({ type: "RESET" })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
