import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronRight, PackageX } from "lucide-react";
import Container from "../components/layout/Container";
import ProductDetailsComponent from "../components/products/ProductDetails";
import RelatedProducts from "../components/products/RelatedProducts";
import products from "../data/products";
import useSEO from "../hooks/useSEO";
import {
  getProductDescription,
  getProductName,
} from "../utils/productUtils";

export default function ProductDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const productName = product ? getProductName(product, t) : "";
  const productDescription = product ? getProductDescription(product, t) : "";

  // Set SEO metadata dynamically (product name or fallback).
  useSEO({
    title: product
      ? `${productName} | ShopAbdalrhman`
      : `${t("productNotFound")} | ShopAbdalrhman`,
    description: product
      ? productDescription
      : t("productNotFoundSeo"),
    path: product ? `/products/${product.id}` : "/products",
    type: "product",
    image: product ? product.image : undefined,
    jsonLd: product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: productName,
          description: productDescription,
          image: product.image,
          category: product.category,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        }
      : null,
  });

  // Product not found
  if (!product) {
    return (
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-light text-primary">
              <PackageX size={40} />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
           {t("productNotFound")}
            </h1>
            <p className="mt-4 text-muted">
              {t("productNotFoundMessage")}
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t("backToProducts")}
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b border-line bg-surface">
        <Container className="py-4">
          <nav aria-label={t("breadcrumb")}>
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-primary">
                {t("home")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <Link
                  to="/products"
                  className="transition-colors hover:text-primary"
                >
                 {t("products")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li className="font-medium text-ink">{productName}</li>
            </ol>
          </nav>
        </Container>
      </div>

      <ProductDetailsComponent product={product} />
      <RelatedProducts currentProduct={product} products={products} />
    </>
  );
}
