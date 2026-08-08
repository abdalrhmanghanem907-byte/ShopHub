import { Link } from "react-router-dom";
import { ShoppingBag, PackageSearch } from "lucide-react";
import Container from "../components/layout/Container";
import OrderCard from "../components/orders/OrderCard";
import { loadOrders } from "../utils/orderUtils";
import useAuth from "../hooks/useAuth";

export default function Orders() {
  const { currentUser } = useAuth();
  const allOrders = loadOrders();

  // Only show the current user's orders.
  const orders = currentUser
    ? allOrders.filter((o) => o.userId === currentUser.id)
    : [];

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your Orders
          </h1>
          <p className="mt-3 text-muted">
            Track and review your previous purchases.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty state */
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <PackageSearch size={30} />
            </span>
            <h2 className="mt-5 text-xl font-semibold text-ink">
              Your Orders are Empty
            </h2>
            <p className="mt-2 text-muted">
              Orders you place will appear here.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        )}
      </Container>
    </section>
  );
}
