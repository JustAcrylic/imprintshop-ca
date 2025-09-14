// /components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ImprintShop.ca
        </Link>
        <div>
          <Link href="/cart" className="text-gray-600 hover:text-blue-600">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}