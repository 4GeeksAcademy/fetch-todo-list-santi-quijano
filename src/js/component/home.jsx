import React, { useState, useEffect } from "react";


function Home() {
	const [tasks, setTasks] = useState([]);

	const deleteTask = (indexToDelete) => {
		setTasks((prevTasks) => prevTasks.filter((task, index) => index !== indexToDelete));
	};

	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Santi-Quijano", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is where your code should start after the fetch finishes
				setTasks(data)
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, []);






	return (
		<div className="container">
			<h1 className="text-muted">todos</h1>
			<input type="text" placeholder="What needs to be done?" onKeyDown={(e) => { if (e.code === "Enter") setTasks([e.target.value, ...tasks]); }} />
			<ul>
				{tasks.length === 0 && <li>No tasks, add a task pressing Enter</li>}
				{tasks.map((task, index) => (
					<li key={index}>
						<p>{task}</p>
						<button className="erase" onClick={() => deleteTask(index)}>X</button>
					</li>
				))}
				<li className="list-group-item fontSizeSmall">{tasks.length === 1 ? "1 item" : `${tasks.length} items`}</li>
			</ul>

		</div>
	);
}
export default Home; 