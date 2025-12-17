import { STOREBASEURL } from "./variables.js";

export const getItemList = async () => {
	const response = await fetch(`${STOREBASEURL}/products`);
	return response.json();
};

export const getItemById = async (id) => {
	const res = await fetch(`${STOREBASEURL}/products/${id}`);
	return res.json();
};
