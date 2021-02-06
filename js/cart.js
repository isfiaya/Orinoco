'use strict';

const cartItemsWrapper = document.getElementById('cart_items');
let cartArray = JSON.parse(localStorage.getItem('cart'));
console.log(cartArray);
for (let i = 0; i < cartArray.length; i++) {
  let tr = document.createElement('tr');

  let nameCell = document.createElement('p');
  let lenseCell = document.createElement('td');
  let priceCell = document.createElement('td');
  let btnRemove = document.createElement('td');
  let imgCell = document.createElement('img');
  let divName = document.createElement('td');
  let qunatity = document.createElement('td');

  //
  nameCell.innerHTML = cartArray[i].name;
  lenseCell.innerHTML = cartArray[i].selectLenses;
  priceCell.innerHTML = cartArray[i].price + ' $';
  btnRemove.innerHTML = `<button class="btn-del" id='remove'>X</button>`;
  qunatity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value="1" class="quantity">`
  imgCell.setAttribute('src', cartArray[i].imageUrl);

  divName.append(imgCell, nameCell);
  divName.classList.add('divImage');
  tr.append(divName, lenseCell, qunatity, priceCell, btnRemove);

  cartItemsWrapper.appendChild(tr);
}
// // btn Remove Item
let remove = document.getElementById('remove')
remove.addEventListener('click', () => {
  // let i = remove.parentElement.parentElement;  // return tr
  // cartArray.splice(i, 1);

});


// Total price 
let inputQun = document.getElementById('quantity').value;
console.log(inputQun);
let total = document.getElementById('total');
let totalPrice = 0;
let itemTotal;
for (let i = 0; i < cartArray.length; i++) {
  itemTotal = cartArray[i].price * inputQun;
  totalPrice += itemTotal;
}
total.innerHTML = totalPrice + '    $';





console.log(cartArray);