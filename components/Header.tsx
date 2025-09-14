// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">
          ImprintShop.ca
        </Link>
        <div>
          <Link href="/cart" className="ml-4">
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}