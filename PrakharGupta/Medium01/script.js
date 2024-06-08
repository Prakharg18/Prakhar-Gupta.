// script.js
document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const priorityInput = document.getElementById('priority-input');
    const taskList = document.getElementById('task-list');
    const sortPriorityBtn = document.getElementById('sort-priority');
    const sortDueDateBtn = document.getElementById('sort-due-date');
    const sortStatusBtn = document.getElementById('sort-status');

    let tasks = [];

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value, dueDateInput.value, priorityInput.value);
        taskInput.value = '';
        dueDateInput.value = '';
    });

    function addTask(description, dueDate, priority) {
        const task = {
            id: Date.now(),
            description,
            dueDate,
            priority,
            completed: false
        };
        tasks.push(task);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.description}</span>
                <span>Due: ${task.dueDate}</span>
                <span>Priority: ${task.priority}</span>
                <div class="actions">
                    <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function toggleComplete(id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        renderTasks();
    }

    function editTask(id) {
        const task = tasks.find(task => task.id === id);
        const newDescription = prompt("Edit task description:", task.description);
        if (newDescription !== null) {
            task.description = newDescription;
            renderTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    sortPriorityBtn.addEventListener('click', function() {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        renderTasks();
    });

    sortDueDateBtn.addEventListener('click', function() {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        renderTasks();
    });

    sortStatusBtn.addEventListener('click', function() {
        tasks.sort((a, b) => a.completed - b.completed);
        renderTasks();
    });

    window.toggleComplete = toggleComplete;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
});
