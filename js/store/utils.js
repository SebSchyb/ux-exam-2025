export function getCart() {
	const cart = localStorage.getItem("shopping_basket");
	return JSON.parse(cart);
}

export function currency(num) {
	return new Intl.NumberFormat("dk-DK", {
		style: "currency",
		currency: "DKK",
	}).format(num);
}
