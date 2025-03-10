import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, auth } from '../firebase';

// eslint-disable-next-line react/prop-types
const Signup = ({ onClose, onLoginClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [closeButtonDisabled, setCloseButtonDisabled] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false);
  
  // Disable close button for 3 seconds when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only enable the close button after 3 seconds if the user has registered
      if (userRegistered) {
        setCloseButtonDisabled(false);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [userRegistered]);

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
    return requirements;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate password strength while typing
    if (name === 'password') {
      const requirements = validatePassword(value);
      setErrors(prev => ({
        ...prev,
        passwordRequirements: requirements
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    const passwordReqs = validatePassword(formData.password);
    if (!Object.values(passwordReqs).every(Boolean)) {
      newErrors.password = 'Password does not meet requirements';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }
  
    setLoading(true);
  
    try {
      const { email, password, name } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store User Data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        createdAt: new Date()
      });

      toast.success("User Registered Successfully!", { position: "top-center" });
      
      // Set user as registered and enable close button
      setUserRegistered(true);
      setCloseButtonDisabled(false);

      // Redirect user to the homepage
      window.location.href = "/home";  // Change this to your actual homepage route

    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!closeButtonDisabled) {
      onClose();
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 text-gray-500 ${closeButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
          disabled={closeButtonDisabled}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            
            {/* Password requirements checklist */}
            {errors.passwordRequirements && (
              <div className="mt-2 text-sm">
                <p className={errors.passwordRequirements.length ? 'text-green-600' : 'text-gray-500'}>
                  ✓ At least 8 characters
                </p>
                <p className={errors.passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-500'}>
                  ✓ One uppercase letter
                </p>
                <p className={errors.passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-500'}>
                  ✓ One lowercase letter
                </p>
                <p className={errors.passwordRequirements.number ? 'text-green-600' : 'text-gray-500'}>
                  ✓ One number
                </p>
                <p className={errors.passwordRequirements.special ? 'text-green-600' : 'text-gray-500'}>
                  ✓ One special character
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={onLoginClick}
            className="text-yellow-500 hover:text-yellow-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;