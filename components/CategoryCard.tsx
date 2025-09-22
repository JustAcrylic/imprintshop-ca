import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  href: string;
}

export default function CategoryCard({ name, imageUrl, href }: CategoryCardProps) {
  return (
    <Link href={href} className="flex flex-col items-center text-center group">
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-brand-blue transition-all duration-300">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700 group-hover:text-brand-blue transition-colors">{name}</span>
    </Link>
  );
}