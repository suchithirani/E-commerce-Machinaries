import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, Coffee, Smartphone, AlertCircle } from 'lucide-react';

// Utility function to load Razorpay script
const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
};

const Payment = ({ totalPrice, onPaymentSuccess, onBackToCart, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showCardAnimation, setShowCardAnimation] = useState(false);
  const [cardType, setCardType] = useState('unknown');

  // Load Razorpay script on component mount
  useEffect(() => {
    const loadScript = async () => {
      try {
        await loadRazorpay();
        setRazorpayLoaded(true);
      } catch (error) {
        console.error('Failed to load Razorpay', error);
      }
    };
    
    loadScript();
  }, []);

  // Detect card type based on number
  useEffect(() => {
    if (!formData.cardNumber) {
      setCardType('unknown');
      return;
    }

    const cleanedNumber = formData.cardNumber.replace(/\s/g, '');
    
    // Visa
    if (/^4/.test(cleanedNumber)) {
      setCardType('visa');
    } 
    // Mastercard
    else if (/^5[1-5]/.test(cleanedNumber)) {
      setCardType('mastercard');
    }
    // Amex
    else if (/^3[47]/.test(cleanedNumber)) {
      setCardType('amex');
    }
    // Discover
    else if (/^6(?:011|5)/.test(cleanedNumber)) {
      setCardType('discover');
    }
    // Diners Club
    else if (/^3(?:0[0-5]|[68])/.test(cleanedNumber)) {
      setCardType('diners');
    }
    // JCB
    else if (/^(?:2131|1800|35)/.test(cleanedNumber)) {
      setCardType('jcb');
    }
    else {
      setCardType('unknown');
    }
  }, [formData.cardNumber]);

  // Card flip animation when CVV is focused
  useEffect(() => {
    let timeout;
    if (showCardAnimation) {
      timeout = setTimeout(() => setShowCardAnimation(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showCardAnimation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      const cleanedValue = value.replace(/\s/g, '').replace(/\D/g, '');
      const formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } 
    // Format expiry date with slash
    else if (name === 'expiryDate') {
      const cleanedValue = value.replace(/\D/g, '');
      let formattedValue = cleanedValue;
      
      if (cleanedValue.length > 2) {
        formattedValue = `${cleanedValue.substring(0, 2)}/${cleanedValue.substring(2, 4)}`;
      }
      
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } 
    // Limit CVV to 3-4 digits
    else if (name === 'cvv') {
      const cleanedValue = value.replace(/\D/g, '').substring(0, cardType === 'amex' ? 4 : 3);
      setFormData({
        ...formData,
        [name]: cleanedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (paymentMethod === 'credit') {
      if (!formData.cardNumber.trim()) 
        errors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
        errors.cardNumber = 'Invalid card number';
        
      if (!formData.cardName.trim()) 
        errors.cardName = 'Cardholder name is required';
        
      if (!formData.expiryDate.trim()) 
        errors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
        errors.expiryDate = 'Invalid format (MM/YY)';
        
      if (!formData.cvv.trim()) 
        errors.cvv = 'CVV is required';
      else if ((cardType === 'amex' && !/^\d{4}$/.test(formData.cvv)) || 
               (cardType !== 'amex' && !/^\d{3}$/.test(formData.cvv)))
        errors.cvv = cardType === 'amex' ? 'Invalid CVV (4 digits required)' : 'Invalid CVV (3 digits required)';
    }
    
    if (paymentMethod === 'upi') {
      if (!formData.upiId.trim()) 
        errors.upiId = 'UPI ID is required';
      else if (!formData.upiId.includes('@'))
        errors.upiId = 'Invalid UPI ID format';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRazorpayPayment = () => {
    setPaymentProcessing(true);
    
    // Simulate server call to create Razorpay order ID
    setTimeout(() => {
      const options = {
        key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your test key
        amount: totalPrice * 100, // Convert to paise
        currency: 'INR',
        name: 'Machinary Store',
        description: `Order for ${orderDetails.items.length} items`,
        image: '/api/placeholder/80/80', // Placeholder logo
        handler: function(response) {
          setPaymentProcessing(false);
          setTimeout(() => {
            setPaymentSuccess(true);
            setTimeout(() => {
              onPaymentSuccess(response);
            }, 2000);
          }, 1000);
        },
        prefill: {
          name: 'Test Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#4f46e5'
        }
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function(response) {
          setPaymentProcessing(false);
          alert(`Payment failed: ${response.error.description}`);
        });
      } catch (error) {
        setPaymentProcessing(false);
        console.error('Razorpay error:', error);
        alert('Failed to initialize payment gateway. Please try again.');
      }
    }, 1000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Form validation for credit card and UPI
      if (!validateForm()) return;
      
      // Simulate payment processing
      setPaymentProcessing(true);
      setTimeout(() => {
        setPaymentProcessing(false);
        setPaymentSuccess(true);
        
        // Delay success callback to show the success animation
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      }, 2000);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  const cardTypeIcons = {
    visa: '/visa-logo.png',
    mastercard: '/mastercard-logo.png',
    amex: '/amex-logo.png',
    discover: '/discover-logo.png',
    diners: '/diners-logo.png',
    jcb: '/jcb-logo.png',
    unknown: '/generic-card.png'
  };

  // Credit card animation component
  const renderCreditCardPreview = () => {
    const formattedCardNumber = formData.cardNumber 
      ? formData.cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
      : '•••• •••• •••• ••••';
    
    const formattedExpiry = formData.expiryDate || '••/••';
    const cardHolder = formData.cardName || 'YOUR NAME';
    const formattedCvv = formData.cvv || (cardType === 'amex' ? '••••' : '•••');
    
    return (
      <motion.div 
        className="mb-6 perspective-1000 w-full h-48 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Front of the card */}
        <motion.div 
          className="w-full h-full absolute rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-orange-600 to-orange-500 p-6 flex flex-col justify-between"
          initial="front"
          animate={showCardAnimation ? "back" : "front"}
          variants={cardVariants}
          transition={{ duration: 0.6, type: "tween" }}
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="flex justify-between items-start">
            <motion.div 
              className="w-12 h-8 bg-white rounded flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              {cardType !== 'unknown' ? (
                <img src={cardTypeIcons[cardType]} alt={cardType} className="h-5" />
              ) : (
                <CreditCard className="h-5 text-orange-600" />
              )}
            </motion.div>
            <motion.div 
              className="text-white text-sm font-medium"
              animate={{ 
                opacity: formData.expiryDate ? 1 : 0.7,
                transition: { duration: 0.3 }
              }}
            >
              {formattedExpiry}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-white text-xl font-mono tracking-wider"
            animate={{ 
              letterSpacing: formData.cardNumber ? 2 : 4,
              transition: { duration: 0.3 }
            }}
          >
            {formattedCardNumber}
          </motion.div>
          
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-white text-sm uppercase truncate max-w-[70%]"
              animate={{ 
                opacity: formData.cardName ? 1 : 0.7,
                transition: { duration: 0.3 }
              }}
            >
              {cardHolder}
            </motion.div>
            <motion.div 
              className="text-white text-xs"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setShowCardAnimation(true)}
            >
              {cardType === 'amex' ? 'CID' : 'CVV'} ▼
            </motion.div>
          </div>
        </motion.div>
        
        {/* Back of the card */}
        <motion.div 
          className="w-full h-full absolute rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-orange-600 to-orange-500 p-6 flex flex-col justify-between"
          initial={{ rotateY: 180 }}
          animate={showCardAnimation ? "front" : "back"}
          variants={cardVariants}
          transition={{ duration: 0.6, type: "tween" }}
          style={{ 
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="h-8 bg-black w-full"></div>
          <div className="bg-gray-200 h-10 rounded px-3 flex items-center justify-end">
            <motion.span 
              className="text-gray-800 font-mono"
              animate={{ 
                opacity: formData.cvv ? 1 : 0.7,
                transition: { duration: 0.3 }
              }}
            >
              {formattedCvv}
            </motion.span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-white text-xs">
              {cardType === 'amex' ? '4-digit CID on front' : '3-digit CVV on back'}
            </div>
            <motion.div 
              className="text-white text-xs"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setShowCardAnimation(false)}
            >
              ▲ Card Front
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={fadeInUp}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              transition: { 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }
            }}
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          
          <motion.h3 
            className="text-2xl font-bold text-gray-800 mb-2"
            variants={fadeInUp}
          >
            Payment Successful!
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6"
            variants={fadeInUp}
          >
            Thank you for your purchase. Your order has been confirmed.
          </motion.p>
          
          <motion.div 
            className="bg-gradient-to-r from-orange-50 to-orange-50 p-6 rounded-lg mb-8"
            variants={fadeInUp}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <p className="text-lg font-semibold text-gray-800">Total Paid: ₹{totalPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Order ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-sm text-gray-500 mt-1">A confirmation has been sent to your email</p>
            </motion.div>
          </motion.div>
          
          <motion.button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInUp}
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="flex items-center mb-6 cursor-pointer"
        onClick={onBackToCart}
        whileHover={{ x: -3 }}
      >
        <ArrowLeft className="h-5 w-5 text-orange-600 mr-2" />
        <span className="text-orange-600 font-medium">Back to cart</span>
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Payment Details
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Complete your purchase by providing your payment details
      </motion.p>
      
      <motion.div 
        className="mb-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 
          className="text-sm font-semibold text-gray-700 mb-3"
          variants={fadeInUp}
        >
          Select Payment Method
        </motion.h3>
        
        <motion.div 
          className="grid grid-cols-3 gap-3"
          variants={fadeInUp}
        >
          <motion.button
            type="button"
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${paymentMethod === 'razorpay' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
            onClick={() => setPaymentMethod('razorpay')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard className={`h-5 w-5 mb-1 ${paymentMethod === 'razorpay' ? 'text-orange-600' : 'text-gray-500'}`} />
            <span className={`text-xs ${paymentMethod === 'razorpay' ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>Gateway</span>
          </motion.button>
          
          <motion.button
            type="button"
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${paymentMethod === 'credit' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
            onClick={() => setPaymentMethod('credit')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <CreditCard className={`h-5 w-5 mb-1 ${paymentMethod === 'credit' ? 'text-orange-600' : 'text-gray-500'}`} />
            <span className={`text-xs ${paymentMethod === 'credit' ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>Card</span>
          </motion.button>
          
          <motion.button
            type="button"
            className={`p-3 border rounded-lg flex flex-col items-center transition-all ${paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
            onClick={() => setPaymentMethod('upi')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Smartphone className={`h-5 w-5 mb-1 ${paymentMethod === 'upi' ? 'text-orange-600' : 'text-gray-500'}`} />
            <span className={`text-xs ${paymentMethod === 'upi' ? 'text-orange-600 font-medium' : 'text-gray-600'}`}>UPI</span>
          </motion.button>
        </motion.div>
      </motion.div>
      
      <form onSubmit={handlePaymentSubmit}>
        <AnimatePresence mode="wait">
          {paymentMethod === 'credit' && (
            <motion.div
              key="credit"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderCreditCardPreview()}
              
              <motion.div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                  >
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formData.cardNumber && (
                      <motion.div 
                        className="absolute right-3 top-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        {cardType !== 'unknown' ? (
                          <img src={cardTypeIcons[cardType]} alt={cardType} className="h-6" />
                        ) : (
                          <CreditCard className="h-6 text-gray-400" />
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                  {formErrors.cardNumber && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.cardNumber}
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${formErrors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.cardName && (
                    <motion.p 
                      className="mt-1 text-sm text-red-600 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.cardName}
                    </motion.p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength={5}
                      placeholder="MM/YY"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.expiryDate && (
                      <motion.p 
                        className="mt-1 text-sm text-red-600 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.expiryDate}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      onHoverStart={() => setShowCardAnimation(true)}
                      onHoverEnd={() => setShowCardAnimation(false)}
                    >
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={cardType === 'amex' ? 4 : 3}
                        placeholder={cardType === 'amex' ? '4 digits' : '3 digits'}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                        onFocus={() => setShowCardAnimation(true)}
                        onBlur={() => setShowCardAnimation(false)}
                      />
                    </motion.div>
                    {formErrors.cvv && (
                      <motion.p 
                        className="mt-1 text-sm text-red-600 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.cvv}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {paymentMethod === 'upi' && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="mb-6 p-4 bg-orange-50 rounded-lg flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Smartphone className="h-5 w-5 text-orange-500 mr-3" />
                <p className="text-sm text-orange-700">You'll be redirected to your UPI app to complete the payment</p>
              </motion.div>
              
              <div>
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="yourname@upi"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${formErrors.upiId ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.upiId && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.upiId}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
          
          {paymentMethod === 'razorpay' && (
            <motion.div
              key="razorpay"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="mb-6 p-4 bg-orange-50 rounded-lg flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CreditCard className="h-5 w-5 text-orange-500 mr-3" />
                <p className="text-sm text-orange-700">You'll be redirected to Razorpay secure payment gateway</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Total Amount:</span>
            <motion.span 
              className="text-2xl font-bold text-gray-800"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              ₹{totalPrice.toLocaleString()}
            </motion.span>
          </div>
          
          <motion.button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${paymentProcessing ? 'bg-orange-400' : 'bg-orange-600 hover:bg-orange-700'} transition-colors shadow-md`}
            disabled={paymentProcessing}
            whileHover={!paymentProcessing ? { scale: 1.01 } : {}}
            whileTap={!paymentProcessing ? { scale: 0.99 } : {}}
          >
            {paymentProcessing ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                Processing Payment...
              </>
            ) : (
              `Pay ₹${totalPrice.toLocaleString()}`
            )}
          </motion.button>
          
          <motion.p 
            className="text-xs text-gray-500 mt-3 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Your payment is secured with end-to-end encryption
          </motion.p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Payment;