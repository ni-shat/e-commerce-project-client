'use client';

import Link from 'next/link';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';


export default function Header() {
  const { totalItemsInCart } = useCart();

  return (
    <header>
      {/* Topbar */}
      <div className="bg-gray-800 text-white text-sm p-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <p>📞 +123 456 7890</p>
          <p>📧 support@shopease.com</p>
        </div>
        <p className="hidden md:block">Your Trusted eCommerce Partner</p>
      </div>

      {/* Navbar */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">ShopEase</div>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-yellow-500">Home</Link>
          <Link href="/products" className="hover:text-yellow-500">Products</Link>
          <Link href="/about" className="hover:text-yellow-500">About Us</Link>
          <Link href="/checkout" className="hover:text-yellow-500">Buy Now</Link>
        </nav>

        {/* Search and Cart Icons */}
        <div className="flex items-center space-x-4">
          <FaSearch className="hover:text-yellow-500 cursor-pointer" />

          {/* Cart Icon with item count */}
          <Link href="/checkout" className="relative">
              <FaShoppingCart className="hover:text-yellow-500 cursor-pointer" />
              {/* Show cart item count as a tooltip */}
              {totalItemsInCart > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {totalItemsInCart}
                </span>
              )}
          </Link>

        </div>
      </div>

      {/* Responsive Mobile Menu */}
      <div className="md:hidden bg-gray-900 text-white p-4">
        <div className="flex justify-between">
          <div className="text-2xl font-bold">ShopEase</div>
          {/* Menu Button (optional - add mobile menu toggle here) */}
        </div>
        {/* Mobile Nav Links */}
        <nav className="flex flex-col space-y-2 mt-4">
          <Link href="/" className="hover:text-yellow-500">Home</Link>
          <Link href="/products" className="hover:text-yellow-500">Products</Link>
          <Link href="/about" className="hover:text-yellow-500">About Us</Link>
          <Link href="/checkout" className="hover:text-yellow-500">Buy Now</Link>
        </nav>
      </div>
    </header>
  );
}
