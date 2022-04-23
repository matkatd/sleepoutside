import ProductData from "./productData.js";
import ProductListing from "./productList.js";
import { setCartIndicator } from "./utils.js";

const dataSource = new ProductData("tents");
const productList = document.querySelector(".product-list");
const myList = new ProductListing("tents", productList, dataSource);
setCartIndicator();
myList.init();
