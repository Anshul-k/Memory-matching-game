import React from "react";
import Navbar from "../Components/Navbar";
import PageNotFound from "../assets/page_not_found.svg";

function Error() {
  return (
    <div>
      <Navbar />
      <img className="w-full h-[44.5rem]" src={PageNotFound} alt="" />
    </div>
  );
}

export default Error;
