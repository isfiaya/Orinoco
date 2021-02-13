'use strict';

let productsContainer = document.getElementById('products');
let url = 'http://localhost:3000/api/cameras';


async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    // Cache Product Values
    let productId = data[i]._id;
    let name = data[i].name;
    let description = data[i].description;
    let price = data[i].price;
    let imageUrl = data[i].imageUrl;

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
							<h2>${name}</h2>
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

getProducts()
addNumCart();

