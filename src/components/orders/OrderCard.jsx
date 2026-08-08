import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CreditCard,
  Banknote,
  Clock,
  Eye,
} from "lucide-react";

// Map statuses to badge colors
const statusStyles = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderCard({ order }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const date = new Date(order.createdAt).toLocaleDateString();
  const status = order.status || "Processing";

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Order Number
          </p>
          <p className="mt-1 text-base font-bold text-ink">{order.id}</p>
        </div>
<div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              statusStyles[status] || "bg-primary-light text-primary"
            }`}
          >
            <Clock size={13} />
            {status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs text-muted">Date</p>
          <p className="mt-1 text-sm font-medium text-ink">{date}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Items</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-ink">
            <Package size={15} />
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Payment</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-ink">
            {order.paymentMethod === "card" ? (
              <>
                <CreditCard size={15} /> Card
              </>
            ) : (
              <>
                <Banknote size={15} /> Cash on Delivery
              </>
            )}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Shipping</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-ink">
            <Truck size={15} />
            {order.shippingMethod.name}
          </p>
        </div>
      </div>

{/* Footer */}
      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            {itemCount} {itemCount === 1 ? "product" : "products"}
          </p>
          <p className="mt-1 text-lg font-bold text-ink">
            Total: ${order.total.toFixed(2)}
          </p>
        </div>
        <Link
          to={`/orders/${order.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
        >
          <Eye size={16} />
          View Details
        </Link>
      </div>
    </div>
  );
}
