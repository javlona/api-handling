let loadButton = document.querySelector('#btn'),
    nameList = document.querySelector('#nameList');

// fetched users in localStorage
    let userStorage;

// fetched todos in localStorage
    let todosStorage;


// locale storage shortcuts
let storage = {
    add: function(key, value){
        return localStorage.setItem(key, JSON.stringify(value))
    },
    get: function(key){
        return JSON.parse(localStorage.getItem(key))
    },
    remove: function(key){
        localStorage.removeItem(key)
    }
};


function mainAction() {
    
    fetchDataToStorage()
    fetchTodos()
    addTodosToLocalStorage()

}

// fetch users from api to localStorage
function fetchDataToStorage() {
    nameList.innerHTML = ""
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(result => result.json())
        .then(data => {

            // fetched users is stored to localStorage
            storage.add('users', data)
            userStorage = storage.get('users')

            // render users to DOM from localStorage
            let tr;
            userStorage.forEach(user => {
                tr = `
                <td><a href="todo.html" target="_blank" onclick="selectUser(${user.id})">${user.name}</a></td>
                <td>${user.website}</td>
                <td>${user.phone}</td>
                <td>${user.address.city}</td>
                <td>${user.email}</td>
                `
                nameList.innerHTML += tr
            })
        })
        .catch(err => console.log(err, "error"))
}

// fetch todos from api to localStorage
async function fetchTodos() {
    let url = 'https://jsonplaceholder.typicode.com/todos'

    try {
        let response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function addTodosToLocalStorage() {
    let response = await fetchTodos()
    
    // fetched todos is stored to localStorage
    storage.add('todos', response)
    todosStorage = storage.get('todos')
    
}

function getUsersTodos(todosStorage, id) {
    let result = []
    for(let todo of todosStorage){
        if(todo.userId === id)
        result.push(todo)
    }
    return result

}

// 
function selectUser(id) {
   
    let current = getUsersTodos(todosStorage, id)
    storage.add('currentTodo', current)

    console.log(id)
}


loadButton.addEventListener('click', mainAction)