document.addEventListener("DOMContentLoaded", () => {
    const singleProductCont = document.querySelector(".single-product");
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
        singleProductCont.innerHTML = `
        <div class="image">
            <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="text">
            <h2>${product.title}</h2>
            <div class="price">
                <span class="after">${product.price}$</span>
                <span class="before">${Math.floor(
                    product.price + product.sale_percentage
                )}$</span>
            </div>
            <div class="description">${product.description}</div>
            <div class="btns">
                <button class="add-to-wishlist">Add To Wishlist</button>
                <button class="add-to-cart">Add To Cart</button>
            </div>
            <div class="info">
                <div class="cont">
                    <div class="icon">
                        <i class="fa-solid fa-truck"></i>
                    </div>
                    <div class="info-text">
                        <span>Free Delivery</span>
                        <span>1-2 day</span>
                    </div>
                </div>
                <div class="cont">
                    <div class="icon">
                        <i class="fa-solid fa-store"></i>
                    </div>
                    <div class="info-text">
                        <span>In Stock</span>
                        <span>Today</span>
                    </div>
                </div>
                <div class="cont">
                    <div class="icon">
                        <i class="fa-regular fa-circle-check"></i>
                    </div>
                    <div class="info-text">
                        <span>Guaranteed</span>
                        <span>1 year</span>
                    </div>
                </div>
            </div>
        </div>
        `;
        const addBtn = document.querySelector(".add-to-cart");
        addBtn.addEventListener("click", () => {
            addToCart(product);
        });
    } else {
        singleProductCont.innerHTML = "<p>Product details not available.</p>";
    }
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            product.quantity = 1;
            cart.push(product);
            updateCartNum();
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };
});
