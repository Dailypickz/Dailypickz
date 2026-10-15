document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const container = document.getElementById("cart-content");
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <a href="index.html#products" class="btn btn-primary">Browse Products</a>
      </div>`;
    return;
  }

  let itemsHtml = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return "";
    const lineTotal = product.price * item.quantity;
    return `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-img">
          <img src="\( {product.image}" alt=" \){product.name}" />
        </div>
        <div>
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price)} each</div>
          <button class="remove-btn" onclick="handleRemove(${product.id})">Remove</button>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="handleQtyChange(${product.id}, ${item.quantity - 1})">−</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="handleQtyChange(${product.id}, ${item.quantity + 1})">+</button>
        </div>
        <div class="cart-item-total">${formatPrice(lineTotal)}</div>
      </div>`;
  }).join("");

  const total = getCartTotal();

  container.innerHTML = `
    <div class="cart-items">${itemsHtml}</div>
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-summary-row cart-summary-total">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-actions">
        <a href="index.html#products" class="btn btn-outline">Continue Shopping</a>
        <a href="checkout.html" class="btn btn-primary">Checkout</a>
      </div>
    </div>`;
}

function handleRemove(id) {
  removeFromCart(id);
  renderCart();
}

function handleQtyChange(id, newQty) {
  if (newQty < 1) {
    removeFromCart(id);
  } else {
    updateQuantity(id, newQty);
  }
  renderCart();
}
