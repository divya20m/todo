import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
      <TextField className='texting'  placeholder="Task" value={task}  onChange={(e) => setTask(e.target.value)} variant="outlined" />
      {/* <input className='texting'
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      /> */}
      {/* <input className='texting'
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <TextField className='texting' placeholder="Description" value={description}  onChange={(e) => setDescription(e.target.value)} variant="outlined" />
      <Button className='textings' type="submit">Add Todo</Button>
    </form>
  );
}

export default TodoForm;
