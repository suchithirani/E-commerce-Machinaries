import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const Cart = ({ cart = [], removeFromCart, updateQuantity }) => {
  const [loading, setLoading] = useState(false);
  
  const totalPrice = useMemo(() => 
    cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );
  

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate checkout process
  };
  

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <motion.li 
                key={item.id} 
                className="flex justify-between items-center p-3 border-b bg-white rounded-md shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-700">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    className={`px-3 py-1 rounded hover:bg-gray-400 ${item.quantity <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300'}`}
                    onClick={() => updateQuantity(item.id, -1)}
                    whileTap={{ scale: 0.9 }}
                    disabled={item.quantity <= 0}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </motion.button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <motion.button
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => updateQuantity(item.id, 1)}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </motion.button>
                  <motion.button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-white rounded-md shadow-md text-right font-bold text-lg">
            <p>Total: ₹{totalPrice.toLocaleString()}</p>
          </div>
          <motion.button
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 shadow-md"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              clearCart();
              console.log("Cart cleared"); // Debugging statement
            }}
          >
            Clear Cart
          </motion.button>
          <motion.button
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 shadow-md"
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
            disabled={loading}
            aria-label="Proceed to checkout"
          >
            {loading ? 'Processing...' : 'Proceed to Checkout'}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Cart;
