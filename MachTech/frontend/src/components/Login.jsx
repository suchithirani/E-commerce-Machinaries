import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Login = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Using navigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful", data);
      alert("User logged in successfully!");
      // Save user data to localStorage or handle session here
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
  Don't have an account?{' '}
  <button 
    onClick={onSignupClick} // ✅ This now triggers the correct toggle in Navbar
    className="text-yellow-500 hover:text-yellow-600"
  >
    Sign Up
  </button>
</div>
      </div>
    </div>
  );
};

export default Login;
