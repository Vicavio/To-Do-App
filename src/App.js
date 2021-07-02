import React, { useState, useEffect } from 'react';
import './App.css';
//Importing Components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //state
  const [inputText, setInputText] = useState ("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFiltereTodos ] = useState([]);
  
  //run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);

  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos()
  }, [todos, status]);

  //functions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFiltereTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFiltereTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFiltereTodos(todos);
        break;

    }
  };
  //save to local
  const saveLocalTodos = () =>{
      localStorage.setItem('todos', JSON.stringify(todos));
    };
  
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal=JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }
  return (
    <div className="App">
      <header>
      <h1>Vica's Todo List</h1>
    </header>
    <Form  
    inputText={inputText}
    todos= {todos} 
    setTodos={setTodos} 
    setInputText = {setInputText}
    setStatus = {setStatus}
  />
    <TodoList 
    filteredTodos={filteredTodos}
    setTodos={setTodos} 
    todos={todos}
    />
    </div>
  );
}

export default App;
