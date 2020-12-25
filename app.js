//Variables
const form     = document.querySelector('#form');
const taskList = document.querySelector('#tasks-list');
let tasks      = [];

//Event Listeners
eventListener();

function eventListener(){
    form.addEventListener('submit', addTask);
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        createHtml();
    });
}

//Funciones
function addTask(e){
    e.preventDefault();
    const task = document.querySelector('#task').value;

    //Validate
    if(task === ''){
        return showError('The task field is not allowed to be empty');
    }
    let taskObj = {
        id: Date.now(),
        task: task
    };
    tasks.push(taskObj);
    createHtml();
    //console.log(tasks);
    form.reset();
}

//Function to create HTML
function createHtml(){
    cleanHtml();
    if(tasks.length > 0){
        tasks.forEach( (task) => {
            const li = document.createElement('li');
            const i  = document.createElement('i');
            const a  = document.createElement('a');
            a.classList.add('a-custom');
            a.className = 'fas fa-times';
            i.className = 'fas fa-check';
            a.classList.add('a-custom');
            i.classList.add('icon');
            li.textContent = task.task;
            li.appendChild(i);
            li.appendChild(a);
            taskList.appendChild(li);

            //Borrar Task
            a.addEventListener('click', () => {
                removeTask(task.id);
            });
        } );
        setLocalStorage();
    }
}

//Function to show errors
function showError(error){
    const p = document.createElement('p');
    p.textContent = error;
    p.classList.add('error');
    form.appendChild(p);
}

//Clean Html
function cleanHtml(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

//Save en LocalStorage
function setLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove a task
function removeTask(id){
    tasks = tasks.filter( (task) => task.id !== id );
    createHtml();
}