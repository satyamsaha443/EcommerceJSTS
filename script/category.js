document.addEventListener("DOMContentLoaded", function() {
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    displayCategories(storedCategories);
});

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories');

    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'btn btn-outline-primary m-2';
        categoryBtn.innerText = category;

        // Attach click event to filter products by category
        categoryBtn.onclick = () => {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            filterProductsByCategory(category, storedProducts);
        };

        categoriesContainer.appendChild(categoryBtn);
    });
}

function filterProductsByCategory(category, products) {
    const filteredProducts = products.filter(product => product.category === category);
    const productsContainer = document.getElementById('category-products');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'prod';

        productDiv.innerHTML = `
            <div class="card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> ₹${product.price}</p>
                        <button class="btn-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.category}', '${product.description}', '${product.image}')">Add to Cart</button>
                    </div>
                </a>
            </div>
        `;

        productsContainer.appendChild(productDiv);
    });
}
