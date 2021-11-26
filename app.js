let loadButton = document.querySelector('#btn'),
    nameList = document.querySelector('#nameList');

// event handlers
loadButton.addEventListener('click', getTable)


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


// fetch api
function getTable() {
    nameList.innerHTML = ""
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(result => result.json())
        .then(data => {
            storage.add('users', data)
            

            let row;
            data.forEach(user => {
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