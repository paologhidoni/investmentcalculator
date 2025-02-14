import React from "react";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-(--secondary-color) border-b-4 border-b-(--primary-color)">
      <img
        src={logo}
        alt="Investment Calculator App Logo"
        className="max-w-48 mx-auto"
      />
    </header>
  );
};

export default Header;
