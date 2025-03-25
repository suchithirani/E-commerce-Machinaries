import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { loadRazorpay } from './razorpay-utils'; // You'll need to create this utility

const Payment = ({ totalPrice, onPaymentSuccess, onBackToCart, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

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

  const handleRazorpayPayment = () => {
    setPaymentProcessing(true);
    
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: totalPrice * 100, // Convert to paise
      currency: 'INR',
      name: 'Your Store Name',
      description: `Order for ${orderDetails.items.length} items`,
      image: '/logo.png', // Your logo
      order_id: '', // This will come from your backend
      handler: function(response) {
        setPaymentProcessing(false);
        setPaymentSuccess(true);
        onPaymentSuccess(response);
      },
      prefill: {
        name: orderDetails.customerName || '',
        email: orderDetails.customerEmail || '',
        contact: orderDetails.customerPhone || ''
      },
      notes: {
        address: orderDetails.shippingAddress || ''
      },
      theme: {
        color: '#4f46e5'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', function(response) {
      alert(`Payment failed: ${response.error.description}`);
      setPaymentProcessing(false);
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      // Simulate other payment methods
      setPaymentProcessing(true);
      setTimeout(() => {
        setPaymentProcessing(false);
        setPaymentSuccess(true);
        onPaymentSuccess();
      }, 2000);
    }
  };

  if (paymentSuccess) {
    return (
      <motion.div 
        className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-lg font-semibold text-gray-800">Total Paid: ₹{totalPrice.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">A confirmation has been sent to your email</p>
          </div>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Complete Your Purchase</h3>
        <p className="text-gray-500">Secure payment processing</p>
      </div>
      
      <form onSubmit={handlePaymentSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">Payment Method</label>
          <div className="space-y-3">
            <label className="flex items-center p-3 border rounded-lg hover:border-indigo-400 cursor-pointer transition-colors">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-600"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={() => setPaymentMethod('razorpay')}
              />
              <div className="ml-3 flex items-center">
                <img src="/razorpay-logo.png" alt="Razorpay" className="h-6 mr-2" />
                <span className="text-gray-700">Razorpay (Cards, UPI, Netbanking)</span>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg hover:border-indigo-400 cursor-pointer transition-colors">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-600"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={() => setPaymentMethod('credit')}
              />
              <div className="ml-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-6-1h2v-1h-2v1zm-5 0h1v-1h-1v1zm-2 0h1v-1H7v1zm-3 0h1v-1H4v1zm9-3h2v-1h-2v1zm-5 0h1v-1h-1v1zm-2 0h1v-1H7v1zm-3 0h1v-1H4v1zm8-3h2v-1h-2v1zm-5 0h1v-1h-1v1zm-2 0h1v-1H7v1zm-3 0h1v-1H4v1z"/>
                </svg>
                <span className="text-gray-700">Credit Card</span>
              </div>
            </label>
            
            <label className="flex items-center p-3 border rounded-lg hover:border-indigo-400 cursor-pointer transition-colors">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-600"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              <div className="ml-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                </svg>
                <span className="text-gray-700">UPI</span>
              </div>
            </label>
          </div>
        </div>

        {paymentMethod === 'credit' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">Cardholder Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>
          </motion.div>
        )}

        {paymentMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">UPI ID</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="yourname@upi"
                required
              />
            </div>
          </motion.div>
        )}

        <div className="mt-6 p-4 bg-indigo-50 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-indigo-700">₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <motion.button
            type="button"
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            onClick={onBackToCart}
            whileTap={{ scale: 0.95 }}
          >
            Back to Cart
          </motion.button>
          
          <motion.button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center"
            whileTap={{ scale: 0.95 }}
            disabled={paymentProcessing || (paymentMethod === 'razorpay' && !razorpayLoaded)}
          >
            {paymentProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ₹${totalPrice.toLocaleString()}`
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Payment;