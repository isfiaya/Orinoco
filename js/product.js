'use strict';

// DOM ELEMENT REFERENCES
let nameElem = document.querySelector('h2');
let imageElem = document.getElementById('picture');
let priceElem = document.getElementById('price');
let descElem = document.getElementById('desc');
let select = document.getElementById('camera')
const btnAddToCart = document.getElementById('btnAddToCart');
//
let product = {};


function init() {
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


// Put Product Data To The LocalStorage
btnAddToCart.addEventListener('click', () => {
  let cartItems = [];
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(localStorageContent);
  }
  let singleProduct = {
    imageUrl: product.imageUrl,
    price: product.price,
    name: product.name,
    selectLenses: select.value,
    quantity: 1
  };
  cartItems.push(singleProduct);
  localStorage.setItem('cart', JSON.stringify(cartItems));
});

// Calling
init();
