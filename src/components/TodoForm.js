import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function TodoForm() {
  
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
const[savedtodo,setSavedTodo]=useState([])
const [editingId, setEditingId] = useState(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (task.trim() !== '') {
    const newTodo = { task: task, description: description };
    setSavedTodo([...savedtodo, newTodo]);
    setTask('');
    setDescription('');
  }
};
const deleteTodo = (todoId) => {
  setSavedTodo(savedtodo.filter(todo => todo.id !== todoId));
};


const handleEdit = (todoId) => {
  setEditingId(todoId);
  const todoToEdit = savedtodo.find((todo) => todo.id === todoId);
  if (todoToEdit) {
    setTask(todoToEdit.task);
    setDescription(todoToEdit.description);
  }
};

const handleSaveEdit = () => {
  const updatedTodos = savedtodo.map((todo) =>
    todo.id === editingId ? { ...todo, task: task, description: description } : todo
  );
  setSavedTodo(updatedTodos);
  setEditingId(null);
  setTask('');
  setDescription('');
};

const handleCancelEdit = () => {
  setEditingId(null);
  setTask('');
  setDescription('');
};


const [statusFilter, setStatusFilter] = useState('all');

const handleChange = (event) => {
  setStatusFilter(event.target.value);
};

const filteredTodos = savedtodo.filter((todo) => {
  if (statusFilter === 'Completed') {
    return todo.task && todo.description;
  } else if (statusFilter === 'Not Completed') {
    return !todo.task || !todo.description;
  }
  return true;
});

  return (
    <div>
    <form className='form-styling'  onSubmit={handleSubmit}>
      <TextField className='texting'  placeholder="Task" value={task}  onChange={(e) => setTask(e.target.value)} variant="outlined" />
      <TextField className='texting' placeholder="Description" value={description}  onChange={(e) => setDescription(e.target.value)} variant="outlined" />
      <Button className='textings' variant="contained" type="submit">Add Todo</Button>
      
      
      <div className='dropdown'>
 <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={completed}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Not Completed">Not Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </div>
    </form>
    <div className='listsstyling'>
    {/* {savedtodo.map((todo, index) => (
          <Bottom key={index} task={todo.task} description={todo.description} />
        ))} */}
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            deleteTodo={deleteTodo}
            saveEdit={handleSaveEdit}
            cancelEdit={handleCancelEdit}
          />
        ))}
      </div>

    </div>
  );
}

export default TodoForm;




function Bottom({task, description, deleteTodo, editTodo, saveEdit, cancelEdit, isEditing ,setDescription, setTask,todoId }){
  const getStatus = () => {
    if (!task && !description) {
      return "Not Complete";
    }
    if (!task || !description) {
      return "Not Complete";
    }
    return "Completed";
  };
 
  return(
    <div className='savedtodo'>
    <h3>My Todo</h3>
    <div>
      {isEditing ? (
        <>
          <div>
            <TextField placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} variant="outlined" />
          </div>
          <div>
            <TextField placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} variant="outlined" />
          </div>
          <div style={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={() => saveEdit(todoId)}>Save</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <div>Task: {task}</div>
          <div>Description: {description}</div>
          <div>Status: {getStatus()}</div>
          <div style={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={editTodo}>Edit</Button>
            <Button variant="contained" onClick={deleteTodo}>Delete</Button>
          </div>
        </>
      )}
    </div>
  </div>
  )
}



function TodoItem({ todo, deleteTodo, saveEdit, cancelEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const getStatus = () => {
    if (!editedTask && !editedDescription) {
      return "Not Complete";
    }
    if (!editedTask || !editedDescription) {
      return "Not Complete";
    }
    return "Completed";
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    saveEdit(todo.id, editedTask, editedDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask(todo.task);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className='savedtodo'>
      <h3>My Todo</h3>
      <div>
        {isEditing ? (
          <>
            <div>
              <TextField
                placeholder="Task"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                placeholder="Description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                variant="outlined"
              />
            </div>
            <div style={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <div>Task: {editedTask}</div>
            <div>Description: {editedDescription}</div>
            <div>Status: {getStatus()}</div>
            <div style={{ display: "flex", margin: "10px", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={handleEdit}>Edit</Button>
              <Button variant="contained" onClick={() => deleteTodo(todo.id)}>Delete</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}