import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

interface Picture {
  id: string;
  url: string;
}

interface Search {
  id: string;
  name: string;
  date_created: string;
  domain_id: string;
  pictures: Picture[];
  price?: string;
}

const generateRandomPrice = (): string => {
  const price = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  return `$${price.toLocaleString("es-AR")}`;
};

const SearchPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState<Search[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    API.search_product(query)
      .then((res) => {
        const resultsWithPrice = res.data.results.map((item: Search) => ({
          ...item,
          price: generateRandomPrice(),
        }));

        setSearchResults(resultsWithPrice);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
        setLoading(false);
      });
  }, [query]);

  const handleAddFavorite = (id: string) => {
    console.log("añadir a favoritos product con ID: ", id);
  };

  const handleCommentChange = (id: string, newComment: string) => {
    setSearchResults((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, comment: newComment } : product
      )
    );
  };

  const handleBuy = (id: string, quantity: number, price: number) => {
    console.log(`Comprar producto ${id} en cantidad: ${quantity} por ${price}`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Resultados de búsqueda para: "{query}"</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : searchResults.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productId={0}
              mlProdId={product.id}
              name={product.name}
              price={Number(product.price?.replace(/\$|,/g, "")) || 0}
              imageUrl={product.pictures[0]?.url || ""}
              initialComment={""}
              onRemove={() => handleAddFavorite(product.id)} // hacer click al corazon lanza onRemove
              onCommentChange={(newComment) =>
                handleCommentChange(product.id, newComment)
              }
              onBuy={handleBuy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
