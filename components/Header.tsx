// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors">
          ImprintShop.ca
        </Link>
        <div className="space-x-6">
          <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
            All Products
          </Link>
          <Link href="/cart" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}