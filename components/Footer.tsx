// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="hover:text-gray-900">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-900">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-gray-900">
            Privacy Policy
          </Link>
        </div>
        <p>&copy; {currentYear} ImprintShop.ca. All Rights Reserved.</p>
      </div>
    </footer>
  );
}