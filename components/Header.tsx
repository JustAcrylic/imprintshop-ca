// components/Header.tsx
import Link from 'next/link';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 border-b">
      {/* Top Bar */}
      <div className="bg-gray-100 text-xs text-gray-600">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <span>Call us at: 1-800-300-1336</span>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-brand-blue">24 Hour Rush</Link>
            <Link href="#" className="hover:text-brand-blue">New Products</Link>
            <Link href="#" className="hover:text-brand-blue">On Sale</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-3xl text-brand-blue">
            4imprint
            <span className="block text-xs font-normal text-gray-500 -mt-1">All prices in CAD</span>
          </Link>
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Search for pens, mugs, t-shirts..."
                className="w-full px-4 py-2 rounded-md border bg-gray-50 focus:ring-brand-blue focus:border-brand-blue"
              />
              <button className="absolute right-0 top-0 bottom-0 bg-gray-200 text-gray-700 px-4 rounded-r-md hover:bg-gray-300">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="#" className="flex items-center text-gray-700 hover:text-brand-blue">
              <UserIcon className="h-5 w-5 mr-1" />
              Sign In
            </Link>
            <Link href="/cart" className="flex items-center text-gray-700 hover:text-brand-blue">
              <ShoppingCartIcon className="h-5 w-5 mr-1" />
              (0)
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}