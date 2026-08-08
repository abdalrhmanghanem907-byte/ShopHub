import { useState } from "react";
import { Mail, Send } from "lucide-react";
import Container from "../layout/Container";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Visual only — no API connection yet
  };

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Mail size={26} />
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-muted">
            Get product updates, exclusive offers, and shopping inspiration.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <Send size={16} />
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}
