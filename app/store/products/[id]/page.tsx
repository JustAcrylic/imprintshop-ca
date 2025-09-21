// Define the shape of the props for this page
type ProductPageProps = {
  params: {
    id: string; // The 'id' comes from the folder name [id]
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Product Details</h1>
      <p>Showing product with ID: {params.id}</p>
      {/* Fetch and display product data here */}
    </main>
  );
}