interface ConfirmPurchaseModalProps {
  isOpen: boolean;
  product: Favorite | null;
  quantity: number;
  onConfirm: () => void;
  onCancel: () => void;
}

interface Product {
  id: number;
  id_ml: string;
  title: string;
  url: string;
}

interface Favorite {
  id: string;
  score: number;
  product: Product;
  price: number;
  comment: string;
}

const ConfirmPurchaseModal: React.FC<ConfirmPurchaseModalProps> = ({ isOpen, product, quantity, onConfirm, onCancel }) => {
  if (!isOpen || !product) return null;

  const total = product.price * quantity;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md ring-4 ring-gray-600 shadow-2xl shadow-gray-800">
        <h2 className="text-xl font-semibold mb-4">Confirmar Compra</h2>
        <p className="mb-2">
          Producto: <strong>{product.product.title}</strong>
        </p>
        <p className="mb-2">
          Cantidad: <strong>{quantity}</strong>
        </p>
        <p className="mb-4">
          Total: <strong>${total.toFixed(2)}</strong>
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseModal;
