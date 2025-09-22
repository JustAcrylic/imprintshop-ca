import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Information</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
              <li><Link href="/guarantees" className="hover:text-white">Our Guarantees</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-4">Stay in the know</h4>
            <p className="text-sm mb-4">Sign up to get the latest on sales, new releases and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-brand-blue text-white px-4 py-2 rounded-r-md hover:bg-brand-blue-dark">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {currentYear} ImprintShop.ca. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}