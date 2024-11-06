"use client";

import { useState } from "react";
import { Product } from "../../types/product";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";

interface ShoeGridProps {
  products: Product[];
}

const ShoeGrid: React.FC<ShoeGridProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-2">
        {products.map((product, index) => (
          <ProductCard
            onSendSelectProduct={handleProductClick}
            product={product}
            key={index}
          />
        ))}
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={closeModal}
        selectedProduct={selectedProduct}
      ></ProductModal>
    </>
  );
};

export default ShoeGrid;
