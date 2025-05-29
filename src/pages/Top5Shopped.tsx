import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import "./Top5User.css";

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
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITULO</th>
              <th>TOTAL DE COMPRAS</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {shoppeds.map((shopped) => (
              <tr key={shopped.id}>
                <td>{shopped.id}</td>
                <td>{shopped.title}</td>
                <td>{shopped.total_purchases}</td>
                <td>{shopped.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Top5Shopped;
