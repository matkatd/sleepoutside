import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParam, setCartIndicator } from "./utils.js";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
setCartIndicator();
product.init();
