import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

interface Favourite {
  id: number;
  title: string;
  total_favorites: number;
  url: string;
}

const Top5Favorites = () => {
  const [favorites, setFavorites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    API.Top5Favorites()
      .then((res) => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
        setLoading(false);
      });
  }, []);

  return (
    <div className="table-container">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="w-full table-auto border-collapse text-center text-xl">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-9 py-3">ID</th>
              <th className="px-9 py-3">TITULO</th>
              <th className="px-9 py-3">TOTAL DE FAVORITOS</th>
              <th className="px-9 py-3"> IMAGEN </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr key={favorite.id}>
                <td className="px-4 py-3">{favorite.id}</td>
                <td className="px-4 py-3">{favorite.title}</td>
                <td className="px-4 py-3">{favorite.total_favorites}</td>
                <td className="px-4 py-3">
                  <img
                    src={favorite.url}
                    className="h-20 mx-auto"
                    alt="Imagen"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Top5Favorites;
