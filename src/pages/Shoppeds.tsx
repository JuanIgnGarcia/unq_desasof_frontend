import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import "./Top5User.css";

interface Shopped {
  amount: number;
  price: number;
  product_id: string;
}

const Shopped = () => {
  const [shoppeds, setShoppeds] = useState<Shopped[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    API.shoppeds()
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
              <th>PRODUCT ID</th>
              <th>AMOUNT</th>
              <th>PRICE</th>
            </tr>
          </thead>
          <tbody>
            {shoppeds.map((shopped) => (
              <tr key={shopped.product_id}>
                <td>{shopped.product_id}</td>
                <td>{shopped.amount}</td>
                <td>{shopped.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Shopped;
