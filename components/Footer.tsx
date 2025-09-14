'use client'; // Add this directive for components with client-side interactivity

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600">
        <div className="space-x-4 mb-4">
          <Link href="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-blue-600">
            Terms & Conditions
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} imprintshop.ca. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

