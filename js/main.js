// Shared functionality for all pages

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupMobileMenu();
  renderProductsIfNeeded();
});

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }
}

function renderProductsIfNeeded() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card">
      <a href="product.html?id=${product.id}" class="product-image">
        <img src="\( {product.image}" alt=" \){product.name}" loading="lazy" />
      </a>
      <div class="product-info">
        <a href="product.html?id=${product.id}">
          <h3 class="product-name">${product.name}</h3>
        </a>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="btn btn-primary btn-sm" onclick="handleAddToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function handleAddToCart(productId) {
  addToCart(productId, 1);
  // Small visual feedback
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = "Added ✓";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1200);
}
