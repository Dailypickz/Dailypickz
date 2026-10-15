document.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  renderSummary();
  document.getElementById("checkout-form").addEventListener("submit", handleSubmit);
});

function renderSummary() {
  const cart = getCart();
  const container = document.getElementById("summary-items");
  let html = "";

  cart.forEach(item => {
    const product = getProductById(item.id);
    if (!product) return;
    html += `
      <div class="summary-item">
        <span>${product.name} × ${item.quantity}</span>
        <span>${formatPrice(product.price * item.quantity)}</span>
      </div>`;
  });

  container.innerHTML = html;
  document.getElementById("summary-total").textContent = formatPrice(getCartTotal());
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const order = {
    fullName: form.fullName.value.trim(),
    phone: form.phone.value.trim(),
    address: form.address.value.trim(),
    notes: form.notes.value.trim(),
    items: getCart(),
    total: getCartTotal(),
    date: new Date().toISOString(),
    ref: "DPZ-" + Date.now().toString().slice(-6)
  };

  // Save order temporarily so confirmation page can show it
  sessionStorage.setItem("dailypickz_last_order", JSON.stringify(order));

  // Clear the cart
  clearCart();

  // Go to confirmation
  window.location.href = "confirmation.html";
}
