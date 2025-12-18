import { getItemById } from "./api.js";
import {
	renderSingleItem,
	renderItemList,
	addToCart,
	displayCart,
} from "./modules.js";
import { isSingleProduct } from "./variables.js";

// Get URL for item ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const category = params.get("category");
let product;

if (isSingleProduct && id) {
	product = await getItemById(id).then(renderSingleItem);

	const CartButton = document.querySelector("#addToCart");

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

async function generateProductBreadcrumbs(product, category) {
	const container = document.querySelector("#breadcrumbscontainer");
	// const product = await getItemById(id);
	const innerProduct = product;
	console.log(innerProduct, category);
	container.innerHTML = `
    <li><a href="/">Home</a></li>
    <li><a href="/shop.html">Shop</a></li>
  `;

	if (!innerProduct && category) {
		container.innerHTML += `
      <li aria-current="page">${category}</li>
    `;
		return;
	}

	// const product = products[productId];

	container.innerHTML += `
    <li>
      <a href="/shop.html?category=${innerProduct.category}">
        ${innerProduct.category}
      </a>
    </li>
    <li aria-current="page">${innerProduct.title}</li>
  `;
}

const page = window.location.pathname;

if (page.includes("product.html") || page.includes("shop.html")) {
	generateProductBreadcrumbs(product, category);
}
