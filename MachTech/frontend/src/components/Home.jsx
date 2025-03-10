import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Shield, Zap, Heart, Star, Send, Menu, X, Search, MapPin, ChevronDown, ChevronRight } from 'lucide-react';

const MachineryHomepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Categories for the sidebar
  const categories = [
    { label: 'Single Drum Soil Compactor', link: '#' },
    { label: 'Pick and Carry Crane', link: '#' },
    { label: 'Crawler Excavator', link: '#' },
    { label: 'Crawler Crane', link: '#' },
    { label: 'Backhoe Loader', link: '#' },
    { label: 'Mini Excavators', link: '#' },
    { label: 'Hand Stacker', link: '#' },
    { label: 'Site Dumper', link: '#' },
    { label: 'Automatic Stirrup Bender', link: '#' },
    { label: 'Low Profile Pallet Truck', link: '#' },
  ];

  // Navigation menu items
  const navItems = [
    { label: 'Buy', hasDropdown: true, link: '#' },
    { label: 'Sell', hasDropdown: true, link: '#' },
    { label: 'Rent', hasDropdown: false, link: '#' },
    { label: 'Service', hasDropdown: false, link: '#' },
    { label: 'Hire an Operator', hasDropdown: false, link: '#' },
    // { label: 'Companies', hasDropdown: false, link: '#' },
    // { label: 'Compare', hasDropdown: false, link: '#' },
  ];

  return (
    <div className="relative bg-gray-50">
      
      

      {/* Overlay for mobile - only appears when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar - Categories */}
      

      {/* Main Content - adjust to accommodate sidebar on larger screens */}
      <div className={`min-h-screen transition-all duration-300 md:ml-64`}>
        {/* Hero Banner */}
        <div className="w-full h-64 md:h-96 bg-gray-700 relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Heavy machinery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                We are now the<br />
                <span className="text-4xl md:text-6xl text-yellow-500">OFFICIAL PARTNER</span><br />
                of ACE
              </h1>
            </div>
          </div>
        </div>

        {/* Brand Logos Carousel */}
        <div className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <button className="p-2 text-gray-500 hover:text-yellow-500 transition-colors">
                <ChevronRight size={24} className="transform rotate-180" />
              </button>
              
              <div className="flex items-center justify-around flex-1 space-x-8">
                {[
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tata_Hitachi_Logo.svg/1280px-Tata_Hitachi_Logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Caterpillar_Logo.svg/1280px-Caterpillar_Logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Komatsu_logo.svg/1280px-Komatsu_logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Volvo_Logo.svg/1280px-Volvo_Logo.svg.png",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/JCB_Logo.svg/1280px-JCB_Logo.svg.png"
                ].map((logo, index) => (
                  <motion.div 
                    key={index} 
                    className="h-16 flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }} // Scale up on hover
                  >
                    <img 
                      src={logo}
                      alt={`Brand logo ${index + 1}`}
                      className="max-h-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" // Add shadow on hover
                    />
                  </motion.div>
                ))}
              </div>
              
              <button className="p-2 text-gray-500 hover:text-yellow-500 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About MachinePro</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our rigorous inspection facilities and state-of-the-art manufacturing setup ensure consistent quality and the ability to meet specific needs. We also offer comprehensive after-sales services, including repair, maintenance, and spare parts for all construction machinery brands.
              </p>
            </div>

            {/* Why Choose Us Section */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* All Machinery Stock Ready Available */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Truck size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Machinery Stock Ready Available</h3>
                <p className="text-gray-600">
                  We maintain a large inventory of machinery to ensure quick delivery and availability for all your construction needs.
                </p>
              </div>

              {/* All Makes and Models Spare Parts */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Shield size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Makes and Models Spare Parts</h3>
                <p className="text-gray-600">
                  We provide genuine spare parts for all major brands and models, ensuring your machinery runs smoothly.
                </p>
              </div>

              {/* On-Site and In-House Servicing */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Zap size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">On-Site and In-House Servicing</h3>
                <p className="text-gray-600">
                  Our expert technicians offer both on-site and in-house servicing to keep your machinery in top condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4">MachinePro</h4>
              <p className="text-gray-300">Industrial machinery solutions for modern enterprises</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">Email: info@machinepro.com</li>
                <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Newsletter</h4>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-2 rounded mb-4 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
          <div className="text-center mt-8 border-t border-gray-700 pt-4 text-gray-300">
            © 2024 MachinePro. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MachineryHomepage;