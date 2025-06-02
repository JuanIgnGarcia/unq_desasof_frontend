import ProductCard from "../components/ProductCard";

const mockProducts = [
  {
    id: "1",
    name: "Zapatillas de basquet Puma",
    price: 125200.88,
    imageUrl: "/src/assets/basket.jpg",
    rating: 4,
    comment: "Me hacen saltar alto",
  },
  {
    id: "2",
    name: "zapatillas de correr",
    price: 36200.5,
    imageUrl: "/src/assets/deportivas.webp",
    rating: 3,
    comment: "Dicen que son cómodas",
  },
];

export function Home() {
  const handleRemove = (id: string) => {
    console.log("Eliminar product con ID: ", id);
  };
  const handleCommentChange = (id: string, comment: string) => {
    console.log(`Nuevo comentario para ${id}: `, comment);
  };
  return (
    <>
      <h1>Esta es la homepage!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} {...product} initialComment={product.comment} onRemove={handleRemove} onCommentChange={handleCommentChange} />
        ))}
      </div>
    </>
  );
}
