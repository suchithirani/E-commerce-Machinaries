import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import Payment from './Payment';
import { Trash2, ChevronRight, X, ShoppingBag, Check, Tag, Loader } from 'lucide-react';

const Cart = ({ cart = [], removeFromCart, updateQuantity, clearCart, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  
  // Available coupons
  const availableCoupons = [
    { code: 'SAVE10', type: 'percentage', value: 10, description: '10% off your order' },
    { code: 'FLAT5000', type: 'fixed', value: 5000, description: '₹5,000 off your order' },
    { code: 'FREESHIP', type: 'shipping', value: 5000, description: 'Free shipping' }
  ];

  // Calculate totals with coupon discounts
  const { subtotal, discount, shipping, taxes, totalPrice } = useMemo(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    // Apply discount if valid coupon
    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discountAmount = subtotal * (appliedCoupon.value / 100);
      } else if (appliedCoupon.type === 'fixed') {
        discountAmount = Math.min(appliedCoupon.value, subtotal);
      }
    }
    
    // Calculate shipping (free over ₹100,000 or with FREESHIP coupon)
    const shippingCost = subtotal > 100000 || (appliedCoupon?.type === 'shipping') ? 0 : 5000;
    
    // Calculate tax (18% GST on discounted subtotal)
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
  
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const coupon = availableCoupons.find(
      c => c.code === couponCode.toUpperCase()
    );
    
    if (coupon) {
      setAppliedCoupon(coupon);
    } else {
      alert('Invalid coupon code. Try SAVE10, FLAT5000, or FREESHIP');
    }
    
    setCouponLoading(false);
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Order complete view
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
          <Check className="w-12 h-12 text-green-500" />
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
          Thank you for your purchase. Your order confirmation has been sent to your email.
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

  // Payment view
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
          total: totalPrice,
          coupon: appliedCoupon?.code
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
        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl"
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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)
          </h2>
          <div className="flex space-x-2">
            {cart.length > 0 && (
              <motion.button
                className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
                onClick={() => setShowConfirmClear(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Clear cart"
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
                aria-label="Close cart"
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Empty state */}
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
            {/* Cart items */}
            <motion.ul 
              className="divide-y"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.li 
                    key={`${item.id}-${item.quantity}`} 
                    className="py-4 flex items-center"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">{item.name}</h3>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
                      )}
                      <div className="mt-2 flex items-center">
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded-l-md"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Decrease quantity"
                        >
                          <span className="text-lg font-medium">-</span>
                        </motion.button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              updateQuantity(item.id, value);
                            }
                          }}
                          className="w-12 text-center mx-0 border-t border-b border-gray-200 h-8"
                        />
                        <motion.button 
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded-r-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Increase quantity"
                        >
                          <span className="text-lg font-medium">+</span>
                        </motion.button>
                      </div>
                    </div>
                    <div className="ml-4 text-right flex-shrink-0">
                      <p className="text-sm font-medium text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        ₹{item.price.toLocaleString()} each
                      </p>
                      <motion.button
                        className="mt-1 text-xs text-red-500 hover:text-red-700 flex items-center justify-end w-full"
                        onClick={() => removeFromCart(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Remove item"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
            
            {/* Order summary */}
            <div className="mt-6 pt-6 border-t">
              {/* Coupon section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have a promo code?
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pr-24 pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                    placeholder="Enter promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={appliedCoupon !== null}
                  />
                  {appliedCoupon === null ? (
                    <motion.button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded hover:bg-orange-100 flex items-center"
                      onClick={handleApplyCoupon}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={couponLoading}
                    >
                      {couponLoading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        'Apply'
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 flex items-center"
                      onClick={removeCoupon}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Applied coupon */}
              {appliedCoupon && (
                <motion.div 
                  className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex justify-between items-center"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    <div>
                      <p className="font-medium">{appliedCoupon.code}</p>
                      <p className="text-xs">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <p className="font-medium">-₹{discount.toLocaleString()}</p>
                </motion.div>
              )}
              
              {/* Order breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping > 0 ? `₹${shipping.toLocaleString()}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes (18% GST)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-3 border-t">
                  <span>Total</span>
                  <span className="text-orange-600">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              {/* Checkout button */}
              <motion.button
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 font-medium flex items-center justify-center shadow-md"
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout <ChevronRight className="ml-1 h-5 w-5" />
                  </>
                )}
              </motion.button>
              
              {/* Continue shopping */}
              {onClose && (
                <motion.button
                  className="w-full mt-3 py-2 text-orange-600 hover:text-orange-700 font-medium"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Shopping
                </motion.button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Cart;