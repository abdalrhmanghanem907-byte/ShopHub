import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";
import Container from "../layout/Container";

export default function PromoBanner() {
  const { t } = useTranslation();
  return (
    <section className="py-8">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-dark px-6 py-14 text-center shadow-lg sm:px-12">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white">
              <Zap size={16} />
              {t("limitedTimeOffer")}
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("upgradeEveryday")}
            </h2>
            <p className="mt-4 text-lg text-white/90">
              {t("saveUpTo")}
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-md transition-all hover:bg-primary-light hover:shadow-lg"
            >
              {t("shopDeals")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
