const BASE_URL = "http://127.0.0.1:5000";
export async function fetchAllProducts(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${BASE_URL}/customers/products?${query}`);
  return await response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/customers/products/${id}`);
  return await response.json();
}
