import React, { useState, useEffect } from "react";

function Home() {
	const [tasks, setTasks] = useState([]);

	let nextTaskId = 1;

	const fetchData = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setTasks(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		fetchData();
	}, []);

	const addTask = (newTask) => {
		const newTaskWithId = { id: nextTaskId++, task: newTask };
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",

			},
			body: JSON.stringify([...tasks, newTaskWithId]),
		})
			.then(() => fetchData())
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
			method: PUT,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTasks),
		})
			.then(() => setTasks(updatedTasks))
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteAllTasks = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
			method: "PUT",
			headers: {
				"Content-Type": "applications/json",
			},
			body: JSON.stringify([]),
		})
			.then(() => fetchData())
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="container">
			<h1 className="text-muted">todos</h1>
			<input type="text" placeholder="What needs to be done?" onKeyDown={(e) => { if (e.code === "Enter") addTask(e.target.value); }} />
			<ul>
				{tasks.length === 0 && <li>No tasks, add a task pressing Enter</li>}
				{tasks.map((task) => (
					<li key={task.id}>
						<p>{task.task}</p>
						<button className="erase" onClick={() => deleteTask(task.id)}>X</button>
					</li>
				))}
				<li className="list-group-item fontSizeSmall">{tasks.length === 1 ? "1 item" : `${tasks.length} items`}</li>
			</ul>

		</div>
	);
}
export default Home;





