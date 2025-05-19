// import React, { useEffect, useState } from 'react';
// import './LandingPage.css';
// import { fetchAllProducts } from '../api';

// const LandingPage = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function loadProducts() {
//       try {
//         const data = await fetchAllProducts();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error loading products:", err);
//       }
//     }

//     loadProducts();
//   }, []);

//   const imageBaseURL = "http://localhost:5000/static/images/products/";

//   return (
//     <div className="landing-wrapper">
//       <header className="navbar">
//         <div className="logo">EthnicBazaar</div>
//         <input type="text" placeholder="Search for products..." className="search-bar" />
//         <div className="nav-icons">
//           <span>🧡 Wishlist</span>
//           <span>🛒 Cart</span>
//         </div>
//       </header>

//       <div className="landing-container">
//         <h2>Explore Our Ethnic Products</h2>
//         <div className="product-grid">
//           {products.map((product, index) => (
//             <div className="product-card" key={index}>
//               <img
//                 src={imageBaseURL + product.images[0]}
//                 alt={product.name}
//                 className="product-img"
//               />
//               <h3>{product.name}</h3>
//               <p className="product-category">{product.category}</p>
//               <p className="product-price">₹{product.price}</p>
//               <p className="product-desc">{product.description}</p>
//               <div className="product-actions">
//                 <button className="btn-cart">Add to Cart</button>
//                 <button className="btn-wishlist">❤️</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;









import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { fetchAllProducts } from '../api';

const categories = ["All", "Food", "Apparel", "Jewelry", "Home Decor"];
const regions = [
  "All",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedRegion !== 'All') {
      filtered = filtered.filter(p => p.region === selectedRegion);
    }

    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch)
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedRegion, products]);

  const imageBaseURL = "http://localhost:5000/static/images/products/";

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">EthnicBazaar</div>
        <input
          type="text"
          placeholder="Search for products..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="nav-icons">
          <span>🧡 Wishlist</span>
          <span>🛒 Cart</span>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-container">
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          {regions.map((reg, i) => (
            <option key={i} value={reg}>{reg}</option>
          ))}
        </select>
      </div>

      {/* Main container */}
      <div className="landing-container">
        <h2>Explore Our Ethnic Products</h2>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                className="product-card"
                key={index}
                onClick={() => openModal(product)}
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') openModal(product); }}
              >
                <img
                  src={imageBaseURL + product.images[0]}
                  alt={product.name}
                  className="product-img"
                />
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price}</p>
                <p className="product-desc">{product.description}</p>
                <div className="product-actions">
                  <button
                    className="btn-cart"
                    onClick={e => e.stopPropagation()}
                  >Add to Cart</button>
                  <button
                    className="btn-wishlist"
                    onClick={e => e.stopPropagation()}
                  >❤️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal} aria-modal="true" role="dialog">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Close Modal">×</button>
            <div className="modal-body">
              <img
                src={imageBaseURL + selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="modal-img"
              />
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Region:</strong> {selectedProduct.region}</p>
                <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
