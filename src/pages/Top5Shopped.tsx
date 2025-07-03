import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

interface Shopped {
  id: number;
  title: string;
  total_purchases: number;
  url: string;
}

const Top5Shopped = () => {
  const [shoppeds, setShoppeds] = useState<Shopped[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    API.Top5Shopped()
      .then((res) => {
        setShoppeds(res.data);
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
              <th className="px-4 py-3">TÍTULO</th>
              <th className="px-4 py-3">TOTAL DE COMPRAS</th>
              <th className="px-4 py-3">IMAGEN</th>
            </tr>
          </thead>
          <tbody>
            {shoppeds.map((shopped) => (
              <tr key={shopped.id}>
                <td className="px-4 py-3">{shopped.id}</td>
                <td className="px-4 py-3">{shopped.title}</td>
                <td className="px-4 py-3">{shopped.total_purchases}</td>
                <td className="px-4 py-3">
                  <img
                    src={shopped.url}
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

export default Top5Shopped;
