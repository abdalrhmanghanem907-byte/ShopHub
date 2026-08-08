import { useEffect } from "react";
import usePageTitle from "./usePageTitle";
import { SITE_URL, SITE_NAME, DEFAULT_IMAGE } from "../config/seo";

// Helper: create or update a <meta> tag.
function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Helper: create or update the canonical <link> tag.
function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Helper: inject (or replace) a single JSON-LD structured-data script.
function setJsonLd(data) {
  const existing = document.getElementById("seo-jsonld");
  if (existing) existing.remove();
  if (!data) return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "seo-jsonld";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * useSEO — sets the page title (via the existing usePageTitle system),
 * meta description, canonical URL, Open Graph, Twitter card metadata,
 * and optional JSON-LD structured data.
 *
 * @param {object} opts
 * @param {string} opts.title       - unique, meaningful page title
 * @param {string} opts.description - unique meta description
 * @param {string} [opts.path]      - route path, e.g. "/products"
 * @param {string} [opts.type]      - og:type, e.g. "website" | "product"
 * @param {string} [opts.image]     - absolute image URL for social sharing
 * @param {object} [opts.jsonLd]    - optional JSON-LD structured data
 */
export default function useSEO({
  title,
  description,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  jsonLd = null,
}) {
  // Reuse the existing single title-management system.
  usePageTitle(title);

  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    setMeta("name", "description", description);
    setCanonical(url);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", SITE_NAME);
    if (image) setMeta("property", "og:image", image);

    // Twitter / X card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);

    // Structured data
    setJsonLd(jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, type, image]);
}
