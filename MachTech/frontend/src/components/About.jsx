import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Sparkles,
  Target,
  Globe,
  Handshake
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const carouselImages = [
  {
    id: 1,
    src: "https://imgs.search.brave.com/VF9gEIl6eqBe_igLi7e4gAoaJooEGD7iOfsdtbv1rK8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jb25zdHJ1Y3Rp/b24tYmFja2dyb3Vu/ZC1ibHVlLXNreS1u/ZXctYnVpbGRpbmdz/LWlzLWNhcmdvLWNy/YW5lLWNvbnN0cnVj/dGlvbi1jb25jZXB0/XzM1OTAzMS0xODg0/OC5qcGc_c2VtdD1h/aXNfaHlicmlk",
    alt: "Technology Innovation",
  },
  {
    id: 2,
    src: "https://media.gettyimages.com/id/158627395/photo/excavator-at-construction-site.jpg?s=612x612&w=0&k=20&c=Gkmgq8RC_YfstogesOUmajuJbYHL-xbp4Lkvu5rGX1M=",
    alt: "Team Collaboration",
  },
  {
    id: 3,
    src: "https://blog.constructiononline.com/hs-fs/hubfs/mark-potterton-sNVkn3507Oo-unsplash.jpg?width=4000&height=3000&name=mark-potterton-sNVkn3507Oo-unsplash.jpg",
    alt: "Future Solutions",
  }
];

const aboutSections = [
  {
    title: "Who We Are",
    content: "Mighty Tech is a passionate startup focused on creating cutting-edge technology solutions to solve real-world problems.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "Our Mission",
    content: "Our mission is to innovate, disrupt the tech industry, and empower businesses to achieve their goals using modern technology.",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Our Vision",
    content: "To become a global leader in tech solutions by providing value-driven products and services to our clients and partners.",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Our Values",
    content: "We believe in innovation, integrity, customer satisfaction, and sustainable growth.",
    icon: <Handshake className="w-6 h-6" />
  }
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-yellow-600 mb-6">
            Mighty <span className="text-gray-800">Tech</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-700 leading-relaxed">
            A dynamic startup driven by innovation and cutting-edge technology, transforming challenges into breakthrough solutions.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div 
          className="relative mb-16 group rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative h-96 w-full">
            <AnimatePresence custom={direction} initial={false}>
              <motion.img
                key={currentIndex}
                src={carouselImages[currentIndex].src}
                alt={carouselImages[currentIndex].alt}
                className="absolute w-full h-full object-cover"
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-yellow-500 w-6' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
          
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition-all"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 transition-all"
            onClick={goToNext}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </motion.div>

        {/* About Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {aboutSections.map((section, index) => (
            <motion.div 
              key={index} 
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 mr-4 bg-yellow-100 rounded-full text-yellow-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 bg-gradient-to-r from-yellow-400 to-yellow-500 p-12 rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-4xl font-bold text-white mb-6">
            Join the Mighty Tech Revolution!
          </h3>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Ready to make an impact? Let's work together to create the future of technology.
          </p>
          <motion.button 
            className="px-8 py-4 bg-black text-white font-semibold rounded-full 
            flex items-center justify-center mx-auto hover:bg-gray-800 transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            <ArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="text-2xl font-bold text-yellow-500 mb-2">Mighty Tech</h4>
              <p className="text-gray-400 text-sm">Innovating for a better tomorrow</p>
            </motion.div>
            
            <motion.div 
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
          <motion.div 
            className="mt-8 pt-8 border-t border-gray-800 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-400 text-sm">&copy; 2025 Mighty Tech. All Rights Reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}