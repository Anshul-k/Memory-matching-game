import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const gridList = [2, 4, 6, 8, 10];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr from-slate-50 to-orange-200">
      <Navbar />
      <div className="flex justify-center items-center md:h-[44rem]">
        <div className="w-full p-3 m-3 flex flex-col gap-4 items-center justify-center">
          <p className="font-bold font-sans text-3xl text-gray-600">
            Sharpen Your Memory with a Fun Challenge!
          </p>
          <p className="font-semibold text-lg text-gray-500">
            Test your memory skills by matching pairs in different grid sizes.
            Choose your challenge and get started!
          </p>
          <div className="font-bold text-lg text-orange-400">
            Choose Your Grid Size
          </div>
          <Link
            to={`/${gridList[Math.floor(Math.random() * gridList.length)]}`}
          >
            <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-white rounded-md transition duration-300 text-xs sm:text-md md:text-lg">
              Select Random
            </button>
          </Link>
          <p className="font-bold">Or</p>
          <div className="flex gap-3 md:gap-5 flex-wrap">
            <Link to="/2">
              <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                2 x 2
              </button>
            </Link>
            <Link to="/4">
              <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                4 x 4
              </button>
            </Link>
            <Link to="/6">
              <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                6 x 6
              </button>
            </Link>
            <Link to="/8">
              <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                8 x 8
              </button>
            </Link>
            <Link to="/10">
              <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                10 x 10
              </button>
            </Link>
          </div>
          <div className="w-full pt-6">
            <h1 className="font-extrabold md:text-2xl text-xl text-gray-600">
              How to Play:
            </h1>
            <ul className="pl-8 list-item">
              <li className="list-disc md:text-lg text-md text-gray-600 font-semibold">
                Choose a grid size to start the game.
              </li>
              <li className="list-disc md:text-lg text-md text-gray-600 font-semibold">
                Once the game begins, flip the cards to reveal the images.
              </li>
              <li className="list-disc md:text-lg text-md text-gray-600 font-semibold">
                Match pairs of identical images to clear them from the grid.
              </li>
              <li className="list-disc md:text-lg text-md text-gray-600 font-semibold">
                The game ends when all pairs are matched. Try to complete the
                game with the fewest moves and in the shortest time!
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="mt-auto w-full text-center p-4 bg-gray-600 text-gray-200">
        <p className="font-sans text-lg">
          <a href="mailto:anshul.kasana98@gmail.com">
            anshul.kasana98@gmail.com
          </a>
          <span className="ml-1">&copy;</span>
          <span className="ml-1">{new Date().getFullYear()}</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
