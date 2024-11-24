import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/store";
import { Product } from "@/types/product";
import { User } from "lucide-react";
import { useState, useEffect } from "react";
import PaymentSuccess from "./PaymentSuccess";
import { useRouter } from "next/navigation";

const paymentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  cardNumber: z.string().length(16, "Card number must be 16 digits"),
  expiryDate: z.string().length(5, "Expiration date must be MM/YY"),
  cvv: z.string().length(3, "CVV must be 3 digits"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

const PaymentModal: React.FC<{
  totalPrice: number;
  closeModal: () => void;
}> = ({ totalPrice, closeModal }) => {
  const { userProfile, cart, clearCart, addToInventory } = useStore();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter(); 

  let parsedProducts: Product[] = JSON.parse(
    localStorage.getItem("products") || "[]"
  );

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleAutoFill = () => {
    setFormValues({
      name: userProfile.name || "",
      email: userProfile.email || "",
      address: userProfile.address || "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  const formattedPrice = totalPrice.toFixed(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    reset(formValues);
  }, [formValues, reset]);

  const handlePaymentConfirmation = (data: PaymentFormData) => {
    setPaymentSuccess(true);
    cart.forEach((productCart) => {
      const product = parsedProducts.find(
        (p: Product) => p.id === productCart.id
      );
      if (product) {
        product.rating.count = product.rating.count - productCart.quantity;
      }
    });
    cart.forEach((p) => {
      addToInventory(p);
    });
    clearCart();
    router.push("/");
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {paymentSuccess ? (
          <PaymentSuccess onClose={closeModal} />
        ) : (
          <form onSubmit={handleSubmit(handlePaymentConfirmation)}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Payment Information</h2>
              <button
                onClick={handleAutoFill}
                type="button"
                className="flex items-center justify-center bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition"
              >
                <User className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                value={formValues.name}
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block">
                Address
              </label>
              <input
                id="address"
                type="text"
                {...register("address")}
                value={formValues.address}
                onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block">
                Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                {...register("cardNumber")}
                value={formValues.cardNumber}
                onChange={(e) => setFormValues({ ...formValues, cardNumber: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="expiryDate" className="block">
                Expiration Date
              </label>
              <input
                id="expiryDate"
                type="text"
                {...register("expiryDate")}
                value={formValues.expiryDate}
                onChange={(e) => setFormValues({ ...formValues, expiryDate: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="cvv" className="block">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                {...register("cvv")}
                value={formValues.cvv}
                onChange={(e) => setFormValues({ ...formValues, cvv: e.target.value })}
                className="w-full p-2 border rounded hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv.message}</p>
              )}
            </div>

            <p className="mb-4">
              Total Amount: <b>${formattedPrice}</b>
            </p>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Confirm Payment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
