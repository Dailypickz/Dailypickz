// Shared functionality for all pages

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupMobileMenu();
  renderProductsIfNeeded();
  setupSearch();
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

function renderProductsIfNeeded(filter = "") {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  const filtered = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#6B7280;padding:40px 0;">No products found.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(product => `
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

function setupSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;

  input.addEventListener("input", () => {
    renderProductsIfNeeded(input.value.trim());
  });
}

function searchProducts() {
  const input = document.getElementById("search-input");
  if (input) {
    renderProductsIfNeeded(input.value.trim());
  }
}

function handleAddToCart(productId) {
  addToCart(productId, 1);
  showToast("Added to cart ✓");
  playAddSound();
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show", "success");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Simple pleasant beep sound (no external file needed)
function playAddSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Sound not supported – ignore
  }
}
