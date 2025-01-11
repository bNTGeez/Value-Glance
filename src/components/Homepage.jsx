import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "@mui/material";

const Homepage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex justify-center flex-col items-center space-y-10">
        <div className="text-4xl sm:text-5xl md:text-7xl mt-20 font-lato">
          <h1>Your shortcut to find</h1>
          <h1 className="font-bold text-blue-900 text-center">
            winning stocks
          </h1>
        </div>
        <span className="text-sm sm:text-base">
          The secret is… there is no secret!
        </span>
        <Button
          className="bg-blue-900 px-6 py-2 sm:px-8 sm:py-3"
          variant="contained"
          onClick={handleClick}
        >
          {" "}
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
