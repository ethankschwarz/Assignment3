
//login stuff
let signin = decodeURIComponent(getCookieValue('signIn'));
let username = decodeURIComponent(getCookieValue('username')); 
let fullName = decodeURIComponent(getCookieValue('fName'));

//replaces log in button with sign out
document.addEventListener("DOMContentLoaded", function() {
    

    if (signin == 'true') {
        document.getElementById("loginPlaceholder").innerHTML = 
            `<form id="signOutForm" action="signOutKeepCart" method="POST">
            <button type="submit" class="text-button">Sign Out</button>
            </form>`;
    }
});

//same as store and others
let cards = decodeURIComponent(getCookieValue('card'));
let mat = decodeURIComponent(getCookieValue('mat'));
let boxes = decodeURIComponent(getCookieValue('box'));
console.log(cards + ","+ mat);
console.log(mat);
if(cards == 'null'){
    console.log('cardsBad');
    cards = '0,0,0,0,0,0';
}
if(boxes == 'null'){
    console.log('cardsBad');
    boxes = '0,0,0,0,0,0';
}
if(mat == 'null'){
    console.log('cardsBad');
    mat = '0,0,0,0,0,0';
}
let totalString = boxes + ","+cards+","+mat;
let arrayString = totalString.split(",");
var order = arrayString.map(function(item) {
    return +item;
});
console.log(order);
var numInCart = order.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
//tracks cart size
document.getElementById('cartText').innerHTML = `View Cart (${numInCart})`;
let params = (new URL(document.location)).searchParams;
let thankYouMessage = params.get('thankYou');

//fills in the welcomeDiv
if(username !== null && fullName !== '' && fullName !== 'null' && signin == 'true'){
    //disable buttons
    
    //sets the welcomeDiv, and adds the image and message depending on size 
    document.getElementById('WelcomeDiv').innerHTML += `<h3 class="text">Welcome ${fullName}!</h3>`;
    
    //fill hidden value
    document.getElementById('usernameEntered').value = username;

}

//if the thankyou message appears, that means they finalized the purchase. show the modal
if(thankYouMessage == 'true'){
    console.log(thankYouMessage);
    $(document).ready(function(){
        $("#thanksModal").modal('show');
    });
}

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

