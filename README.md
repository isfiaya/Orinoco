# Orinoco

_Build an eCommerce Website_

[hosted online on GitHub Pages](https://isfiaya.github.io/Orinoco/)

### ARCHITECTURE

- A list view page, showing all items available for sale.
- A single product page (using URL query parameters), which will dynamically show the item selected by the user, display a description and price in dollars, and allow users to personalize the product and add it to their cart.
- A cart page (using the localStorage JavaScript functionality), showing a summary of products in the cart, the total price, and a form with which to submit an order
- An order confirmation page, thanking the user for their order, showing the total price and the order ID returned by the server.

### DATA VALIDATION

For POST routes, the contact object sent to the backend contain firstName, lastName, address, city and email fields (all required). The products array sent to the backend an array of product \_id strings. The type and presence of these fields validated before being sent to the server.

the single item page will have a dropdown menu allowing the user to choose a personalization option
