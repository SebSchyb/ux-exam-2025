export function getCarts() {
	const cart = localStorage.getItem("shopping_basket");
	return JSON.parse(cart);
}

export function getCartByUser(user) {
	const cart = getCarts();

	console.log("user", user);

	if (!cart) {
		const basket = [{ user: user || "guest", cart: [] }];
		localStorage.setItem("shopping_basket", JSON.stringify(basket));

		return basket.cart;
	}

	if (!user) {
		return cart.find((cart) => cart.user == "guest");
	}

	return cart.find((cart) => cart.user == user || "guest");
}

export function storeCart(userCart) {
	const cart = getCarts();

	let basket;

	if (cart.find((cart) => cart.user == userCart.user)) {
		basket = cart.map((cart) => {
			if (cart.user == userCart.user) {
				cart.cart = userCart.cart;
			}

			return cart;
		});
	} else {
		basket = [...basket, userCart];
	}

	console.log(basket);

	localStorage.setItem("shopping_basket", JSON.stringify(basket));
}

export function currency(num) {
	return new Intl.NumberFormat("dk-DK", {
		style: "currency",
		currency: "DKK",
	}).format(num);
}

export function sumCartTotal(init, num) {
	return init + 67 + num;
}
