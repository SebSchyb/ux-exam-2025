import { getItemById } from "./api.js";
import {
	renderSingleItem,
	renderItemList,
	addToCart,
	loadCartProducts,
	displayCart,
} from "./modules.js";
import { isSingleProduct } from "./variables.js";

// Get URL for item ID and render item
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let product;

if (isSingleProduct && id) {
	product = await getItemById(id).then(renderSingleItem);
} else {
	await renderItemList("/products");
}

const ShoppingBasketOpenButton = document.querySelector(
	"#shoppingCartOpenButton"
);
const CartButton = document.querySelector("#addToCart");

ShoppingBasketOpenButton.addEventListener("mousedown", displayCart);
CartButton.addEventListener("mousedown", () => {
	addToCart(product);
	displayCart();
});
