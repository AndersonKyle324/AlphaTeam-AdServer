// using async/await

async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await res.json();
    let output = '';
    
    data.forEach((obj) => {
        output += `<li>${obj.name}</li>`;
    })

    document.body.innerHTML = output;
}

fetchUsers();