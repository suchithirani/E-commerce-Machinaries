//import React, { useState, useEffect } from 'react';
//import { NavbarMenu } from '../mockData/data';

// eslint-disable-next-line react/prop-types
const ResponsiveMenu = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 focus:outline-none"
      aria-label="Toggle menu"
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <span
          className={`w-full h-0.5 bg-black transform transition-all duration-200 ease-in
              ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`w-full h-0.5 bg-black transition-all duration-200 ease-in
              ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`w-full h-0.5 bg-black transform transition-all duration-200 ease-in
              ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </div>
    </button>
  );
};

export default ResponsiveMenu;
