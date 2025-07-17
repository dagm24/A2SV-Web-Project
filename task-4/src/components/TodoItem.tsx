import React, { useState } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTask: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(todo.task);

  const handleEdit = () => {
    editTodo(todo.id, newTask);
    setIsEditing(false);
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onBlur={handleEdit}
            autoFocus
            style={{ flex: 1, marginRight: '10px' }}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{todo.task}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>×</button>
    </li>
  );
};

export default TodoItem;
