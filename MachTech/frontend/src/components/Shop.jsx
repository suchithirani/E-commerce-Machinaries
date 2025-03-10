import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Package, Truck, Factory, Wrench, MapPin, AlertCircle, Download, DollarSign, Activity } from "lucide-react";
import { saveAs } from "file-saver";

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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Machinery Overview</h2>

      {/* Machinery Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {machineryData.map((item) => (
          <div
            key={item.type}
            className="p-4 border rounded-lg shadow flex items-center gap-4 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedCategory(item.type)}
          >
            {getIcon(item.type)}
            <div>
              <p className="font-medium">{item.type}</p>
              <p className="text-gray-500 text-sm">{item.count} Units</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3">Machinery Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={machineryData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="text-green-500" /> Cost Analysis
        </h3>
        <ul>
          {machineryData.map((item) => (
            <li key={item.type} className="py-2 border-b">
              {item.type}: ₹{item.cost.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Performance Analytics */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Activity className="text-blue-500" /> Performance Analytics
        </h3>
        <p>View real-time performance metrics of all machinery.</p>
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="text-red-500" /> Maintenance Alerts
        </h3>
        <ul>
          <li className="py-2 border-b">Crane requires maintenance - Due in 5 days</li>
          <li className="py-2 border-b">Excavator oil change - Due in 10 days</li>
        </ul>
      </div>

      {/* Machinery Locations */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <MapPin className="text-green-500" /> Machinery Locations
        </h3>
        <p>View machinery positions in the warehouse/site.</p>
      </div>

      {/* Export Reports */}
      <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <h3 className="text-lg font-semibold">Export Reports</h3>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <Download /> Download CSV
        </button>
      </div>
    </div>
  );
};

export default MachineryDashboard;
