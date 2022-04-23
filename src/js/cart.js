import {
  setCartIndicator,
  getLocalStorage,
  setLocalStorage,
  getRandomArbitrary,
} from "./utils.js";

function getCartContents() {
  let markup = "";
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null) return;
  const htmlItems = cartItems.map((item) => renderCartItem(item[0]));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelector(".cart-total").innerHTML = `$${calcTotalCost()}`;
  addDeleteListeners();
  setCartIndicator();
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function calcTotalCost() {
  const cartItems = getLocalStorage("so-cart");
  let totalCost = 0;
  cartItems.forEach((element) => {
    totalCost += element[0].FinalPrice;
  });
  return totalCost;
}

function addDeleteListeners() {
  const items = document.querySelectorAll(".cart-card span"); // grab all the remove buttons
  items.forEach((e) => {
    // console.log(e.getAttribute("data-id"));
    // const thing = e.getAttribute("data-id");
    // const remove = document.querySelector(`[data-id = '${thing}]'`);

    e.addEventListener("click", () => {
      // Add event listeners to each remove button
      const cartItems = getLocalStorage("so-cart"); // Grab the cart
      const newCart = cartItems.filter((element) => {
        // console.log(element[0].Id);
        if (element[0].Id !== e.dataset.id) {
          // If the element in cart has the same id as the element clicked, get rid of it
          // FIXME: So if there are multiple of the same item in the cart, when you remove one, it removes all of them
          return true;
        }
      });
      setLocalStorage("so-cart", newCart);
      getCartContents();
    });
  });
}

function renderCartItem(item) {
  const rand = getRandomArbitrary(1, 500);
  const newItem = `<li class="cart-card divider">
  
  <a href="/product_pages/product-details.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  
  <a href="/product_pages/product-details.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span data-id="${item.Id}">X</span>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
