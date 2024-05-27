import React from 'react';

const TaskItem = ({ task, deleteTask, updateTask }) => {
    const handleDelete = () => deleteTask(task._id);
    const handleStatusChange = (e) => {
        updateTask(task._id, { ...task, status: e.target.value });
    };

    return (
        <li>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <select value={task.status} onChange={handleStatusChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TaskItem;