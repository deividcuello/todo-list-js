const tasks = {
    todo: [],
    completed: []
}

const form = document.querySelector('form');
const input = document.querySelector('input');
const list = document.querySelector('.list');
const todos = document.querySelector('#todos');
const completed = document.querySelector('#completed');
const todoEmpty = document.querySelector('#todos span');
const completedEmpty = document.querySelector('#completed span');


let isEdit = false;
let parentEditId = '';
let editText = '';

const deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/> <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg>';

const editSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>';

const completeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>';

const uncompletedSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = input.value.trim();
    if(!value){
        return
    }
    if(!isEdit){
        const checkExists = ((valueFunc) => {
            return valueFunc.toLowerCase() == value.toLowerCase();
        });
        if(tasks.todo.some(checkExists)) return
    }

    if(isEdit){
        editContent(editText);
        return
    }
    tasks.todo.push(`${value} do`);
    addTodo(value);
    value = '';
    input.value = value;

    checkIsEmpty();
})

function checkIsEmpty(){
    if(tasks.todo.length > 0){
        todoEmpty.innerHTML = ''
        todoEmpty.classList.add('absolute');
    } else{
        todoEmpty.innerHTML = 'Empty'
        todoEmpty.classList.remove('absolute');
    }
    
    if(tasks.completed.length > 0){
        completedEmpty.innerHTML = ''
        completedEmpty.classList.add('absolute');
    } else{
        completedEmpty.innerHTML = 'Empty'
        completedEmpty.classList.remove('absolute');
    }
}

function addTodo(text, isTodo){
    const divContainer = document.createElement('div');
    const h3 = document.createElement('h3');
    const containerBtn = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    const completeBtn = document.createElement('button');

    divContainer.classList.add('flex', 'items-center', 'mx-5');
    
    h3.textContent = text;
    h3.classList.add("text-lg", "flex-1", "break-all");
    divContainer.appendChild(h3);

    deleteBtn.innerHTML = deleteSvg;
    editBtn.innerHTML = editSvg;
    completeBtn.innerHTML = completeSvg;

    containerBtn.appendChild(deleteBtn);
    containerBtn.appendChild(editBtn);
    containerBtn.appendChild(completeBtn);

    deleteBtn.addEventListener('click', deleteFunc);
    editBtn.addEventListener('click', editFunc);
    completeBtn.addEventListener('click', completeFunc);
    
    containerBtn.classList.add("flex", "items-center", "mx-5", "gap-2");
    divContainer.appendChild(containerBtn);
    
    if(isTodo === 'todo'){
        todos.appendChild(divContainer);
        return
    } else if(isTodo === 'completed'){
        completed.appendChild(divContainer);
        return
    }

    todos.appendChild(divContainer);
}

function deleteFunc(){
    const item = this.parentNode.parentNode;
    const parentId = item.parentNode.id;
    const value = item.querySelector('h3').textContent;
    if(parentId === 'todos'){
        todos.removeChild(item)
        tasks.todo.splice(tasks.todo.indexOf(value), 1);
    } else{
        completed.removeChild(item)
        tasks.completed.splice(tasks.todo.indexOf(value), 1);
    }

    checkIsEmpty();
}

function editContent(value){
    if(parentEditId === 'todos'){
        tasks.todo.forEach((element, index) => {
            if(element == `${value} do`){
                tasks.todo[index] = `${input.value} do`;
            }
        });
    } else{
        tasks.completed.forEach((element, index) => {
            if(element == `${value} ed`){
                tasks.completed[index] = `${input.value} ed`;
            }
        });
    }
    input.classList.remove('focus:border-2');
    isEdit = false;
    input.value = '';
    renderTasks();
}

function editFunc(){
    editText = this.parentNode.parentNode.querySelector('h3').textContent;
    input.value = this.parentNode.parentNode.querySelector('h3').textContent;
    parentEditId = this.parentNode.parentNode.parentNode.id;
    isEdit = true;
    input.classList.add('focus:border-2');
    input.focus();
}

function completeFunc(){
    const item = this.parentNode.parentNode;
    const h3 = item.querySelector('h3').textContent;
    const parentId = item.parentNode.id;
    if(parentId == 'todos'){
        tasks.completed.push(`${h3} ed`)
        this.innerHTML = uncompletedSvg;
        completed.appendChild(item)
        item.querySelector('h3').classList.add('line-through');
        tasks.todo.splice(tasks.todo.indexOf(`${h3} do`), 1);
        
    } else{
        tasks.todo.push(`${h3} do`)
        todos.appendChild(item)
        item.querySelector('h3').classList.remove('line-through');
        this.innerHTML = completeSvg;
        tasks.completed.splice(tasks.completed.indexOf(`${h3} ed`), 1);
    }

    checkIsEmpty();
}

function renderTasks(){
    while (todos.children.length > 2) {
        todos.removeChild(todos.lastChild);
    }
    
    while (completed.children.length > 2) {
        completed.removeChild(completed.lastChild);
    }
    
    tasks.todo.forEach(task => {
        addTodo(task.slice(0, -3), 'todo')
    });
    
    tasks.completed.forEach(task => {
        addTodo(task.slice(0, -3), 'completed')
    });

    checkIsEmpty();
}