const response = await fetch("https://fakestoreapi.com/products", {
    method: "GET",
});
const data = await response.json();
console.log(data);
