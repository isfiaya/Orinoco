'use strict';

/**
 * - Get cartItems from localstorage
 * - Display each cartItem in a <tr>
 * - Quantity input in each row should increase each item price
 * - User can remove cart item
 * - Calculate total cartItems price (Should run each time a product quanity input changes or if a cart item was deleted)
 * - Checkout Form
 */
let products = new Array();
let submitButton = document.getElementById('btnsubmit');

function init() {
  showCartItems();
  calculateTotalCartPrice();
}

function showCartItems() {
  const cartItemsWrapper = document.getElementById('cart_items');
  let cartArray = JSON.parse(localStorage.getItem('cart'));

  // Empty current items
  cartItemsWrapper.innerHTML = '';
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

    // Get each cart item values
    nameCell.innerHTML = cartArray[i].name;
    lenseCell.innerHTML = cartArray[i].selectLenses;
    priceCell.innerHTML = (cartArray[i].price * cartArray[i].quantity) + ' $';
    imgCell.setAttribute('src', cartArray[i].imageUrl);

    btnRemove.innerHTML = `<button class="btn-del" id='remove' onclick='removeItem(${i})'>X</button>`;
    qunatity.innerHTML = `<input type="number" id="quantity" name="quantity" min="1" value ="${cartArray[i].quantity}" class="quantity" onclick="changeQuantity(${i}, event.target.value)">`;

    divName.append(imgCell, nameCell);
    divName.classList.add('divImage');

    // Create cart item row & add it to table
    tr.append(divName, lenseCell, qunatity, priceCell, btnRemove);
    cartItemsWrapper.appendChild(tr);
  }
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
    let productPrice = cartArray[i].price * cartArray[i].quantity;
    totalCartPrice += productPrice;
  }

  total.innerHTML = totalCartPrice + " $";
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





init();





// // btn Remove Item
// let remove = document.getElementById('remove')
// remove.addEventListener('click', () => {
//   // let i = remove.parentElement.parentElement;  // return tr
//   // cartArray.splice(i, 1);

// });


// POST DATA FROM USER 
// ADD event to the button submit
// submitButton.addEventListener('click', ($event) => {
//   $event.preventDefault();
//   // DOM ELEMENT REFERENCES

//   let firstName = document.getElementById('first-name');
//   let lastName = document.getElementById('Last-name');
//   let mailAddress = document.getElementById('E-mail');
//   let address = document.getElementById('address');
//   let city = document.getElementById('City');
//   let contact = {
//     firstName: firstName.value,
//     lastName: lastName.value,
//     email: mailAddress.value,
//     address: address.value,
//     city: city.value,
//   };
//   let cartArray = JSON.parse(localStorage.getItem('cart'));
//   let allInfo = {
//     contact: contact,
//     products: cartArray,
//   };
//   submitFormData(allInfo);
// });

/**
 * Send inforamtion from user to api
 */
// function makeRequest(data) {
//   return new Promise((resolve, reject) => {
//     let request = new XMLHttpRequest();
//     request.open('POST', 'http://localhost:3000/api/cameras/order');
//     request.onreadystatechange = () => {
//       if (request.readyState === 4 && request.status === 201) {
//         resolve(JSON.parse(request.response));
//       } else {
//         reject(JSON.parse(request.response));
//       }
//     };
//     request.setRequestHeader('Content-type', 'application/json');
//     request.send(JSON.stringify(data));
//   });
// };

// async function submitFormData(allInfo) {
//   try {
//     const requestPromise = makeRequest(allInfo);
//     const response = await requestPromise;
//     console.log(response);
//   } catch (errorResponse) {
//     console.log('err');
//   }
// }