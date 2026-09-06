import products from "../data/products";

export function getProductName(product, t) {
  return product.nameKey ? t(product.nameKey) : product.name;
}

export function getLocalizedProductName(item, t) {
  const product = products.find((candidate) => String(candidate.id) === String(item.id));
  return getProductName(product || item, t);
}

export function getProductDescription(product, t) {
  return product.descriptionKey ? t(product.descriptionKey) : product.description;
}

export function getProductBadge(product, t) {
  return product.badgeKey ? t(product.badgeKey) : product.badge;
}
