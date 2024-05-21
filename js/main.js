const productscont = document.querySelector(".products-section .products");

const getProducts = async () => {
    const response = await fetch(
        "https://products-api-delta.vercel.app/api/products"
    );
    const data = await response.json();
    return data;
};

let count = 0;

const initApp = async () => {
    const products = await getProducts();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    products.forEach((product) => {
        const isAdded = cart.some((item) => item.id === product.id);
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

    addEventListenersToProducts(products);
};

const addEventListenersToProducts = (products) => {
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
};

const addToCart = (product) => {
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
};

const removeFromCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNum(cart.length);
};

const updateCartNum = (cartNum) => {
    const cartNumItem = document.querySelector(".cart-icon .product-num");
    if (cartNumItem) {
        cartNumItem.textContent = `${cartNum}`;
    }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartNum(cart.length);

const search = () => {
    const searchBox = document.querySelector(".search-box");
    const searchInput = searchBox.querySelector("input[type='text']");

    searchInput.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const searchText = searchInput.value.toLowerCase();
            const products = await getProducts();
            const searchResults = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchText) ||
                    product.description.toLowerCase().includes(searchText)
            );
            localStorage.setItem(
                "searchResults",
                JSON.stringify(searchResults)
            );
            window.location.href = `../search/index.html`;
        }
    });

    const searchBoxMb = document.querySelector(
        ".slide-menu input[type='text']"
    );
    const searchBtn = document.querySelector(".slide-menu .btn");
    searchBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        const searchText = searchBoxMb.value.toLowerCase();
        const products = await getProducts();
        const searchResults = products.filter(
            (product) =>
                product.title.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText)
        );
        localStorage.setItem("searchResults", JSON.stringify(searchResults));
        window.location.href = `../search/index.html`;
    });
};

search();
initApp();

const burgerMenu = document.querySelector(".burger-menu");
const slideMenu = document.querySelector(".slide-menu");
const closeMenu = document.querySelector(".close-menu i");

burgerMenu.addEventListener("click", function () {
    slideMenu.classList.add("active");
});

closeMenu.addEventListener("click", function () {
    slideMenu.classList.remove("active");
});
