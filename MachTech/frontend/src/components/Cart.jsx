import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import Payment from './Payment';
import { Trash2, ChevronRight, X, ShoppingBag } from 'lucide-react';

const Cart = ({ cart = [], removeFromCart, updateQuantity, clearCart, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // Calculate totals with coupon discounts
  const {subtotal, discount, shipping, taxes, totalPrice} = useMemo(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    // Apply discount if valid coupon
    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discountAmount = subtotal * (appliedCoupon.value / 100);
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = appliedCoupon.value;
      }
    }
    
    // Calculate shipping (free over ₹100,000)
    const shippingCost = subtotal > 100000 ? 0 : 5000;
    
    // Calculate tax (18% GST)
    const taxAmount = (subtotal - discountAmount) * 0.18;
    
    // Total price
    const total = subtotal - discountAmount + shippingCost + taxAmount;
    
    return {
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      taxes: taxAmount,
      totalPrice: total
    };
  }, [cart, appliedCoupon]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setShowPayment(true);
    }, 800);
  };

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
    clearCart();
  };

  const handleBackToCart = () => {
    setShowPayment(false);
  };
  
  const handleClearCart = () => {
    setShowConfirmClear(false);
    clearCart();
  };
  
  const handleApplyCoupon = () => {
    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedCoupon({
        code: 'SAVE10',
        type: 'percentage',
        value: 10,
        description: '10% off your order'
      });
    } else if (couponCode.toUpperCase() === 'FLAT5000') {
      setAppliedCoupon({
        code: 'FLAT5000',
        type: 'fixed',
        value: 5000,
        description: '₹5,000 off your order'
      });
    } else {
      alert('Invalid coupon code');
    }
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (orderComplete) {
    return (
      <motion.div 
        className="p-6 bg-white rounded-lg shadow-md mb-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      >
        <motion.div 
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Order Complete!
        </motion.h3>
        <motion.p 
          className="mb-6 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thank you for your purchase. Your items will be shipped soon.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 shadow-md flex items-center justify-center mx-auto"
          onClick={() => {
            setOrderComplete(false);
            if (onClose) onClose();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Continue Shopping
        </motion.button>
      </motion.div>
    );
  }

  if (showPayment) {
    return (
      <Payment 
        totalPrice={totalPrice} 
        onPaymentSuccess={handlePaymentSuccess}
        onBackToCart={handleBackToCart}
        orderDetails={{
          items: cart,
          subtotal,
          discount,
          shipping,
          taxes,
          total: totalPrice
        }}
      />
    );
  }

  // Confirm clear cart dialog
  const renderConfirmClearDialog = () => (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg p-6 max-w-sm w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <h3 className="text-lg font-bold mb-2">Clear your cart?</h3>
        <p className="text-gray-600 mb-6">This will remove all items from your cart. This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={() => setShowConfirmClear(false)}
          >
            Cancel
          </button>
          <motion.button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={handleClearCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {showConfirmClear && renderConfirmClearDialog()}
      </AnimatePresence>
      
      <motion.div 
        className="p-6 bg-white rounded-lg shadow-md mb-6 relative overflow-hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
          <div className="flex space-x-2">
            {cart.length > 0 && (
              <motion.button
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
                onClick={() => setShowConfirmClear(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={18} />
              </motion.button>
            )}
            {onClose && (
              <motion.button 
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        </div>
        
        {cart.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <ShoppingBag size={32} className="text-gray-400" />
            </motion.div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add items to get started</p>
            {onClose && (
              <motion.button
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            )}
          </motion.div>
        ) : (
          <>
            <motion.ul 
              className="divide-y"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.li 
                    key={item.id} 
                    className="py-4 flex items-center"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                      <div className="mt-1 flex items-center">
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <span className="sr-only">Decrease</span>
                          <span className="text-lg font-medium">-</span>
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center mx-2 border-gray-200 rounded-md"
                        />
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span className="sr-only">Increase</span>
                          <span className="text-lg font-medium">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                      <motion.button
                        className="mt-1 text-sm text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Remove
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pr-12 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                      placeholder="Promo code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={appliedCoupon !== null}
                    />
                    {appliedCoupon === null ? (
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm bg-orange-50 text-orange-600 rounded hover:bg-orange-100"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                        onClick={removeCoupon}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {appliedCoupon && (
                <motion.div 
                  className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex justify-between items-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div>
                    <p className="font-medium">{appliedCoupon.code}</p>
                    <p className="text-sm">{appliedCoupon.description}</p>
                  </div>
                  <p className="font-medium">-₹{discount.toLocaleString()}</p>
                </motion.div>
              )}
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping > 0 ? `₹${shipping.toLocaleString()}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes (18% GST)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <motion.button
                className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium flex items-center justify-center"
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Checkout <ChevronRight className="ml-1 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Cart;