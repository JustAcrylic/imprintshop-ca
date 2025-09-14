// app/store/layout.tsx
import React from 'react';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* You can add a shared header or sidebar for the store here */}
      <nav></nav>
 
      {children}
    </section>
  );
}