document.addEventListener("DOMContentLoaded", () => {
    const productscont = document.querySelector(".search-section .products");
    const searchResults =
        JSON.parse(localStorage.getItem("searchResults")) || [];
    let count = 0;

    if (searchResults.length > 0) {
        searchResults.forEach((product) => {
            const isAdded = checkIfAddedToCart(product.id);
            productscont.innerHTML += `
                <div class="product" data-num="${count}">
                    <div class="image">
                        <img src="${product.image}" alt="${product.title}" />
                    </div>
                    <div class="text">
                        <h2>${product.title}</h2>
                        <p class="price">${product.price}$</p>
                        <p class="description">${product.description}</p>
                    </div>
                    <div class="btn" data-num="${count}">
                        <button class="add-to-cart ${isAdded ? "added" : ""}">
                            ${isAdded ? "Remove From Cart" : "Add To Cart"}
                        </button>
                    </div>
                </div>
            `;
            count++;
        });
        addEventListenersToProducts(searchResults);
    } else {
        productscont.innerHTML = "<p>No results found.</p>";
    }

    function addEventListenersToProducts(products) {
        let singleProduct = document.querySelectorAll(".product .text");
        singleProduct.forEach((el) => {
            el.addEventListener("click", function (e) {
                const productNum = e.target.closest(".product").dataset.num;
                const selectedProduct = products[productNum];
                localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify(selectedProduct)
                );
                window.location.href = `../single-product/index.html`;
            });
        });

        let addBtn = document.querySelectorAll(".add-to-cart");
        addBtn.forEach((el) => {
            el.addEventListener("click", function (e) {
                const button = e.target;
                const productNum = button.closest(".product").dataset.num;
                const selectedProduct = products[productNum];
                if (button.classList.contains("added")) {
                    removeFromCart(selectedProduct);
                    button.classList.remove("added");
                    button.innerHTML = "Add To Cart";
                } else {
                    addToCart(selectedProduct);
                    button.classList.add("added");
                    button.innerHTML = "Remove From Cart";
                }
            });
        });
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartNum(cart.length);
    }

    function removeFromCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter((item) => item.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartNum(cart.length);
    }

    function updateCartNum(cartNum) {
        const cartNumItem = document.querySelector(".cart-icon .product-num");
        if (cartNumItem) {
            cartNumItem.textContent = `${cartNum}`;
        }
    }

    function checkIfAddedToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some((item) => item.id === productId);
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartNum(cart.length);
});
