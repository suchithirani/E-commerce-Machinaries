import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../mockData/ProductGallery';
import Cart from './Cart';

const ProductGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [cart, setCart] = useState([]);

  // ✅ Function to add products to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ✅ Function to clear the entire cart
  const clearCart = () => {
    setCart([]); // Clears all items in the cart
    console.log("Cart cleared successfully"); // Debugging log
  };

  // ✅ Function to remove a single item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ Function to update the quantity of a cart item
  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0); // Removes item if quantity is 0
    });
  };

  // ✅ Filter products based on search, category, brand, and price
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedBrand ? product.brand === selectedBrand : true) &&
    product.price <= maxPrice
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      {/* ✅ Pass clearCart to Cart */}
      <Cart 
        cart={cart} 
        removeFromCart={removeFromCart} 
        updateQuantity={updateQuantity} 
        clearCart={clearCart} // ✅ Now clearCart will work
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {/* Sidebar Filters */}
        <div className="col-span-2   rounded-md p-5 shadow-md bg-slate-900">
          <h3 className="font-bold mb-2 text-white">Filters</h3>
          <input
            type="range"
            min="10000"
            max="1000000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full "
          />
          <p className="text-sm mt-2 text-white">₹{maxPrice.toLocaleString()}</p>
          <select
            className="w-full border p-2 rounded-md mt-2 mb-3"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((p) => p.category))].map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            className="w-full border p-2 rounded-md mt-2"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {[...new Set(products.map((p) => p.brand))].map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <div className="bg-white shadow-md rounded-lg p-4">
                    <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded-md" />
                    <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                    <p className="text-lg font-bold text-orange-500">₹{product.price.toLocaleString()}</p>

                    {cartItem ? (
                      <div className="flex items-center justify-between mt-4">
                        <motion.button
                          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => updateQuantity(product.id, -1)}
                          whileTap={{ scale: 0.9 }}
                        >
                          -
                        </motion.button>
                        <span className="text-lg font-semibold">{cartItem.quantity}</span>
                        <motion.button
                          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                          onClick={() => updateQuantity(product.id, 1)}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => addToCart(product)}
                        className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
                        whileTap={{ scale: 0.95 }}
                      >
                        Add To Cart
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
