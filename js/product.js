document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const productName = document.querySelector(".product-name").textContent;
      const productPrice = parseFloat(
        document.querySelector(".product-price").textContent.replace("$", "")
      );
      const productQuantity = parseInt(
        document.querySelector(".quantity").value
      );
      const productImage = document.querySelector(".product-img").src; // Get the image URL

      addToCart(productName, productPrice, productQuantity, productImage);
      window.location.href = "cart.html";
    });
  });

  function addToCart(name, price, quantity, productImage) {
    const cartItem = {
      name: name,
      price: price,
      quantity: quantity,
      image: productImage, // Store the image URL in the cart item object
    };

    const existingItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingItems.push(cartItem);

    localStorage.setItem("cartItems", JSON.stringify(existingItems));
    updateCart(); // Pass the image URL to addToCart function
  }

  function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartTableBody = document.querySelector("tbody");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let subtotal = 0;

    cartTableBody.innerHTML = "";

    cartItems.forEach(function (item) {
      const row = document.createElement("tr");
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      row.innerHTML = `
            <td><img src="${
              item.image
            }" alt="Product Image" style="height: 140px;"></td>
            <td data-label="Product Name">${item.name}</td>
            <td data-label="Quantity">${item.quantity}</td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Remove"><button class="remove-item">X</button></td>
        `;
      cartTableBody.appendChild(row);
    });

    // Update subtotal
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    // Update total (subtotal + shipping, taxes, etc., if applicable)
    totalElement.textContent = `$${subtotal.toFixed(2)}`;

    // Add event listeners for remove buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach(function (button, index) {
      button.addEventListener("click", function () {
        removeFromCart(index);
      });
    });
  }

  function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
  }

  // Load existing cart items when the page loads
  updateCart();
});
