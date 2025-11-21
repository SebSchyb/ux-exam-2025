import { getItemList } from "./modules.js";

console.log(await getItemList("/products"));

const renderItemList = async (category) => {
    const container = document.querySelector("#item-list");
    const template = document.querySelector("#item-list template");

    const itemList = await getItemList(category);

    itemList.forEach((item) => {
        const clone = template.content.cloneNode(true);
        const title = item.title;
        const image = item.image;
        const category = item.category;
        const description = item.description;
        const price = item.price;
        console.log(title);
        clone.querySelector("h4.title").textContent = title;
        clone.querySelector("img").src = image;
        clone.querySelector("p.category").textContent = category;
        clone.querySelector("p.description").textContent = description;
        clone.querySelector("p.price span").textContent = price;
        container.appendChild(clone);
    });
};

await renderItemList("/products");
