"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10"> 
      <nav className="flex justify-center space-x-16"> 
        <ul className="flex space-x-8"> 
          <li>
            <Link href="/" className="hover:text-gray-400 text-lg">Home</Link> 
          </li>
          <li>
            <Link href="/cart" className="hover:text-gray-400 text-lg">Cart</Link> 
          </li>
        </ul>
      </nav>

      <div className="text-center mt-10"> 
        <p className="text-lg">&copy; 2024 Shopii Store. All rights reserved.</p>
      </div>
    </footer>
  );
}