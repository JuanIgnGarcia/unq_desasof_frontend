import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import "./Top5User.css";

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
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITULO</th>
              <th>TOTAL DE FAVORITOS</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr key={favorite.id}>
                <td>{favorite.id}</td>
                <td>{favorite.title}</td>
                <td>{favorite.total_favorites}</td>
                <td>{favorite.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Top5Favorites;
