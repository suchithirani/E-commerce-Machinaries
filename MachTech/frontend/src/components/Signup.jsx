import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const Signup = ({ onClose, onLoginClick,onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [closeButtonDisabled, setCloseButtonDisabled] = useState(true);
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    if (userRegistered) {
      const timer = setTimeout(() => setCloseButtonDisabled(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [userRegistered]);

  const validatePassword = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'password') setErrors((prev) => ({ ...prev, passwordRequirements: validatePassword(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    // Check password strength requirements
    const passwordReqs = validatePassword(formData.password);
    if (!Object.values(passwordReqs).every(Boolean)) newErrors.password = 'Password does not meet requirements';

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("Response received:", response);
      setLoading(false); // Reset loading regardless of the response

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful!");
        localStorage.setItem('token', data.token); // Store the token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
        onSignupSuccess(); 
        navigate('/home');// Notify parent component
      } else {
        const errorData = await response.json().catch(() => ({ error: "Something went wrong!" }));
        setErrors({ api: errorData.error || "Failed to register" });
        toast.error(errorData.error || "Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false); // Reset loading even on error
      toast.error("An error occurred while registering.");
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={() => !closeButtonDisabled && onClose()}
          className={`absolute top-4 right-4 text-gray-500 ${closeButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
          disabled={closeButtonDisabled}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
          <FormInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
          <PasswordRequirements requirements={errors.passwordRequirements} />
          <FormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onLoginClick} className="text-yellow-500 hover:text-yellow-600">Login</button>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, name, type = "text", value, onChange, error }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const PasswordRequirements = ({ requirements }) => {
  if (!requirements) return null;
  return (
    <div className="mt-2 text-sm">
      <p className={requirements.length ? 'text-green-600' : 'text-gray-500'}>✓ At least 8 characters</p>
      <p className={requirements.uppercase ? 'text-green-600' : 'text-gray-500'}>✓ One uppercase letter</p>
      <p className={requirements.lowercase ? 'text-green-600' : 'text-gray-500'}>✓ One lowercase letter</p>
      <p className={requirements.number ? 'text-green-600' : 'text-gray-500'}>✓ One number</p>
      <p className={requirements.special ? 'text-green-600' : 'text-gray-500'}>✓ One special character</p>
    </div>
  );
};

export default Signup;
