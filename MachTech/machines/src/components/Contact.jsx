import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const MachineryContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Inquiry submitted:", formData);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          inquiry: "",
        });
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const socialLinks = [
    { Icon: Twitter, url: "https://twitter.com", color: "text-blue-400" },
    { Icon: Facebook, url: "https://facebook.com", color: "text-blue-600" },
    { Icon: Instagram, url: "https://instagram.com", color: "text-pink-500" },
    { Icon: Linkedin, url: "https://linkedin.com", color: "text-blue-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl grid md:grid-cols-2 gap-8"
      >
        <div className="bg-gray-900 text-white p-8 rounded-xl flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Industrial Machinery Solutions
            </h2>
            <p className="text-gray-300 mb-6">
              Connect with our expert team for custom machinery consultations,
              technical support, and product inquiries.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-400" />
              <span>mightytech@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-green-400" />
              <span>+91 9512081506</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-red-400" />
              <span>Tech park,bangloare</span>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            {socialLinks.map(({ Icon, url, color }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} hover:opacity-80 transition`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Send Technical Inquiry
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitStatus === "success" && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center">
                Inquiry received. We'll contact you soon!
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-center">
                Error sending inquiry. Please try again.
              </div>
            )}

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />

            <textarea
              name="inquiry"
              value={formData.inquiry}
              onChange={handleChange}
              placeholder="Describe your technical inquiry or machinery requirements"
              className="w-full p-3 border border-gray-300 rounded-lg h-32"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MachineryContact;
