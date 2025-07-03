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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Search | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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

  const handleBuy = (productId: string, quantity: number) => {
    const product = searchResults.find((f) => f.id === productId);
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

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Confirmar compra</h2>

            <div className="flex items-center gap-4">
              <img
                src={selectedProduct.pictures[0]?.url}
                alt="Producto"
                className="h-24 rounded"
              />
              <div>
                <p className="font-bold">{selectedProduct.name}</p>
                <p className="text-gray-600">Precio: {selectedProduct.price}</p>
                <label className="block mt-2">
                  Cantidad:
                  <input
                    type="number"
                    min={1}
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number(e.target.value))
                    }
                    className="border border-gray-300 rounded px-2 py-1 w-20 ml-2"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  API.buyProduct({
                    amount: selectedQuantity,
                    price: Number(
                      selectedProduct.price?.replace(/\$|,/g, "") || 0
                    ),
                    product_id: -1,
                    product_id_ml: selectedProduct.id,
                    product_title: selectedProduct.name,
                    product_url: selectedProduct.pictures[0].url,
                  })
                    .then(() => {
                      toast.success("Compra realizada exitosamente");
                      handleCloseModal();
                    })
                    .catch((error) => {
                      toast.error(handleApiError(error));
                      console.error(error);
                    });
                }}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
