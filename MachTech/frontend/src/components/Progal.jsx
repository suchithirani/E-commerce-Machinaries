/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {products} from '../mockData/ProductGallery'



const ProductGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000000);

  // Extract unique categories and brands
  const categories = [...new Set(products.map((product) => product.category))];
  const brands = [...new Set(products.map((product) => product.brand))];

  // Reset filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setMaxPrice(1000000);
  };

  // Filtered products
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedBrand ? product.brand === selectedBrand : true) &&
      product.price <= maxPrice
    );
  });

  // ProductCard Component
const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white shadow-md rounded-lg p-4"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}  
  >
    <img
      src={product.image}
      alt={product.name}
      className="h-40 w-full object-cover rounded-md"
    />
    <h3 className="text-lg font-bold mt-2">{product.name}</h3>
    <p className="text-sm text-gray-500 truncate">{product.description}</p>
    <p className="text-lg font-bold mt-2 text-orange-500">
      ₹{product.price.toLocaleString()}
    </p>
    <motion.button
      className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
      whileTap={{ scale: 0.95 }}
    >
      Get Latest Price
    </motion.button>
    <motion.button
      className="mt-2 w-full border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-100"
      whileTap={{ scale: 0.95 }}
    >
      Get Best Offers
    </motion.button>
  </motion.div>
);


  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-yellow-500 hover:underline text-sm"
            >
              Clear All Filters
            </button>
          </div>
          <div>
            <h3 className="font-bold mb-2">Price Range</h3>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">₹{maxPrice.toLocaleString()}</p>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Categories</h3>
            <select
              className="w-full border p-2 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Brands</h3>
            <select
              className="w-full border p-2 rounded-md"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
