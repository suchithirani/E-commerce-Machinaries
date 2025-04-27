import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Cart from './Cart';
import { ShoppingCart, Search, Plus, X, Filter, SlidersHorizontal } from 'lucide-react';

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewType, setViewType] = useState('grid'); // grid or list
  const cartBadgeControls = useAnimation();
  const searchInputRef = useRef(null);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories and brands for filter dropdowns
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  // Animate cart badge when items added
  useEffect(() => {
    if (cart.length > 0) {
      cartBadgeControls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.5 }
      });
    }
  }, [cart.length, cartBadgeControls]);

  // Add to cart with animation
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

  // Clear cart with confirm dialog
  const clearCart = () => {
    if (cart.length === 0 || window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedBrand ? product.brand === selectedBrand : true) &&
    product.price <= maxPrice
  );

  // Key handler for search shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle cart visibility
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Sort products
  const [sortBy, setSortBy] = useState('default');
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Cart count for badge
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6 bg-red-100 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Product Gallery</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {/* Cart Button */}
          <div className="relative">
            <motion.button
              className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 shadow-md"
              onClick={toggleCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={24} />
            </motion.button>
            {cartCount > 0 && (
              <motion.div 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                animate={cartBadgeControls}
              >
                {cartCount}
              </motion.div>
            )}
          </div>
        </header>
        
        {/* Mobile Filter Toggle */}
        <button
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 py-2 bg-gray-200 rounded-lg"
          onClick={() => setFilterVisible(!filterVisible)}
        >
          <SlidersHorizontal size={18} />
          {filterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(filterVisible || window.innerWidth >= 768) && (
              <motion.div 
                className="md:w-64 rounded-lg p-5 shadow-md bg-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                  </h3>
                  <button 
                    className="md:hidden text-gray-500"
                    onClick={() => setFilterVisible(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹{maxPrice.toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹10,000</span>
                    <span>₹1,000,000</span>
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    className="w-full border p-2 rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Brand Filter */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    className="w-full border p-2 rounded-md"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                {/* Sort Options */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    className="w-full border p-2 rounded-md"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Product Name</option>
                  </select>
                </div>
                
                {/* View Type Toggle */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View
                  </label>
                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 py-2 px-3 rounded-md ${viewType === 'grid' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setViewType('grid')}
                    >
                      Grid
                    </button>
                    <button 
                      className={`flex-1 py-2 px-3 rounded-md ${viewType === 'list' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-700'}`}
                      onClick={() => setViewType('list')}
                    >
                      List
                    </button>
                  </div>
                </div>
                
                {/* Reset Filters */}
                <button
                  className="w-full py-2 mt-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedBrand('');
                    setMaxPrice(1000000);
                    setSortBy('default');
                  }}
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Cart Panel */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  <Cart 
                    cart={cart} 
                    removeFromCart={removeFromCart} 
                    updateQuantity={updateQuantity} 
                    clearCart={clearCart}
                    onClose={() => setIsCartOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Products Summary */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Showing <span className="font-bold">{sortedProducts.length}</span> products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
                {selectedBrand && ` by ${selectedBrand}`}
              </p>
            </div>
            
            {/* Product Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xl text-gray-600 mb-4">No products found</p>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </motion.div>
              </div>
            ) : viewType === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {sortedProducts.map((product) => {
                    const cartItem = cart.find((item) => item.id === product.id);
                    return (
                      <motion.div 
                        key={product.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48 bg-gray-200">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute top-2 right-2">
                              {product.isNew && (
                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
                            <div className="text-sm text-gray-600 mb-3 truncate">{product.category}</div>
                            <p className="text-xl font-bold text-orange-500 mb-4">₹{product.price.toLocaleString()}</p>

                            {cartItem ? (
                              <div className="flex items-center justify-between mt-4">
                                <motion.button
                                  className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                                  onClick={() => updateQuantity(product.id, -1)}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  -
                                </motion.button>
                                <span className="text-lg font-semibold">{cartItem.quantity}</span>
                                <motion.button
                                  className="px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                                  onClick={() => updateQuantity(product.id, 1)}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  +
                                </motion.button>
                              </div>
                            ) : (
                              <motion.button
                                onClick={() => addToCart(product)}
                                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Plus size={18} />
                                Add To Cart
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {sortedProducts.map((product) => {
                    const cartItem = cart.find((item) => item.id === product.id);
                    return (
                      <motion.div 
                        key={product.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-48 h-48">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="text-xs text-gray-500">{product.brand}</div>
                                    <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                                    <div className="text-sm text-gray-600 mb-2">{product.category}</div>
                                  </div>
                                  <p className="text-xl font-bold text-orange-500">₹{product.price.toLocaleString()}</p>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{product.description || 'No description available.'}</p>
                              </div>
                              <div className="flex justify-end">
                                {cartItem ? (
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                      <motion.button
                                        className="px-3 py-1 bg-gray-300 rounded-l-md hover:bg-gray-400"
                                        onClick={() => updateQuantity(product.id, -1)}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        -
                                      </motion.button>
                                      <span className="px-4 py-1 bg-gray-100">{cartItem.quantity}</span>
                                      <motion.button
                                        className="px-3 py-1 bg-gray-300 rounded-r-md hover:bg-gray-400"
                                        onClick={() => updateQuantity(product.id, 1)}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        +
                                      </motion.button>
                                    </div>
                                    <motion.button
                                      onClick={() => removeFromCart(product.id)}
                                      className="px-4 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Remove
                                    </motion.button>
                                  </div>
                                ) : (
                                  <motion.button
                                    onClick={() => addToCart(product)}
                                    className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Plus size={18} />
                                    Add To Cart
                                  </motion.button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
            
            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="p-2 border rounded-md hover:bg-gray-100">&laquo;</button>
                  <button className="p-2 bg-orange-500 text-white rounded-md">1</button>
                  <button className="p-2 border rounded-md hover:bg-gray-100">2</button>
                  <button className="p-2 border rounded-md hover:bg-gray-100">3</button>
                  <span className="px-2">...</span>
                  <button className="p-2 border rounded-md hover:bg-gray-100">&raquo;</button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;