import { useState } from 'react';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import { EventIdeaModal } from '../components/EventIdeaModal';
import EventCountdown from '../components/EventCountdown';

// Event data
const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Alumni Reunion',
    date: '2025-06-25T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'Career Development Workshop',
    date: '2025-07-10T15:00:00.000Z',
  },
  {
    id: 3,
    title: 'Networking Dinner',
    date: '2025-08-18T19:00:00.000Z',
  }
];

// Events component
const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{title: string, date: string} | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Alumni Events</h1>
            <p className="text-xl mb-8">Join us for networking, learning, and celebrating our community</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowRegistrationModal(true)}
                className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Register for Event
              </button>
              <button 
                onClick={() => setShowIdeaModal(true)}
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Suggest an Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Countdown */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-gray-50 p-4 rounded-lg">
                <EventCountdown title={event.title} date={event.date} />
                <button 
                  onClick={() => {
                    setSelectedEvent({title: event.title, date: event.date});
                    setShowRegistrationModal(true);
                  }}
                  className="mt-4 w-full bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register for This Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-green-800 text-white' 
                  : 'bg-white text-green-800 border border-green-800 hover:bg-green-50'
              }`}
            >
              All Events
            </button>
            <button 
              onClick={() => setSelectedFilter('networking')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'networking' 
                  ? 'bg-green-800 text-white' 
                  : 'bg-white text-green-800 border border-green-800 hover:bg-green-50'
              }`}
            >
              Networking
            </button>
            <button 
              onClick={() => setSelectedFilter('professional')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedFilter === 'professional' 
                  ? 'bg-green-800 text-white' 
                  : 'bg-white text-green-800 border border-green-800 hover:bg-green-50'
              }`}
            >
              Professional Development
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedEvent && (
        <EventRegistrationModal 
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          eventTitle={selectedEvent.title}
          eventDate={selectedEvent.date}
        />
      )}
      <EventIdeaModal 
        isOpen={showIdeaModal}
        onClose={() => setShowIdeaModal(false)}
      />
    </div>
  );
};

export default Events;