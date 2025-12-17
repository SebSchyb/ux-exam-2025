import { getItemById } from "./api.js";
import {
	renderSingleItem,
	renderItemList,
	addToCart,
	displayCart,
} from "./modules.js";
import { isSingleProduct } from "./variables.js";

// Get URL for item ID and render item
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let product;

if (isSingleProduct && id) {
	product = await getItemById(id).then(renderSingleItem);

	console.log(product);

	const CartButton = document.querySelector("#addToCart");

	console.log(CartButton);
	CartButton.addEventListener("click", () => {
		addToCart(product);
		displayCart();
	});
} else {
	await renderItemList("/products");
}

const ShoppingBasketOpenButton = document.querySelector(
	"#shoppingCartOpenButton"
);

ShoppingBasketOpenButton.addEventListener("click", displayCart);
