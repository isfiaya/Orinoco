'use strict';
// DOM ELEMENT REFERENCES
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('Last-name');
let mailAddress = document.getElementById('E-mail');
let address = document.getElementById('address');
let city = document.getElementById('City');
let invalidFeedback = document.querySelectorAll("p.invalid-feedback");
let submitButton = document.getElementById('btnsubmit');
// initialise Validation Boolean TO False
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isAddressValid = false;
let isCityValid = false;



/**
 * - Get cartItems from localstorage
 * - Display each cartItem in a <tr>
 * - Quantity input in each row should increase each item price
 * - User can remove cart item
 * - Calculate total cartItems price (Should run each time a product quanity input changes or if a cart item was deleted)
 * - Checkout Form
 */


let orderId;

function init() {
  showCartItems();
  calculateTotalCartPrice();
}

function showCartItems() {
  const cartItemsWrapper = document.getElementById('cart_items');
  let cartArray = JSON.parse(localStorage.getItem('cart'));

  // Empty current items
  cartItemsWrapper.innerHTML = '';

  for (let i = 0; i < cartArray.length; i++) {
    let tr = document.createElement('tr');

    let nameCell = document.createElement('p');
    let lenseCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let btnRemove = document.createElement('td');
    let imgCell = document.createElement('img');
    let divName = document.createElement('td');
    let qunatity = document.createElement('td');

    //convert number
    let priceString = cartArray[i].price.toString();
    let price = priceString.substring(0, 3);
    let priceNum = parseInt(price);

    // Get each cart item values
    nameCell.innerHTML = cartArray[i].name;
    lenseCell.innerHTML = cartArray[i].selectLenses;
    priceCell.innerHTML = (priceNum * cartArray[i].quantity) + ' $';
    imgCell.setAttribute('src', cartArray[i].imageUrl);

    btnRemove.innerHTML = `<button class="btn-del" id='remove' onclick='removeItem(${i})'>REMOVE</button>`;
    qunatity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${cartArray[i].quantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

    divName.append(imgCell, nameCell);
    divName.classList.add('divImage');

    // Create cart item row & add it to table
    tr.append(divName, lenseCell, qunatity, priceCell, btnRemove);
    cartItemsWrapper.appendChild(tr);
  }
  emptyCart()
  addNumCart()
}

function changeQuantity(index, value) {
  let cartArray = JSON.parse(localStorage.getItem('cart'));
  cartArray[index].quantity = parseInt(value);
  localStorage.setItem('cart', JSON.stringify(cartArray));
  // Re-render....
  showCartItems();
  // Re-calculate
  calculateTotalCartPrice();
}

function calculateTotalCartPrice() {

  let cartArray = JSON.parse(localStorage.getItem('cart'));
  let total = document.getElementById('total');
  let totalCartPrice = 0;

  for (let i = 0; i < cartArray.length; i++) {
    // Convert number
    let priceString = cartArray[i].price.toString();
    let price = priceString.substring(0, 3);
    let priceNum = parseInt(price);
    let productPrice = priceNum * cartArray[i].quantity;
    totalCartPrice += productPrice;
  }

  total.innerHTML = totalCartPrice + " $";
  sessionStorage.setItem('Total', JSON.stringify(totalCartPrice));
}


function removeItem(index) {
  let cartArray = JSON.parse(localStorage.getItem('cart'));
  cartArray.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartArray));
  // Re-render....
  showCartItems();
  // Re-calculate
  calculateTotalCartPrice();
}
// POST DATA FROM USER 
// ADD event to the button submit
submitButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  let products = [];

  //get id prod and push it in array
  let cartArray = JSON.parse(localStorage.getItem('cart'));
  for (let i = 0; i < cartArray.length; i++) {
    products.push(cartArray[i].prodId);
  }
  console.log(products);
  // Object stores informations from form
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: mailAddress.value,
    address: address.value,
    city: city.value,
  }
  let data = {
    contact: contact,
    products: products,
  }

  console.log(data);
  if (isFirstNameValid && isLastNameValid && isEmailValid && isAddressValid && isCityValid) {
    makeRequest(data);
    // location.replace('confirmation.html');
  } else {
    for (let i = 0; i < invalidFeedback.length; i++) {
      invalidFeedback[i].style.display = 'block';
    }
  }
});

/**
 * Send inforamtion from user to api
 */
function makeRequest(data) {
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);

    orderId = data.orderId;
    sessionStorage.setItem("orderId", orderId);

    location.replace('confirmation.html');

  }).catch((err) => {
    console.log(err);
  })
};


//firstName Validation
firstName.addEventListener('blur', () => {
  const regName = /^[a-zA-Z]+$/;
  if (!regName.test(firstName.value)) {
    firstName.style.border = 'red solid 2px';
    return false;
  }
  else {
    firstName.style.border = 'green solid 2px';
    isFirstNameValid = true;
  }
})
//lasName Validation
lastName.addEventListener('blur', () => {
  const regName = /^[a-zA-Z]+$/;
  if (!regName.test(lastName.value)) {
    lastName.style.border = 'red solid 2px';
    return false;
  }
  else {
    lastName.style.border = 'green solid 2px';
    isLastNameValid = true;
  }
})
//mailAddress Validation
mailAddress.addEventListener('blur', () => {
  const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (!regEmail.test(mailAddress.value)) {
    mailAddress.style.border = 'red solid 2px';
    return false;
  }
  else {
    mailAddress.style.border = 'green solid 2px';
    isEmailValid = true;
  }
})
//adress Validation
address.addEventListener('blur', () => {
  const regAddress = /^\s*\S+(?:\s+\S+){2}/;
  if (!regAddress.test(address.value)) {
    address.style.border = 'red solid 2px';
    return false;
  }
  else {
    address.style.border = 'green solid 2px';
    isAddressValid = true;
  }
})
//city Validation
city.addEventListener('blur', () => {
  const regName = /^[a-zA-Z]+$/;
  if (!regName.test(city.value)) {
    city.style.border = 'red solid 2px';
    return false;
  }
  else {
    city.style.border = 'green solid 2px';
    isCityValid = true;
  }
})


// budget cart 
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let cartNum = document.getElementById('cartNum');
  cartNum.innerHTML = cartItemsArray.length;
}

//show empty bag when cart egal 0
function emptyCart() {
  let container = document.getElementById('container');
  let cartArray = JSON.parse(localStorage.getItem('cart'));
  if (cartArray.length === 0) {
    container.innerHTML = `<div class="emptyCart">
<div class="emptyCart-img">
<img src="images/emptyCart.png" alt="empty cart">
</div>
<div>
  <h1>Hey, it feels so light!</h1>
  <p>There is nothing in your Cart. let's add some items.</p>
  <button>Start Shopping</button>
</div>
</div>`;
  }
}

init();