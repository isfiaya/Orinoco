'use strict';

// DOM ELEMENT REFERENCES
let nameElem = document.querySelector('h1');
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
      console.log(product);
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
  let priceString = data.price.toString();
  let price = priceString.substring(0, 3);
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
  addNumCart()
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
    prodId: product._id,
    quantity: 1
  };
  cartItems.push(singleProduct);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  document.getElementById('confirme-feedback').innerHTML = `Added to cart. <a href='cart.html'>View Cart</a>`
  addNumCart()
});


// budget cart 
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  let cartItemsArray = JSON.parse(localStorageContent);
  let cartNum = document.getElementById('cartNum');
  cartNum.innerHTML = cartItemsArray.length;
}
// Calling
init();
