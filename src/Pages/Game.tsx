import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar.tsx";
import Card from "../Components/Card.tsx";
import gameFinishImg from "../assets/yay-hooray.gif";
import { formatTime, gameInstructions } from "../utils/constants.ts";

// Define types for the card and statistics
interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
  isInvisible: boolean;
}

interface Statistic {
  label: string;
  value: string | number;
}

const Game: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const [cards, setCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  const generateCards = useCallback(() => {
    if (number && +number % 2 === 0) {
      const gridSize = +number;
      const requiredLength = (gridSize * gridSize) / 2;
      const cardImages = [...Array(72).keys()];
      const repeatedArray = Array(Math.ceil(requiredLength / cardImages.length))
        .fill(cardImages)
        .flat()
        .slice(0, requiredLength)
        .map((index) => `/images/image${index}.png`);

      const newCards = repeatedArray
        .concat(repeatedArray)
        .map((image, i) => ({
          id: i,
          image,
          isFlipped: false,
          isMatched: false,
          isInvisible: false,
        }))
        .sort(() => Math.random() - 0.5);
      return newCards;
    }
    return [];
  }, [number]);

  useEffect(() => {
    setCards(generateCards());
  }, [generateCards, number]);

  useEffect(() => {
    if (gameStarted && !gameFinished) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [gameStarted, gameFinished]);

  useEffect(() => {
    if (gameFinished) {
      let countdownValue = 5;
      setCountdown(countdownValue);

      const countdownTimer = setInterval(() => {
        countdownValue -= 1;
        setCountdown(countdownValue);

        if (countdownValue <= 0) {
          clearInterval(countdownTimer);
          navigate("/");
        }
      }, 1000);

      return () => clearInterval(countdownTimer);
    }
  }, [gameFinished, navigate]);

  const checkGameFinished = (cardsList: CardType[]): boolean => {
    return cardsList.every((card) => card.isMatched);
  };

  const handleCardClick = (id: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    );
    setCards(updatedCards);

    const flipped = updatedCards.filter(
      (card) => card.isFlipped && !card.isMatched
    );

    if (flipped.length === 2) {
      setMoves(moves + 1);

      if (flipped[0].image === flipped[1].image) {
        const newCards = cards.map((card) =>
          card.image === flipped[0].image ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
        if (checkGameFinished(newCards)) {
          console.log("game");
          setGameFinished(true);
        }
      } else {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card) =>
              card.isFlipped && !card.isMatched
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCards(generateCards());
    setMoves(0);
    setElapsedTime(0);
    setGameStarted(false);
    setGameFinished(false);
  };

  const statistic: Statistic[] = [
    { label: "Grid", value: `${number} x ${number}` },
    { label: "Moves", value: moves },
    { label: "Time", value: formatTime(elapsedTime) },
  ];

  return number && +number % 2 !== 0 ? (
    <Navigate to="/error" />
  ) : isNaN(Number(number)) || Number(number) > 100 ? (
    <Navigate to="/error" />
  ) : (
    <div className="bg-gradient-to-tr from-slate-50 to-orange-200 min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-[40rem] mt-auto">
        {gameFinished ? (
          <div className="flex flex-col w-full justify-center items-center">
            <img src={gameFinishImg} alt="Congrats" />
            <div className="mt-6 text-xl md:text-2xl flex flex-col gap-2 items-center">
              <p className="font-bold text-gray-600">
                <span className="text-orange-600">Congratulations!</span> You
                finished the game.
              </p>
              <p className="font-medium text-gray-600">
                Final Time:{" "}
                <span className="font-bold text-orange-600">
                  {formatTime(elapsedTime)}
                </span>
              </p>
              <p className="font-medium text-gray-600">
                Total Moves:{" "}
                <span className="font-bold text-orange-600">{moves}</span>
              </p>
              <p className="font-medium text-gray-600 pt-6">
                Redirecting to <span className="text-orange-600">HOME</span>{" "}
                page in {countdown}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="p-2 m-2 text-2xl font-bold text-orange-600">
              Let's see how sharp your memory is!
            </div>
            <div
              className={`flex flex-col ${
                Number(number) > 12 ? "md:flex-col-reverse" : "md:flex-row"
              } gap-6 w-full p-6 h-full items-center justify-center`}
            >
              <div>
                <div
                  className="grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${number}, minmax(0, 1fr))`,
                  }}
                >
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      number={Number(number)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                {statistic.map((stat, index) => (
                  <div
                    key={index}
                    className="font-extrabold text-lg text-gray-600"
                  >
                    {stat.label}:
                    <span className="ml-2 font-semibold text-gray-700">
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div className="flex gap-5 pt-5">
                  <button
                    onClick={resetGame}
                    className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg"
                  >
                    Reset
                  </button>
                  <Link to="/">
                    <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                      Home
                    </button>
                  </Link>
                </div>
                <div className="mt-8">
                  <p className="font-bold text-lg text-gray-600">
                    Instructions:
                  </p>
                  <ul className="ml-5 text-gray-500">
                    {gameInstructions.map((instruction, i) => (
                      <li key={i} className="list-disc">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
