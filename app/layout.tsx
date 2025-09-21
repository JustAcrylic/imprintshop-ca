// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import a new font
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Configure the font
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'] 
});

export const metadata: Metadata = {
  title: "ImprintShop.ca",
  description: "Your source for custom branded merchandise in Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Use the new font class and flexbox for layout */}
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}