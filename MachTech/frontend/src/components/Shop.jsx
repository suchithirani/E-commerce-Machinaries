import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, Truck, Factory, Wrench, MapPin, AlertCircle, Download, DollarSign, Activity } from "lucide-react";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";

const machineryData = [
  { type: "Heavy Equipment", count: 40, cost: 500000 },
  { type: "Automation", count: 25, cost: 300000 },
  { type: "Construction", count: 30, cost: 400000 },
  { type: "Industrial Tools", count: 20, cost: 200000 },
];

const recentActivity = [
  { id: 1, action: "New Excavator added", time: "2 hours ago" },
  { id: 2, action: "Updated automation system", time: "1 day ago" },
  { id: 3, action: "Maintenance scheduled for Crane", time: "3 days ago" },
];

const MachineryDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getIcon = (type) => {
    switch (type) {
      case "Heavy Equipment":
        return <Truck className="text-yellow-500" />;
      case "Automation":
        return <Factory className="text-blue-500" />;
      case "Construction":
        return <Wrench className="text-red-500" />;
      default:
        return <Package className="text-gray-500" />;
    }
  };

  const downloadCSV = () => {
    const csvData = ["Type,Count,Cost"].concat(
      machineryData.map(item => `${item.type},${item.count},${item.cost}`)
    ).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "machinery_report.csv");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const iconVariants = {
    normal: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      scale: 1.2,
      transition: { duration: 0.5, type: "spring" }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="p-6 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="text-2xl font-bold mb-4"
        variants={itemVariants}
      >
        Machinery Overview
      </motion.h2>

      {/* Machinery Summary */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        variants={containerVariants}
      >
        {machineryData.map((item, index) => (
          <motion.div
            key={item.type}
            className={`p-4 border rounded-lg shadow flex items-center gap-4 cursor-pointer ${
              selectedCategory === item.type ? "bg-blue-50 border-blue-300" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(item.type)}
            variants={cardVariants}
            whileHover="hover"
            custom={index}
          >
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              initial="normal"
            >
              {getIcon(item.type)}
            </motion.div>
            <div>
              <p className="font-medium">{item.type}</p>
              <p className="text-gray-500 text-sm">{item.count} Units</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow mb-6"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold mb-3">Machinery Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={machineryData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#3b82f6" 
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Cost Analysis */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow mb-6"
        variants={itemVariants}
        whileHover={cardVariants.hover}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 15, 0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
          >
          <span className="text-green-500">₹</span>
          </motion.div>
          Cost Analysis
        </h3>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {machineryData.map((item) => (
            <motion.li 
              key={item.type} 
              className="py-2 border-b"
              variants={itemVariants}
              whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
            >
              {item.type}: ₹{item.cost.toLocaleString()}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Performance Analytics */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow mb-6"
        variants={itemVariants}
        whileHover={cardVariants.hover}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <motion.div
            animate={{ 
              y: [0, -3, 0, -3, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Activity className="text-blue-500" />
          </motion.div>
          Performance Analytics
        </h3>
        <p>View real-time performance metrics of all machinery.</p>
      </motion.div>

      {/* Maintenance Alerts */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow mb-6"
        variants={itemVariants}
        whileHover={cardVariants.hover}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              color: ["#ef4444", "#f87171", "#ef4444"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className="text-red-500" />
          </motion.div>
          Maintenance Alerts
        </h3>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.li 
            className="py-2 border-b"
            variants={itemVariants}
            whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
          >
            Crane requires maintenance - Due in 5 days
          </motion.li>
          <motion.li 
            className="py-2 border-b"
            variants={itemVariants}
            whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
          >
            Excavator oil change - Due in 10 days
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* Machinery Locations */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow mb-6"
        variants={itemVariants}
        whileHover={cardVariants.hover}
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <MapPin className="text-green-500" />
          </motion.div>
          Machinery Locations
        </h3>
        <p>View machinery positions in the warehouse/site.</p>
      </motion.div>

      {/* Export Reports */}
      <motion.div 
        className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
        variants={itemVariants}
        whileHover={cardVariants.hover}
      >
        <h3 className="text-lg font-semibold">Export Reports</h3>
        <motion.button
          onClick={downloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          >
            <Download />
          </motion.div>
          Download CSV
        </motion.button>
      </motion.div>
      
      {/* Floating dots for visual interest (similar to Navbar) */}
      <motion.div 
        className="absolute top-20 right-10 w-2 h-2 bg-yellow-300 rounded-full opacity-70"
        animate={{ y: [0, -8, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-3 h-3 bg-blue-400 rounded-full opacity-70"
        animate={{ y: [0, 8, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-40 right-40 w-4 h-4 bg-green-200 rounded-full opacity-70"
        animate={{ y: [0, -10, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }}
      />
    </motion.div>
  );
};

export default MachineryDashboard;