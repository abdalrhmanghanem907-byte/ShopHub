import { getProducts } from "../components/data/products";

import ProductCard from "../components/ProductCard";
function Home() {
    const products=getProducts()
  return (
    <div className="page">
        <div className="home-hero">
            <h1>welcom to ShopHob</h1>
            <p>Discover amazing products at great prices</p>

        </div>
        <div className="container">
            <h2 className="page-title">our products</h2>
            <div className="product-grid">
                {products.map((product)=>(
                   
                   <ProductCard product={product} key={product.id}/>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Home;