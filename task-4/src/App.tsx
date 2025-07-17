import React, { useState } from 'react';
import type { Todo } from './types';
import TodoList from './components/TodoList';
import './App.css'; // Import your CSS

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      task: task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newTask: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newTask } : todo)));
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-group">
        <input 
          type="text" 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <TodoList 
        todos={todos} 
        deleteTodo={deleteTodo} 
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
