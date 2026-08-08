import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";
import Container from "../components/layout/Container";
import CustomerInformation from "../components/checkout/CustomerInformation";
import ShippingMethod from "../components/checkout/ShippingMethod";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import useCartStore from "../store/cartStore";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";
import { generateOrderId, saveOrder } from "../utils/orderUtils";
import { useToast } from "../components/ui/Toast";

const shippingOptions = {
  standard: { name: "Standard Shipping", price: 9.99 },
  express: { name: "Express Shipping", price: 19.99 },
  free: { name: "Free Shipping", price: 0 },
};

export default function Checkout() {
  usePageTitle("Checkout | ShopAbdalrhman");
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");
  const [placing, setPlacing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const freeEligible = subtotal >= 50;
  const shippingPrice = shippingOptions[shipping].price;
  const total = subtotal + shippingPrice;

  // Empty cart protection
  if (items.length === 0) {
    return (
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <ShoppingCart size={30} />
            </span>
            <h1 className="mt-5 text-xl font-semibold text-ink">
              Your Cart is Empty
            </h1>
            <p className="mt-2 text-muted">
              Add products to your cart before proceeding to checkout.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    );
  }

const onSubmit = (data) => {
    // Prevent duplicate order submission during the placing window.
    if (placing) return;

    // Payment validation
    if (payment === "card") {
      const cardNumber = data.cardNumber || "";
      const cvv = data.cvv || "";
      if (cardNumber.length < 12) {
        // RHF handles via register, but ensure fails gracefully
        return;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        return;
      }
    }

// Build order
    const order = {
      id: generateOrderId(),
      userId: currentUser ? currentUser.id : null,
      createdAt: new Date().toISOString(),
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
      },
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      shippingMethod: shippingOptions[shipping],
      paymentMethod: payment,
      subtotal,
      shipping: shippingPrice,
      total,
      status: "Processing",
    };

// Save order + clear cart
    setPlacing(true);
    setTimeout(() => {
      saveOrder(order);
      clearCart();
      setPlacing(false);
      showToast("Your order has been placed successfully!");
      navigate("/order-success", { state: { order } });
    }, 700);
  };

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-3 text-muted">
            Complete your order by providing your information below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* LEFT: form */}
            <div className="space-y-6">
              <CustomerInformation register={register} errors={errors} />

              <ShippingMethod
                value={shipping}
                onChange={setShipping}
                subtotal={subtotal}
              />

              <PaymentMethod
                value={payment}
                onChange={setPayment}
                register={register}
                errors={errors}
              />

{/* Place order */}
              <button
                type="submit"
                disabled={placing}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 lg:max-w-sm"
              >
                {placing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Place Order
                  </>
                )}
              </button>
            </div>

            {/* RIGHT: summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                shipping={shippingPrice}
              />
            </div>
          </div>
        </form>
      </Container>
    </section>
  );
}
