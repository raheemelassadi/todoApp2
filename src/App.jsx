import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask("");
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = newTask;
    setTasks(updatedTasks);
    setEditingIndex(-1);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="main">
      <h1>TODO list</h1>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={newTask}
                onChange={handleInputChange}
              />
            ) : (
              <span>{task}</span>
            )}
            <div>
              {editingIndex === index ? (
                <FontAwesomeIcon
                  icon={faSave}
                  onClick={() => handleSaveTask(index)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditTask(index)}
                />
              )}
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => handleDeleteTask(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
