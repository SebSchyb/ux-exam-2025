export function getCarts() {
	const cart = localStorage.getItem("shopping_basket");
	return JSON.parse(cart);
}

export function getCartByUser(user) {
	const cart = getCarts();

	if (!cart) {
		const basket = [{ user: user, cart: [] }];
		localStorage.setItem("shopping_basket", JSON.stringify(basket));

		return basket.cart;
	}

	if (!user) {
		return cart.find((cart) => cart.user == "guest");
	}

	return cart.find((cart) => cart.user == user);
}

export function storeCart(userCart) {
	const cart = getCarts();

	let basket = [];

	if (cart.find((cart) => cart.user == userCart.user)) {
		basket = cart.map((cart) => {
			if (cart.user == userCart.user) {
				cart.cart = userCart.cart;
			}

			return cart;
		});
	} else {
		basket = [...cart, userCart];
	}

	localStorage.setItem("shopping_basket", JSON.stringify(basket));
}

export function checkoutCart(user) {
	const cart = getCarts();

	let basket;

	if (!user) {
		basket = cart.filter((cart) => cart.user !== "guest");
	}

	basket = cart.filter((cart) => cart.user !== user);
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
