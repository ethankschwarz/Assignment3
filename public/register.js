//Ethan Schwarz
// Extract parameters from the URL
let params = (new URL(document.location)).searchParams;

// Initialize an empty array to store product order
let order = [];

// For each parameter in the URL, check if it corresponds to a product ('prod') and push its value to the array
params.forEach((value, key) => {
    if (key.startsWith('prod')) {
        order.push(parseInt(value));
    }
});

// Uncomment the line below to log the JSON representation of the order array
// console.log(JSON.stringify(order));

// Get the error message from the URL, and if it's not empty or null, display it
let error = params.get('error');
if (error !== null && error !== '') {
    document.getElementById('errorMessages').innerHTML += `<div id="errorMessages" class="alert alert-danger">${error}</div>`;
}

// Get additional parameters (fullName, username) from the URL and make the values sticky in the form
let fullName = params.get('fullName');
let username = params.get('username');

if (username !== null) {
    document.getElementById('email').value = username;
}

if (fullName !== null) {
    document.getElementById('fullName').value = fullName;
}

// Set the value of hidden input fields to the JSON representation of the order array
document.getElementById('orderParams').value = JSON.stringify(order);
document.getElementById('orderReg').value = JSON.stringify(order);

// Uncomment the line below to log the JSON representation of the order array
// console.log(document.getElementById('orderParams').value);
