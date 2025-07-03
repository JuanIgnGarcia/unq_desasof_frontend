import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import ConfirmPurchaseModal from "../components/ConfirmPurchaseModal";

interface Product {
  id: number;
  id_ml: string;
  title: string;
  url: string;
}

interface Favorite {
  id: string;
  score: number;
  product: Product;
  price: number;
  comment: string;
}

const generateRandomPrice = (): number => {
  const price = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  return price;
};

export function Home() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Favorite | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleRemove = (id: string) => {
    console.log("Eliminar product con ID: ", id);
  };
  const handleCommentChange = (id: string, comment: string) => {
    console.log(`Nuevo comentario para ${id}: `, comment);
  };

  /*
    const handleBuy = (productId: string, quantity: number, price: number) => {
    console.log(`Comprar producto ${productId} en cantidad: ${quantity} por ${price}`);
  };
  */

  const handleBuy = (productId: string, quantity: number, price: number) => {
    const product = favorites.find((f) => f.id === productId);
    if (product) {
      setSelectedProduct(product);
      setSelectedQuantity(quantity);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedQuantity(1);
    setIsModalOpen(false);
  };

  useEffect(() => {
    API.userFavorites()
      .then((res) => {
        const resultsWithPrice = res.data.map((item: Favorite) => ({
          ...item,
          price: generateRandomPrice(),
        }));
        setFavorites(resultsWithPrice);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
      });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Lista de favoritos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {favorites.map((favorite) => (
          <ProductCard
            key={favorite.id}
            id={favorite.id}
            productId={favorite.product.id}
            name={favorite.product.title}
            price={favorite.price}
            onRemove={handleRemove}
            onCommentChange={handleCommentChange}
            onBuy={handleBuy}
            imageUrl={favorite.product.url}
            initialComment={favorite.comment}
            mlProdId={favorite.product.id_ml || ""}
          />
        ))}
      </div>

      {selectedProduct && (
        <ConfirmPurchaseModal
          isOpen={isModalOpen}
          product={selectedProduct}
          quantity={selectedQuantity}
          onConfirm={() => {
            if (!selectedProduct) return;

            API.buyProduct({
              amount: selectedQuantity,
              price: selectedProduct.price,
              product_id: selectedProduct.product.id,
              product_id_ml: selectedProduct.product.id_ml,
              product_title: selectedProduct.product.title,
              product_url: selectedProduct.product.url,
            })
              .then((res) => {
                if (!res) return;
                toast.success("Compra realizada exitosamente");
                handleCloseModal();
              })
              .catch((error) => {
                toast.error(handleApiError(error));
                console.log(error);
              });
          }}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
}
