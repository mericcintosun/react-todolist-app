import { useState, useEffect } from "react";
import Task from "./components/Task";

const App = () => {
  // Uygulama yüklendiğinde localStorage'dan verileri al
  const getInitialTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const getInitialCompletedTasks = () => {
    const savedCompletedTasks = localStorage.getItem("completedTasks");
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  };

  const [tasks, setTasks] = useState(getInitialTasks);
  const [completedTasks, setCompletedTasks] = useState(getInitialCompletedTasks);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    // Tekerleğin kaydırma davranışını önleme
    const handleWheel = (event) => {
      const container = document.querySelector('.container');
      if (container && container.contains(event.target)) {
        if (
          (event.deltaY < 0 && container.scrollTop === 0) || 
          (event.deltaY > 0 && container.scrollTop + container.clientHeight === container.scrollHeight)
        ) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  // tasks veya completedTasks her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

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
