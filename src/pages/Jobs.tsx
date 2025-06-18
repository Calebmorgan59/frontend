import React, { useState, useEffect } from 'react';
import { Briefcase, Building2, MapPin, Clock, Search, Filter, MessageSquare, Send, Plus, DollarSign, Users, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { JobPostModal } from '../components/JobPostModal';

interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
  category: string;
  experienceLevel: string;
  salaryRange: {
    min?: number;
    max?: number;
    currency: string;
  };
  applicationDeadline: string;
  applicationMethod: string;
  applicationEmail?: string;
  applicationUrl?: string;
  contactPerson: {
    name?: string;
    email?: string;
    phone?: string;
  };
  requirements: string[];
  responsibilities: string[];
  postedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  postedDate: string;
  status: string;
  views: number;
  applications: number;
}

const Jobs = () => {
  const { user, isAuthenticated } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  // Sample jobs data
  const sampleJobs: Job[] = [
    {
      _id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      description: 'We are looking for an experienced Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software applications using modern technologies. The ideal candidate should have strong problem-solving skills and experience with full-stack development.',
      location: 'Lahore, Pakistan',
      jobType: 'Full-time',
      category: 'Technology',
      experienceLevel: 'Senior Level',
      salaryRange: {
        min: 150000,
        max: 250000,
        currency: 'PKR'
      },
      applicationDeadline: '2025-08-15',
      applicationMethod: 'email',
      applicationEmail: 'careers@techcorp.com',
      contactPerson: {
        name: 'Ahmed Khan',
        email: 'ahmed.khan@techcorp.com',
        phone: '+92 300 1234567'
      },
      requirements: [
        '5+ years of experience in software development',
        'Strong knowledge of React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS/Azure)',
        'Bachelor\'s degree in Computer Science or related field',
        'Excellent communication and teamwork skills'
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Mentor junior developers',
        'Participate in code reviews and technical discussions',
        'Ensure code quality and best practices'
      ],
      postedBy: {
        firstName: 'Sarah',
        lastName: 'Ahmed',
        email: 'sarah.ahmed@techcorp.com'
      },
      postedDate: '2025-07-01',
      status: 'Active',
      views: 156,
      applications: 23
    },
    {
      _id: '2',
      title: 'Marketing Manager',
      company: 'Digital Marketing Pro',
      description: 'Join our marketing team as a Marketing Manager and lead our digital marketing initiatives. You will be responsible for developing and executing marketing strategies, managing campaigns, and analyzing performance metrics to drive business growth.',
      location: 'Karachi, Pakistan',
      jobType: 'Full-time',
      category: 'Marketing',
      experienceLevel: 'Mid Level',
      salaryRange: {
        min: 80000,
        max: 120000,
        currency: 'PKR'
      },
      applicationDeadline: '2025-08-20',
      applicationMethod: 'website',
      applicationUrl: 'https://digitalmarketingpro.com/careers',
      contactPerson: {
        name: 'Fatima Malik',
        email: 'fatima@digitalmarketingpro.com'
      },
      requirements: [
        '3+ years of marketing experience',
        'Strong knowledge of digital marketing channels',
        'Experience with Google Analytics and social media platforms',
        'Excellent written and verbal communication skills',
        'Bachelor\'s degree in Marketing or related field'
      ],
      responsibilities: [
        'Develop and execute marketing strategies',
        'Manage social media accounts and campaigns',
        'Analyze marketing performance and ROI',
        'Coordinate with design and content teams',
        'Monitor market trends and competitor activities'
      ],
      postedBy: {
        firstName: 'Fatima',
        lastName: 'Malik',
        email: 'fatima@digitalmarketingpro.com'
      },
      postedDate: '2025-07-05',
      status: 'Active',
      views: 89,
      applications: 15
    },
    {
      _id: '3',
      title: 'Financial Analyst',
      company: 'InvestCorp Bank',
      description: 'We are seeking a detail-oriented Financial Analyst to join our investment team. The successful candidate will be responsible for financial modeling, investment research, and supporting senior analysts in making investment decisions.',
      location: 'Islamabad, Pakistan',
      jobType: 'Full-time',
      category: 'Finance',
      experienceLevel: 'Entry Level',
      salaryRange: {
        min: 60000,
        max: 90000,
        currency: 'PKR'
      },
      applicationDeadline: '2025-08-10',
      applicationMethod: 'email',
      applicationEmail: 'hr@investcorp.com',
      contactPerson: {
        name: 'Ali Hassan',
        email: 'ali.hassan@investcorp.com',
        phone: '+92 333 5555555'
      },
      requirements: [
        'Bachelor\'s degree in Finance, Economics, or related field',
        '1-2 years of experience in financial analysis',
        'Strong analytical and quantitative skills',
        'Proficiency in Excel and financial modeling',
        'Knowledge of financial markets and instruments'
      ],
      responsibilities: [
        'Conduct financial analysis and research',
        'Prepare investment reports and presentations',
        'Monitor portfolio performance',
        'Support senior analysts in investment decisions',
        'Maintain financial models and databases'
      ],
      postedBy: {
        firstName: 'Ali',
        lastName: 'Hassan',
        email: 'ali.hassan@investcorp.com'
      },
      postedDate: '2025-07-03',
      status: 'Active',
      views: 67,
      applications: 8
    },
    {
      _id: '4',
      title: 'Product Manager',
      company: 'HealthTech Innovations',
      description: 'Lead product development for our healthcare technology solutions. We are looking for an experienced Product Manager who can drive product strategy, work with engineering teams, and ensure successful product launches.',
      location: 'Remote',
      jobType: 'Full-time',
      category: 'Technology',
      experienceLevel: 'Senior Level',
      salaryRange: {
        min: 200000,
        max: 300000,
        currency: 'PKR'
      },
      applicationDeadline: '2025-08-25',
      applicationMethod: 'email',
      applicationEmail: 'careers@healthtech.com',
      contactPerson: {
        name: 'Dr. Fatima Malik',
        email: 'fatima.malik@healthtech.com'
      },
      requirements: [
        '5+ years of product management experience',
        'Experience in healthcare or medical technology',
        'Strong understanding of product development lifecycle',
        'Excellent leadership and communication skills',
        'MBA or technical degree preferred'
      ],
      responsibilities: [
        'Define product strategy and roadmap',
        'Work with engineering teams on product development',
        'Conduct market research and competitive analysis',
        'Manage product launches and go-to-market strategies',
        'Collaborate with stakeholders across the organization'
      ],
      postedBy: {
        firstName: 'Fatima',
        lastName: 'Malik',
        email: 'fatima.malik@healthtech.com'
      },
      postedDate: '2025-07-08',
      status: 'Active',
      views: 134,
      applications: 19
    },
    {
      _id: '5',
      title: 'Data Scientist',
      company: 'DataInsights Inc.',
      description: 'Join our data science team to work on cutting-edge machine learning projects. You will be responsible for analyzing large datasets, building predictive models, and providing actionable insights to drive business decisions.',
      location: 'Lahore, Pakistan',
      jobType: 'Full-time',
      category: 'Technology',
      experienceLevel: 'Mid Level',
      salaryRange: {
        min: 120000,
        max: 180000,
        currency: 'PKR'
      },
      applicationDeadline: '2025-08-30',
      applicationMethod: 'website',
      applicationUrl: 'https://datainsights.com/careers',
      contactPerson: {
        name: 'Zain Malik',
        email: 'zain.malik@datainsights.com'
      },
      requirements: [
        '3+ years of experience in data science',
        'Strong knowledge of Python, R, and SQL',
        'Experience with machine learning frameworks',
        'Master\'s degree in Data Science, Statistics, or related field',
        'Experience with big data technologies'
      ],
      responsibilities: [
        'Analyze large datasets to extract insights',
        'Build and deploy machine learning models',
        'Collaborate with business teams to understand requirements',
        'Present findings to stakeholders',
        'Stay updated with latest data science trends'
      ],
      postedBy: {
        firstName: 'Zain',
        lastName: 'Malik',
        email: 'zain.malik@datainsights.com'
      },
      postedDate: '2025-07-10',
      status: 'Active',
      views: 98,
      applications: 12
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, filter, searchTerm]);

  const filterJobs = () => {
    let filtered = jobs;

    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(job => 
        job.category.toLowerCase() === filter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handlePostJob = () => {
    if (!isAuthenticated) {
      alert('Please login to post a job');
      return;
    }
    setShowPostModal(true);
  };

  const formatSalary = (job: Job) => {
    if (!job.salaryRange.min && !job.salaryRange.max) return 'Salary not specified';
    
    if (job.salaryRange.min && job.salaryRange.max) {
      return `${job.salaryRange.currency} ${job.salaryRange.min.toLocaleString()} - ${job.salaryRange.max.toLocaleString()}`;
    } else if (job.salaryRange.min) {
      return `${job.salaryRange.currency} ${job.salaryRange.min.toLocaleString()}+`;
    } else {
      return `Up to ${job.salaryRange.currency} ${job.salaryRange.max?.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
          <p className="mt-4 text-gray-600">Loading job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Career Opportunities</h1>
            <p className="text-xl mb-8">Discover job opportunities posted by fellow alumni and partner companies</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePostJob}
                className="flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post a Job
              </button>
            </div>
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
                placeholder="Search jobs by title, company, or location"
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
                onClick={() => setFilter('technology')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'technology' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Technology
              </button>
              <button 
                onClick={() => setFilter('marketing')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'marketing' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Marketing
              </button>
              <button 
                onClick={() => setFilter('finance')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'finance' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Finance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => (
                <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-800 mb-2">{job.title}</h3>
                      <div className="flex items-center mb-2 text-gray-600">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{formatSalary(job)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Apply by {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.jobType === 'Full-time' ? 'bg-green-100 text-green-800' :
                        job.jobType === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                        job.jobType === 'Contract' ? 'bg-yellow-100 text-yellow-800' :
                        job.jobType === 'Remote' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.jobType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.experienceLevel === 'Entry Level' ? 'bg-green-100 text-green-800' :
                        job.experienceLevel === 'Mid Level' ? 'bg-yellow-100 text-yellow-800' :
                        job.experienceLevel === 'Senior Level' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.experienceLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{job.applications} applications</span>
                      </div>
                      <span>Posted by {job.postedBy.firstName} {job.postedBy.lastName}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleJobDetails(job)}
                        className="px-4 py-2 border border-green-800 text-green-800 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => {
                          if (job.applicationMethod === 'email' && job.applicationEmail) {
                            window.open(`mailto:${job.applicationEmail}?subject=Application for ${job.title}`);
                          } else if (job.applicationMethod === 'website' && job.applicationUrl) {
                            window.open(job.applicationUrl, '_blank');
                          }
                        }}
                        className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Building2 className="h-5 w-5 mr-2" />
                    <span className="font-medium text-lg">{selectedJob.company}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedJob.jobType}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{formatSalary(selectedJob)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h3>
                    <p className="text-gray-600">{selectedJob.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-bold mt-0.5">✓</div>
                          <span className="ml-3 text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsibilities</h3>
                    <ul className="space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-bold mt-0.5">•</div>
                          <span className="ml-3 text-gray-600">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Category:</span>
                        <p className="text-gray-600">{selectedJob.category}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Experience Level:</span>
                        <p className="text-gray-600">{selectedJob.experienceLevel}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Application Deadline:</span>
                        <p className="text-gray-600">{new Date(selectedJob.applicationDeadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Posted:</span>
                        <p className="text-gray-600">{new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {selectedJob.contactPerson.name && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Person</h3>
                      <div className="space-y-2">
                        <p className="font-medium text-gray-700">{selectedJob.contactPerson.name}</p>
                        {selectedJob.contactPerson.email && (
                          <p className="text-gray-600">{selectedJob.contactPerson.email}</p>
                        )}
                        {selectedJob.contactPerson.phone && (
                          <p className="text-gray-600">{selectedJob.contactPerson.phone}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      if (selectedJob.applicationMethod === 'email' && selectedJob.applicationEmail) {
                        window.open(`mailto:${selectedJob.applicationEmail}?subject=Application for ${selectedJob.title}`);
                      } else if (selectedJob.applicationMethod === 'website' && selectedJob.applicationUrl) {
                        window.open(selectedJob.applicationUrl, '_blank');
                      }
                    }}
                    className="w-full px-6 py-3 bg-green-800 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
                  >
                    Apply for this Position
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      <JobPostModal 
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onJobPosted={() => {
          // Refresh jobs list
          setShowPostModal(false);
        }}
      />
    </div>
  );
};

export default Jobs;