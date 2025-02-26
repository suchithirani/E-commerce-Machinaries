import { useState, useEffect } from "react";
import {
  Truck,
  Clock,
  MapPin,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
  Package,
  Factory
} from "lucide-react";

// Badge component
const Badge = ({ children, variant = "default" }) => (
  <span
    className={`px-2 py-1 rounded-full text-sm font-medium 
    ${
      variant === "default"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {children}
  </span>
);

// MachineryTimetable component with search and filter functionality
const MachineryTimetable = () => {
  const [activeView, setActiveView] = useState("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [products] = useState([
    {
      id: 1,
      productNumber: "MC-EX001",
      category: "Construction",
      name: "Industrial Excavator",
      price: "$45,000",
      availability: "In Stock",
      type: "Heavy Equipment",
      manufacturer: "Global Machinery",
      specifications: "High-performance excavation solution",
      deliveryTime: "2-3 weeks",
      weight: "18 tons",
      power: "250 HP"
    },
    {
      id: 2,
      productNumber: "MC-CR002",
      category: "Lifting Equipment",
      name: "Heavy Duty Crane",
      price: "$78,000",
      availability: "Limited Stock",
      type: "Industrial Machinery",
      manufacturer: "Sky Connect Machinery",
      specifications: "Advanced lifting mechanism",
      deliveryTime: "4-6 weeks",
      weight: "25 tons",
      power: "300 HP"
    },
    {
      id: 3,
      productNumber: "MC-ML003",
      category: "Manufacturing",
      name: "Precision Milling Machine",
      price: "$32,000",
      availability: "In Stock",
      type: "CNC Equipment",
      manufacturer: "Star Industrial",
      specifications: "Advanced CNC milling for precision work",
      deliveryTime: "3-4 weeks",
      weight: "8 tons",
      power: "150 HP"
    },
    {
      id: 4,
      productNumber: "MC-PR004",
      category: "Processing",
      name: "Industrial Robotic Arm",
      price: "$55,000",
      availability: "In Stock",
      type: "Automation",
      manufacturer: "TechNova Systems",
      specifications: "High-precision robotic manufacturing solution",
      deliveryTime: "4-5 weeks",
      weight: "2.5 tons",
      power: "100 HP"
    }
  ]);

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying && products.length > 0 && activeView === "carousel") {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, products.length, activeView]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filtered products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearchQuery && matchesCategory;
  });

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {product.type === "Heavy Equipment" ? (
            <Truck className="text-yellow-500" />
          ) : product.type === "Automation" ? (
            <Package className="text-blue-500" />
          ) : (
            <Factory className="text-green-500"/>
          )}
          
          <div>
            <h3 className="text-xl font-semibold">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.manufacturer}</p>
          </div>
        </div>
        <Badge variant={product.availability === "In Stock" ? "default" : "secondary"}>
          {product.availability}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-medium">{product.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Product Code</p>
            <p className="font-medium">{product.productNumber}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Delivery Time</p>
              <p className="font-medium">{product.deliveryTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">{product.price}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4" />

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <PackageOpen className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Weight</p>
            <p className="font-medium">{product.weight}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Power</p>
            <p className="font-medium">{product.power}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Specifications</p>
            <p className="font-medium text-sm">{product.specifications}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductTable = () => (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Manufacturer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Power</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4">
                {product.type === "Heavy Equipment" ? (
                  <Truck className="text-yellow-500" />
                ) : product.type === "Automation" ? (
                  <Package className="text-blue-500" />
                ) : (
                  <Factory className="text-green-500"/>
                )}
              </td>
              <td className="px-6 py-4 font-medium">{product.name}</td>
              <td className="px-6 py-4">{product.manufacturer}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.deliveryTime}</td>
              <td className="px-6 py-4">{product.weight}</td>
              <td className="px-6 py-4">{product.power}</td>
              <td className="px-6 py-4">
                <Badge
                  variant={
                    product.availability === "In Stock" ? "default" : "secondary"
                  }
                >
                  {product.availability}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="">
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-2xl font-bold mr-24">Machinery Products</h2>
        
        <div className="flex gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-lg"
          />
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="All">All Categories</option>
            <option value="Construction">Construction</option>
            <option value="Lifting Equipment">Lifting Equipment</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Processing">Processing</option>
          </select>

          {/* Slideshow Play/Pause Button */}
          {activeView === "carousel" && (
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {isAutoPlaying ? "Pause" : "Play"} Slideshow
            </button>
          )}
          
          {/* View Selector */}
          <div className="flex rounded-lg border divide-x">
            <button
              onClick={() => setActiveView("carousel")}
              className={`px-4 py-2 ${
                activeView === "carousel"
                  ? "bg-yellow-50 text-yellow-600"
                  : "hover:bg-gray-50"
              }`}
            >
              Carousel View
            </button>
            <button
              onClick={() => setActiveView("timetable")}
              className={`px-4 py-2 ${
                activeView === "timetable"
                  ? "bg-yellow-50 text-yellow-600"
                  : "hover:bg-gray-50"
              }`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Conditional View Rendering */}
      {activeView === "carousel" ? (
        <div className="relative">
          <div className="transition-opacity duration-500">
            {filteredProducts.length > 0 && (
              <ProductCard product={filteredProducts[currentIndex]} />
            )}
          </div>

          {filteredProducts.length > 1 && (
            <>
              <button
                className="absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow-sm hover:bg-gray-50"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white border shadow-sm hover:bg-gray-50"
                onClick={goToNext}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="flex justify-center gap-2 mt-4">
            {filteredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-yellow-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <ProductTable />
      )}
    </div>
    </div>
  );
};

export default MachineryTimetable;