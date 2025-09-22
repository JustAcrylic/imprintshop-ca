import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Inter font
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] }); // Configure Inter

export const metadata: Metadata = {
  title: "ImprintShop.ca - Promotional Products Canada",
  description: "Your source for custom branded merchandise in Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
          <main className="flex-grow bg-secondary">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}