import React, { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [status, setStatus] = useState(todo.status);

  const handleStatusChange = () => {
    const newStatus = status === 'not completed' ? 'completed' : 'not completed';
    setStatus(newStatus);
    updateTodo({ ...todo, status: newStatus });
  };

  return (
    <div className={`todo-item ${status}`}>
      <div className="todo-card" >
        <h3>{todo.task}</h3>
        <p>{todo.description}</p>
        <button style={{ backgroundColor: "green", marginRight: "10px" }} onClick={handleStatusChange}>Edit</button>
        <button style={{ backgroundColor: "orange" }} onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
