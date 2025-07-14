"use strict";

const addButton = document.getElementById('add');
const todoList = document.getElementById('todo-list');
const nameInput = document.getElementById('name');

let tasks = [];

addButton.addEventListener('click', addTask);
//  Add a Task
function addTask() {
    const taskName = nameInput.value.trim();
    if (taskName) {
        const newTask = {
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        nameInput.value = '';
        renderTasks();
    }
}
//  Render the Todo List
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;
        li.className = task.completed ? 'completed' : '';
        
        li.addEventListener('click', () => toggleTask(index));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}
//  Toggle Task Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
//  Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
