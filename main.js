'use strict';

let bank = [];

const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];

const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));

const newItem = (task, status, index)=>{
    const item = document.createElement('label')
    item.classList.add ("todo__item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const taskClean = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}


const refreshScreen = () => {
    taskClean()
    const bank = getBank();
    bank.forEach((item, index) => newItem (item.task, item.status, index)); 
}

const addTask = (event) => {
    const key = event.key;
    const text = event.target.value;
    if (key === 'Enter'){
        const bank = getBank();
        bank.push({'task': text, 'status': ''})
        setBank(bank);
        refreshScreen();
        event.target.value = '';
    }
}

const removeTask = (index) => {
    const bank = getBank();
    bank.splice(index, 1);
    setBank(bank);
    refreshScreen();
}

const updateTask = (index) => {
    const bank = getBank();
    bank[index].status = (bank[index].status=== '' ? 'checked' : '');
    setBank(bank);
    refreshScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeTask(index);
    }else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateTask(index);
    }
}


document.getElementById('newItem').addEventListener('keypress', addTask);
document.getElementById('todoList').addEventListener('click', clickItem)


refreshScreen();
