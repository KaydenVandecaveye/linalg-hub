import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const linkClass =
    "hover:underline hover:decoration-6 hover:underline-offset-8 pb-[2px] transition-all focus:outline-none focus:no-underline";
  
    return (
      <header className="flex items-center justify-between bg-red-700
                         p-4 text-white shadow-md w-screen">

        <NavLink to="/" className={`text-2xl font-bold ${linkClass}`}>
          LearnLinear
        </NavLink>
  
        <nav className="hidden md:flex space-x-6 text-lg">

          <NavLink to="/Learn" className={linkClass}>
            Learn
          </NavLink>

          <NavLink to="/Practice" className={linkClass}>
            Practice
          </NavLink>

          <NavLink to="/Calculate" className={linkClass}>
            Calculate
          </NavLink>

        </nav>
  
      </header>
    );
  };
  
export default Header;