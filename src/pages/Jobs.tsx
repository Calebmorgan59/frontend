import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, Clock, Search, Filter, MessageSquare, Send } from 'lucide-react';

const Jobs = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Sample jobs data
  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'Remote',
      type: 'Full-time',
      category: 'tech',
      postedBy: 'Alumni',
      description: 'Looking for an experienced software engineer to join our team...',
      requirements: [
        '5+ years of experience in software development',
        'Strong knowledge of React and Node.js',
        'Experience with cloud platforms (AWS/GCP)'
      ],
      salary: '$120,000 - $150,000',
      postedDate: '2025-03-15'
    },
    // Add more sample jobs...
  ];

  const filteredJobs = jobs.filter(job => 
    (filter === 'all' || job.category === filter) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Career Opportunities</h1>
            <p className="text-xl">Discover job opportunities posted by fellow alumni and partner companies.</p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs by title or company"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center flex-wrap gap-2">
              <Filter className="h-5 w-5 text-green-800" />
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Jobs
              </button>
              <button 
                onClick={() => setFilter('tech')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'tech' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tech
              </button>
              {/* Add more filter buttons */}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-800">{job.title}</h3>
                    <div className="flex items-center mt-2 text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {job.postedBy}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">{job.description}</p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => setShowMessageModal(true)}
                    className="px-4 py-2 bg-yellow-500 text-green-900 rounded-md hover:bg-yellow-600 transition-colors flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Recruiter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post a Job CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Job Opportunity?</h2>
          <p className="text-xl mb-8">Share it with our community of talented professionals.</p>
          <button className="px-6 py-3 bg-yellow-500 text-green-900 rounded-md hover:bg-yellow-600 transition-colors font-bold">
            Post a Job
          </button>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Add job details modal content */}
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {/* Add message modal content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;