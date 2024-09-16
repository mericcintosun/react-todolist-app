import { useState } from "react";
import Task from "./components/Task";

const App = () => {
  const [tasks, setTasks] = useState([
    { text: "Pay Bills", completed: false },
    { text: "Go Shopping", completed: false },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { text: "See the Doctor", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const createNewTaskElement = (taskString) => ({
    text: taskString,
    completed: false,
  });

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, createNewTaskElement(newTask)]);
      setNewTask("");
    }
  };

  const editTask = (index, newText, isCompleted) => {
    if (isCompleted) {
      const updatedTasks = [...completedTasks];
      updatedTasks[index].text = newText;
      setCompletedTasks(updatedTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = newText;
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (index, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    } else {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const toggleTaskCompletion = (index, isCompleted) => {
    if (isCompleted) {
      const task = completedTasks[index];
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
      setTasks([...tasks, { ...task, completed: false }]);
    } else {
      const task = tasks[index];
      setTasks(tasks.filter((_, i) => i !== index));
      setCompletedTasks([...completedTasks, { ...task, completed: true }]);
    }
  };

  return (
    <div className="container">
      <h2>TODO LIST</h2>
      <h3>Add Item</h3>
      <p>
        <input
          id="new-task"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </p>

      <h3>Todo</h3>
      <ul id="incomplete-tasks">
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            onEdit={(newText) => editTask(index, newText, false)}
            onDelete={() => deleteTask(index, false)}
            onToggleComplete={() => toggleTaskCompletion(index, false)}
          />
        ))}
      </ul>

      <h3>Completed</h3>
      <ul id="completed-tasks">
        {completedTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            onEdit={(newText) => editTask(index, newText, true)}
            onDelete={() => deleteTask(index, true)}
            onToggleComplete={() => toggleTaskCompletion(index, true)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
