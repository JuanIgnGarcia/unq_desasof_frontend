import { useEffect, useState } from "react";

import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

interface Product {
  id: number;
  id_ml: string;
  title: string;
  url: string;
}

interface Shopped {
  amount: number;
  price: number;
  product_id: number;
  product: Product;
}

const UserShopped = () => {
  const [purchases, setPurchases] = useState<Shopped[]>([]);

  useEffect(() => {
    API.userShopped()
      .then((res) => {
        setPurchases(res.data);
      })
      .catch((error) => {
        toast.error(handleApiError(error));
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Historial de compras</h1>

      <div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Precio unitario</th>
              <th className="px-4 py-2">Precio total</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.price}>
                <td className="px-4 py-2">
                  <img src={purchase.product.url} className="h-12"></img>
                </td>
                <td className="px-4 py-2">{purchase.product.title}</td>
                <td className="px-4 py-2">{purchase.amount}</td>
                <td className="px-4 py-2">{purchase.price}</td>
                <td className="px-4 py-2">
                  {purchase.amount} x {purchase.price} = {purchase.amount * purchase.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserShopped;
