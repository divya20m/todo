import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';



function App() {
  return (
    <div className="App">
      <h1 className='heading'>My Todos</h1>
      <TodoForm />
    </div>
  );
}

export default App;
