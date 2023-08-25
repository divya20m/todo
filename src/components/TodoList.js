import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, updateTodo, deleteTodo }) {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'all') return true;
    return todo.status === filterStatus;
  });

  return (
    <div className='bottom'>
      <div >
        <div className="filter"> 
        <label> StatusFilter</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="not completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
        </div>
        <div className='simple'>
          My todos
          
        </div>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
