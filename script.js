// Initailize Empty Array
let tasks=[];

// Get All DOM Elements

const taskslist=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const taskCounter=document.getElementById('Task-count');
const addButton = document.getElementById('rbutton');
const completetask=document.getElementById('Complete-All');
const resetTask=document.getElementById('Reset-All');
var comptask=0;
var completedtask=document.getElementById('Complete-count');


// Define a function to add a task to the DOM

function addTaskToDOM(task){
    const li =document.createElement('li');
    li.innerHTML =`
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' :''} class="list-checkbox" />
    <label for="${task.id}">${task.text}</label>
    <img src="static/delete_button.png" class="delete" data-id="${task.id}" />     
    `;
    taskslist.append(li);
}

// Define a function to render the task list

function renderList(){
    taskslist.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    taskCounter.innerHTML=tasks.length;
}

// Define a function to delete a task 

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully')
    if(comptask > 0){
    comptask--;
    completedtask.innerHTML = comptask;
    }
}


// Define a function to mark a task as complete

function markTaskComplete(taskId){
    const task = tasks.filter(function(task){
       return task.id===taskId});
    if(task.length>0){
    const currentTask =task[0];
    if(currentTask.done){
        currentTask.done=false;
        comptask--;
    }
    else{
        currentTask.done= true;
        comptask++;        
    }
    renderList();
    completedtask.innerHTML=comptask;
    showNotification("Task Marked Successfully");
    }
    else{
        showNotification("Task Not Marked Successfully");
    }    
}


// Define a function to add a task to the tasks array
// Todo List Create by Govind Garg

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    else{
        showNotification('Task Not added successfully');

    }
}

// Define a function to show a notification to the user

function showNotification(text){
    alert(text);
}

// Define a function to handle keypress and mousedown events on the input field

function handleInputKeypress(e){
    if(e.key === 'Enter' || e.type =='mousedown'){
        const text = addTaskInput.value;
        if(!text){
            showNotification('Task text cannot be empty') ; 
            return;
        }
        const task = {
            text,
            id:Date.now().toString(),
            done:false
        };
        addTaskInput.value = '';
        addTask(task);
    }
}


function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className === 'list-checkbox'){
        const taskId = target.id;
        markTaskComplete(taskId);
        return;
    }
}

// Todo List Create by Govind Garg
function Complete(){
    for(let i = 0; i < tasks.length; i++){
      tasks[i].done = true;
    }
    renderList();
    showNotification('All tasks marked as complete');
    completedtask.innerHTML = tasks.length;
}
  

function Reset(){
    const checkboxes = document.querySelectorAll('.list-checkbox');
    checkboxes.forEach(function(checkbox){
        checkbox.checked = false;
    });
    tasks.forEach(function(task){
        task.done = false;
    });
    renderList();
    showNotification('All tasks cleared successfully');
    completedtask.innerHTML = 0;
}

function initializeApp(){
    document.addEventListener('click', handleClickListener);
    button.addEventListener('mousedown', handleInputKeypress); 
    completetask.addEventListener('click', Complete);
    resetTask.addEventListener('click', Reset);
    addTaskInput.addEventListener('keydown', handleInputKeypress);

    
}

initializeApp();

// javascript on filtter data;


// get filter links

const allLink = document.getElementById('all');
const completeLink = document.getElementById('Completed');
const uncompleteLink = document.getElementById('Uncompleted');

// add event listeners to filter links

allLink.addEventListener('click', showAllTasks);
completeLink.addEventListener('click', showCompletedTasks);
uncompleteLink.addEventListener('click', showUncompletedTasks);

// function to show all tasks

function showAllTasks() {
    allLink.classList.add('active');
    completeLink.classList.remove('active');
    uncompleteLink.classList.remove('active');
    
    // show all tasks

    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        task.style.display = 'flex';
    });
}

// function to show Completed tasks

function showCompletedTasks(){
    allLink.classList.remove('active');
    completeLink.classList.add('active');
    uncompleteLink.classList.remove('active');

    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.list-checkbox');
        if (checkbox.checked) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });

}

// function to show Uncompleted tasks

function showUncompletedTasks(){
    allLink.classList.remove('active');
    completeLink.classList.remove('active');
    uncompleteLink.classList.add('active');

    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.list-checkbox');
        if (checkbox.checked) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}