// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  callback
) {
  list.forEach((product) => {
    const clone = template.content.cloneNode(true);
    const readyTemplate = callback(clone, product);
    parentElement.appendChild(readyTemplate);
  });
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function setCartIndicator() {
  const cartItems = getLocalStorage("so-cart");
  let numProducts = 0;
  const cartIndicator = document.querySelector(".cart-indicator");
  if (cartItems == null || cartItems.length === 0) {
    cartIndicator.style.display = "none";
    return;
  }
  numProducts = cartItems.length;

  cartIndicator.innerHTML = numProducts;
  cartIndicator.style.display = "block";
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
