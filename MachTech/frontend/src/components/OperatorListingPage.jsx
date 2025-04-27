import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Eye, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const OperatorListingPage = () => {
  const [hoveredOperator, setHoveredOperator] = useState(null);
  const [filteredOperators, setFilteredOperators] = useState([]);
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [experienceFilters, setExperienceFilters] = useState([
    { label: '0-2 Years', selected: false },
    { label: '0-5 Years', selected: false },
    { label: '0-10 Years', selected: false },
    { label: '10+ Years', selected: false }
  ]);

  const [qualificationFilters, setQualificationFilters] = useState([
    { label: 'Certified Operators', selected: false },
    { label: 'Licensed Operators', selected: false }
  ]);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/operators', {
          method:'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        setOperators(response.data);
        setFilteredOperators(response.data);
        setLoading(false);
      
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const applyFilters = () => {
    let result = [...operators];

    const selectedExperiences = experienceFilters
      .filter(f => f.selected)
      .map(f => f.label);

    if (selectedExperiences.length > 0) {
      result = result.filter(operator =>
        selectedExperiences.includes(operator.experience)
      );
    }

    const certifiedSelected = qualificationFilters[0].selected;
    const licensedSelected = qualificationFilters[1].selected;

    if (certifiedSelected || licensedSelected) {
      result = result.filter(operator => {
        if (certifiedSelected && licensedSelected) return operator.certified && operator.licensed;
        if (certifiedSelected) return operator.certified;
        if (licensedSelected) return operator.licensed;
        return true;
      });
    }

    setFilteredOperators(result);
  };

  const resetFilters = () => {
    setExperienceFilters(experienceFilters.map(f => ({ ...f, selected: false })));
    setQualificationFilters(qualificationFilters.map(f => ({ ...f, selected: false })));
  };

  useEffect(() => {
    applyFilters();
  }, [experienceFilters, qualificationFilters, operators]);

  const handleContactClick = (operator) => {
    setSelectedOperator(operator);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedOperator(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <motion.div
            className="w-full md:w-64 bg-white rounded-lg shadow p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Clock size={20} className="text-orange-500 mr-2" />
                <h3 className="font-semibold text-lg">Experience Level</h3>
              </div>
              <div className="space-y-3">
                {experienceFilters.map((filter, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-orange-500"
                      checked={filter.selected}
                      onChange={() => {
                        const updated = [...experienceFilters];
                        updated[index].selected = !updated[index].selected;
                        setExperienceFilters(updated);
                      }}
                    />
                    <label>{filter.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Eye size={20} className="text-orange-500 mr-2" />
                <h3 className="font-semibold text-lg">Qualifications</h3>
              </div>
              <div className="space-y-3">
                {qualificationFilters.map((filter, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 h-4 w-4 text-orange-500"
                      checked={filter.selected}
                      onChange={() => {
                        const updated = [...qualificationFilters];
                        updated[index].selected = !updated[index].selected;
                        setQualificationFilters(updated);
                      }}
                    />
                    <label>{filter.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </motion.div>

          {/* Operators Grid */}
          <div className="flex-1">
            {filteredOperators.length === 0 ? (
              <motion.div
                className="bg-white rounded-lg shadow-md p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-500">No operators match the selected filters.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {filteredOperators.map(operator => (
                  <motion.div
                    key={operator.id}
                    className="bg-white rounded-lg shadow-md border border-gray-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-4">
                      <div className="flex items-start mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                          style={{
                            backgroundColor: operator.avatarBg || '#f97316',
                            color: operator.avatarColor || '#fff'
                          }}
                        >
                          <span className="font-bold text-lg">
                            {operator.avatar || operator.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg truncate">{operator.name}</h3>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" />
                            <span>{operator.location}</span>
                          </div>
                        </div>
                        <div className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                          {operator.available ? 'Available' : 'Unavailable'}
                        </div>
                      </div>

                      <div className="mb-3 text-sm text-gray-500">
                        <Clock size={14} className="inline mr-1" />
                        Experience: {operator.experience}
                      </div>

                      <div className="mb-4">
                        <div className="text-gray-500 text-sm mb-1">Equipment Types:</div>
                        <div className="flex flex-wrap gap-2">
                          {operator.equipment?.map((item, i) => (
                            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className={`flex items-center gap-1 text-xs ${operator.certified ? 'text-orange-500' : 'text-gray-400'}`}>
                          <span className={`w-3 h-3 rounded-full ${operator.certified ? 'bg-orange-500' : 'bg-gray-200'}`}></span>
                          Certified
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${operator.licensed ? 'text-orange-500' : 'text-gray-400'}`}>
                          <span className={`w-3 h-3 rounded-full ${operator.licensed ? 'bg-orange-500' : 'bg-gray-200'}`}></span>
                          {operator.licensed ? 'Licensed' : 'Not Licensed'}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className={`flex-1 py-3 rounded-md transition text-white ${hoveredOperator === operator.id ? 'bg-orange-600' : 'bg-orange-500'}`}
                          onMouseEnter={() => setHoveredOperator(operator.id)}
                          onMouseLeave={() => setHoveredOperator(null)}
                          onClick={() => handleContactClick(operator)}
                        >
                          Contact Operator
                        </button>
                        <button
                          className="flex items-center justify-center w-12 h-10 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition"
                          onClick={() => window.location.href = `tel:${operator.phoneNumber}`}
                        >
                          <Phone size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && selectedOperator && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                    style={{ 
                      backgroundColor: selectedOperator.avatarBg || '#f97316', 
                      color: selectedOperator.avatarColor || '#fff'
                    }}
                  >
                    <span className="font-bold text-lg">
                      {selectedOperator.avatar || selectedOperator.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedOperator.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>{selectedOperator.location}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 transition" onClick={closeContactModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center">
                    <Phone size={16} className="text-orange-500 mr-2" />
                    <span>{selectedOperator.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-orange-500 mr-2" />
                    <span>{selectedOperator.email}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Equipment Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOperator.equipment?.map((item, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <button
                    className="flex-1 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition flex items-center justify-center text-sm"
                    onClick={() => window.location.href = `tel:${selectedOperator.phoneNumber}`}
                  >
                    <Phone size={16} className="mr-1" />
                    Call
                  </button>
                  <button
                    className="flex-1 border border-orange-500 text-orange-500 py-2 rounded-md hover:bg-orange-50 transition flex items-center justify-center text-sm"
                    onClick={() => window.location.href = `mailto:${selectedOperator.email}`}
                  >
                    <Mail size={16} className="mr-1" />
                    Email
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OperatorListingPage;