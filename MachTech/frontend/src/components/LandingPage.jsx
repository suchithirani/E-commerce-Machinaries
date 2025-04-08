import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Login from './Login'; // Your existing Login component
import Signup from './Signup'; // Your existing Signup component

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    // Navigate to home page is now handled within the Login component itself
  };

  // Function to toggle between login and signup
  const toggleToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const toggleToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 overflow-hidden">
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-blue-300 rounded-full opacity-20"
        initial={{ x: 100, y: -100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-300 rounded-full opacity-20"
        initial={{ x: -100, y: 100 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Content container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <div className="h-24 w-24 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            MT
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to Mighty Tech
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="text-xl mb-12 text-center max-w-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Empowering your digital journey with cutting-edge solutions and exceptional service.
        </motion.p>

        

        {/* Login/Sign up buttons */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            onClick={() => setShowLogin(true)}
            className="px-8 py-3 bg-yellow-500 text-white rounded-lg font-semibold shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          
          <motion.button
            onClick={() => setShowSignup(true)}
            className="px-8 py-3 bg-transparent border border-yellow-500 text-yellow-600 rounded-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </motion.div>
      </motion.div>
      
      {/* Floating elements for visual interest */}
      <motion.div 
        className="absolute top-1/4 left-1/6 w-8 h-8 bg-yellow-300 rounded-full opacity-70"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-yellow-400 rounded-full opacity-70"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/5 w-10 h-10 bg-yellow-200 rounded-full opacity-70"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Login modal - your existing Login component wrapped with Framer Motion */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onSignupClick={toggleToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      {/* Signup modal - your existing Signup component wrapped with Framer Motion */}
      {showSignup && (
        <Signup 
          onClose={() => setShowSignup(false)}
          onLoginClick={toggleToLogin}
          onSignupSuccess={() => {
            setShowSignup(false);
            // The navigation to home is handled inside the Signup component
          }}
        />
      )}
    </div>
  );
};

export default LandingPage;