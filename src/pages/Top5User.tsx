import { useState, useEffect } from "react";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";
import "./Top5User.css";

interface User {
  id: number;
  username: string;
  total_purchases: number;
}

const Top5User = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    API.top5User()
      .then((res) => {
        setUsers(res.data);
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
              <th>USERNAME</th>
              <th>TOTAL DE COMPRAS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.total_purchases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Top5User;
