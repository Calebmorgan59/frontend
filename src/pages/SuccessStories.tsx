import React, { useState, useEffect } from 'react';
import { Search, Award, Briefcase, GraduationCap, Filter, Heart, Star, Quote, Share2, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StoryModal from '../components/StoryModal';

interface Story {
  id: number;
  name: string;
  batch: string;
  title: string;
  story: string;
  achievements: string[];
  image: string;
  fullStory?: string;
  category: string;
  company?: string;
  location?: string;
  graduationYear: number;
  degreeProgram: string;
  currentPosition: string;
  linkedIn?: string;
  twitter?: string;
  website?: string;
  tags: string[];
  likes: number;
  shares: number;
  featured: boolean;
  publishedDate: string;
}

const SuccessStories = () => {
  const { user, isAuthenticated } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample success stories data
  const sampleStories: Story[] = [
    {
      id: 1,
      name: 'Dr. Sarah Ahmed',
      batch: '2015',
      title: 'From Student to Tech Entrepreneur',
      story: 'Sarah\'s journey from a computer science student to founding one of Pakistan\'s most successful tech startups is truly inspiring.',
      achievements: [
        'Founded TechVentures, now valued at $50M',
        'Featured in Forbes 30 Under 30',
        'Raised $15M in Series A funding',
        'Created 200+ jobs in the tech sector',
        'Mentored 50+ young entrepreneurs'
      ],
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Sarah Ahmed graduated from Namal University in 2015 with a degree in Computer Science. During her final year, she developed an innovative mobile application for healthcare management as her final project. What started as an academic exercise soon caught the attention of local healthcare providers. After graduation, Sarah decided to turn her project into a full-fledged startup. She faced numerous challenges in the early days, from securing funding to building a team. However, her determination and the strong foundation she received at Namal helped her persevere. Today, TechVentures is one of Pakistan\'s leading healthcare technology companies, serving over 100 hospitals and clinics across the country. Sarah credits her success to the problem-solving skills and entrepreneurial mindset she developed during her time at Namal.',
      category: 'Entrepreneurship',
      company: 'TechVentures',
      location: 'Lahore, Pakistan',
      graduationYear: 2015,
      degreeProgram: 'BS Computer Science',
      currentPosition: 'Founder & CEO',
      linkedIn: 'https://linkedin.com/in/sarah-ahmed',
      website: 'https://techventures.pk',
      tags: ['technology', 'healthcare', 'startup', 'funding'],
      likes: 234,
      shares: 45,
      featured: true,
      publishedDate: '2025-06-15'
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      batch: '2016',
      title: 'Leading Innovation at Google',
      story: 'Ahmed\'s path from Namal to becoming a Senior Software Engineer at Google showcases the global impact of our alumni.',
      achievements: [
        'Senior Software Engineer at Google',
        'Led development of Google Assistant features',
        'Published 15+ research papers',
        'Speaker at international tech conferences',
        'Mentor for Google Summer of Code'
      ],
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Ahmed Khan\'s journey to Google began during his undergraduate studies at Namal University. As a Computer Science student, he was fascinated by artificial intelligence and machine learning. He spent countless hours in the computer lab, working on personal projects and contributing to open-source software. His dedication paid off when he secured an internship at a local tech company during his third year. After graduation, Ahmed worked for two years at a startup in Karachi, where he honed his skills in software development and gained valuable industry experience. His breakthrough came when he applied for a position at Google through their global hiring program. The rigorous interview process tested not just his technical skills but also his problem-solving abilities and cultural fit. Ahmed credits his success to the strong analytical thinking and collaborative skills he developed at Namal. Today, he works on cutting-edge AI projects at Google\'s Mountain View campus and regularly mentors students from his alma mater.',
      category: 'Technology',
      company: 'Google',
      location: 'Mountain View, USA',
      graduationYear: 2016,
      degreeProgram: 'BS Computer Science',
      currentPosition: 'Senior Software Engineer',
      linkedIn: 'https://linkedin.com/in/ahmed-khan',
      tags: ['google', 'ai', 'machine-learning', 'silicon-valley'],
      likes: 189,
      shares: 32,
      featured: true,
      publishedDate: '2025-06-10'
    },
    {
      id: 3,
      name: 'Dr. Fatima Malik',
      batch: '2014',
      title: 'Breakthrough Research in Biotechnology',
      story: 'Fatima\'s groundbreaking research in biotechnology has earned her international recognition and is making a real difference in healthcare.',
      achievements: [
        'PhD from MIT in Biotechnology',
        'Published in Nature and Science journals',
        'Developed novel cancer treatment method',
        'Received NIH Research Grant ($2M)',
        'Founded BioInnovate Research Lab'
      ],
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Dr. Fatima Malik\'s passion for biotechnology was ignited during her undergraduate studies in Biomedical Engineering at Namal University. Her professors recognized her exceptional analytical skills and encouraged her to pursue research. During her final year, she worked on a project involving drug delivery systems, which sparked her interest in cancer research. After graduation, Fatima was accepted into MIT\'s prestigious PhD program in Biotechnology. Her doctoral research focused on developing targeted therapy for aggressive forms of cancer. The breakthrough came when she discovered a novel mechanism for delivering drugs directly to cancer cells while minimizing damage to healthy tissue. Her research has been published in top-tier journals and has attracted significant funding from the National Institutes of Health. Today, Dr. Malik runs her own research lab and is working on translating her discoveries into clinical treatments. She remains connected to Namal University, often returning to give guest lectures and inspire the next generation of biomedical engineers.',
      category: 'Research',
      company: 'MIT',
      location: 'Boston, USA',
      graduationYear: 2014,
      degreeProgram: 'BS Biomedical Engineering',
      currentPosition: 'Research Scientist & Lab Director',
      linkedIn: 'https://linkedin.com/in/fatima-malik',
      tags: ['biotechnology', 'cancer-research', 'mit', 'healthcare'],
      likes: 156,
      shares: 28,
      featured: false,
      publishedDate: '2025-06-05'
    },
    {
      id: 4,
      name: 'Imran Ali',
      batch: '2017',
      title: 'Transforming Education Through Technology',
      story: 'Imran\'s EdTech startup is revolutionizing how students learn across Pakistan, making quality education accessible to all.',
      achievements: [
        'Founded EduTech Solutions',
        'Reached 500,000+ students',
        'Raised $5M in funding',
        'Winner of UNESCO Innovation Award',
        'Expanded to 3 countries'
      ],
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Imran Ali\'s mission to democratize education began during his time as a Business Administration student at Namal University. Coming from a rural background, he understood firsthand the challenges students face in accessing quality education. During his studies, he noticed how technology could bridge the gap between urban and rural education. His final year project involved developing an online learning platform for mathematics, which received praise from faculty and students alike. After graduation, Imran worked briefly in the corporate sector but couldn\'t shake his passion for education. He decided to pursue his vision and founded EduTech Solutions with two classmates. The early days were challenging, with limited resources and skepticism from traditional educators. However, their platform\'s effectiveness in improving student outcomes gradually won over schools and parents. Today, EduTech Solutions serves over half a million students across Pakistan, Afghanistan, and Bangladesh. The platform offers courses in multiple languages and has been particularly effective in reaching students in remote areas. Imran\'s work has been recognized by UNESCO, and he continues to expand his mission of making quality education accessible to all.',
      category: 'Education',
      company: 'EduTech Solutions',
      location: 'Islamabad, Pakistan',
      graduationYear: 2017,
      degreeProgram: 'BBA',
      currentPosition: 'Founder & CEO',
      linkedIn: 'https://linkedin.com/in/imran-ali',
      website: 'https://edutechsolutions.pk',
      tags: ['education', 'edtech', 'social-impact', 'unesco'],
      likes: 201,
      shares: 38,
      featured: false,
      publishedDate: '2025-06-01'
    },
    {
      id: 5,
      name: 'Ayesha Rahman',
      batch: '2018',
      title: 'Sustainable Energy Pioneer',
      story: 'Ayesha is leading the renewable energy revolution in Pakistan, developing innovative solutions for clean energy access.',
      achievements: [
        'Founded GreenEnergy Innovations',
        'Installed 1000+ solar systems',
        'Reduced CO2 emissions by 50,000 tons',
        'Winner of Global Climate Action Award',
        'Created 300+ green jobs'
      ],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Ayesha Rahman\'s commitment to environmental sustainability was shaped during her Electrical Engineering studies at Namal University. She was particularly inspired by courses on renewable energy systems and sustainable development. Her senior project involved designing an efficient solar power system for rural communities, which opened her eyes to the potential of clean energy in addressing Pakistan\'s energy crisis. After graduation, Ayesha worked for a multinational energy company, where she gained valuable experience in project management and energy systems. However, she felt called to make a more direct impact on her country\'s energy challenges. In 2020, she founded GreenEnergy Innovations with the mission of making renewable energy accessible and affordable for all Pakistanis. Her company specializes in designing and installing solar power systems for homes, businesses, and communities. What sets her apart is her focus on serving underserved areas where traditional energy infrastructure is lacking. Ayesha\'s work has not only provided clean energy to thousands of families but has also created hundreds of jobs in the green energy sector. Her efforts have been recognized internationally, and she was recently awarded the Global Climate Action Award by the United Nations.',
      category: 'Environmental',
      company: 'GreenEnergy Innovations',
      location: 'Lahore, Pakistan',
      graduationYear: 2018,
      degreeProgram: 'BS Electrical Engineering',
      currentPosition: 'Founder & CEO',
      linkedIn: 'https://linkedin.com/in/ayesha-rahman',
      tags: ['renewable-energy', 'sustainability', 'climate-action', 'solar'],
      likes: 178,
      shares: 41,
      featured: true,
      publishedDate: '2025-05-28'
    },
    {
      id: 6,
      name: 'Hassan Mahmood',
      batch: '2019',
      title: 'Financial Innovation Leader',
      story: 'Hassan is revolutionizing financial services in Pakistan through innovative fintech solutions that serve the unbanked population.',
      achievements: [
        'Co-founded FinanceForAll',
        'Served 2M+ unbanked customers',
        'Raised $10M Series A',
        'Featured in Financial Times',
        'Launched mobile banking platform'
      ],
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
      fullStory: 'Hassan Mahmood\'s journey into fintech began during his Business Administration studies at Namal University. A course on microfinance opened his eyes to the challenges faced by Pakistan\'s unbanked population. He learned that millions of people lacked access to basic financial services, limiting their ability to save, invest, and grow their businesses. This knowledge sparked a passion that would define his career. After graduation, Hassan worked at a traditional bank, where he gained insights into the financial sector\'s operations and limitations. He realized that conventional banking models were not designed to serve low-income populations effectively. Determined to bridge this gap, Hassan co-founded FinanceForAll with a fellow Namal alumnus. Their platform uses mobile technology to provide banking services to people who have never had a bank account. The solution is simple yet revolutionary: users can open accounts, transfer money, and access credit using just their mobile phones. The impact has been tremendous, with over 2 million people now having access to financial services for the first time. Hassan\'s work has attracted international attention and significant investment, enabling the company to expand its services and reach even more underserved communities.',
      category: 'Finance',
      company: 'FinanceForAll',
      location: 'Karachi, Pakistan',
      graduationYear: 2019,
      degreeProgram: 'BBA',
      currentPosition: 'Co-founder & CTO',
      linkedIn: 'https://linkedin.com/in/hassan-mahmood',
      tags: ['fintech', 'financial-inclusion', 'mobile-banking', 'microfinance'],
      likes: 143,
      shares: 25,
      featured: false,
      publishedDate: '2025-05-25'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setStories(sampleStories);
      setFilteredStories(sampleStories);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterStories();
  }, [stories, searchTerm, selectedCategory, selectedFilter]);

  const filterStories = () => {
    let filtered = stories;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => 
        story.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by featured/recent
    if (selectedFilter === 'featured') {
      filtered = filtered.filter(story => story.featured);
    } else if (selectedFilter === 'recent') {
      filtered = filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
    } else if (selectedFilter === 'popular') {
      filtered = filtered.sort((a, b) => b.likes - a.likes);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredStories(filtered);
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleLike = (storyId: number) => {
    if (!isAuthenticated) {
      alert('Please login to like stories');
      return;
    }
    
    setStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    ));
  };

  const handleShare = (story: Story) => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.story,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-800"></div>
          <p className="mt-4 text-gray-600">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl mb-8">Discover the inspiring journeys of our alumni who are making a difference around the world</p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stories by name, company, or keywords..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-5 w-5 text-green-800" />
              
              {/* Category Filters */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Categories</option>
                <option value="entrepreneurship">Entrepreneurship</option>
                <option value="technology">Technology</option>
                <option value="research">Research</option>
                <option value="education">Education</option>
                <option value="environmental">Environmental</option>
                <option value="finance">Finance</option>
              </select>

              {/* Sort Filters */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Stories</option>
                <option value="featured">Featured</option>
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {selectedFilter === 'all' && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-green-800 mb-8">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {stories.filter(story => story.featured).slice(0, 2).map(story => (
                <div key={story.id} className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleStoryClick(story)}>
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-yellow-500 text-green-900 text-xs font-bold rounded-full">FEATURED</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">{story.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">{story.title}</h3>
                      <p className="text-gray-600 mb-3">{story.name} • Class of {story.batch}</p>
                      <p className="text-gray-700 mb-4 line-clamp-3">{story.story}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{story.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span>{story.shares}</span>
                          </div>
                        </div>
                        <span className="text-green-800 font-medium">Read More →</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No stories found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map(story => (
                <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleStoryClick(story)}>
                  <div className="relative">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        story.category === 'Entrepreneurship' ? 'bg-purple-100 text-purple-800' :
                        story.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                        story.category === 'Research' ? 'bg-green-100 text-green-800' :
                        story.category === 'Education' ? 'bg-yellow-100 text-yellow-800' :
                        story.category === 'Environmental' ? 'bg-emerald-100 text-emerald-800' :
                        story.category === 'Finance' ? 'bg-indigo-100 text-indigo-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {story.category}
                      </span>
                    </div>
                    {story.featured && (
                      <div className="absolute top-4 right-4">
                        <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">{story.title}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        <span className="text-sm">{story.name} • Class of {story.batch}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">{story.currentPosition}</span>
                      </div>
                      {story.company && (
                        <div className="flex items-center text-gray-600">
                          <Award className="h-4 w-4 mr-2" />
                          <span className="text-sm">{story.company}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{story.story}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(story.id);
                          }}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{story.likes}</span>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(story);
                          }}
                          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>{story.shares}</span>
                        </button>
                      </div>
                      <span className="text-green-800 font-medium text-sm">Read Full Story →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default SuccessStories;