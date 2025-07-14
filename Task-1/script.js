const addButton = document.getElementById('add');
const todoList = document.getElementById('todo-list');
const nameInput = document.getElementById('name');
let tasks = [];

// Add Task
addButton.addEventListener('click', () => {
    const taskName = nameInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        updateTodoList();
        nameInput.value = '';
    }
});

// Update the Todo List
function updateTodoList() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.textContent = task.name;

        // Toggle complete on click
        li.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            updateTodoList();
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            updateTodoList();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}