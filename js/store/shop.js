import { renderItemList } from "./modules.js";

const params = new URLSearchParams(window.location.search);
export const category = params.get("category");

if (category) {
    renderItemList(category);
} else {
    renderItemList();
}
