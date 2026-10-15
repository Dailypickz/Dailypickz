document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id);
  const container = document.getElementById("product-detail");

  if (!product || !container) {
    container.innerHTML = `
      <div style="padding:40px;text-align:center;">
        <p>Product not found.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:16px;">Back to Home</a>
      </div>`;
    return;
  }

  document.title = `${product.name} – DAILYPICKZ`;

  let quantity = 1;

  container.innerHTML = `
    <div class="detail-image">
      <img src="\( {product.image}" alt=" \){product.name}" />
    </div>
    <div class="detail-info">
      <h1>${product.name}</h1>
      <div class="detail-price">${formatPrice(product.price)}</div>
      <p class="detail-desc">${product.description}</p>
      <div class="qty-row">
        <label>Quantity</label>
        <div class="qty-control">
          <button class="qty-btn" id="qty-minus">−</button>
          <span class="qty-value" id="qty-value">1</span>
          <button class="qty-btn" id="qty-plus">+</button>
        </div>
      </div>
      <button class="btn btn-primary" id="add-to-cart-btn" style="width:100%;">
        Add to Cart
      </button>
    </div>
  `;

  const qtyValue = document.getElementById("qty-value");
  document.getElementById("qty-minus").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyValue.textContent = quantity;
    }
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    quantity++;
    qtyValue.textContent = quantity;
  });

  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, quantity);
    const btn = document.getElementById("add-to-cart-btn");
    btn.textContent = "Added to Cart ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 1500);
  });
});
