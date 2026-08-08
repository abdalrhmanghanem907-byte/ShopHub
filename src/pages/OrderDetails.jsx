import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  CreditCard,
  Banknote,
  MapPin,
  Mail,
  Phone,
  User,
  PackageX,
} from "lucide-react";
import Container from "../components/layout/Container";
import { loadOrders } from "../utils/orderUtils";
import useAuth from "../hooks/useAuth";

// Map order statuses to badge styling
const statusStyles = {
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const orders = loadOrders();
  // Only show an order that belongs to the current user.
  const order = orders.find(
    (o) =>
      o.id === id &&
      (o.userId ? o.userId === currentUser?.id : true)
  );

  // Order not found (or belongs to another user)
  if (!order) {
    return (
      <section className="py-16 sm:py-24">
        <Container className="max-w-xl">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
              <PackageX size={30} />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-ink">Order Not Found</h1>
            <p className="mt-2 text-muted">
              We couldn't find that order. It may have been removed or doesn't
              belong to your account.
            </p>
            <Link
              to="/orders"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString();
  const status = order.status || "Processing";
  const customer = order.customer || {};
  const items = order.items || [];
  const shippingMethod = order.shippingMethod || { name: "Standard Shipping" };

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        {/* Back link */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              Order Number
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink">
              {order.id}
            </h1>
            <p className="mt-2 text-sm text-muted">{date}</p>
          </div>
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${
              statusStyles[status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Products */}
        <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
            <Package size={18} className="text-primary" />
            Products
          </h2>
          <div className="mt-4 divide-y divide-line">
            {items.map((item) => {
              const lineTotal = (item.price || 0) * (item.quantity || 0);
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <Link
                    to={`/products/${item.id}`}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-gray-50"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted">
                        <Package size={20} />
                      </div>
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-sm font-semibold text-ink transition-colors hover:text-primary"
                    >
                      {item.name || "Product"}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">
                      Qty: {item.quantity || 0} × ${(item.price || 0).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink">
                    ${lineTotal.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping + Summary */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Shipping information */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
              <Truck size={18} className="text-primary" />
              Shipping Information
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <User size={15} className="mt-0.5 shrink-0 text-muted" />
                <span className="font-medium text-ink">
                  {customer.name || "—"}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0 text-muted" />
                <span className="text-ink">{customer.email || "—"}</span>
              </div>
              {customer.phone && (
                <div className="flex items-start gap-2">
                  <Phone size={15} className="mt-0.5 shrink-0 text-muted" />
                  <span className="text-ink">{customer.phone}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-muted" />
                <span className="text-ink">
                  {customer.address || "—"}
                  {customer.city ? `, ${customer.city}` : ""}
                  {customer.postalCode ? ` ${customer.postalCode}` : ""}
                </span>
              </div>
              <div className="mt-2 border-t border-line pt-3">
                <p className="text-xs text-muted">Shipping Method</p>
                <p className="mt-0.5 font-medium text-ink">
                  {shippingMethod.name}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  {order.paymentMethod === "card" ? (
                    <>
                      <CreditCard size={14} /> Paid by Card
                    </>
                  ) : (
                    <>
                      <Banknote size={14} /> Cash on Delivery
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-ink">Order Summary</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-ink">
                  ${(order.subtotal || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-ink">
                  ${(order.shipping || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="text-base font-semibold text-ink">Total</span>
                <span className="text-lg font-bold text-ink">
                  ${(order.total || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
