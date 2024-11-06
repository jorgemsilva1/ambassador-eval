export const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  
  return data;
};