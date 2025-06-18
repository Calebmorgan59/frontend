import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Lightbulb, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import { EventIdeaModal } from '../components/EventIdeaModal';
import { EventDetailsModal } from '../components/EventDetailsModal';

interface Event {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  venue?: {
    name: string;
    address: string;
    city: string;
  };
  type: string;
  category: string;
  capacity: number;
  registeredCount: number;
  isVirtual: boolean;
  meetingLink?: string;
  images: Array<{
    url: string;
    caption: string;
    isPrimary: boolean;
  }>;
  gallery: Array<{
    url: string;
    caption: string;
    uploadedAt: string;
  }>;
  organizer: {
    name: string;
    email: string;
    phone?: string;
    organization?: string;
  };
  speakers: Array<{
    name: string;
    title: string;
    bio: string;
    image?: string;
    linkedin?: string;
  }>;
  agenda: Array<{
    time: string;
    title: string;
    description: string;
    speaker: string;
    duration: number;
  }>;
  requirements: string[];
  benefits: string[];
  tags: string[];
  registrationFee: {
    amount: number;
    currency: string;
  };
  registrationDeadline: string;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  visibility: string;
  feedback: Array<{
    user: {
      firstName: string;
      lastName: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  averageRating: number;
  totalFeedback: number;
  isPast: boolean;
  isRegistrationOpen: boolean;
  spotsRemaining: number;
  createdAt: string;
}

const Events = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Sample events data - replace with API call
  const sampleEvents: Event[] = [
    {
      _id: '1',
      title: 'Annual Alumni Reunion 2025',
      description: 'Join us for our biggest alumni gathering of the year! Reconnect with old friends, make new connections, and celebrate the achievements of our community. This year\'s reunion features keynote speeches from distinguished alumni, networking sessions, cultural performances, and a grand dinner.',
      shortDescription: 'Our biggest alumni gathering with networking, speeches, and celebrations.',
      date: '2025-07-15',
      startTime: '09:00',
      endTime: '18:00',
      duration: 540,
      location: 'Namal University Campus, Mianwali',
      venue: {
        name: 'Namal University Main Auditorium',
        address: '30 km Talagang Road',
        city: 'Mianwali, Punjab'
      },
      type: 'Reunion',
      category: 'Social',
      capacity: 500,
      registeredCount: 287,
      isVirtual: false,
      images: [
        {
          url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          caption: 'Alumni Reunion 2024',
          isPrimary: true
        }
      ],
      gallery: [
        {
          url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400',
          caption: 'Previous reunion highlights',
          uploadedAt: '2024-07-15'
        }
      ],
      organizer: {
        name: 'Alumni Relations Office',
        email: 'alumni@namal.edu.pk',
        phone: '+92 459 236995',
        organization: 'Namal University'
      },
      speakers: [
        {
          name: 'Dr. Sarah Ahmed',
          title: 'CEO, TechVentures',
          bio: 'Leading entrepreneur in the tech industry with over 15 years of experience.',
          image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
          linkedin: 'https://linkedin.com/in/sarah-ahmed'
        }
      ],
      agenda: [
        {
          time: '09:00',
          title: 'Registration & Welcome Coffee',
          description: 'Check-in and networking with fellow alumni',
          speaker: 'Alumni Relations Team',
          duration: 60
        },
        {
          time: '10:00',
          title: 'Opening Ceremony',
          description: 'Welcome address and university updates',
          speaker: 'Vice Chancellor',
          duration: 45
        },
        {
          time: '11:00',
          title: 'Keynote: Innovation in Technology',
          description: 'Insights into the future of technology and entrepreneurship',
          speaker: 'Dr. Sarah Ahmed',
          duration: 60
        }
      ],
      requirements: [
        'Valid alumni ID or graduation certificate',
        'Registration confirmation',
        'Professional attire recommended'
      ],
      benefits: [
        'Networking with 500+ alumni',
        'Access to exclusive job opportunities',
        'University campus tour',
        'Complimentary lunch and refreshments',
        'Alumni directory access'
      ],
      tags: ['reunion', 'networking', 'annual', 'campus'],
      registrationFee: {
        amount: 2500,
        currency: 'PKR'
      },
      registrationDeadline: '2025-07-10',
      createdBy: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@namal.edu.pk'
      },
      status: 'Published',
      visibility: 'Public',
      feedback: [],
      averageRating: 0,
      totalFeedback: 0,
      isPast: false,
      isRegistrationOpen: true,
      spotsRemaining: 213,
      createdAt: '2025-06-01'
    },
    {
      _id: '2',
      title: 'Tech Career Fair 2025',
      description: 'Connect with leading tech companies and explore exciting career opportunities. This career fair brings together top employers from the technology sector, offering positions ranging from entry-level to senior roles.',
      shortDescription: 'Connect with leading tech companies and explore career opportunities.',
      date: '2025-08-20',
      startTime: '10:00',
      endTime: '16:00',
      duration: 360,
      location: 'Virtual Event',
      type: 'Career',
      category: 'Professional',
      capacity: 1000,
      registeredCount: 456,
      isVirtual: true,
      meetingLink: 'https://zoom.us/j/123456789',
      images: [
        {
          url: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          caption: 'Tech Career Fair',
          isPrimary: true
        }
      ],
      gallery: [],
      organizer: {
        name: 'Career Services',
        email: 'careers@namal.edu.pk',
        organization: 'Namal University Career Center'
      },
      speakers: [
        {
          name: 'Ahmed Khan',
          title: 'Senior Software Engineer, Google',
          bio: 'Experienced software engineer specializing in machine learning and AI.',
          image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      agenda: [
        {
          time: '10:00',
          title: 'Opening & Company Presentations',
          description: 'Introduction to participating companies',
          speaker: 'Career Services Team',
          duration: 90
        },
        {
          time: '11:30',
          title: 'Virtual Networking Sessions',
          description: 'One-on-one meetings with recruiters',
          speaker: 'Various Recruiters',
          duration: 180
        }
      ],
      requirements: [
        'Updated CV/Resume',
        'Professional LinkedIn profile',
        'Stable internet connection for virtual participation'
      ],
      benefits: [
        'Direct access to 50+ tech companies',
        'On-the-spot interview opportunities',
        'Career guidance sessions',
        'Industry insights and trends'
      ],
      tags: ['career', 'technology', 'virtual', 'jobs'],
      registrationFee: {
        amount: 0,
        currency: 'PKR'
      },
      registrationDeadline: '2025-08-15',
      createdBy: {
        firstName: 'Career',
        lastName: 'Services',
        email: 'careers@namal.edu.pk'
      },
      status: 'Published',
      visibility: 'Public',
      feedback: [],
      averageRating: 0,
      totalFeedback: 0,
      isPast: false,
      isRegistrationOpen: true,
      spotsRemaining: 544,
      createdAt: '2025-06-15'
    },
    {
      _id: '3',
      title: 'Entrepreneurship Workshop',
      description: 'Learn from successful alumni entrepreneurs about starting and scaling your own business. This intensive workshop covers everything from idea validation to funding strategies.',
      shortDescription: 'Learn from successful entrepreneurs about starting your own business.',
      date: '2025-09-10',
      startTime: '14:00',
      endTime: '17:00',
      duration: 180,
      location: 'Lahore Chapter Office',
      venue: {
        name: 'Arfa Software Technology Park',
        address: 'Ferozepur Road',
        city: 'Lahore, Punjab'
      },
      type: 'Workshop',
      category: 'Professional',
      capacity: 50,
      registeredCount: 23,
      isVirtual: false,
      images: [
        {
          url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          caption: 'Entrepreneurship Workshop',
          isPrimary: true
        }
      ],
      gallery: [],
      organizer: {
        name: 'Lahore Alumni Chapter',
        email: 'lahore@namalumni.org',
        phone: '+92 42 123 4567'
      },
      speakers: [
        {
          name: 'Imran Malik',
          title: 'Founder & CEO, StartupHub',
          bio: 'Serial entrepreneur with 3 successful exits in the tech industry.',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      agenda: [
        {
          time: '14:00',
          title: 'Idea Validation & Market Research',
          description: 'How to validate your business idea before investing time and money',
          speaker: 'Imran Malik',
          duration: 60
        },
        {
          time: '15:00',
          title: 'Funding Strategies',
          description: 'Different ways to fund your startup',
          speaker: 'Imran Malik',
          duration: 60
        },
        {
          time: '16:00',
          title: 'Q&A and Networking',
          description: 'Interactive session with participants',
          speaker: 'All Speakers',
          duration: 60
        }
      ],
      requirements: [
        'Bring your business idea (optional)',
        'Notebook for taking notes',
        'Business cards for networking'
      ],
      benefits: [
        'Learn from experienced entrepreneurs',
        'Network with like-minded individuals',
        'Get feedback on your business ideas',
        'Access to startup resources'
      ],
      tags: ['entrepreneurship', 'workshop', 'business', 'startup'],
      registrationFee: {
        amount: 1500,
        currency: 'PKR'
      },
      registrationDeadline: '2025-09-05',
      createdBy: {
        firstName: 'Lahore',
        lastName: 'Chapter',
        email: 'lahore@namalumni.org'
      },
      status: 'Published',
      visibility: 'Public',
      feedback: [],
      averageRating: 0,
      totalFeedback: 0,
      isPast: false,
      isRegistrationOpen: true,
      spotsRemaining: 27,
      createdAt: '2025-06-20'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedFilter, searchTerm]);

  const filterEvents = () => {
    let filtered = events;

    // Filter by type
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(event => 
        event.type.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const handleEventRegister = (event: Event) => {
    if (!isAuthenticated) {
      alert('Please login to register for events');
      return;
    }
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Events</h1>
            <p className="text-xl mb-8">Join us for networking, learning, and celebrating our community</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  if (!isAuthenticated) {
                    alert('Please login to suggest events');
                    return;
                  }
                  setShowIdeaModal(true);
                }}
                className="flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-md transition-colors"
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                Suggest an Event
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
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center flex-wrap gap-2">
              <Filter className="h-5 w-5 text-green-800" />
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === 'all' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => setSelectedFilter('reunion')}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === 'reunion' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reunions
              </button>
              <button 
                onClick={() => setSelectedFilter('networking')}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === 'networking' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Networking
              </button>
              <button 
                onClick={() => setSelectedFilter('workshop')}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === 'workshop' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Workshops
              </button>
              <button 
                onClick={() => setSelectedFilter('career')}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === 'career' 
                    ? 'bg-green-800 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Career
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={event.images[0]?.url || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.type === 'Reunion' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'Networking' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Workshop' ? 'bg-green-100 text-green-800' :
                        event.type === 'Career' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    {event.registrationFee.amount > 0 && (
                      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded text-sm font-medium">
                        {event.registrationFee.currency} {event.registrationFee.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.shortDescription || event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.isVirtual ? 'Virtual Event' : event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.registeredCount}/{event.capacity} registered</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEventDetails(event)}
                        className="flex-1 px-4 py-2 border border-green-800 text-green-800 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                      {event.isRegistrationOpen && !event.isPast && (
                        <button
                          onClick={() => handleEventRegister(event)}
                          className="flex-1 px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {selectedEvent && (
        <>
          <EventRegistrationModal 
            isOpen={showRegistrationModal}
            onClose={() => {
              setShowRegistrationModal(false);
              setSelectedEvent(null);
            }}
            eventTitle={selectedEvent.title}
            eventDate={selectedEvent.date}
          />
          
          <EventDetailsModal
            isOpen={showDetailsModal}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedEvent(null);
            }}
            event={selectedEvent}
            onRegister={() => {
              setShowDetailsModal(false);
              setShowRegistrationModal(true);
            }}
          />
        </>
      )}
      
      <EventIdeaModal 
        isOpen={showIdeaModal}
        onClose={() => setShowIdeaModal(false)}
      />
    </div>
  );
};

export default Events;