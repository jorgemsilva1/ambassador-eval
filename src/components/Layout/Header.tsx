import useStore from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  onToggleProfileModal: () => void;
}

export default function Header({ onToggleProfileModal }: HeaderProps) {
  const { cart } = useStore();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="p-4 bg-gray-900 text-white">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-400">
              <div className="flex justify-center items-center">
                <Image
                  src="/Shopii.png"
                  alt="Shopii Logo"
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </div>
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-8">
          <Link
            href="/cart"
            className="relative flex items-center hover:text-gray-400 text-lg"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 inline-block w-5 h-5 bg-red-500 text-white text-xs rounded-full text-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={onToggleProfileModal}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
            aria-label="Open User Profile"
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>
    </header>
  );
}
