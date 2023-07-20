let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
            <input type="checkbox" id=${task.id} data-id=${task.id} class="custom-checkbox" ${task.done ? 'checked' : ''}>
            <label for=${task.id}>${task.text}</label>
            <img src="bin.png" class="delete" data-id=${task.id} />
    `;
    tasksList.append(li);
}

function renderList() {

    tasksList.innerHTML = '';
    if (tasks.length==0) {

        const li = document.createElement('li');
        li.innerHTML = `<span class="no-task">No Tasks Added!</span>`;
        tasksList.append(li);

    } else {

        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }

    }
    tasksCounter.innerHTML = tasks.length;

}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === taskId;
    });
    if (task.length > 0) {
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted from the list successfully!');
    return;

}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Task added to the list successfully!');
        return;
    } else {
        showNotification('Task cannot be added!');
        return;
    }
}

function showNotification(text) {
    alert(text);
}

function handleKeypress(e) {

    if (e.key === 'Enter') {
        const text = e.target.value;
        if (!text) {
            showNotification('The text field cannot be empty!');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            done: false,
        }

        e.target.value = '';
        addTask(task);
    }

}

function handleClickListener(e) {
    const target = e.target;
    if (target.className == 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp() {
    addTaskInput.addEventListener('keyup', handleKeypress);
    document.addEventListener('click', handleClickListener);
    renderList();
}

initializeApp();