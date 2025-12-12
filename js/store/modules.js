import { STOREBASEURL } from "./variables.js";

export const getItemList = async () => {
    const response = await fetch(`${STOREBASEURL}/products`);
    return response.json();
};

export const getItemById = async (id) => {
    const res = await fetch(`${STOREBASEURL}/products/${id}`);
    return res.json();
};

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

    console.log(finalItemList);
    finalItemList.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const title = item.title;
        const image = item.image;
        const category = item.category;
        const price = new Intl.NumberFormat("dk-DK", {
            style: "currency",
            currency: "DKK",
        }).format(item.price);

        console.log(price);

        clone.querySelector("h4.title a").textContent = title;
        clone.querySelector("h4.title a").href = `/product.html?id=${item.id}`;
        clone.querySelector("img").src = image;
        clone.querySelector("p.category").textContent = category;
        clone.querySelector("p.description").textContent = item.description;
        clone.querySelector("p.price").textContent = price;
        container.appendChild(clone);
    });
};

//await renderItemList("/products");
//Single Product Page
export const renderSingleItem = async (item) => {
    const container = document.querySelector("#single-product-container");
    const template = document.querySelector("template.single-product-template");

    const clone = template.content.cloneNode(true);
    clone.querySelector(".title").textContent = item.title;
    clone.querySelector("img").src = item.image;
    clone.querySelector(".category").textContent = item.category;
    clone.querySelector(".description").textContent = item.description;
    clone.querySelector(".price").textContent = item.price;

    container.appendChild(clone);
    console.log("itemlist");
};
