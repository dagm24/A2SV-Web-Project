// Task interface
interface Task {
  name: string;
  completed: boolean;
}

const addButton = document.getElementById('add') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const nameInput = document.getElementById('name') as HTMLInputElement;

let tasks: Task[] = [];

addButton.addEventListener('click', addTask);

// Add a Task
function addTask(): void {
  const taskName = nameInput.value.trim();
  if (taskName) {
      const newTask: Task = {
          name: taskName,
          completed: false
      };
      tasks.push(newTask);
      nameInput.value = '';
      renderTasks();
  }
}

// Render the Todo List
function renderTasks(): void {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      li.className = task.completed ? 'completed' : '';

      li.addEventListener('click', () => toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'delete-btn';

      // Stop click from triggering toggle when deleting
      deleteBtn.addEventListener('click', (e: MouseEvent) => {
          e.stopPropagation();
          deleteTask(index);
      });

      li.appendChild(deleteBtn);
      todoList.appendChild(li);
  });
}

// Toggle Task Completion
function toggleTask(index: number): void {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete Task
function deleteTask(index: number): void {
  tasks.splice(index, 1);
  renderTasks();
}
