import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Header = () => {
  const [menu, toggleMenu] = useState(false);

  //Function to toggle Sidebar menu in small screens
  const handleMenu = () => {
    toggleMenu(!menu);
  };
  return (
    <>
      <div className="flex w-full bg-gray-100 h-20 items-center justify-between px-4">
        <div className="flex md:hidden" onClick={handleMenu}>
          <BiMenu size={25} />
        </div>
        <div className="hidden md:flex font-bold text-2xl">GIPHYLAKE</div>
        <div className="flex gap-5 underline">
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/login">Sign Up</Link>
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full h-screen top-0 ${
          menu ? 'left-0' : '-left-full'
        } duration-200 bg-white flex flex-col items-end`}
      >
        <div className="p-5" onClick={handleMenu}>
          <AiFillCloseCircle size={25} />
        </div>
        <div className="flex w-full flex-col items-center font-bold my-2">
          <div className="border-y border-black w-full text-center py-2">
            Login
          </div>
          <div className="border-b border-black w-full text-center py-2">
            Sing Up
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
