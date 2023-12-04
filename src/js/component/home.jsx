import React, { useState, useEffect } from "react";

function Home() {
    const [tasks, setTasks] = useState([]);

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks);
        updateTasksOnServer(updatedTasks);
    };

    const updateTasksOnServer = (updatedTasks) => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks),
        })
            .then((resp) => resp.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    const addTask = (taskLabel) => {
        const newTask = { id: tasks.length + 1, label: taskLabel, done: false };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        updateTasksOnServer(updatedTasks);
    }

    const eraseAllTasks = () => {
        setTasks([]);
        updateTasksOnServer([]);
    };

    useEffect(() => {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                else return response.json();
            })
            .then((data) => setTasks(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container">
            <h1 className="text-muted">todos</h1>
            <input type="text" placeholder="What needs to be done?" onKeyDown={(e) => {
                if (e.code === "Enter") {
                    addTask(e.target.value);
                    e.target.value = ''; //To Clear Input
                }
            }}
            />

            <ul>
                {tasks.length === 0 && <li className="text-muted">No tasks, add a task pressing Enter.</li>}
                {tasks.map((task) => (
                    <li key={task.id}>
                        <p>{task.label}</p>
                        <button className="erase" onClick={() => deleteTask(task.id)}>
                            X
                        </button>
                    </li>
                ))}
                <li className="list-group-item fontSizeSmall">
                    {tasks.length === 1 ? "1 item" : `${tasks.length} items`}
                </li>
            </ul>
            <button className="delete-everything" onClick={eraseAllTasks}>Delete Everything</button>
        </div>
    )
}
export default Home;