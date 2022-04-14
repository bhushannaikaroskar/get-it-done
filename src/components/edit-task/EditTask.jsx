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
    const [tag,setTag] = useState("");

	const { id, title, description, time, isCompleted, tags } = editData;

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
				id: id,
				title: title,
				description: description,
				time: time,
				isCompleted: isCompleted,
                tags
			},
		});
		dispatchEditData({ type: "RESET" });
	};

    const tagInputHandler = (event) => {
        if (event.key === "Enter") {
            console.log("ENtering")
            dispatchEditData({type:"UPDATE_DATA",payload:{tags:[...tags,tag]}})
			setTag("");
		}
    }

	return (
		<div className="modal-container modal-center modal-active">
			<div className="add-task-container">
				<div className="p-2 ">
					<div className="task-input-wrapper">
						<h2 className="card-title">Edit Task</h2>
						<div className="input-wrapper">
							<input
								type="text"
								className={
									"input-title " +
									(titleError ? "input-field input-color-error" : "")
								}
								placeholder="Add Title"
								value={title}
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
									(descriptionError ? "input-field input-color-error" : "")
								}
								placeholder="Add Description"
								value={description}
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
							<span className="input-message">{descriptionError}</span>
						</div>
						<div className="input-wrapper">
							<input
								type="number"
								className={
									"input-time " +
									(timeError ? "input-field input-color-error" : "")
								}
								placeholder="Add Time (in Minutes)"
								value={time}
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
						<div>
							<div className="tags-container">
								{tags.map((tagName) => {
									return (
										<div className="tag">
											<div className="tag-title">{tagName}</div>
											<button
												className="tag-close"
												onClick={() => {
													dispatchEditData({
														type: "UPDATE_DATA",
														payload: {
															tags: [...tags].filter((t) => t !== tagName),
														},
													});
												}}
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
