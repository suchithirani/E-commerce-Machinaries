import  { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";

const carouselImages = [
  {
    id: 1,
    src: "/api/placeholder/800/400?text=Technology+Innovation",
    alt: "Technology Innovation",
  },
  {
    id: 2,
    src: "/api/placeholder/800/400?text=Team+Collaboration",
    alt: "Team Collaboration",
  },
  {
    id: 3,
    src: "/api/placeholder/800/400?text=Future+Solutions",
    alt: "Future Solutions",
  }
];

const aboutSections = [
  {
    title: "Who We Are",
    content: "Mighty Tech is a passionate startup focused on creating cutting-edge technology solutions to solve real-world problems.",
    icon: "💡"
  },
  {
    title: "Our Mission",
    content: "Our mission is to innovate, disrupt the tech industry, and empower businesses to achieve their goals using modern technology.",
    icon: "🚀"
  },
  {
    title: "Our Vision",
    content: "To become a global leader in tech solutions by providing value-driven products and services to our clients and partners.",
    icon: "🌍"
  },
  {
    title: "Our Values",
    content: "We believe in innovation, integrity, customer satisfaction, and sustainable growth.",
    icon: "🤝"
  }
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto py-16 px-4">
        {/* Hero Section */}
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">
            Mighty Tech
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            A dynamic startup driven by innovation and cutting-edge technology, transforming challenges into breakthrough solutions.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-16 group">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={carouselImages[currentIndex].src}
              alt={carouselImages[currentIndex].alt}
              className="w-full h-96 object-cover"
            />
          </div>
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 cursor-pointer"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-8 h-8 text-yellow-500 hover:text-yellow-400" />
          </div>
          <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 cursor-pointer"
            onClick={goToNext}
          >
            <ChevronRight className="w-8 h-8 text-yellow-500 hover:text-yellow-400" />
          </div>
        </div>

        {/* About Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {aboutSections.map((section, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{section.icon}</span>
                <h2 className="text-2xl font-semibold text-yellow-600">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-yellow-50 p-12 rounded-lg">
          <h3 className="text-3xl font-bold text-yellow-600 mb-4">
            Join the Mighty Tech Revolution!
          </h3>
          <p className="text-lg text-gray-800 mb-8">
            Ready to make an impact? Let&apos;s work together to create the future of technology.
          </p>
          <button 
            className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full 
            flex items-center justify-center mx-auto hover:bg-yellow-600 transition"
          >
            Contact Us
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-yellow-500 py-6">
        <div className="container mx-auto text-center">
          <p className="text-black text-sm">&copy; 2025 Mighty Tech. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}