"use client";

import useStore from "@/store/store";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

const ProductModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
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

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="bg-white p-4 rounded-lg w-full max-w-3xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-3xl font-bold"
        >
          &times;
        </button>

        {selectedProduct && (
          <div className="w-full lg:max-w-[100%] mx-auto p-4 space-y-3 bg-white">
            <div className="relative w-full h-36 mb-4 bg-white">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width={400}
                height={200}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <div>
                <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
                <p className="text-base font-bold text-gray-800">
                  ${selectedProduct.price}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
                <p>
                  <strong>Stock:</strong>{" "}
                  {selectedProduct.rating.count > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
                <p>
                  <strong>Rating:</strong> {selectedProduct.rating.rate} / 5
                </p>
              </div>

              <div className="text-sm text-gray-700">
                <h3 className="font-semibold">Description:</h3>
                <p>{selectedProduct.description}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="mt-3 flex items-center justify-center rounded bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 transition"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
