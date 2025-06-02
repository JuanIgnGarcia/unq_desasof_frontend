import React from "react";
import { useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  initialRating?: number;
  initialComment?: string;
  onRemove: (id: string) => void;
  onCommentChange?: (id: string, comment: string) => void;
  onRatingChange?: (id: string, rating: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, initialRating = 5, initialComment = "", onRemove, onCommentChange, onRatingChange }) => {
  const [comment, setComment] = useState(initialComment);
  const [rating, setRating] = useState(initialRating);

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

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-sm transition hover:shadow-lg">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">{name}</h2>
          <button onClick={() => onRemove(id)} className="text-red-500 hover:text-red-600 transition" title="Eliminar de favoritos">
            <AiFillHeart size={20} />
          </button>
        </div>

        <p className="text-gray-600 text-sm">${price.toFixed(2)}</p>

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
      </div>
    </div>
  );
};

export default ProductCard;
