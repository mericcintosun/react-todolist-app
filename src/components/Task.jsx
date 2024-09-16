import { useState } from "react";

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(editText);
    }
    setIsEditing(!isEditing);
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
        />
      ) : (
        <label>{task.text}</label>
      )}
      <button className="edit" onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button className="delete" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default Task;
