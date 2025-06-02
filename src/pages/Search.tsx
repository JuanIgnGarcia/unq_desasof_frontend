import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

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

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Resultados de búsqueda para: "{query}"</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : searchResults.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {searchResults.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                src={item.pictures[0]?.url || ""}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <div>
                <h3>{item.name}</h3>
                <p>
                  <strong>ID:</strong> {item.id}
                </p>
                <p>
                  <strong>Dominio:</strong> {item.domain_id}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(item.date_created).toLocaleDateString()}
                </p>
                <p>
                  <strong>Precio:</strong> {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
