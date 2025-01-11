import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 p-4 bg-transparent">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" width={150} height={300} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
