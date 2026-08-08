import Container from "../layout/Container";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ currentProduct, products }) {
  // Pick products from the same category, excluding the current product
  const sameCategory = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );

  // Fill remaining slots with other products
  const others = products.filter(
    (p) => p.category !== currentProduct.category && p.id !== currentProduct.id
  );

  const related = [...sameCategory, ...others].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Related Products
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
