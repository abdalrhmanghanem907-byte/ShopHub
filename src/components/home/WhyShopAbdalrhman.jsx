import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";
import Container from "../layout/Container";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Your payments are protected with secure checkout.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Simple and hassle-free returns.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "We're here whenever you need us.",
  },
];

export default function WhyShopAbdalrhman() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why ShopAbdalrhman?
          </h2>
          <p className="mt-2 text-muted">
            We make shopping simple, secure, and enjoyable.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                <Icon size={26} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
 