import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import Container from "../components/layout/Container";

export default function OrderSuccess() {
  const { t } = useTranslation();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={44} />
          </span>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("orderSuccessTitle")}
          </h1>
          <p className="mt-3 text-muted">{t("thankYouOrder")}</p>

          {order && (
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 text-left shadow-sm">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-sm text-muted">{t("orderNumber")}</span>
                <span className="text-sm font-bold text-ink">{order.id}</span>
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t("total")}</span>
                  <span className="font-semibold text-ink">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t("paymentMethod")}</span>
                  <span className="font-semibold text-ink capitalize">
                    {order.paymentMethod === "card" ? t("card") : t("cashOnDelivery")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">{t("shippingMethod")}</span>
                  <span className="font-semibold text-ink">
                    {t(`shippingOption.${order.shippingMethod.id || "standard"}`, {
                      defaultValue: order.shippingMethod.name,
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <Package size={18} />
              {t("viewOrders")}
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              <ShoppingBag size={18} />
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
