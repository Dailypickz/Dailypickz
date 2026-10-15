document.addEventListener("DOMContentLoaded", () => {
  const orderData = sessionStorage.getItem("dailypickz_last_order");

  if (!orderData) {
    // No order found – redirect home
    window.location.href = "index.html";
    return;
  }

  const order = JSON.parse(orderData);

  document.getElementById("customer-name").textContent = order.fullName;
  document.getElementById("customer-phone").textContent = order.phone;
  document.getElementById("order-ref").textContent = order.ref;
});
