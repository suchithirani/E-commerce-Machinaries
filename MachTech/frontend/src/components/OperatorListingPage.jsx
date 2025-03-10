import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Eye, X, Mail, Calendar, Award, Briefcase } from 'lucide-react';

const OperatorListingPage = () => {
  // State for tracking which operator contact button is being hovered
  const [hoveredOperator, setHoveredOperator] = useState(null);
  
  // State for filtered operators
  const [filteredOperators, setFilteredOperators] = useState([]);
  
  // State for contact modal
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Filter states
  const [experienceFilters, setExperienceFilters] = useState([
    { label: '0-2 Years', count: 156, selected: false },
    { label: '0-5 Years', count: 284, selected: false },
    { label: '0-10 Years', count: 432, selected: false },
    { label: '10+ Years', count: 167, selected: false }
  ]);

  const [qualificationFilters, setQualificationFilters] = useState([
    { label: 'Certified Operators', count: 623, selected: false },
    { label: 'Licensed Operators', count: 445, selected: false }
  ]);

  // Operators data
  const operators = [
    {
      id: 1,
      name: 'Govind Kr Navik',
      avatar: 'G',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Mumbai, Maharashtra',
      experience: '0-2 Years',
      equipment: ['Tower Crane', 'Backhoe'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 9876543210',
      email: 'govind.navik@example.com',
      joinedDate: 'January 2023',
      availability: 'Available from April 15, 2025',
      certifications: ['Heavy Equipment Operation Level 1', 'Safety Training Certificate'],
      previousProjects: ['Highrise Construction - Mumbai', 'Infrastructure Project - Pune']
    },
    {
      id: 2,
      name: 'Md Barkat Ali',
      avatar: 'M',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Delhi NCR',
      experience: '0-5 Years',
      equipment: ['Forklift'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 8765432109',
      email: 'barkat.ali@example.com',
      joinedDate: 'March 2022',
      availability: 'Available immediately',
      certifications: ['Forklift Operator License', 'Material Handling Certification'],
      previousProjects: ['Warehouse Project - Delhi', 'Factory Setup - Gurgaon']
    },
    {
      id: 3,
      name: 'Varun Jha',
      avatar: 'V',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Bangalore, Karnataka',
      experience: '0-5 Years',
      equipment: ['Batching Plant'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 7654321098',
      email: 'varun.jha@example.com',
      joinedDate: 'July 2021',
      availability: 'Available from March 20, 2025',
      certifications: ['Concrete Plant Operation', 'Quality Control'],
      previousProjects: ['Commercial Building - Bangalore', 'Residential Township - Mysore']
    },
    {
      id: 4,
      name: 'Sandip Jagtap',
      avatar: 'S',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Pune, Maharashtra',
      experience: '0-10 Years',
      equipment: ['Batching Plant'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 6543210987',
      email: 'sandip.jagtap@example.com',
      joinedDate: 'August 2019',
      availability: 'Available immediately',
      certifications: ['Advanced Plant Operations', 'Mechanical Troubleshooting'],
      previousProjects: ['Highway Project - Maharashtra', 'Dam Construction - Karnataka']
    },
    {
      id: 5,
      name: 'Chhotu Kumar',
      avatar: 'C',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Hyderabad, Telangana',
      experience: '10+ Years',
      equipment: ['Excavator'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 5432109876',
      email: 'chhotu.kumar@example.com',
      joinedDate: 'December 2014',
      availability: 'Available from April 1, 2025',
      certifications: ['Master Excavator Operator', 'Site Safety Manager'],
      previousProjects: ['Metro Project - Hyderabad', 'Commercial Complex - Vijayawada']
    },
    {
      id: 6,
      name: 'Bittu Bhupendra',
      avatar: 'B',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Chennai, Tamil Nadu',
      experience: '0-10 Years',
      equipment: ['Batching Plant'],
      certified: true,
      licensed: false,
      phoneNumber: '+91 4321098765',
      email: 'bittu.bhupendra@example.com',
      joinedDate: 'April 2018',
      availability: 'Available immediately',
      certifications: ['Concrete Mix Specialist', 'Plant Maintenance'],
      previousProjects: ['IT Park Development - Chennai', 'Beach Resort Construction - Pondicherry']
    },
    {
      id: 7,
      name: 'Amit Mishra',
      avatar: 'A',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Kolkata, West Bengal',
      experience: '10+ Years',
      equipment: ['Excavator engineer'],
      certified: true,
      licensed: true,
      phoneNumber: '+91 3210987654',
      email: 'amit.mishra@example.com',
      joinedDate: 'November 2013',
      availability: 'Available from March 25, 2025',
      certifications: ['Professional Engineer License', 'Heavy Equipment Specialist'],
      previousProjects: ['Bridge Construction - Kolkata', 'Underground Metro - Howrah']
    },
    {
      id: 8,
      name: 'Vishal Seth',
      avatar: 'V',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Ahmedabad, Gujarat',
      experience: '0-10 Years',
      equipment: ['Crane Engineer'],
      certified: true,
      licensed: true,
      phoneNumber: '+91 2109876543',
      email: 'vishal.seth@example.com',
      joinedDate: 'June 2017',
      availability: 'Available immediately',
      certifications: ['Crane Safety Inspector', 'Engineering License'],
      previousProjects: ['Industrial Complex - Ahmedabad', 'Port Development - Surat']
    },
    {
      id: 9,
      name: 'Mannu Dave',
      avatar: 'M',
      avatarBg: '#FEF3E7',
      avatarColor: '#F18805',
      location: 'Jaipur, Rajasthan',
      experience: '0-2 Years',
      equipment: ['Site Dumper'],
      certified: true,
      licensed: true,
      phoneNumber: '+91 1098765432',
      email: 'mannu.dave@example.com',
      joinedDate: 'May 2023',
      availability: 'Available from April 10, 2025',
      certifications: ['Commercial Driving License', 'Material Transport Specialist'],
      previousProjects: ['Heritage Restoration - Jaipur', 'Resort Development - Udaipur']
    }
  ];

  // Function to toggle filter selection
  const toggleExperienceFilter = (index) => {
    const updatedFilters = [...experienceFilters];
    updatedFilters[index].selected = !updatedFilters[index].selected;
    setExperienceFilters(updatedFilters);
  };

  const toggleQualificationFilter = (index) => {
    const updatedFilters = [...qualificationFilters];
    updatedFilters[index].selected = !updatedFilters[index].selected;
    setQualificationFilters(updatedFilters);
  };

  // Apply filters function
  const applyFilters = () => {
    let result = [...operators];
    
    // Get selected experience filters
    const selectedExperiences = experienceFilters
      .filter(filter => filter.selected)
      .map(filter => filter.label);
    
    // Filter by experience if any experience filters selected
    if (selectedExperiences.length > 0) {
      result = result.filter(operator => selectedExperiences.includes(operator.experience));
    }
    
    // Get selected qualification filters
    const certifiedSelected = qualificationFilters[0].selected;
    const licensedSelected = qualificationFilters[1].selected;
    
    // Filter by qualifications if any qualification filters selected
    if (certifiedSelected || licensedSelected) {
      result = result.filter(operator => {
        if (certifiedSelected && licensedSelected) {
          return operator.certified && operator.licensed;
        } else if (certifiedSelected) {
          return operator.certified;
        } else if (licensedSelected) {
          return operator.licensed;
        }
        return true;
      });
    }
    
    setFilteredOperators(result);
  };

  // Function to handle contact button click
  const handleContactClick = (operator) => {
    setSelectedOperator(operator);
    setShowContactModal(true);
  };

  // Function to close contact modal
  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedOperator(null);
  };

  // Initialize filtered operators with all operators
  useEffect(() => {
    setFilteredOperators(operators);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header - reused from MachineryHomepage */}
      

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            {/* Experience level filter */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-orange-500 mr-2">
                  <Clock size={20} />
                </span>
                <h3 className="font-semibold text-lg">Experience Level</h3>
              </div>
              
              <div className="space-y-3">
                {experienceFilters.map((filter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`exp-${index}`} 
                        className="mr-2 h-4 w-4 text-orange-500"
                        checked={filter.selected}
                        onChange={() => toggleExperienceFilter(index)}
                      />
                      <label htmlFor={`exp-${index}`}>{filter.label}</label>
                    </div>
                    <span className="text-gray-500 text-sm">{filter.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Qualifications filter */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className="text-orange-500 mr-2">
                  <Eye size={20} />
                </span>
                <h3 className="font-semibold text-lg">Qualifications</h3>
              </div>
              
              <div className="space-y-3">
                {qualificationFilters.map((filter, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`qual-${index}`} 
                        className="mr-2 h-4 w-4 text-orange-500"
                        checked={filter.selected}
                        onChange={() => toggleQualificationFilter(index)}
                      />
                      <label htmlFor={`qual-${index}`}>{filter.label}</label>
                    </div>
                    <span className="text-gray-500 text-sm">{filter.count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Apply filters button */}
            <button 
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
          
          {/* Operators grid */}
          <div className="flex-1">
            {filteredOperators.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">No operators match the selected filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredOperators.map((operator) => (
                  <div key={operator.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <div className="p-4">
                      <div className="flex items-start mb-4">
                        {/* Avatar */}
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                          style={{ 
                            backgroundColor: operator.avatarBg,
                            color: operator.avatarColor
                          }}
                        >
                          <span className="font-bold text-lg">{operator.avatar}</span>
                        </div>
                        
                        {/* Name and location */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg truncate">{operator.name}</h3>
                          <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" />
                            <span>{operator.location}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                          Unavailable
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div className="mb-3">
                        <div className="flex items-center text-gray-500 mb-1">
                          <Clock size={14} className="mr-1" />
                          <span className="text-sm">Experience:</span>
                          <span className="ml-1 text-sm">{operator.experience}</span>
                        </div>
                      </div>
                      
                      {/* Equipment types */}
                      <div className="mb-4">
                        <div className="text-gray-500 text-sm mb-1">Equipment Types:</div>
                        <div className="flex flex-wrap gap-2">
                          {operator.equipment.map((item, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Certified/Licensed status */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`flex items-center gap-1 text-xs ${operator.certified ? 'text-orange-500' : 'text-gray-400'}`}>
                          <span className={`w-3 h-3 rounded-full ${operator.certified ? 'bg-orange-500' : 'bg-gray-200'}`}></span>
                          <span>Certified</span>
                        </div>
                        
                        <div className={`flex items-center gap-1 text-xs ${operator.licensed ? 'text-orange-500' : 'text-gray-400'}`}>
                          <span className={`w-3 h-3 rounded-full ${operator.licensed ? 'bg-orange-500' : 'bg-gray-200'}`}></span>
                          <span>{operator.licensed ? 'Licensed' : 'Not Licensed'}</span>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-3">
                        <button 
                          className={`flex-1 py-3 rounded-md transition duration-200 text-white ${
                            hoveredOperator === operator.id ? 'bg-orange-600' : 'bg-orange-500'
                          }`}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

{/* Contact Modal */}
{showContactModal && selectedOperator && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ 
              backgroundColor: selectedOperator.avatarBg,
              color: selectedOperator.avatarColor
            }}
          >
            <span className="font-bold text-lg">{selectedOperator.avatar}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold">{selectedOperator.name}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{selectedOperator.location}</span>
            </div>
          </div>
        </div>
        
        <button 
          className="text-gray-500 hover:text-gray-700 transition"
          onClick={closeContactModal}
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Modal Content - Simplified */}
      <div className="p-4">
        {/* Contact Information */}
        <div className="mb-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone size={16} className="text-orange-500 mr-2" />
              <span>{selectedOperator.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="text-orange-500 mr-2" />
              <span>{selectedOperator.email}</span>
            </div>
          </div>
        </div>
        
        {/* Equipment Expertise */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Equipment Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {selectedOperator.equipment.map((item, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons */}
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
    </div>
  </div>
)}
    </div>
  );
};

export default OperatorListingPage;