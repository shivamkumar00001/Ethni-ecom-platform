import { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      {products.map(product => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
          <h3>{product.name}</h3>
          <p>{product.location} — {product.category}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
