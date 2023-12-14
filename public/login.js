//Ethan Schwarz
// Extract parameters from the URL
let params = (new URL(document.location)).searchParams;

// Array to store ordered product values
let order = [];

// Iterate over parameters, identify products, and push values to the order array
params.forEach((value, key) => {
    if (key.startsWith('prod')) {
        order.push(parseInt(value));
    }
});

// Get error message from URL parameters
let error = params.get('error');

// Check if there is an error message and display it in the 'errorMessages' element
if (error !== null && error !== '') {
    document.getElementById('errorMessages').innerHTML += `<div id="errorMessages" class="alert alert-danger">${error}</div>`;
}

// Get the username from the URL
let username = params.get('username');

// Make the username sticky by setting its value in the corresponding input field
document.getElementById('username').value = username;

// Set the value of hidden input fields with the JSON stringified order array
document.getElementById('orderInput').value = JSON.stringify(order);
document.getElementById('orderReg').value = JSON.stringify(order);
