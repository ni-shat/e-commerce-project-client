import Link from 'next/link';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

export default function Header() {
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
          <a href="/products" className="hover:text-yellow-500">Products</a>
          <a href="/about" className="hover:text-yellow-500">About Us</a>
          <a href="/contact" className="hover:text-yellow-500">Contact</a>
        </nav>

        {/* Search and Cart Icons */}
        <div className="flex items-center space-x-4">
          <FaSearch className="hover:text-yellow-500 cursor-pointer" />
          <FaShoppingCart className="hover:text-yellow-500 cursor-pointer" />
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
          <a href="/products" className="hover:text-yellow-500">Products</a>
          <a href="/about" className="hover:text-yellow-500">About Us</a>
          <a href="/contact" className="hover:text-yellow-500">Contact</a>
        </nav>
      </div>
    </header>
  );
}
