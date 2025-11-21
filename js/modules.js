fetch('https://fakestore.com/products')
    .then(response => response.json())
    .then(data => console.log(data))