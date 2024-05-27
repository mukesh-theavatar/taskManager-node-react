import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Task Manager</h1>
            </header>
            <main>
                <TaskList />
            </main>
        </div>
    );
};

export default App;