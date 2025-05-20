import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
  
    return (
      <header className="flex items-center justify-between bg-gray-700
                         p-4 text-white shadow-md w-screen">

        <button onClick={() => navigate("/")}
                className='text-2xl font-bold hover:text-green-500 transition'>
          LinAlgHub
        </button>
  
        <nav className="hidden md:flex space-x-6 text-lg">

          <button onClick={() => navigate("/Learn")}
            className='hover:text-green-500 transition'>
            Learn
          </button>

          <button onClick={() => navigate("/Practice")}
            className='hover:text-green-500 transition'>
            Practice
          </button>

          <button onClick={() => navigate("/Calculate")}
            className='hover:text-green-500 transition'>
            Calculate
          </button>

        </nav>
  
      </header>
    );
  };
  
export default Header;