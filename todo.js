let todoList = document.querySelector('#todoList')
let userName = document.querySelector('#userName')

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

function showTodos(){
    let users = storage.get("users")
    let data = storage.get("currentTodo")

    let li;
    data.forEach(todo => {
        li = `<li class="collection-item">${todo.title}</li>`

        todoList.innerHTML += li
    })
    console.log(data)

    let name = users[data[0].userId - 1].name
    
    userName.innerHTML = name
}

this.addEventListener('load', showTodos)