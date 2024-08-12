import React from "react";
import Navbar from "../Components/Navbar.tsx";
import { Link } from "react-router-dom";
import { gridList, playInstruction } from "../utils/constants.ts";
import Footer from "../Components/Footer.tsx";

const Home: React.FC = () => {
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
            {gridList.map((gridVal, index) => (
              <Link key={index} to={`/${gridVal}`}>
                <button className="inline-flex items-center py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs sm:text-md md:text-lg">
                  {gridVal} x {gridVal}
                </button>
              </Link>
            ))}
          </div>
          <div className="w-full pt-6">
            <h1 className="font-extrabold md:text-2xl text-xl text-gray-600">
              How to Play:
            </h1>
            <ul className="pl-8 list-item">
              {playInstruction.map((instructionVal, index) => (
                <li
                  key={index}
                  className="list-disc md:text-lg text-md text-gray-600 font-semibold"
                >
                  {instructionVal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
