import React from "react";
import Navbar from "../Components/Navbar";
import PageNotFound from "../assets/page_not_found.svg";

function Error() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr from-slate-50 to-orange-200">
      <Navbar />
      <img className="w-full h-[41.5rem]" src={PageNotFound} alt="" />
    </div>
  );
}

export default Error;
