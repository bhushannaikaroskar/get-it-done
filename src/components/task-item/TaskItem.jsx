import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditData } from "../../context/edit-task-context/EditDataProvider";
import { useTasks } from "../../context/tasks-context/TaskProvider";
import "./taskitem.css";

const style = {
	textDecoration: "line-through",
	color: "var(--GREY)",
};

export default function TaskItem({ ...task }) {
	const { id, title, isCompleted } = task;
	const { dispatchTaskList } = useTasks();
	const navigate = useNavigate();

	const { dispatchEditData } = useEditData();

	const deleteNote = (event) => {
		event.stopPropagation();
		dispatchTaskList({ type: "REMOVE_TASK", payload: { id } });
	};

	const editNote = (event) => {
		event.stopPropagation();
		dispatchEditData({ type: "UPDATE_DATA", payload: { ...task } });
	};

	const checkBoxHandler = (event) => {
		event.stopPropagation();
		dispatchTaskList({ type: "TASK_COMPLETE", payload: { id } });
	};

	return (
		<div
			className="task-item"
			onClick={() => {
				navigate(`/tasks/${id}`);
			}}
		>
			<div className="task-title-container">
				<input
					className="task-checkbox"
					id={id}
					type="checkbox"
					checked={isCompleted}
					onClick={checkBoxHandler}
				/>
				<label
					className="task-checkbox-label"
					htmlFor={id}
					onClick={(e) => e.stopPropagation()}
				></label>
				<div style={isCompleted ? style : {}} className="task-title">
					{title}
				</div>
			</div>
			<div className="task-item-cta">
				<button className="btn btn-icon icon-color-primary" onClick={editNote}>
					<span className="material-icons">edit_note</span>
				</button>
				<button className="btn btn-icon icon-color-primary" onClick={deleteNote}>
					<span className="material-icons">delete</span>
				</button>
			</div>
		</div>
	);
}
