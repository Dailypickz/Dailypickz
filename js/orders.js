document.addEventListener("DOMContentLoaded", async () => {
  updateCartCount();
  updateAuthUI();

  const user = await getCurrentUser();

  if (!user) {
    document.getElementById("orders-list").innerHTML = `
      <div class="cart-empty">
        <p>Please login to view your orders.</p>
        <a href="login.html" class="btn btn-primary">Login</a>
      </div>`;
    return;
  }

  loadOrders(user.$id);
});

async function loadOrders(userId) {
  const container = document.getElementById("orders-list");

  try {
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      ORDERS_TABLE_ID,
      [
        Appwrite.Query.equal("userId", userId),
        Appwrite.Query.orderDesc("$createdAt")
      ]
    );

    const orders = response.documents;

    if (orders.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <p>You have no orders yet.</p>
          <a href="index.html#products" class="btn btn-primary">Start Shopping</a>
        </div>`;
      return;
    }

    let html = "";

    orders.forEach(order => {
      let items = [];
      try {
        items = JSON.parse(order.items || "[]");
      } catch (e) {
        items = [];
      }

      const itemsText = items.map(item => {
        const product = getProductById ? getProductById(item.id) : null;
        const name = product ? product.name : "Product " + item.id;
        return `${name} × ${item.quantity}`;
      }).join(", ");

      const date = order.$createdAt 
        ? new Date(order.$createdAt).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })
        : "—";

      html += `
        <div class="cart-items" style="margin-bottom:20px;">
          <div style="padding:16px 20px; border-bottom:1px solid #E5E7EB;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong>Order ${order.orderRef || order.$id.slice(-6)}</strong>
              <span style="background:${order.status === 'pending' ? '#FEF3C7' : '#D1FAE5'}; 
                           color:${order.status === 'pending' ? '#92400E' : '#065F46'}; 
                           padding:4px 10px; border-radius:20px; font-size:0.8rem; font-weight:600;">
                ${order.status || 'pending'}
              </span>
            </div>
            <div style="font-size:0.9rem; color:#6B7280; margin-bottom:6px;">
              ${date}
            </div>
            <div style="font-size:0.9rem; margin-bottom:6px;">
              ${itemsText || "No items"}
            </div>
            <div style="font-weight:700; font-size:1.05rem;">
              Total: ${formatPrice(order.total || 0)}
            </div>
            <div style="font-size:0.85rem; color:#6B7280; margin-top:8px;">
              ${order.fullName} · ${order.phone}<br>
              ${order.address}
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="cart-empty">
        <p>Failed to load orders. Please try again later.</p>
        <p style="font-size:0.85rem; color:#EF4444;">${error.message || error}</p>
      </div>`;
  }
}
