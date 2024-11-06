"use client"; 

import { useState, useEffect } from "react";
import { fetchProducts } from "@/utils/api"; 
import PageLoader from "@/components/Loader/PageLoader";
import ShoeGrid from "@/components/Product/ProductGrid";
import { Product } from "@/types/product"; 


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false); 
    } else {
      const loadProducts = async () => {
        try {
          const data = await fetchProducts(); 
          setProducts(data); 
          localStorage.setItem("products", JSON.stringify(data)); 
        } catch (error) {
          console.error("Error when loading products", error);
        } finally {
          setLoading(false); 
        }
      };
      loadProducts(); 
    }
  }, []); 

  return (
    <div>
      <ShoeGrid products={products} />
      {loading && <PageLoader />}
    </div>
  );




}
