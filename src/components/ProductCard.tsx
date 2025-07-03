import React from "react";
import { useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import API, { handleApiError } from "../services/API";
import { toast } from "react-toastify";

interface ProductCardProps {
  id: string;
  productId: number;
  mlProdId: string;
  name: string;
  price: number;
  imageUrl: string;
  initialRating?: number;
  initialComment?: string;
  onRemove: (id: string) => void;
  onCommentChange?: (id: string, comment: string) => void;
  onRatingChange?: (id: string, rating: number) => void;
  //onBuy?: (id: number, quantity: number, price: number) => void;
  onBuy?: (id: string, quantity: number, price: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  initialRating = 5,
  initialComment,
  productId,
  mlProdId,
  // onRemove,
  onCommentChange,
  onRatingChange,
  onBuy,
}) => {
  const [comment, setComment] = useState(initialComment ?? "");
  const [rating, setRating] = useState(initialRating);
  const [quantity, setQuantity] = useState(1);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    onCommentChange?.(id, value);
  };

  const handleStarClick = (index: number) => {
    const clickedRating = index + 1;
    const newRating = rating === clickedRating ? 0 : clickedRating;
    setRating(newRating);
    onRatingChange?.(id, newRating);
  };

  const handleAddFavorite = () => {
    API.addFavorite({
      score: rating,
      comment: comment,
      product_id: productId,
      product_id_ml: mlProdId,
      product_title: name,
      product_url: imageUrl,
    })
      .then((res) => {
        if (!res) return;
        toast.success("Product added to favorites");
      })
      .catch((error) => {
        toast.error(handleApiError(error));
      });
  };

  /*
  const handleBuyClick = () => {
    if (quantity > 0) {
      onBuy?.(id, quantity, price); // Argument of type 'number' is not assignable to parameter of type 'string'.

      API.buyProduct({
        amount: quantity,
        price: price,
        product_id: productId,
        product_id_ml: mlProdId,
        product_title: name,
        product_url: imageUrl,
      })
        .then((res) => {
          if (!res) return;
          toast.success("Purchase made successfully");
        })
        .catch((error) => {
          toast.error(handleApiError(error));
        });
    }
  };
  */

  const handleBuyClick = () => {
    if (quantity > 0) {
      onBuy?.(id, quantity, price);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-sm transition hover:shadow-lg">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-72 object-cover rounded-t-2xl" // acomodar a gusto ¿h-80?
      />

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">{name}</h2>
          <button onClick={handleAddFavorite} className="text-red-500 hover:text-red-600 transition" title="Eliminar de favoritos">
            <AiFillHeart size={20} />
          </button>
        </div>

        <p className="text-gray-600 text-sm">${price.toFixed(3)}</p>

        {/* Rating Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <AiFillStar key={i} size={16} onClick={() => handleStarClick(i)} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
          ))}
        </div>

        {/* USER COMMENT */}
        <textarea
          name="Comentario"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Agregá un comentario"
          className="w-full border border-gray-200 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />

        {/* Quantity + Buy button */}
        <div className="flex items-center gap-2 mt-2">
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 border rounded-md p-1 text-sm" min={1} />
          <button onClick={handleBuyClick} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
