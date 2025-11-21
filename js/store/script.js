import { STOREBASEURL } from "./variables.js";

const response = await fetch(STOREBASEURL + "/products", {
    method: "GET",
});
const data = await response.json();
console.log(data);
