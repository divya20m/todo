import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      addTodo({
        id: Date.now(),
        task,
        description,
        status: 'not completed'
      });
      setTask('');
      setDescription('');
      
    }
  };

  return (
    <form className='form-styling'  onSubmit={handleSubmit}>
      <input className='texting'
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input className='texting'
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className='textings' type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
