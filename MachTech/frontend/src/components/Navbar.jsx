import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { NavbarMenu } from "../mockData/data";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoIosConstruct } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ResponsiveMenu from './ResponsiveMenu';
import Login from './Login';
import Signup from './Signup';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate(); // ✅ Now it is inside a Router

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
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

  return (
    <nav className="relative w-full shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo section */}
        <div className="flex items-center gap font-bold mr-10">
          <IoIosConstruct />
          <span className="text-yellow-500">Mighty</span>
          <span className="text-secondar">Tech</span>
        </div>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex space-x-6">
            {NavbarMenu.map((item) => (
  <Link 
    key={item.id}
    to={`/${item.name.toLowerCase()}`} // ✅ Generates paths like "/home", "/shop"
    className="text-gray-600 hover:text-primar transition duration-300 hover:-translate-y-1 decoration-transparent"
  >
    {item.title}
  </Link>
))}
          </div>
        )}

        {/* Icon and Action Section */}
        <div className="flex items-center space-x-2">
          <button className="hover:bg-primar hover:text-white rounded-full p-2 transition duration-300">
            <BiSearchAlt2 className="w-6 h-6"/>
          </button>

          {/* Navigate to Cart */}
          <button 
            className="hover:bg-primar hover:text-white rounded-full p-2 transition duration-300"
            onClick={() => navigate('/cart')} // ✅ Navigate to Cart page
          >
            <FaShoppingCart className="w-6 h-6"/>
          </button>

          {!isMobile ? (
            <button 
              onClick={handleLoginClick}
              className="px-4 py-2 bg-gray-950 text-amber-50 border-2 border-black rounded-md 
              hover:bg-amber-50 hover:text-gray-950 transition duration-300"
            >
              <b>LOGIN</b>
            </button>
          ) : (
            <div onClick={toggleMenu} className="md:hidden cursor-pointer">
              <ResponsiveMenu isOpen={isMenuOpen} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
