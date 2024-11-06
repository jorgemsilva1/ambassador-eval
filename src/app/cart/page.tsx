"use client";

import PaymentModal from "@/components/Payment/PaymentModal";
import useStore from "@/store/store";
import Image from "next/image";
import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Product } from "@/types/product";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let parsedProducts: Product[] = JSON.parse(
    localStorage.getItem("products") || "[]"
  );

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center border p-4">
                  <div className="relative w-24 h-24 mr-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>${item.price}</p>
                    <div className="flex items-center mt-2">
                      <label htmlFor="quantity" className="mr-2">
                        Quantity :
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        max={
                          parsedProducts.find(
                            (product) => product.id == item.id
                          )?.rating.count
                        }
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value || "1", 10)
                          )
                        }
                        onBlur={(e) => {
                          const maxStock =
                            parsedProducts.find(
                              (product) => product.id === item.id
                            )?.rating.count || 0;
                          const newQuantity = parseInt(e.target.value, 10);

                          if (newQuantity > maxStock) {
                            handleQuantityChange(item.id, maxStock);
                          }
                        }}
                        className="w-16 p-1 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xl font-bold">
              Total : ${totalPrice.toFixed(2)}
            </div>
            <button
              onClick={openModal}
              className="mt-4 flex items-center justify-center bg-gray-800 text-white px-12 py-2 rounded hover:bg-gray-700 transition"
            >
              <CreditCard className="w-6 h-6 mr-3" />
              Pay
            </button>
          </>
        )}

        {isModalOpen && (
          <PaymentModal totalPrice={totalPrice} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

export default CartPage;
