// components/Header.tsx
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // You'll need to install heroicons

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl text-brand-blue hover:opacity-80 transition-opacity">
          ImprintShop.ca
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/products" className="text-gray-700 hover:text-brand-blue transition-colors">
            All Products
          </Link>
          <Link href="/cart" className="flex items-center text-gray-700 hover:text-brand-blue transition-colors">
            <ShoppingCartIcon className="h-6 w-6 mr-1" />
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}