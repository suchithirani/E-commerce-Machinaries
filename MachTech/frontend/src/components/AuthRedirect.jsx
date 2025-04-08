// src/components/AuthRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Login successful! Redirecting...');
    navigate('/home'); // Or wherever you want to redirect after login
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
};

export default AuthRedirect;