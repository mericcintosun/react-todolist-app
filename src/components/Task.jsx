import { useState, useEffect } from "react";

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  useEffect(() => {
    if (isEditing) {
      setEditText(task.text);
    }
  }, [isEditing, task.text]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter" && editText.trim() !== "") {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={handleEditKeyPress}
          autoFocus
        />
      ) : (
        <label>{task.text}</label>
      )}
      <button className="edit" onClick={handleEdit}>
        Edit
      </button>
      <button className="delete" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default Task;
