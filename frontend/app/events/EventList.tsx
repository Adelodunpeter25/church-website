
'use client';

const events = [
  {
    id: 1,
    title: 'Youth Retreat 2024',
    description: 'A spiritual retreat for young people to grow closer to God and each other through worship, teaching, and fellowship.',
    date: '2024-03-15',
    endDate: '2024-03-17',
    time: '6:00 PM',
    location: 'Mountain View Camp',
    organizer: 'Sarah Johnson',
    attendees: 45,
    maxAttendees: 50,
    status: 'confirmed',
    category: 'Retreat',
    registrationDeadline: '2024-03-01'
  },
  {
    id: 2,
    title: 'Community Outreach',
    description: 'Join us as we serve our community by volunteering at the local food bank and sharing God\'s love.',
    date: '2024-01-20',
    time: '9:00 AM',
    location: 'Downtown Food Bank',
    organizer: 'Michael Brown',
    attendees: 23,
    maxAttendees: 30,
    status: 'confirmed',
    category: 'Outreach',
    registrationDeadline: '2024-01-18'
  },
  {
    id: 3,
    title: 'Bible Study Workshop',
    description: 'Learn effective Bible study methods and deepen your understanding of Scripture through interactive sessions.',
    date: '2024-01-25',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    organizer: 'Pastor David Wilson',
    attendees: 18,
    maxAttendees: 25,
    status: 'confirmed',
    category: 'Education',
    registrationDeadline: '2024-01-23'
  },
  {
    id: 4,
    title: 'Marriage Enrichment Seminar',
    description: 'Strengthen your marriage with biblical principles and practical tools for building a lasting relationship.',
    date: '2024-02-10',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    organizer: 'Pastor John Smith',
    attendees: 12,
    maxAttendees: 40,
    status: 'planning',
    category: 'Seminar',
    registrationDeadline: '2024-02-05'
  }
];

export default function EventList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Retreat': return 'bg-purple-100 text-purple-800';
      case 'Outreach': return 'bg-green-100 text-green-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Seminar': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>

                <p className="text-gray-700 mb-4">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <i className="ri-calendar-line mr-2"></i>
                      {new Date(event.date).toLocaleDateString()}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-time-line mr-2"></i>
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-map-pin-line mr-2"></i>
                      {event.location}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <i className="ri-user-line mr-2"></i>
                      Organized by {event.organizer}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-group-line mr-2"></i>
                      {event.attendees}/{event.maxAttendees} registered
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="ri-calendar-check-line mr-2"></i>
                      Registration deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Registration Progress</span>
                    <span className="text-sm text-gray-600">{event.attendees}/{event.maxAttendees}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="ml-6 flex-shrink-0">
                <img 
                  className="h-24 w-32 rounded-lg object-top object-cover" 
                  src={`https://readdy.ai/api/search-image?query=church%20event%20activity%20featuring%20people%20gathering%20in%20community%20fellowship%20with%20warm%20friendly%20atmosphere%2C%20modern%20church%20interior%20or%20outdoor%20setting%2C%20diverse%20group%20of%20people%20participating%20in%20$%7Bevent.category.toLowerCase%28%29%7D%20activity&width=200&height=150&seq=event${event.id}&orientation=landscape`}
                  alt={event.title}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-eye-line mr-1"></i>
                  View Details
                </button>
                <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-edit-line mr-1"></i>
                  Edit
                </button>
                <button className="flex items-center px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 cursor-pointer whitespace-nowrap">
                  <i className="ri-group-line mr-1"></i>
                  Manage Attendees
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-share-line"></i>
                  </div>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-more-2-line"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
