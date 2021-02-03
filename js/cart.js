'use strict';

const cartItemsWrapper = document.getElementById('cart_items');
let cartArray = JSON.parse(localStorage.getItem('cart'));

for (let i = 0; i < cartArray.length; i++) {
    let tr = document.createElement('tr');

    let nameCell = document.createElement('td');
    let lenseCell = document.createElement('td');
    let priceCell = document.createElement('td');
    let btnRemove = document.createElement('td');

    nameCell.innerHTML = cartArray[i].name;
    lenseCell.innerHTML = cartArray[i].lenses;
    priceCell.innerHTML = cartArray[i].price + ' $';
    btnRemove.innerHTML = `<button class="btn-del" id='remove'>X</button>`;

    tr.append(nameCell, lenseCell, priceCell, btnRemove);

    cartItemsWrapper.appendChild(tr);
}
// // btn Remove Item
// let remove = document.getElementById('remove')
// remove.addEventListener('click', () => {
//     let i = this.parentNode.parentNode.rowIndex;
//     cartArray.splice(i, 1);

// });


// Total price 
let total = document.getElementById('total');
let totalPrice = 0;
for (let i = 0; i < cartArray.length; i++) {
    totalPrice += cartArray[i].price;
}
total.innerHTML = totalPrice + ' $';





console.log(cartArray);