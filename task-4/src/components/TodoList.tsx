import React from 'react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTask: string) => void;
}

const TodoList: React.FC<Props> = ({ todos, deleteTodo, editTodo }) => {
  return (
    <ul id="todo-list">
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          deleteTodo={deleteTodo} 
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
