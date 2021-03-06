import { useState } from "react";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import { v4 as uuid } from "uuid";
import "./addtask.css";

export default function AddTask({ toggleModal }) {
    const { dispatchTaskList } = useTasks();
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [time, setTime] = useState();
    const [timeError, setTimeError] = useState();
    const [tagsList, setTagsList] = useState([]);
    const [tag, setTag] = useState("");

    const resetTask = () => {
        setDescription("");
        setTitle("");
        setTime();
    };

    const addTask = () => {
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
            type: "ADD_TASK",
            payload: {
                id: uuid(),
                title,
                description,
                time,
                isCompleted: false,
                tags: [...tagsList],
                date: new Date()
            },
        });
        toggleModal();
        resetTask();
    };

    const tagInputHandler = (event) => {
        if (event.key === "Enter") {
            if (!tagsList.find((t) => t === tag)) {
                setTagsList((s) => [...s, tag]);
            }
            setTag("");
        }
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
                        <div>
                            <div className="font-normal fw-600 p-y-1">Tags added:</div>
                            <div className="tags-container">
                                {tagsList.map((tagName) => {
                                    return (
                                        <div className="tag">
                                            <div className="tag-title">
                                                {tagName}
                                            </div>
                                            <button
                                                className="tag-close"
                                                onClick={() =>
                                                    setTagsList((s) =>
                                                        [...s].filter(
                                                            (t) => t !== tagName
                                                        )
                                                    )
                                                }
                                            >
                                                <span className="material-icons btn-icon-sm">
                                                    close
                                                </span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            <input
                                type="text"
                                value={tag}
                                placeholder="Add Tags(optional)"
                                className="input-tag"
                                onKeyDownCapture={tagInputHandler}
                                onChange={(e) => {
                                    setTag(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="add-task-cta w-100">
                        <button
                            className="btn btn-primary card-btn"
                            onClick={() => {
                                addTask();
                            }}
                        >
                            Add
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
