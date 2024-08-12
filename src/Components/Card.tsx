import React, { useEffect } from "react";

interface CardProps {
  card: {
    isMatched: boolean;
    isInvisible: boolean;
    isFlipped: boolean;
    image: string;
  };
  onClick: () => void;
  number: number;
}

const Card: React.FC<CardProps> = ({ card, onClick, number }) => {
  useEffect(() => {
    if (card.isMatched) {
      const timer = setTimeout(() => {
        card.isInvisible = true;
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [card.isMatched, card]);

  const containerClasses =
    number >= 20 ? "w-auto h-auto" : "sm:w-20 sm:h-20 md:w-20 md:h-20";

  const imgSrc =
    card.isFlipped || card.isMatched ? card.image : "images/black.png";

  return (
    <div
      className={`${containerClasses} cursor-pointer ${
        card.isInvisible ? "invisible" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform ${
          card.isFlipped ? "transform rotate-y-180" : ""
        }`}
      >
        <img src={imgSrc} alt="card" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Card;
