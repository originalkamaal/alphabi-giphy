import React, { useState, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../firebase';
const Header = () => {
  const [menu, toggleMenu] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();


  useEffect(() => {
    // if user is not logged in navigating to login page
    if (!user) {
      navigate("/login");
    }
    console.log(user);
  }, [user]);


  //Function to toggle Sidebar menu in small screens
  const handleMenu = () => {
    toggleMenu(!menu);
  };

  //logout method exported from firebase config file


  return (
    <>
      <div className="flex w-full bg-gray-100 h-20 items-center justify-between px-4">
        <div className="flex md:hidden" onClick={handleMenu}>
          <BiMenu size={25} />
        </div>
        <div className="hidden md:flex font-bold text-2xl">GIPHYLAKE</div>
        <div className="flex gap-5">
          {user &&
            <div>
              Hi, {user.displayName ?? user.email}
            </div>
          }
          <div>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>

      <div
        className={`absolute w-full h-screen top-0 ${menu ? 'left-0' : '-left-full'
          } duration-200 bg-white flex flex-col items-end`}
      >
        <div className="p-5" onClick={handleMenu}>
          <AiFillCloseCircle size={25} />
        </div>
        <div className="flex w-full flex-col items-center font-bold my-2">
          {user &&
            <div className="border-y border-gray-300 border-collapse w-full text-center py-2">

              Hi, {user.displayName ?? user.email}
            </div>
          }
          <div className="border-b border-gray-300 w-full text-center py-2">
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
