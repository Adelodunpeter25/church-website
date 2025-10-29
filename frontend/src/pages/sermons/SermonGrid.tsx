


import { useState, useMemo } from 'react';

interface SermonGridProps {
  searchTerm: string;
  filterSeries: string;
  filterSpeaker: string;
  filterDateRange: string;
  sortBy: string;
  viewMode: 'grid' | 'list';
}

const sermons = [
  {
    id: 1,
    title: 'Walking in Faith - Part 3',
    speaker: 'Pastor John Smith',
    speakerId: 'john-smith',
    date: '2025-01-14',
    duration: '45:30',
    series: 'Walking in Faith',
    seriesId: 'walking-in-faith',
    downloads: 234,
    plays: 567,
    description: 'Exploring the journey of faith through life\'s challenges and victories.',
    audioFile: 'walking-faith-pt3.mp3',
    thumbnail: 'sermon1.jpg'
  },
  {
    id: 2,
    title: 'The Power of Prayer',
    speaker: 'Pastor David Wilson',
    speakerId: 'david-wilson',
    date: '2025-01-07',
    duration: '38:15',
    series: 'Grace and Truth',
    seriesId: 'grace-and-truth',
    downloads: 189,
    plays: 423,
    description: 'Understanding the transformative power of prayer in our daily lives.',
    audioFile: 'power-of-prayer.mp3',
    thumbnail: 'sermon2.jpg'
  },
  {
    id: 3,
    title: 'Love in Action - Serving Others',
    speaker: 'Pastor Sarah Johnson',
    speakerId: 'sarah-johnson',
    date: '2025-01-01',
    duration: '42:20',
    series: 'Love in Action',
    seriesId: 'love-in-action',
    downloads: 156,
    plays: 334,
    description: 'How to demonstrate Christ\'s love through practical service to others.',
    audioFile: 'love-in-action.mp3',
    thumbnail: 'sermon3.jpg'
  },
  {
    id: 4,
    title: 'Finding Hope in Dark Times',
    speaker: 'Pastor Michael Brown',
    speakerId: 'michael-brown',
    date: '2023-12-24',
    duration: '51:45',
    series: 'Grace and Truth',
    seriesId: 'grace-and-truth',
    downloads: 298,
    plays: 678,
    description: 'A Christmas message about finding hope and light during difficult seasons.',
    audioFile: 'hope-dark-times.mp3',
    thumbnail: 'sermon4.jpg'
  },
  {
    id: 5,
    title: 'Walking in Faith - Part 2',
    speaker: 'Pastor John Smith',
    speakerId: 'john-smith',
    date: '2023-12-17',
    duration: '47:10',
    series: 'Walking in Faith',
    seriesId: 'walking-in-faith',
    downloads: 267,
    plays: 512,
    description: 'Continuing our exploration of living by faith, not by sight.',
    audioFile: 'walking-faith-pt2.mp3',
    thumbnail: 'sermon5.jpg'
  },
  {
    id: 6,
    title: 'God\'s Unconditional Love',
    speaker: 'Pastor Sarah Johnson',
    speakerId: 'sarah-johnson',
    date: '2023-11-26',
    duration: '43:25',
    series: '',
    seriesId: 'standalone',
    downloads: 321,
    plays: 698,
    description: 'A standalone message about experiencing God\'s unconditional love.',
    audioFile: 'gods-love.mp3',
    thumbnail: 'sermon6.jpg'
  }
];

