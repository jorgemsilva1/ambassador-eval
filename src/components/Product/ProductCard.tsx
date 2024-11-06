"use client;";

import useStore from "@/store/store";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export interface ProductCardProps {
  product: Product;
  onSendSelectProduct : (product : Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSendSelectProduct }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const handleProductClick = (product : Product) => {
    onSendSelectProduct(product); 
  };


  return (
    <div
      key={product.id}
      className="flex flex-col p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
    >
      <div
        className="relative w-full h-36 cursor-pointer bg-white p-2 rounded-lg"
        onClick={() => handleProductClick(product)}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-sm font-semibold mt-2 line-clamp-2">
        {product.title}
      </h3>

      <div className="mt-auto flex flex-col justify-between space-y-2">
        <p className="text-base font-bold text-gray-800">${product.price}</p>

        <button
          onClick={() => handleAddToCart(product)}
          className="flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-700 transition px-3 py-2"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
