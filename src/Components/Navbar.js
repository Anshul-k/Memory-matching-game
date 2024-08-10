import React from "react";
import Logo from "../assets/memory-transparent.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-center items-center p-10 rounded-md bg-transparent">
      <div className="w-56">
        <Link className="cursor-pointer" to="/">
          <img src={Logo} alt="Nav-image" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
