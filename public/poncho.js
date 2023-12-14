//Ethan Schwarz
// Set up parameters from the URL, order array, and error value
let params = (new URL(document.location)).searchParams;
let error;

// Shows type (product type) (helped by Reyn regarding placing products in respective sites)
let type = 'box';

// Get if there was an error before
error = params.get('error');

// Store name for display and form value
let storeName = 'poncho';
document.getElementById('storeName').value += storeName;

// Gets cookie parameters
let signin = decodeURIComponent(getCookieValue('signIn'));
let username = decodeURIComponent(getCookieValue('username')); // Replace with your logic to get the username
let fullName = decodeURIComponent(getCookieValue('fName'));

// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // If signed in, replace the Sign In link with a Sign Out button
    if (signin == 'true') {
        document.getElementById("loginPlaceholder").innerHTML = 
            `<form id="signOutForm" action="signOutKeepCart" method="POST">
            <button type="submit" class="text-button">Sign Out</button>
            </form>`;
    }
});

// Gets more parameters, if null or 0, fill them in
let cards = decodeURIComponent(getCookieValue('card'));
let mat = decodeURIComponent(getCookieValue('mat'));
let boxes = decodeURIComponent(getCookieValue('box'));

// Handle cases where the cookie values are null
if(cards == 'null'){
    cards = '0,0,0,0,0,0';
}
if(boxes == 'null'){
    boxes = '0,0,0,0,0,0';
}
if(mat == 'null'){
    mat = '0,0,0,0,0,0';
}

console.log(cards + ","+ mat);

// Append strings and create arrays
let totalString = boxes + "," + cards + "," + mat;
let arrayString = totalString.split(",");
var order = arrayString.map(function(item) {
    return +item;
});
console.log(order);

// Calculate the total quantity in the cart
var numInCart = order.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);

// Display the total quantity in the cart
document.getElementById('cartText').innerHTML = `View Cart (${numInCart})`;

// Gets parameters from the URL
let totalOnline = params.get('totalOnline');

// Puts the fullName in the field
document.getElementById('fullNameHere').value = fullName;
document.getElementById('type').value = type;

// Checks if the username is not empty; if there is a username, populate it all and disable buttons
if(username !== null && fullName !== '' && fullName !== 'null' && signin=='true'){
    // Disable buttons
    
    // Sets the welcomeDiv and adds the image and message depending on size 
    document.getElementById('WelcomeDiv').innerHTML += `<h3 class="text">Welcome ${fullName}!</h3>`;
    document.getElementById('percyImage').innerHTML += `<img src="./images/PercyStore.png" alt="Product Image" width="250" height="250">`;
    
    // Fill hidden value
    document.getElementById('usernameEntered').value = username;
}

// Gets overflow parameter from URL
overflow = decodeURIComponent(params.get('overflow'));
console.log(overflow);
console.log(overflow !== 'null' && overflow !== null && typeof(overflow) !== null);

// If there is an error submitted, then show the error text in errorDiv
if(error == 'true'){
    document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">Input Error - Please Fix!</h2><br>`;
}

// If there is overflow or overflow is not null or undefined, display the overflow message in errorDiv
if(overflow == '' || (overflow !== 'null' && overflow !== null && typeof(overflow) !== null)){
    console.log('here');
    document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">${overflow}</h2><br>`;
}

/*
For every product in the array:
    Create a card with the image on top
    Fill the card body with the title of the card found in products[i], so with price, aval, and total sold

    Create an input that on input validates the quantity, a placeholder value of 0 
        The initial value found in the box can be populated if there is anything but 0 or undefined in the order array for that position
    Create an area to define errors
    Run the validation to populate errors just in case an initial value is passed
*/
for (let i = 0; i < products.length; i++) {
    if(type == products[i]['type']){
        document.querySelector('.row').innerHTML += 
            `<div class="col-md-6 product_card mb-4">
            <div class="card">
                <div class="text-center">
                    <img src="${products[i].image}" class="card-img-top border-top imgBox" alt="Product Image">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${products[i].card}</h5>
                    <p class="card-text">
                        Price: $${(products[i].price).toFixed(2)}<br>
                        Available: ${products[i].qty_available}<br>
                        Total Sold: ${products[i].total_sold}<br>
                        In Cart: ${order[i]}
                    </p>
                    
                    <input type="text" placeholder="0" name="quantity_textbox" id="${[i]}" class="form-control mb-2" oninput="validateQuantity(this)" onload="validateQuantity(this)" style="border-color: black;">
                    <p id="invalidQuantity${[i]}" class="text-danger"></p>
                        <div class="d-flex justify-content-center">
                            <input type="submit" value="Add to Cart" class="btn btn-secondary">
                        </div>
                    </div>
                </div>
            </div>`;
        validateQuantity(document.getElementById(`${[i]}`));
    }
}

// Runs to generate a validation message
function validateQuantity(quantity) {
    // Set variables and grab the number from the quantity and set it to a number
    let valMessage = '';
    let quantityNumber = Number(quantity.value);
    let inputElement = document.getElementById(quantity.id);

    // Reset the border color to black before performing validation
    inputElement.style.borderColor = "black";

    // Check for validation errors and set the border color to red if an error is found
    if (isNaN(quantityNumber)) {
        valMessage = "Please Enter a Number";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber < 0 && !Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter a Positive Integer";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber < 0) {
        valMessage = "Please Enter a Positive Value";
        inputElement.style.borderColor = "red";
    } else if (!Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter an Integer";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber > products[quantity.id]['qty_available']) {
        valMessage = "We Do Not Have " + quantityNumber + " Available!";
        inputElement.style.borderColor = "red";
        inputElement.value = products[quantity.id]['qty_available'];
    } else {
        valMessage = '';
    }

    // Set the valMessage to the innerHTML of the section
    document.getElementById(`invalidQuantity${quantity.id}`).innerHTML = valMessage;
}

// Function to get cookie value by name
function getCookieValue(cookieName){
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
        let cookiePair = cookies[i].trim().split('=');
        if(cookiePair[0] === cookieName){
            return cookiePair[1]
        }
        
    }
    return null;
};
