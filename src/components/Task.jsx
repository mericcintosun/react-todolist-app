import { useState, useEffect } from "react";

const Task = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim() !== "") {
      onEdit(editText);
    }
    setIsEditing(!isEditing); // Düzenleme modunu aç/kapat
  };

  // task prop'u değiştiğinde (örneğin, düzenleme sonrasında) editText durumunu güncelle
  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

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
