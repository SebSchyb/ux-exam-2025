import { getItemList } from "./api.js";
import { getCart, currency, sumCartTotal } from "./utils.js";

export const renderItemList = async (category) => {
    const container = document.querySelector("#item-list");
    const template = document.querySelector("#item-list template");

    const itemList = await getItemList();

    let finalItemList;
    finalItemList = await itemList;

    if (category) {
        category = category.replace(/"/g, "");
        finalItemList = itemList.filter((item) => item.category === category);
    }

    finalItemList.forEach((item) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector("h4.title a").textContent = item.title;
        clone.querySelector("h4.title a").href = `/product.html?id=${item.id}`;
        clone.querySelector("img").src = item.image;
        clone.querySelector(".category").textContent = item.category;
        clone.querySelector("p.description").textContent = item.description;
        clone.querySelector("p.price").textContent = currency(item.price);

        container.appendChild(clone);
    });
};

//Single Product Page
export const renderSingleItem = async (item) => {
    const container = document.querySelector("#single-product-container");
    const template = document.querySelector("template.single-product-template");

    const clone = template.content.cloneNode(true);
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector("img").src = item.image;
    clone.querySelector(".category").textContent = item.category;
    clone.querySelector(".description").textContent = item.description;
    clone.querySelector(".price").textContent = currency(item.price);

    container.appendChild(clone);

    return item;
};

// SHOPPING CART
export function addToCart(product) {
    const current = getCart();
    let basket;

    if (!current) {
        basket = [{ ...product, quantity: 1 }];
    } else if (current.some((item) => item.id === product.id)) {
        basket = current.map((item) => {
            if (item.id == product.id) {
                item.quantity = item.quantity + 1;
            }

            return item;
        });
    } else {
        basket = [...current, { ...product, quantity: 1 }];
    }

    localStorage.setItem("shopping_basket", JSON.stringify(basket));
}

export function displayCart() {
    const cart = getCart();
    loadCartProducts(cart);

    const ShoppingBasketSidebar = document.querySelector("#shoppingCart");
    ShoppingBasketSidebar.classList.add("open");

    const ShoppingBasketExitButton =
        ShoppingBasketSidebar.querySelector("#closeBtn");

    ShoppingBasketExitButton.addEventListener("click", () => {
        ShoppingBasketSidebar.classList.remove("open");
    });
}

export function loadCartProducts(cart) {
    const ShoppingBasketSidebar = document.querySelector("#shoppingCart");
    const cartItemList = document.querySelector("#shoppingCart ul");
    const cartItemTemp = document.querySelector("#shoppingCart template");
    const cartTotalDisplay = document.querySelector("#shoppingCart .total");

    let cartTotal = 0;

    if (!cart || !cart.length) {
        ShoppingBasketSidebar.querySelector("p").textContent =
            "Your shopping cart is empty.";
    } else {
        ShoppingBasketSidebar.querySelector("p").textContent = "";
        cartItemList.innerHTML = "";

        cart.map((product) => {
            const cartItem = cartItemTemp.content.cloneNode(true);

            cartItem.querySelector("img").src = product.image;
            cartItem.querySelector("img").alt = product.title;
            cartItem.querySelector("h3 a").textContent = product.title;
            cartItem.querySelector(
                "h3 a"
            ).href = `/product.html?id=${product.id}`;
            cartItem.querySelector("input").value = product.quantity;
            cartItem.querySelector("footer p").textContent = currency(
                product.price * product.quantity
            );
            cartTotal = sumCartTotal(
                cartTotal,
                product.price * product.quantity
            );

            cartItem
                .querySelector(".removeProductBtn")
                .addEventListener("click", (e) => removeProduct(e, product));

            cartItem
                .querySelector(".counter .dec")
                .addEventListener("click", (e) =>
                    decreaseProductQuantity(e, product)
                );
            cartItem
                .querySelector(".counter .inc")
                .addEventListener("click", (e) =>
                    increaseProductQuantity(e, product)
                );

            cartItemList.appendChild(cartItem);

            return cartItem;
        });
    }

    cartTotalDisplay.textContent = currency(cartTotal);
}

function removeProduct(e, product) {
    const cartTotalDisplay = document.querySelector("#shoppingCart .total");
    let cartTotal = 67;

    const current = getCart();
    const basket = current.filter((item) => item.id !== product.id);

    basket.map((item) => {
        return (cartTotal = cartTotal + item.quantity * item.price);
    });

    localStorage.setItem("shopping_basket", JSON.stringify(basket));
    const productCard = e.target.parentElement.parentElement;
    productCard.remove();

    cartTotalDisplay.textContent = currency(cartTotal == 67 ? 0 : cartTotal);
}

function decreaseProductQuantity(e, product) {
    const current = getCart();
    const cartTotalDisplay = document.querySelector("#shoppingCart .total");
    let cartTotal = 67;

    const basket = current.map((item) => {
        if (item.id == product.id) {
            item.quantity = item.quantity - 1;

            e.target.nextElementSibling.value = item.quantity;
            e.target.parentElement.parentElement.querySelector(
                "p"
            ).textContent = currency(item.quantity * item.price);
        }

        // DISABLE DECREASE IF QUANTITY == 1
        if (e.target.nextElementSibling.value == 1) {
            e.target.disabled = true;
        }

        cartTotal = cartTotal + item.quantity * item.price;

        return item;
    });

    localStorage.setItem("shopping_basket", JSON.stringify(basket));
    cartTotalDisplay.textContent = currency(cartTotal);
}

function increaseProductQuantity(e, product) {
    const current = getCart();
    const cartTotalDisplay = document.querySelector("#shoppingCart .total");
    let cartTotal = 67;

    const basket = current.map((item) => {
        if (item.id == product.id) {
            item.quantity = item.quantity + 1;

            e.target.previousElementSibling.value = item.quantity;
            e.target.parentElement.parentElement.querySelector(
                "p"
            ).textContent = currency(item.quantity * item.price);
        }

        // ENABLE DECREASE IF QUANTITY > 1
        if (e.target.previousElementSibling.value > 1) {
            e.target.previousElementSibling.previousElementSibling.disabled = false;
        }

        cartTotal = cartTotal + item.quantity * item.price;

        return item;
    });

    localStorage.setItem("shopping_basket", JSON.stringify(basket));
    cartTotalDisplay.textContent = currency(cartTotal);
}
