'use client'; // Add this directive for components with client-side interactivity

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          imprintshop.ca
        </Link>
        <nav className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-blue-600">
            Blog
          </Link>
          {/* Add other links like "Products" or "About" here later */}
        </nav>
      </div>
    </header>
  );
}

