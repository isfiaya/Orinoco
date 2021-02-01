'use strict';

const cartItemsWrapper = document.getElementById('cart_items');
let cartArray = JSON.parse(localStorage.getItem('cart'));

for (let i = 0; i < cartArray.length; i++) {
    let tr = document.createElement('tr');

    let nameCell = document.createElement('td');
    let lenseCell = document.createElement('td');
    let priceCell = document.createElement('td');

    nameCell.innerHTML = cartArray[i].name;
    lenseCell.innerHTML = cartArray[i].lenses;
    priceCell.innerHTML = cartArray[i].price;

    tr.append(nameCell, lenseCell, priceCell);

    cartItemsWrapper.appendChild(tr);
}

console.log(cartArray);