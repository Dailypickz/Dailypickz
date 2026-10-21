console.log("=== NEW CHECKOUT.JS LOADED ===");
document.addEventListener("DOMContentLoaded", async () => {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  const user = await getCurrentUser();
  if (!user) {
    alert("Please login first to place an order.");
    window.location.href = "login.html";
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

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const user = await getCurrentUser();

  if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const orderRef = "DPZ-" + Date.now().toString().slice(-6);

  const orderData = {
    userId: user.$id,
    fullName: form.fullName.value.trim(),
    phone: form.phone.value.trim(),
    address: form.address.value.trim(),
    notes: form.notes.value.trim() || "",
    items: JSON.stringify(getCart()),
    total: getCartTotal(),
    status: "pending",
    orderRef: orderRef,
    createdAt: new Date().toISOString()
  };

  try {
    // Save order using Databases
    await databases.createDocument(
      APPWRITE_DATABASE_ID,
      ORDERS_TABLE_ID,
      Appwrite.ID.unique(),
      orderData
    );

    // Save for confirmation page
    sessionStorage.setItem("dailypickz_last_order", JSON.stringify({
      fullName: orderData.fullName,
      phone: orderData.phone,
      ref: orderRef
    }));

    clearCart();
    window.location.href = "confirmation.html";
  } catch (error) {
    console.error(error);
    alert("NEW CODE IS RUNNING - Error: " + (error.message || error));
  }
}
