import { useEffect, useState } from 'react';
import { NavbarMenu } from "../mockData/data";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoIosConstruct } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ResponsiveMenu from './ResponsiveMenu';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import  Contact  from './Contact';
import  About  from './About';
import ProductGallary from './Progal';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
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
    <Router>
      <nav className="relative w-full  shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center py-4">
          {/* Logo section */}
          <div className="flex items-center gap font-bold mr-10">
            <IoIosConstruct />
            <span className="text-yellow-500">Mighty</span>
            <span className="text-secondar">Tech</span>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex space-x-6 ">
              {NavbarMenu.map((item) => (
                <Link 
                  key={item.id}
                  to={item.link === `/machinaries/src/components/${item.name}.jsx` ? `/${item.name.toLowerCase().replace(' ', '')}` : '/progal'} 
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

            <button className="hover:bg-primar hover:text-white rounded-full p-2 transition duration-300">
              <FaShoppingCart className="w-6 h-6"/>
            </button>

            {!isMobile ? (
              <button 
                onClick={handleLoginClick}
                className="px-4 py-2
                bg-gray-950 text-amber-50 border-2 border-black rounded-md 
                hover:bg-amber-50
                hover:text-gray-950
                
                
                transition duration-300"
              >
                <b>LOGIN</b>
              </button>
            ) : (
              <div onClick={toggleMenu} className="md:hidden cursor-pointer">
  <ResponsiveMenu isOpen={isMenuOpen} />
</div>

            )}
          </div>

          {/* Mobile Menu */}
          {isMobile && isMenuOpen && (
            <div className="w-full mt-4 md:hidden">
              <div className="bg-white shadow-md rounded-lg">
                {NavbarMenu.map((item) => (
                  <Link 
                    key={item.id}
                    to={item.link === `/machinaries/src/components/${item.name}.jsx` ? `/${item.name.toLowerCase().replace(' ', '')}` : '/'} 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition duration-300 decoration-transparent hover:translate-y-1"
                  >
                    {item.title}
                  </Link>
                ))}
                <button 
                  onClick={handleLoginClick}
                  className="w-full px-4 py-3 text-primar border-t hover:bg-gray-100"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Login/Signup Modals */}
        {showLogin && (
          <Login 
            onClose={() => setShowLogin(false)} 
            onSignupClick={handleSignupClick}
          />
        )}
        {showSignup && (
          <Signup 
            onClose={() => setShowSignup(false)} 
            onLoginClick={handleLoginClick}
          />
        )}
      </nav>

      {/* Routes */}
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' index element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/progal' element={<ProductGallary/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default Navbar;