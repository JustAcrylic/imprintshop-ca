// app/store/layout.tsx
import React from 'react';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps around pages inside the /store directory.
  // The main header, footer, and global styles are already in the root layout.
  return <section className="container mx-auto px-4">{children}</section>;
}