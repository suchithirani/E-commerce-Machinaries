import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavbarMenu } from '../mockData/data';

// eslint-disable-next-line react/prop-types
const ResponsiveMenu = ({ 
  isOpen, 
  toggleMenu, 
  isLoggedIn = false,
  onLoginClick,
  onSignupClick,
  onLogout
}) => {
  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const lineVariants = {
    closed: { width: "0%" },
    open: { width: "100%" }
  };

  const handleAuthClick = (action) => {
    // Close the menu first
    toggleMenu();
    
    // Then perform the auth action
    if (action === 'login') {
      onLoginClick && onLoginClick();
    } else if (action === 'signup') {
      onSignupClick && onSignupClick();
    } else if (action === 'logout') {
      onLogout && onLogout();
    }
  };

  return (
    <div className="relative z-20">
      {/* Hamburger Icon */}
      <div className="flex flex-col justify-center items-center cursor-pointer" onClick={toggleMenu}>
        <motion.div
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-gray-700 mb-1.5"
        />
        <motion.div
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-gray-700 mb-1.5"
        />
        <motion.div
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-gray-700"
        />
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden w-56"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="p-4">
          {NavbarMenu.map((item, index) => (
            <div key={item.id} className="mb-3">
              <motion.div variants={itemVariants}>
                <Link
                  to={`/${item.name.toLowerCase()}`}
                  className="block text-gray-700 hover:text-yellow-500 py-2 font-medium transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
                <motion.div
                  className="h-px bg-gray-200"
                  variants={lineVariants}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </div>
          ))}
          
          {/* Authentication buttons */}
          <motion.div
            className="mt-4 space-y-2"
            variants={itemVariants}
          >
            {isLoggedIn ? (
              <button 
                className="w-full py-2 bg-red-600 text-white border-2 border-red-500 rounded-md 
                hover:bg-amber-50 hover:text-gray-950 transition duration-300"
                onClick={() => handleAuthClick('logout')}
              >
                <b>LOGOUT</b>
              </button>
            ) : (
              <>
                <button 
                  className="w-full py-2 bg-gray-950 text-amber-50 border-2 border-black rounded-md 
                  hover:bg-amber-50 hover:text-gray-950 transition duration-300"
                  onClick={() => handleAuthClick('login')}
                >
                  <b>LOGIN</b>
                </button>
                <button 
                  className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-md 
                  hover:bg-gray-100 transition duration-300"
                  onClick={() => handleAuthClick('signup')}
                >
                  <b>SIGNUP</b>
                </button>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResponsiveMenu;