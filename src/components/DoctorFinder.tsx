import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Clock, Navigation, Filter } from 'lucide-react';

const DoctorFinder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const specialties = [
    'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
    'Gastroenterology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Psychiatry', 'Pulmonology', 'Rheumatology', 'Urology'
  ];

  const searchDoctors = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    
    // Simulate doctor search
    setTimeout(() => {
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialty: 'Cardiology',
          rating: 4.8,
          reviews: 247,
          distance: '0.8 miles',
          address: '123 Medical Center Dr, Downtown',
          phone: '(555) 123-4567',
          availability: 'Next available: Tomorrow 2:00 PM',
          insurance: ['Blue Cross', 'Aetna', 'Medicare'],
          languages: ['English', 'Spanish'],
          experience: '15 years',
          education: 'Harvard Medical School'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialty: 'General Practice',
          rating: 4.6,
          reviews: 189,
          distance: '1.2 miles',
          address: '456 Health Plaza, Midtown',
          phone: '(555) 234-5678',
          availability: 'Next available: Today 4:30 PM',
          insurance: ['Cigna', 'UnitedHealth', 'Kaiser'],
          languages: ['English', 'Mandarin'],
          experience: '12 years',
          education: 'Johns Hopkins School of Medicine'
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialty: 'Dermatology',
          rating: 4.9,
          reviews: 312,
          distance: '2.1 miles',
          address: '789 Wellness St, Uptown',
          phone: '(555) 345-6789',
          availability: 'Next available: Friday 10:00 AM',
          insurance: ['Blue Cross', 'Humana', 'Medicare'],
          languages: ['English', 'Spanish', 'Portuguese'],
          experience: '18 years',
          education: 'Stanford University School of Medicine'
        }
      ]);
      setIsLoading(false);
    }, 2000);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchDoctors();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Find Healthcare Specialists</h2>
            <p className="text-slate-600">Locate nearby doctors and specialists based on your needs</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter city, zip code, or address"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Specialties</option>
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={searchDoctors}
              disabled={!location.trim() || isLoading}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white p-3 rounded-lg font-medium transition-colors duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isLoading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 text-sm">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-slate-600">Quick filters:</span>
          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors duration-200">
            Accepting New Patients
          </button>
          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors duration-200">
            Available Today
          </button>
          <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors duration-200">
            Telehealth Available
          </button>
        </div>
      </div>

      {/* Results */}
      {doctors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Found {doctors.length} doctors near {location}
            </h3>
            <select className="p-2 border border-slate-300 rounded-lg text-sm">
              <option>Sort by Distance</option>
              <option>Sort by Rating</option>
              <option>Sort by Availability</option>
            </select>
          </div>

          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-slate-800">{doctor.name}</h4>
                        <p className="text-purple-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-slate-600">{doctor.education}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className={`w-4 h-4 ${getRatingColor(doctor.rating)} fill-current`} />
                          <span className={`font-medium ${getRatingColor(doctor.rating)}`}>
                            {doctor.rating}
                          </span>
                          <span className="text-slate-500 text-sm">({doctor.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-slate-600">{doctor.experience} experience</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.address}</span>
                          <span className="text-blue-600 font-medium">({doctor.distance})</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4" />
                          <span>{doctor.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-green-600 font-medium">{doctor.availability}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="font-medium text-slate-700 mb-1">Insurance Accepted:</p>
                          <div className="flex flex-wrap gap-1">
                            {doctor.insurance.map((ins: string, index: number) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {ins}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <p className="font-medium text-slate-700 mb-1">Languages:</p>
                          <p className="text-slate-600">{doctor.languages.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:w-48 flex flex-col space-y-2">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                      Book Appointment
                    </button>
                    <button className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                      View Profile
                    </button>
                    <button className="w-full flex items-center justify-center space-x-2 border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-6">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Load More Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorFinder;