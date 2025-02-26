import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Shield, Zap, Heart, Star, Send } from 'lucide-react';
import styles from '../modules/background.module.css'
const MachineryHomepage = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Feedback state
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const initialProducts = [
          { 
            id: 1, 
            name: 'Industrial Excavator', 
            price: 45000, 
            image: 'https://5.imimg.com/data5/ZP/XP/FQ/SELLER-82001374/or-ex0-6-mini-excavator-1000x1000.jpg',
            
            category: 'Construction'
          },
          { 
            id: 2, 
            name: 'Heavy Duty Crane', 
            price: 78000, 
            image: 'https://images.pexels.com/photos/29492013/pexels-photo-29492013/free-photo-of-orange-ace-14xw-hydraulic-mobile-crane-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            
            category: 'Lifting Equipment'
          },
          { 
            id: 3, 
            name: 'Construction Lift', 
            price: 32000, 
            image: 'https://5.imimg.com/data5/SELLER/Default/2022/5/YA/YO/JV/2464322/mini-lift-1000x1000.jpg',
            category: 'Manufacturing'
          }
        ];
        
        setProducts(initialProducts);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Feedback handlers
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFeedbackForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to a backend
    console.log('Feedback submitted:', feedbackForm);
    setFeedbackSubmitted(true);
  };

  return (
    <div className=''>
    <div className="bg-cover bg-center h-screen "
    >
      {/* Hero Section (Unchanged) */}
      
        <div className="container mx-auto px-6 z-10 relative">
          
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
              Precision Machinery <br />Solutions
            </h1>
            <div className="flex space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Products
              </motion.button>
            </div>
          </motion.div>
        </div>

      {/* Featured Products (Unchanged) */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Products</h2>
        {loading ? (
          <div className="text-center text-yellow-600">Loading products...</div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, translateY: 50 },
                  visible: { 
                    opacity: 1, 
                    translateY: 0,
                    transition: { delay: index * 0.2, duration: 0.5 }
                  }
                }}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 bg-white/50 p-2 rounded-full hover:bg-white/80 transition "
                >
                  <Heart 
                    size={24} 
                    className={`transition ${
                      favorites.includes(product.id) 
                        ? ' text-yellow-500 fill-yellow-500 ' 
                        : 'text-slate-500 '
                    }`} 
                  />
                </button>

                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 text-white text-xs px-2 py-1">
                    {product.category}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{product.name}</h3>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-black font-bold text-xl">
                      ${product.price.toLocaleString()}
                    </span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className= "bold bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* New Feedback Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 ">
          Your Feedback Matters
        </h2>
        <div className="max-w-2xl mx-auto  rounded-xl shadow-lg p-8">
          {!feedbackSubmitted ? (
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={feedbackForm.name}
                  onChange={handleFeedbackChange}
                  required
                  className="w-full p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={feedbackForm.email}
                  onChange={handleFeedbackChange}
                  required
                  className="w-full p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <div>
                <label className="block text-slate-700 mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`transition-colors ${
                        feedbackForm.rating >= star 
                          ? 'text-yellow-500' 
                          : 'text-gray-300'
                      }`}
                    >
                      <Star size={32} fill={feedbackForm.rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={feedbackForm.message}
                  onChange={handleFeedbackChange}
                  required
                  rows="4"
                  className="w-full p-3 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Share your thoughts about our machinery..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition flex items-center justify-center"
              >
                <Send className="mr-2" size={20} /> Submit Feedback
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">
                Thank You for Your Feedback!
              </h3>
              <p className="text-slate-700">
                We appreciate your time and insights. Our team will review your feedback shortly.
              </p>
              <motion.button
                onClick={() => setFeedbackSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition"
              >
                Submit Another Feedback
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Footer (Unchanged) */}
      <footer className="bg-yellow-600 text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-xl mb-4">MachinePro</h4>
            <p className="text-yellow-100">Industrial machinery solutions for modern enterprises</p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-200 decoration-transparent text-yellow-50">Products</a></li>
              <li><a href="#" className="hover:text-yellow-200 decoration-transparent text-yellow-50">Services</a></li>
              <li><a href="#" className="hover:text-yellow-200 decoration-transparent text-yellow-50">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>Email: info@machinepro.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4">Newsletter</h4>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 rounded mb-4 text-black "
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-yellow-600 px-4 py-2 rounded"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-yellow-500 pt-4 ">
          © 2024 MachinePro. All Rights Reserved.
        </div>
      </footer>
    </div>
    </div>
  );
};

export default MachineryHomepage;