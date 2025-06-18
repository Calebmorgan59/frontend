import React, { useState } from 'react';
import { Users, Award, Calendar, BookOpen, Mail, Check, Star, Quote } from 'lucide-react';
const Membership = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    graduationYear: '',
    degreeProgram: '',
    currentPosition: '',
    currentLocation: '',
    membershipType: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with your actual registration logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      console.log('Registration data:', {
        ...formData,
        graduationYear: parseInt(formData.graduationYear),
      });
      
      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        graduationYear: '',
        degreeProgram: '',
        currentPosition: '',
        currentLocation: '',
        membershipType: '',
        password: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const handleMembershipSelect = (type : string) => {
    setFormData(prev => ({ ...prev, membershipType: type }));
    document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Alumni Network</h1>
            <p className="text-xl mb-8">Connect with fellow graduates, access exclusive benefits, and stay engaged with the Namal community.</p>
            <button 
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
            >
              Become a Member Today
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Why Join Our Alumni Network?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock exclusive opportunities and stay connected with the Namal community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Networking</h3>
              <p className="text-gray-600">Connect with 5,000+ alumni across 50+ countries and build meaningful professional relationships.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Career Growth</h3>
              <p className="text-gray-600">Access exclusive job opportunities, mentorship programs, and professional development resources.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Events</h3>
              <p className="text-gray-600">Attend exclusive alumni events, reunions, and networking sessions in major cities worldwide.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Lifelong Learning</h3>
              <p className="text-gray-600">Access continuing education programs, workshops, and resources to stay ahead in your field.</p>
            </div>
          </div>
          
          <div className="mt-12 bg-green-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-800 mb-2">5,000+</div>
                <div className="text-gray-600">Active Alumni Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-800 mb-2">50+</div>
                <div className="text-gray-600">Countries Represented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-800 mb-2">200+</div>
                <div className="text-gray-600">Annual Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section id="membership-types" className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Membership Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the membership type that best suits your needs and engagement level
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-100 p-6 text-center">
                <h3 className="text-2xl font-bold text-green-800">Basic Membership</h3>
                <p className="text-green-600 mt-1">Free</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Alumni directory access</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Quarterly newsletter</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Invitation to general events</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Basic job board access</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleMembershipSelect('Basic')}
                  className="w-full px-4 py-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform scale-105 border-2 border-yellow-500">
              <div className="bg-yellow-500 p-6 text-center">
                <span className="inline-block px-3 py-1 bg-green-800 text-white text-xs font-bold rounded-full uppercase mb-2">Most Popular</span>
                <h3 className="text-2xl font-bold text-green-900">Premium Membership</h3>
                <p className="text-green-900 mt-1">PKR 5,000 / year</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">All Basic benefits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Mentorship program access</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Exclusive networking events</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Professional development workshops</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Full job board access</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleMembershipSelect('Premium')}
                  className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
                >
                  Join Now
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-green-100 p-6 text-center">
                <h3 className="text-2xl font-bold text-green-800">Lifetime Membership</h3>
                <p className="text-green-600 mt-1">PKR 25,000 one-time</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">All Premium benefits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Lifetime access to all resources</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">VIP access to university events</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Recognition on alumni website</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold">✓</div>
                    <span className="ml-2 text-gray-600">Special alumni merchandise</span>
                  </li>
                </ul>
                <button 
                  onClick={() => handleMembershipSelect('Lifetime')}
                  className="w-full px-4 py-2 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
                >
                  Get Lifetime Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Register for Membership</h2>
              <p className="text-xl text-gray-600">
                Complete the form below to join our alumni network
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Registration successful! Please check your email to verify your account.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                  <select
                    id="graduationYear"
                    required
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 16 }, (_, i) => 2010 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-1">Degree Program</label>
                <select
                  id="degreeProgram"
                  required
                  value={formData.degreeProgram}
                  onChange={(e) => setFormData({ ...formData, degreeProgram: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Program</option>
                  <option value="BS Computer Science">BS Computer Science</option>
                  <option value="BS Electrical Engineering">BS Electrical Engineering</option>
                  <option value="BS Mechanical Engineering">BS Mechanical Engineering</option>
                  <option value="BBA">BBA</option>
                  <option value="MBA">MBA</option>
                  <option value="MS Computer Science">MS Computer Science</option>
                  <option value="MS Electrical Engineering">MS Electrical Engineering</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="currentPosition" className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                <input
                  type="text"
                  id="currentPosition"
                  value={formData.currentPosition}
                  onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                  placeholder="e.g., Software Engineer at Google"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                <input
                  type="text"
                  id="currentLocation"
                  value={formData.currentLocation}
                  onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                  placeholder="City, Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                <select
                  id="membershipType"
                  required
                  value={formData.membershipType}
                  onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Membership</option>
                  <option value="Basic">Basic (Free)</option>
                  <option value="Premium">Premium (PKR 5,000/year)</option>
                  <option value="Lifetime">Lifetime (PKR 25,000)</option>
                </select>
              </div>
              
              <div className="mb-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 text-green-800 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-600">
                    I agree to receive communications from the Namal Alumni Network
                  </span>
                </label>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Registration'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">What Our Alumni Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from fellow graduates about their experience with our alumni network
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-green-300 mb-4" />
              <p className="text-gray-600 mb-6">
                "The alumni network has been instrumental in my career growth. Through the mentorship program, I connected with senior professionals who guided me through crucial career decisions."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold">AS</span>
                </div>
                <div>
                  <div className="font-bold text-green-800">Ahmed Shah</div>
                  <div className="text-gray-600 text-sm">Software Engineer, Google • Class of 2018</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-green-300 mb-4" />
              <p className="text-gray-600 mb-6">
                "Being part of the alumni network opened doors I never knew existed. The networking events in Karachi helped me secure my dream job and build lasting friendships."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-yellow-800 font-bold">FK</span>
                </div>
                <div>
                  <div className="font-bold text-green-800">Fatima Khan</div>
                  <div className="text-gray-600 text-sm">Marketing Director, Unilever • Class of 2016</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-green-300 mb-4" />
              <p className="text-gray-600 mb-6">
                "The professional development workshops and continuous learning opportunities have kept me at the forefront of my field. The investment in lifetime membership was worth every penny."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold">RA</span>
                </div>
                <div>
                  <div className="font-bold text-green-800">Rashid Ali</div>
                  <div className="text-gray-600 text-sm">CEO, TechVenture • Class of 2014</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => document.getElementById('membership-types')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-green-800 hover:bg-green-700 text-white font-bold rounded-md transition-colors"
            >
              Join Our Success Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;