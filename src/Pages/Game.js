import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import gameFinishImg from "../assets/yay-hooray.gif";

function Game() {
  const { number } = useParams();
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const generateCards = useCallback(() => {
    if (number % 2 === 0) {
      const cardImages = [...Array((number * number) / 2).keys()].map(
        () => `/images/image${Math.floor(Math.random() * 71)}.png`
      );

      const newCards = cardImages
        .concat(cardImages)
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
  }, [number]);

  useEffect(() => {
    setCards(generateCards());
  }, [generateCards, number]);

  useEffect(() => {
    if (gameStarted && !gameFinished) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
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

  const checkGameFinished = (cardsList) => {
    return cardsList.every((card) => card.isMatched);
  };

  const handleCardClick = (id) => {
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const gridClassName = {
    2: "grid grid-cols-2 gap-2",
    4: "grid grid-cols-4 gap-2",
    6: "grid grid-cols-6 gap-2",
    8: "grid grid-cols-8 gap-2",
    10: "grid grid-cols-10 gap-2",
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setCards(generateCards());
    setMoves(0);
    setElapsedTime(0);
    setGameStarted(false);
    setGameFinished(false);
  };

  if (number % 2 !== 0) {
    return <Navigate to="/error" />;
  }

  return isNaN(number) || number >= 12 ? (
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
            <div className="flex flex-col md:flex-row gap-6 w-full p-6 h-full items-center justify-center">
              <div>
                <div className={gridClassName[number]}>
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      onClick={() => handleCardClick(card.id)}
                      number={number}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-extrabold text-lg text-gray-600">
                  Grid:
                  <span className="ml-2 font-semibold text-gray-700">
                    {number} x {number}
                  </span>
                </div>
                <div className="font-extrabold text-lg text-gray-600">
                  Moves:
                  <span className="ml-2 font-semibold text-gray-700">
                    {moves}
                  </span>
                </div>
                <div className="font-extrabold text-lg text-gray-600">
                  Time:
                  <span className="ml-2 font-semibold text-gray-700">
                    {formatTime(elapsedTime)}
                  </span>
                </div>
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
                    <li className="list-disc">
                      Timer will start when you start the game.
                    </li>
                    <li className="list-disc">
                      Flip the cards to reveal the images.
                    </li>
                    <li className="list-disc">
                      Match all pairs to win the game!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
