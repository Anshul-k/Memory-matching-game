import React, { useEffect } from "react";

function Card({ card, onClick, number }) {
  useEffect(() => {
    if (card.isMatched) {
      const timer = setTimeout(() => {
        card.isInvisible = true;
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [card.isMatched, card]);

  return (
    <div
      className={`${
        number >= 6
          ? "sm:w-12 sm-h-12 md:w-10 md:h-10 lg:w-16 lg:h-16"
          : "sm:w-24 sm:h-24 md:w-24 md:h-24"
      } cursor-pointer ${card.isInvisible ? "invisible" : ""}`}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full transition-transform ${
          card.isFlipped ? "transform rotate-y-180" : ""
        }`}
      >
        <img
          src={
            card.isFlipped || card.isMatched ? card.image : "images/black.png"
          }
          alt="card"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Card;
