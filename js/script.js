'use strict';

let productsContainer = document.getElementById('products');
let url = 'http://localhost:3000/api/cameras';
let moveUpCursor = document.getElementById('move-up-cursor');


async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    // Cache Product Values
    let productId = data[i]._id;
    let name = data[i].name;
    let description = data[i].description;
    let priceString = data[i].price.toString();
    let price = priceString.substring(0, 3);
    let imageUrl = data[i].imageUrl;
    console.log(priceString);
    // Create & Append New Product
    let product = document.createElement('div');
    product.classList.add('col');

    product.innerHTML = `
				<a href="product.html?id=${productId}">
					<div class="product shadow">
						<img src="${imageUrl}" alt="Product Image">
						<button>
							<img src="images/add-to-basket.svg" alt="add-to-cart">
						</button>
						<div class="content">
							<h3>${name}</h3>
							<p class="desc">${description}</p>
							<span class="price">$ ${price}</span>
						</div>
					</div>
				</a>`;

    // console.log(typeof(product))
    productsContainer.appendChild(product);
  }
}

// budget cart 
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.getElementById('cartNum');
    cartNum.innerHTML = cartItemsArray.length;
  }
}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    moveUpCursor.style.display = "block";
  } else {
    moveUpCursor.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


getProducts()
addNumCart();

