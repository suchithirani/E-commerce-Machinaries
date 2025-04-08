import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavbarMenu } from "../mockData/data";
import { IoIosConstruct } from "react-icons/io";
import ResponsiveMenu from './ResponsiveMenu';
import Login from './Login';
import Signup from './Signup';
import { toast } from "react-toastify";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeLoginSignup = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeLoginSignup();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/'); // Redirect to landing page
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isMobile = screenWidth < 768;

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse", 
        duration: 1.5 
      } 
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: index => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2 + index * 0.1,
        duration: 0.5
      }
    }),
    hover: { 
      scale: 1.1, 
      color: "#EAB308", // yellow-500 color
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
    },
    tap: { scale: 0.95 }
  };

  // Floating dots animation for visual interest (like in landing page)
  const floatingDots = [
    { 
      className: "absolute top-1 right-12 w-2 h-2 bg-yellow-300 rounded-full opacity-70",
      animate: { y: [0, -8, 0], opacity: [0.7, 0.9, 0.7] },
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    },
    {
      className: "absolute bottom-1 left-32 w-3 h-3 bg-yellow-400 rounded-full opacity-70",
      animate: { y: [0, 8, 0], opacity: [0.7, 0.9, 0.7] },
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }
    },
    {
      className: "absolute top-6 right-40 w-4 h-4 bg-yellow-200 rounded-full opacity-70",
      animate: { y: [0, -10, 0], opacity: [0.7, 0.9, 0.7] },
      transition: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }
    }
  ];

  return (
    <motion.nav 
      className="relative w-full shadow-md overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-blue-300 rounded-full opacity-10"
        initial={{ x: 50, y: -50 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-300 rounded-full opacity-10"
        initial={{ x: -50, y: 50 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Floating dots for visual interest */}
      {floatingDots.map((dot, index) => (
        <motion.div 
          key={index}
          className={dot.className}
          animate={dot.animate}
          transition={dot.transition}
        />
      ))}
      
      <div className="container mx-auto px-4 flex justify-between items-center py-4 relative z-10">
        {/* Logo section */}
        <motion.div 
          className="flex items-center gap-1 font-bold mr-10"
          variants={logoVariants}
          whileHover="hover"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <IoIosConstruct className="text-yellow-500" />
          </motion.div>
          <span className="text-yellow-500">Mighty</span>
          <span className="text-gray-700">Tech</span>
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex space-x-6">
            {NavbarMenu.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link
                  to={`/${item.name.toLowerCase()}`}
                  className="text-gray-600 transition duration-300 decoration-transparent"
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Icon and Action Section */}
        <div className="flex items-center space-x-2">
  {!isMobile ? (
    isLoggedIn ? (
      <motion.button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white border-2 border-red-500 rounded-md 
        hover:bg-amber-50 hover:text-gray-950 transition duration-300"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <b>LOGOUT</b>
      </motion.button>
    ) : (
      <motion.button
        onClick={handleLoginClick}
        className="px-4 py-2 bg-gray-950 text-amber-50 border-2 border-black rounded-md 
        hover:bg-amber-50 hover:text-gray-950 transition duration-300"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <b>LOGIN</b>
      </motion.button>
    )
  ) : (
    <div className="md:hidden">
      <ResponsiveMenu 
        isOpen={isMenuOpen} 
        toggleMenu={toggleMenu}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
        onLogout={handleLogout}
      />
    </div>
  )}
</div>
      </div>

      {/* Login/Signup Modals */}
      {showLogin && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Login 
              onClose={closeLoginSignup} 
              onSignupClick={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        </motion.div>
      )}

      {showSignup && (
        <motion.div 
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Signup 
              onClose={closeLoginSignup} 
              onLoginClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }} 
              onSignupSuccess={handleLoginSuccess}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;