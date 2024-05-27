import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        const newTask = { title, description, status };
        const res = await axios.post('http://localhost:5000/api/tasks', newTask);
        addTask(res.data);
        setTitle('');
        setDescription('');
        setStatus('To Do');
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description" 
            ></textarea>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;