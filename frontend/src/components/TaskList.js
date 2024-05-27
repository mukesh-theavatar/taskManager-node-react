import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tasks');
                setTasks(res.data);
            } catch (err) {
                setError('Failed to fetch tasks. Please try again later.');
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    }, []);

    const addTask = (task) => setTasks([...tasks, task]);

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            setError('Failed to delete task. Please try again later.');
            console.error('Error deleting task:', err);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
            setTasks(tasks.map(task => (task._id === id ? res.data : task)));
        } catch (err) {
            setError('Failed to update task. Please try again later.');
            console.error('Error updating task:', err);
        }
    };

    const filteredTasks = filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

    return (
        <div>
            <TaskForm addTask={addTask} />
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            {error && <p>{error}</p>}
            <ul>
                {filteredTasks.map(task => (
                    <TaskItem 
                        key={task._id} 
                        task={task} 
                        deleteTask={deleteTask} 
                        updateTask={updateTask} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;