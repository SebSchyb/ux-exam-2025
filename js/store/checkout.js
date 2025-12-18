import { getCartByUser, checkoutCart, currency } from "./utils.js";

const SHIPPING_COST = 67;

function renderCheckoutItems() {
	const container = document.querySelector("#checkout-items");
	const itemTemplate = document.querySelector("#checkout-item-template");
	const summaryTemplate = document.querySelector(
		"#checkout-summary-template"
	);

	// console.log({ container, itemTemplate, summaryTemplate });

	if (!container || !itemTemplate || !summaryTemplate) {
		console.error(
			"Missing #checkout-items or templates in the HTML (or script loaded too early)."
		);
		return;
	}

	const authUser = localStorage.getItem("userEmail") || "guest";

	const { cart } = getCartByUser(authUser);
	console.log("Cart:", cart);

	container.innerHTML = "";

	if (!cart.length) {
		container.textContent = "Your shopping basket is empty.";
		return;
	}

	let itemsTotal = 0;

	cart.forEach((product) => {
		const clone = itemTemplate.content.cloneNode(true);

		const lineTotal = product.price * product.quantity;
		itemsTotal += lineTotal;

		clone.querySelector(".title").textContent = product.title;
		clone.querySelector(
			".quantity"
		).textContent = `Qty: ${product.quantity}`;
		clone.querySelector(".price").textContent = currency(lineTotal);

		container.appendChild(clone);
	});

	const summaryClone = summaryTemplate.content.cloneNode(true);
	summaryClone.querySelector(
		".items-total"
	).textContent = `Items total: ${currency(itemsTotal)}`;
	summaryClone.querySelector(".shipping").textContent = `Shipping: ${currency(
		SHIPPING_COST
	)}`;
	summaryClone.querySelector(".grand-total").textContent = `Total: ${currency(
		itemsTotal + SHIPPING_COST
	)}`;

	container.appendChild(summaryClone);
}

window.addEventListener("DOMContentLoaded", renderCheckoutItems);

document.querySelector("#checkout-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const authUser = localStorage.getItem("userEmail") || "guest";
	checkoutCart(authUser);

	alert("success");
	window.location.replace("/index.html");
});
