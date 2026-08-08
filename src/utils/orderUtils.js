const ORDERS_KEY = "shophub_orders";

// Generate a unique order ID like SH-2026-000123
export function generateOrderId() {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `SH-${year}-${random}`;
}

// Safely read orders from localStorage
export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

// Save an order, appending to existing orders
export function saveOrder(order) {
  const orders = loadOrders();
  orders.push(order);
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Ignore write errors
  }
  return orders;
}
