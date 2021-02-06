'use strict';
// DOM ELEMENT REFERENCES
let nameElem = document.querySelector('h2');
let imageElem = document.getElementById('picture');
let priceElem = document.getElementById('price');
let descElem = document.getElementById('desc');
let select = document.getElementById('camera')

//
let product = {}; // Get current 'cart' from localstorage as Array (IF EXISTS!)


function init() { // Initialize

  /**
   * 1. Get `id` query param
   * 2. Fetch single product data
   * 3. Display product data
   */

  let productId = getProductId();
  fetchSingleProduct(productId);
}

/**
 * Return product id from query param
 */
function getProductId() {
  const qureyString = window.location.search;
  const urlParam = new URLSearchParams(qureyString);
  const id = urlParam.get("id");
  return id;
}

/**
 * Fetch Single Product by Id 
 * @param {Number} id 
 */
function fetchSingleProduct(id) {
  fetch('http://localhost:3000/api/cameras/' + id)
    .then(response => response.json())
    .then(data => {
      product = data;
      showProduct(data);

    })
    .catch(err => console.log(err))
}
/**
 * Display single product data
 * @param {*} product - The single product to show
 */
function showProduct(data) {
  // Cache Data Values
  let name = data.name;
  let description = data.description;
  let price = data.price;
  let imageUrl = data.imageUrl;
  let lenses = data.lenses;

  imageElem.setAttribute('src', imageUrl);
  nameElem.innerHTML = name;
  priceElem.innerHTML = price + ` $`;
  descElem.innerHTML = description;

  // DORPDOWN LISTENER
  for (let i in lenses) {
    const newOption = document.createElement("option");
    newOption.textContent = lenses[i];
    select.appendChild(newOption);
  }

}

// Add event to the btn Add to cart 
const btnAddToCart = document.getElementById('btnAddToCart');
btnAddToCart.addEventListener('click', () => {

  const localStorageContent = localStorage.getItem('cart');
  let cartItems;
  ///
  if (localStorageContent === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorageContent);
  }
  cartItems.push({ imageUrl: product.imageUrl, price: product.price, name: product.name, selectLenses: select.value });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  // console.log('item added the cart');

});

// select.addEventListener('change', ($event) => {
//   const localStorageLenses = localStorage.getItem('cart');
//   let cartLenses;
//   if (localStorageLenses === null) {
//     cartLenses = [];
//   } else {
//     cartLenses = JSON.parse(localStorageLenses);
//   }
//   cartLenses.push($event.target.value);
//   localStorage.setItem('cartLenses', JSON.stringify(cartLenses));
//   console.log($event.target.value);

// })



// Calling
init();
