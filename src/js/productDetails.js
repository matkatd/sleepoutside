import { setLocalStorage, getLocalStorage, setCartIndicator } from "./utils.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector("main").innerHTML = this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    if (!Array.isArray(this.product)) {
      this.product = [this.product];
    }
    let temp = getLocalStorage("so-cart");
    if (temp == null) {
      temp = [];
    }
    temp.push(this.product);
    setLocalStorage("so-cart", temp);
    setCartIndicator();
  }

  productDiscount(item) {
    const origPrice = item.SuggestedRetailPrice;
    const finalPrice = item.FinalPrice;
    const discount = (100 * finalPrice) / origPrice;
    return Math.round(100 - discount); // Get product discount to the nearest percentage
  }

  renderProductDetails() {
    return `
        <section class="product-detail">
            <h3>${this.product.Brand.Name}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img class="divider" src="${this.product.Image}" alt="${
      this.product.NameWithoutBrand
    }"/>
            <p class="product-card__price">$${
              this.product.FinalPrice
            } (${this.productDiscount(this.product)}% off)</p>
            <p class="product__color">${this.product.Colors[0].ColorName}</p>
            <p class="product__description">${
              this.product.DescriptionHtmlSimple
            }</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="${
                  this.product.Id
                }">Add to Cart</button>
            </div>
        </section>
      `;
  }
}
