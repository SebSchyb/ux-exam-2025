import { getItemById, renderSingleItem } from "./modules.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
    getItemById(id).then(renderSingleItem);
} else {
    console.error("No ID found in URL");
    document.querySelector("#single-product-container").textContent =
        "No item found";
}
