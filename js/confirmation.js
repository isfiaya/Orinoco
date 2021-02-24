'use strict';
// DOM ELEMENT REFERENCES
let totalPrice = document.getElementById('total-price');
let btnBackToStore = document.getElementById('btnBack')
let orderId = document.getElementById('orderID')

// Shows total cost of order and order ID
totalPrice.innerHTML = sessionStorage.getItem('Total') + ' $';
orderId.innerHTML = sessionStorage.getItem('orderId')

// remove the item from localStorage and sessionStorage
btnBackToStore.addEventListener('click', () => {
    sessionStorage.removeItem("orderId");
    localStorage.removeItem("cart");
    location.replace('index.html');
})
