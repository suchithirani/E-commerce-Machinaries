import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import ProductGallary from './components/Progal';
import Cart from './components/Cart';
import Payment from './components/Payment'; // Import the Payment component
import OperatorListingPage from './components/OperatorListingPage';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

// Wrapper component to conditionally render Navbar
const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]); // Cart state moved here
  const location = useLocation();
  
  useEffect(() => {
    // Check authentication status whenever location changes or component mounts
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    
    // Listen for login state changes
    window.addEventListener('loginStateChanged', checkAuth);
    
    return () => {
      window.removeEventListener('loginStateChanged', checkAuth);
    };
  }, [location]);

  // Cart functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Prepare order details
  const prepareOrderDetails = () => {
    return {
      items: cart,
      customerName: 'John Doe', // In a real app, get from user profile
      customerEmail: 'user@example.com',
      customerPhone: '1234567890',
      shippingAddress: '123 Main St, City',
      total: calculateTotal()
    };
  };

  // Only show Navbar if user is authenticated or not on landing page
  const showNavbar = isAuthenticated || location.pathname !== '/';
  
  return (
    <>
      {showNavbar && <Navbar cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} />}
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected routes - only accessible when logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route 
              path="/shop" 
              element={<Shop addToCart={addToCart} />} 
            />
            <Route 
              path="/progal" 
              element={<ProductGallary addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                  isPreview={false}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Payment
                  totalPrice={calculateTotal()}
                  onPaymentSuccess={(response) => {
                    // Handle successful payment
                    console.log('Payment successful:', response);
                    clearCart();
                    // Redirect to confirmation page or home
                    window.location.href = '/home?payment=success';
                  }}
                  onBackToCart={() => window.location.href = '/cart'}
                  orderDetails={prepareOrderDetails()}
                  clearCart={clearCart}
                />
              } 
            />
            <Route path="/operatorlistingpage" element={<OperatorListingPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;