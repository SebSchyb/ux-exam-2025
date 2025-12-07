import { STOREBASEURL } from "./variables.js";

export const getItemList = async (endpoint) => {
    const conn = await fetch(`${STOREBASEURL}${endpoint}`);
    const response = await conn.json();
    return response;
};

export const getItemById = async (id) => {
    const res = await fetch(`${STOREBASEURL}/products/${id}`);
    return res.json();
};
