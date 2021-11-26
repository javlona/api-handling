let loadButton = document.querySelector('#btn'),
    nameList = document.querySelector('#nameList');

// event handlers
loadButton.addEventListener('click', fetchDataToStorage)


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


let userStorage;

// fetch data from api to localStorage
function fetchDataToStorage() {
    nameList.innerHTML = ""
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(result => result.json())
        .then(data => {

            // fetched data is stored to localStorage
            storage.add('users', data)
            userStorage = storage.get('users')

            // render data to DOM from localStorage
            let row;
            userStorage.forEach(user => {
                row = `
                <td>${user.name}</td>
                <td>${user.website}</td>
                <td>${user.phone}</td>
                <td>${user.address.city}</td>
                <td>${user.email}</td>
                `
                nameList.innerHTML += row
            })
        })
        .catch(err => console.log(err, "error"))
}