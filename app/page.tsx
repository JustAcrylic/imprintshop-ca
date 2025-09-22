// app/page.tsx
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';

// Sample category data - you'll fetch this from Supabase later
const sampleCategories = [
  { name: 'Apparel', href: '/category/apparel', imageUrl: '/categories/apparel.jpg' },
  { name: 'Auto, Home & Tools', href: '/category/tools', imageUrl: '/categories/tools.jpg' },
  { name: 'Bags', href: '/category/bags', imageUrl: '/categories/bags.jpg' },
  { name: 'Drinkware', href: '/category/drinkware', imageUrl: '/categories/drinkware.jpg' },
  { name: 'Outdoor & Leisure', href: '/category/leisure', imageUrl: '/categories/leisure.jpg' },
  { name: 'Stationery', href: '/category/stationery', imageUrl: '/categories/stationery.jpg' },
  { name: 'Technology', href: '/category/tech', imageUrl: '/categories/tech.jpg' },
  { name: 'Toys & Novelties', href: '/category/toys', imageUrl: '/categories/toys.jpg' },
];

export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-brand-gray py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">You'll shine. We'll make certain.</h1>
          <p className="text-md md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            It's your logo, so it has to be perfect. The perfect product, perfectly printed and delivered on-time. That's certainty. <span className="font-semibold">And it's our promise to you.</span>
          </p>
          <Link href="#" className="text-brand-blue font-semibold mt-4 inline-block">
            Our Promise
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Promotional Product Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {sampleCategories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* You can add a Featured Brands section here later */}
    </>
  );
}