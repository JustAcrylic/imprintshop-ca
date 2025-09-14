// /components/Footer.tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} ImprintShop.ca. All Rights Reserved.</p>
      </div>
    </footer>
  );
}