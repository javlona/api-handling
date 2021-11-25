let loadButton = document.querySelector('#btn'),
    nameList = document.querySelector('#nameList');

loadButton.addEventListener('click', getTable)

function getTable() {
    nameList.innerHTML = ""
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(result => result.json())
        .then(data => {
            let row;
            data.forEach(user => {
                row = `
                <td>${user.name}</td>
                <td>${user.website}</td>
                <td>${user.phone}</td>
                <td>${user.city}</td>
                <td>${user.email}</td>
                `
                nameList.innerHTML += row
            })
        })
        .catch(err => console.log(err, "error"))
}