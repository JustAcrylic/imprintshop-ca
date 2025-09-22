import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { CubeTransparentIcon, PencilIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const sampleCategories = [
  { name: 'Apparel', href: '/category/apparel', imageUrl: '/categories/apparel.jpg' },
  { name: 'Drinkware', href: '/category/drinkware', imageUrl: '/categories/drinkware.jpg' },
  { name: 'Bags', href: '/category/bags', imageUrl: '/categories/bags.jpg' },
  { name: 'Tech', href: '/category/tech', imageUrl: '/categories/tech.jpg' },
  { name: 'Office', href: '/category/office', imageUrl: '/categories/office.jpg' },
  { name: 'Wellness', href: '/category/wellness', imageUrl: '/categories/wellness.jpg' },
  { name: 'Outdoor', href: '/category/outdoor', imageUrl: '/categories/outdoor.jpg' },
  { name: 'Tradeshow', href: '/category/tradeshow', imageUrl: '/categories/tradeshow.jpg' },
];

export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">You'll shine. We'll make certain.</h1>
          <p className="text-md md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            It&apos;s your logo, so it has to be perfect. The perfect product, perfectly printed and delivered on-time. That&apos;s certainty. <span className="font-semibold">And it&apos;s our promise to you.</span>
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto p-4 md:p-8 mt-8">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Product Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {sampleCategories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-brand-gray py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CubeTransparentIcon className="h-12 w-12 text-brand-blue mb-4" />
              <h3 className="font-bold text-lg">1. Choose Your Product</h3>
              <p className="text-sm text-gray-600 mt-2">Browse our wide selection of items and find the perfect one for your brand.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PencilIcon className="h-12 w-12 text-brand-blue mb-4" />
              <h3 className="font-bold text-lg">2. Upload Your Logo</h3>
              <p className="text-sm text-gray-600 mt-2">Our easy-to-use design tool lets you upload your art and see a virtual proof.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <PaperAirplaneIcon className="h-12 w-12 text-brand-blue mb-4" />
              <h3 className="font-bold text-lg">3. Approve & Ship</h3>
              <p className="text-sm text-gray-600 mt-2">Once you approve your final proof, we'll get to work printing and shipping your order on time.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}