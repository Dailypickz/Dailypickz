"use strict";

/* ==========================================
   DAILYPICKZ FRONT-END DEMONSTRATION

   Replace demo authentication and product
   storage with a secure backend before launch.
   ========================================== */

const $ = (selector) => document.querySelector(selector);

/* EDIT YOUR PRODUCTS HERE */

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 18000,
    description: "Compact wireless earbuds for music and everyday use.",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700"
  },
  {
    id: 2,
    name: "Smartphone",
    price: 250000,
    description: "A modern smartphone for communication and entertainment.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
  },
  {
    id: 3,
    name: "Classic Sneakers",
    price: 35000,
    description: "Comfortable everyday footwear with a modern design.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
  },
  {
    id: 4,
    name: "Wristwatch",
    price: 22000,
    description: "A stylish wristwatch suitable for everyday wear.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
  },
  {
    id: 5,
    name: "Travel Backpack",
    price: 28000,
    description: "A practical backpack for school, travel and work.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"
  },
  {
    id: 6,
    name: "Headphones",
    price: 42000,
    description: "Over-ear headphones for music and entertainment.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
  },
  {
    id: 7,
    name: "Kitchen Kettle",
    price: 16000,
    description: "An electric kettle for convenient everyday use.",
    image: "https://images.unsplash.com/photo-1608181831718-c9b5f9a4b3b1?w=700"
  },
  {
    id: 8,
    name: "Fashion Handbag",
    price: 30000,
    description: "A versatile handbag for daily activities and outings.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700"
  }
];

/* PRODUCT DISPLAY */

const productGrid = $("#productGrid");
const emptyMessage = $("#emptyMessage");

function formatPrice(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderProducts(list) {
  productGrid.replaceChildren();

  emptyMessage.classList.toggle("hidden", list.length !== 0);

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.onerror = () => {
      image.onerror = null;
      image.src =
        "https://placehold.co/600x400/f0f2f7/101c3a?text=DAILYPICKZ";
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "product-action";
    button.type = "button";
    button.textContent = "View Product";
    button.addEventListener("click", () => showProduct(product));

    info.append(name, description, price, button);
    card.append(image, info);
    productGrid.append(card);
  });
}

/* SEARCH */

$("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  searchProducts();
});

$("#searchInput").addEventListener("input", searchProducts);

function searchProducts() {
  const query = $("#searchInput").value
    .trim()
    .toLowerCase();

  const filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  renderProducts(filtered);

  $("#products").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* PRODUCT DETAILS */

function showProduct(product) {
  $("#detailName").textContent = product.name;
  $("#detailPrice").textContent = formatPrice(product.price);
  $("#detailDescription").textContent = product.description;
  $("#detailImage").src = product.image;
  $("#detailImage").alt = product.name;

  $("#paymentBtn").onclick = () => {
    alert(
      "Ordering for " + product.name +
      " requires your real order and payment system to be configured."
    );
  };

  $("#productModal").classList.remove("hidden");
}

$("#closeProductModal").addEventListener("click", () => {
  $("#productModal").classList.add("hidden");
});

/* ACCOUNT INTERFACE
   DEMONSTRATION ONLY — NOT SECURE AUTHENTICATION */

const accountModal = $("#accountModal");
const accountForm = $("#accountForm");

let accountMode = "login";
let currentUser = null;

function openAccount(mode) {
  accountMode = mode;

  $("#modalTitle").textContent =
    mode === "register" ? "Create Account" : "Welcome Back";

  $("#modalSubtitle").textContent =
    mode === "register"
      ? "Register for a DAILYPICKZ account."
      : "Login to your account.";

  $("#nameField").classList.toggle("hidden", mode !== "register");

  $("#fullName").required = mode === "register";

  $("#submitAccount").textContent =
    mode === "register" ? "Register" : "Login";

  $("#switchText").textContent =
    mode === "register"
      ? "Already have an account?"
      : "New to DAILYPICKZ?";

  $("#switchMode").textContent =
    mode === "register" ? "Login" : "Create account";

  $("#formMessage").textContent = "";

  accountForm.reset();
  accountModal.classList.remove("hidden");
}

$("#loginBtn").addEventListener("click", () => openAccount("login"));

$("#registerBtn").addEventListener("click", () => openAccount("register"));

$("#closeModal").addEventListener("click", () => {
  accountModal.classList.add("hidden");
});

$("#switchMode").addEventListener("click", () => {
  openAccount(accountMode === "login" ? "register" : "login");
});

function showMessage(message) {
  $("#formMessage").textContent = message;
}

/*
  This demo intentionally does not save passwords,
  create real accounts, or authenticate users.

  Connect the form to a secure backend before using
  it for real customers.
*/

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  showMessage(
    "Account authentication is not connected yet. " +
    "A secure backend must be configured to register or log in."
  );
});

/* DEMONSTRATION LOGOUT / SESSION DISPLAY */

function updateAccountUI() {
  const loggedIn = Boolean(currentUser);

  $("#loginBtn").classList.toggle("hidden", loggedIn);
  $("#registerBtn").classList.toggle("hidden", loggedIn);
  $("#logoutBtn").classList.toggle("hidden", !loggedIn);

  $("#welcomeUser").textContent = loggedIn
    ? "Hello, " + currentUser.name
    : "";
}

$("#logoutBtn").addEventListener("click", () => {
  currentUser = null;
  updateAccountUI();
});

/* CLOSE MODALS WHEN CLICKING OUTSIDE */

[accountModal, $("#productModal")].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

/* CLOSE MODALS WITH ESCAPE */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    accountModal.classList.add("hidden");
    $("#productModal").classList.add("hidden");
  }
});

/* FOOTER YEAR */

$("#year").textContent = new Date().getFullYear();

/* START */

renderProducts(products);
updateAccountUI();
