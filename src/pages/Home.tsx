import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

interface Picture {
  id: string;
  url: string;
}

interface Product {
  id: string;
  id_ml: string;
  title: string;
  url: string;
}

interface Favorite {
  id: string;
  score: number;
  product: Product;
  price: number;
}

const generateRandomPrice = (): number => {
  const price = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  return price;
};

export function Home() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const handleRemove = (id: string) => {
    console.log("Eliminar product con ID: ", id);
  };
  const handleCommentChange = (id: string, comment: string) => {
    console.log(`Nuevo comentario para ${id}: `, comment);
  };

  const handleBuy = (id: string, quantity: number, price: number) => {
    console.log(`Comprar producto ${id} en cantidad: ${quantity} por ${price}`);
  };

  useEffect(() => {
    setLoading(true);

    API.userFavorites()
      .then((res) => {
        const resultsWithPrice = res.data.map((item: Favorite) => ({
          ...item,
          price: generateRandomPrice(),
        }));
        setFavorites(resultsWithPrice);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Bienvenido a Seguí tus compras</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {favorites.map((favorite) => (
          <ProductCard
            key={favorite.id}
            id={favorite.id}
            name={favorite.product.title}
            price={favorite.price}
            onRemove={handleRemove}
            onCommentChange={handleCommentChange}
            onBuy={handleBuy}
            imageUrl={null}
          />
        ))}
      </div>
    </>
  );
}
