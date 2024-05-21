document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".single-products-cont");
    const totalPriceContainer = document.querySelector(".Subtotal .mony");
    const estimatedTax = document.querySelector(".Estimated-Tax .mony");
    const estimatedShipping = document.querySelector(
        ".Estimated-shipping .mony"
    );
    const total = document.querySelector(".total .mony");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const updateCartDisplay = () => {
        cartItemsContainer.innerHTML = "";
        let totalPrice = 0;
        let estTax = 30;
        let estShipping = 15;
        cart.forEach((product, index) => {
            cartItemsContainer.innerHTML += `
                <div class="cart-single-product">
                    <div class="image">
                        <img src="${product.image}" alt="" />
                    </div>
                    <div class="text">
                        <div class="heading">
                            <h3>${product.title}</h3>
                            <span class="price">$${product.price}</span>
                        </div>
                        <div class="quantity">
                            <div class="del" data-index="${index}">
                                <i class="fa-solid fa-x"></i>
                            </div>
                            <div class="quant">
                                <span class="def" data-index="${index}">-</span>
                                <span class="num">${product.quantity}</span>
                                <span class="add" data-index="${index}">+</span>
                            </div>
                        </div>
                    </div>
                </div>`;
            totalPrice += product.price * product.quantity;
        });

        totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
        estimatedTax.textContent = `$${estTax}`;
        estimatedShipping.textContent = `$${estShipping}`;
        total.textContent = `$${Math.floor(totalPrice + estTax + estShipping)}`;
    };

    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    cartItemsContainer.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains("fa-x")) {
            cart.splice(index, 1);
            saveCart();
            updateCartDisplay();
            updateCartNum(cart.length);
        } else if (e.target.classList.contains("def")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCart();
                updateCartDisplay();
            }
        } else if (e.target.classList.contains("add")) {
            cart[index].quantity++;
            saveCart();
            updateCartDisplay();
        }
    });

    if (cart.length > 0) {
        updateCartDisplay();
    } else {
        cartItemsContainer.innerHTML = "<p>No items in the cart.</p>";
        totalPriceContainer.textContent = "$0.00";
        estimatedTax.textContent = "$0.00";
        estimatedShipping.textContent = "$0.00";
        total.textContent = "$0.00";
    }
});