export default function SermonGrid({ 
  searchTerm, 
  filterSeries, 
  filterSpeaker, 
  filterDateRange, 
  sortBy, 
  viewMode 
}: SermonGridProps) {
  const [playingSermon, setPlayingSermon] = useState<number | null>(null);

  const filteredAndSortedSermons = useMemo(() => {
    let filtered = sermons.filter(sermon => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Series filter
      const matchesSeries = filterSeries === 'all' || 
        (filterSeries === 'standalone' && sermon.seriesId === 'standalone') ||
        sermon.seriesId === filterSeries;

      // Speaker filter
      const matchesSpeaker = filterSpeaker === 'all' || sermon.speakerId === filterSpeaker;

      // Date range filter
      const sermonDate = new Date(sermon.date);
      const now = new Date();
      let matchesDateRange = true;

      if (filterDateRange !== 'all') {
        switch (filterDateRange) {
          case 'this-month':
            matchesDateRange = sermonDate.getMonth() === now.getMonth() && 
                             sermonDate.getFullYear() === now.getFullYear();
            break;
          case 'last-3-months':
            const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            matchesDateRange = sermonDate >= threeMonthsAgo;
            break;
          case 'last-6-months':
            const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
            matchesDateRange = sermonDate >= sixMonthsAgo;
            break;
          case 'this-year':
            matchesDateRange = sermonDate.getFullYear() === now.getFullYear();
            break;
          case 'last-year':
            matchesDateRange = sermonDate.getFullYear() === now.getFullYear() - 1;
            break;
        }
      }

      return matchesSearch && matchesSeries && matchesSpeaker && matchesDateRange;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-az':
          return a.title.localeCompare(b.title);
        case 'title-za':
          return b.title.localeCompare(a.title);
        case 'speaker':
          return a.speaker.localeCompare(b.speaker);
        case 'most-downloaded':
          return b.downloads - a.downloads;
        case 'most-played':
          return b.plays - a.plays;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterSeries, filterSpeaker, filterDateRange, sortBy]);

  const togglePlay = (sermonId: number) => {
    if (playingSermon === sermonId) {
      setPlayingSermon(null);
    } else {
      setPlayingSermon(sermonId);
    }
  };

  const downloadSermon = (sermon: typeof sermons[0]) => {
    // TODO: Implement sermon download functionality
    alert(`Downloading: ${sermon.title}`);
  };

  if (viewMode === 'list') {
    return (
      <div className="overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
          Showing {filteredAndSortedSermons.length} of {sermons.length} sermons
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAndSortedSermons.map((sermon) => (
            <div key={sermon.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <img 
                      className="w-16 h-16 rounded-lg object-top object-cover" 
                      src={`https://readdy.ai/api/search-image?query=modern%20church%20sermon%20artwork%20featuring%20golden%20cross%20and%20warm%20lighting%20with%20soft%20gradient%20background%2C%20peaceful%20spiritual%20atmosphere%20with%20rays%20of%20light%2C%20contemporary%20Christian%20design%20for%20sermon%20series%20thumbnail&width=200&height=200&seq=sermon${sermon.id}&orientation=squarish`}
                      alt={sermon.title}
                    />
                    <button
                      onClick={() => togglePlay(sermon.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <i className={`${playingSermon === sermon.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-lg`}></i>
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{sermon.title}</h3>
                    <p className="text-sm text-gray-500">{sermon.speaker}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>{new Date(sermon.date).toLocaleDateString()}</span>
                      <span>{sermon.duration}</span>
                      {sermon.series && (
                        <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {sermon.series}
                        </span>
                      )}
                      {!sermon.series && (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          Standalone
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 truncate">{sermon.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500 text-right">
                    <div className="flex items-center">
                      <i className="ri-download-line mr-1"></i>
                      {sermon.downloads}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-play-line mr-1"></i>
                      {sermon.plays}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadSermon(sermon)}
                      className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-download-line"></i>
                      </div>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-more-2-line"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAndSortedSermons.length} of {sermons.length} sermons
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedSermons.map((sermon) => (
          <div key={sermon.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                className="w-full h-48 object-top object-cover" 
                src={`https://readdy.ai/api/search-image?query=modern%20church%20sermon%20artwork%20featuring%20golden%20cross%20and%20warm%20lighting%20with%20soft%20gradient%20background%2C%20peaceful%20spiritual%20atmosphere%20with%20rays%20of%20light%2C%20contemporary%20Christian%20design%20for%20sermon%20series%20thumbnail&width=400&height=300&seq=sermon${sermon.id}&orientation=landscape`}
                alt={sermon.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => togglePlay(sermon.id)}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <i className={`${playingSermon === sermon.id ? 'ri-pause-fill' : 'ri-play-fill'} text-white text-2xl`}></i>
                </div>
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                {sermon.series ? (
                  <span className="inline-flex px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                    {sermon.series}
                  </span>
                ) : (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-600 text-white rounded-full">
                    Standalone
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{sermon.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sermon.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="truncate">{sermon.speaker}</span>
                <span>{sermon.duration}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{new Date(sermon.date).toLocaleDateString()}</span>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <i className="ri-download-line mr-1"></i>
                    {sermon.downloads}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-play-line mr-1"></i>
                    {sermon.plays}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => togglePlay(sermon.id)}
                  className={`flex items-center px-3 py-1 rounded-md text-sm cursor-pointer whitespace-nowrap ${
                    playingSermon === sermon.id 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <i className={`${playingSermon === sermon.id ? 'ri-pause-line' : 'ri-play-line'} mr-1`}></i>
                  {playingSermon === sermon.id ? 'Playing' : 'Play'}
                </button>
                <button
                  onClick={() => downloadSermon(sermon)}
                  className="flex items-center px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-download-line mr-1"></i>
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAndSortedSermons.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-file-search-line text-gray-400 text-4xl mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sermons found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
