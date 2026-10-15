// Sample products for DAILYPICKZ
// Prices in Nigerian Naira (₦)
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 18500,
    description: "Premium true wireless earbuds with noise cancellation, 30-hour battery life and crystal-clear sound.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Smart LED Desk Lamp",
    price: 12500,
    description: "Adjustable brightness and color temperature. Perfect for work, study or reading. USB charging port included.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 6500,
    description: "1-litre insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof and durable.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Minimalist Crossbody Bag",
    price: 9800,
    description: "Lightweight, water-resistant bag with multiple compartments. Ideal for daily commute or travel.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Portable Power Bank 20000mAh",
    price: 14500,
    description: "Fast-charging dual USB power bank. Charges phones, tablets and more. Compact and travel-friendly.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Aroma Diffuser & Humidifier",
    price: 11200,
    description: "Ultrasonic diffuser with 7 LED light modes. Creates a calm atmosphere at home or in the office.",
    image: "https://images.unsplash.com/photo-1602928321679-567bbdba34d3?w=500&h=500&fit=crop"
  },
  {
    id: 7,
    name: "Ergonomic Mouse Pad",
    price: 4200,
    description: "Memory foam wrist rest with smooth surface. Reduces strain during long work sessions.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
  },
  {
    id: 8,
    name: "Reusable Silicone Food Bags",
    price: 5500,
    description: "Set of 4 airtight, dishwasher-safe bags. Eco-friendly alternative to single-use plastic.",
    image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=500&h=500&fit=crop"
  }
];

function formatPrice(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}
