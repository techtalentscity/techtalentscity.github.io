import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import PostAProject from "../Home/PostAProject";
import techtalent from '../../assets/images/techtalent.png';
import { Input, Drawer, Checkbox, Button, Space, Divider } from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustments } from "react-icons/hi";

// AllProjects component to display the projects
const AllProjects = ({ projects }) => {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">
                <a href={project.link} className="hover:text-blue-600 transition-colors">
                  {project.title}
                </a>
              </h2>
              <div className="flex flex-wrap gap-2 my-3">
                {project.skills.slice(0, 3).map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    +{project.skills.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                {project.remote && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
                    Remote
                  </span>
                )}
                {project.premium && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">
                    Premium
                  </span>
                )}
                {project.price === 'Free' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">
                    Free
                  </span>
                )}
                {project.verified && (
                  <span className="flex items-center gap-1 text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">Verified</span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <img src={project.logo} alt="Company Logo" className="w-12 h-12 object-contain" />
              <div className="text-right">
                <div className="text-lg font-bold">{project.price}</div>
                <a href={project.link} className="text-blue-600 text-sm hover:underline">View Details</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    remote: false,
    free: false,
    premium: false
  });
  const [projectsToShow, setProjectsToShow] = useState(5);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const navigate = useNavigate();
  
  // Function to load more projects
  const loadMoreProjects = () => {
    setProjectsToShow(prev => prev + 5);
  };
  
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        navigate(`/projects/search?query=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const resetFilters = () => {
    setFilters({
      remote: false,
      free: false,
      premium: false
    });
  };
  
  const applyFilters = () => {
    let result = [...allProjects];
    
    // Apply filtering logic
    if (filters.remote) {
      result = result.filter(project => project.remote === true);
    }
    
    if (filters.free) {
      result = result.filter(project => project.price === 'Free');
    }
    
    if (filters.premium) {
      result = result.filter(project => project.premium === true);
    }
    
    // Update filtered projects state
    setFilteredProjects(result);
    setIsFiltered(true);
    setFiltersOpen(false);
    // Reset the number of projects to show when applying new filters
    setProjectsToShow(5);
  };
  
  // Reset all filters and display all projects
  const clearFilters = () => {
    resetFilters();
    setIsFiltered(false);
  };

  // Updated projects array with more items for pagination
  const allProjects = [
    {
      title: 'Building an AI-powered Agent for Customer Engagement',
      skills: [
        'NLP Engineers',
        'Machine Learning Developers',
        'Frontend Developers',
        'Backend Developers',
        'UI/UX Designers',
        'Cybersecurity Specialists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: true,
      price: '$200',
      link: '/projects/ai-agent',
    },
    {
      title: 'Developing a Mobile App for Mental Health Support',
      skills: [
        'Mobile App Developers',
        'UI/UX Designers',
        'Backend Developers',
        'Data Security Specialists',
        'Mental Health Researchers'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: false,
      price: '$200',
      link: '/projects/mental-app',
    },
    {
      title: 'Real-Time Notification System for Tech Platforms',
      skills: [
        'Realtime Engineers',
        'Socket.io Developers',
        'System Integrators',
        'Cloud Infrastructure Specialists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: true,
      price: '$200',
      link: '/projects/real-time-notification-system',
    },
    {
      title: 'Blockchain-based DeFi Lending Platform',
      skills: [
        'Solidity Developers',
        'Smart Contract Auditors',
        'Frontend Developers',
        'Backend/API Developers',
        'DeFi Strategists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: false,
      price: '$200',
      link: '/projects/blockchain-defi',
    },
    {
      title: 'AI-Driven Climate Change Prediction Platform',
      skills: [
        'AI/ML Researchers',
        'Data Scientists',
        'Frontend Developers',
        'Climate Experts',
        'Visualization Engineers'
      ],
      logo: techtalent,
      verified: true,
      premium: false,
      remote: true,
      price: 'Free',
      link: '/projects/climate-prediction',
    },
    // Additional projects for pagination
    {
      title: 'Cross-Platform Mobile Game Development',
      skills: [
        'Unity Developers',
        'Game Designers',
        '3D Modelers',
        'Mobile Game Developers'
      ],
      logo: techtalent,
      verified: true,
      premium: false,
      remote: true,
      price: 'Free',
      link: '/projects/mobile-game-dev',
    },
    {
      title: 'Healthcare Data Analytics Dashboard',
      skills: [
        'Data Scientists',
        'Healthcare Analysts',
        'React Developers',
        'Database Engineers'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: true,
      price: '$300',
      link: '/projects/healthcare-analytics',
    },
    {
      title: 'E-commerce Platform with AR Visualization',
      skills: [
        'AR Developers',
        'E-commerce Specialists',
        'Full Stack Developers',
        'UI/UX Designers'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: false,
      price: '$250',
      link: '/projects/ar-ecommerce',
    },
    {
      title: 'Open Source Sustainability Tracking Tool',
      skills: [
        'Open Source Contributors',
        'Environmental Engineers',
        'Frontend Developers',
        'Data Visualization Experts'
      ],
      logo: techtalent,
      verified: true,
      premium: false,
      remote: true,
      price: 'Free',
      link: '/projects/sustainability-tracker',
    },
    {
      title: 'Decentralized Social Media Platform',
      skills: [
        'Blockchain Developers',
        'P2P Network Engineers',
        'React Developers',
        'Privacy Specialists'
      ],
      logo: techtalent,
      verified: true,
      premium: true,
      remote: true,
      price: '$350',
      link: '/projects/decentralized-social',
    }
  ];
  
  return (
    <Container className={'pt-9'}>
      <h1 className="text-5xl md:text-6xl font-bold pb-6 text-center">Projects</h1>
      <div className="flex items-center space-x-2 lg:space-x-6 mb-4">
        <div 
          className="flex gap-2 items-center bg-[#F2F2F2] rounded-xl py-4 px-5 shadow-md cursor-pointer"
          onClick={toggleFilters}
        >
          <HiOutlineAdjustments />
          <p className="text-sm hidden md:block">Filters</p>
        </div>
        <div className='w-full rounded-xl shadow-md bg-white/80 flex justify-between items-center py-2 px-5'>
          <Input
            placeholder="Try searching for projects..."
            className="flex-grow border-none mr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div 
            className="bg-black w-10 h-10 rounded-full p-3 flex justify-center items-center cursor-pointer" 
            onClick={handleSearch}
          >
            <IoIosSearch size={24} color='white' />
          </div>
        </div>
      </div>
      
      {/* Display applied filters if any */}
      {isFiltered && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="font-medium">Active filters:</span>
          {filters.remote && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Remote</span>
          )}
          {filters.free && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Free</span>
          )}
          {filters.premium && (
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Premium</span>
          )}
          <Button type="link" onClick={clearFilters} className="text-blue-600">
            Clear all
          </Button>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 my-10 lg:my-[60px]">
        <div className="lg:flex-grow">
          {isFiltered ? (
            filteredProjects.length > 0 ? (
              <>
                <AllProjects projects={filteredProjects.slice(0, projectsToShow)} />
                {projectsToShow < filteredProjects.length && (
                  <div className="flex justify-center mt-8">
                    <Button
                      type="primary"
                      className="px-8 py-2 h-auto"
                      onClick={loadMoreProjects}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium">No projects match your filters</h3>
                <p className="mt-2 text-gray-600">Try adjusting your filter criteria or clear all filters.</p>
                <Button type="primary" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )
          ) : (
            <>
              <AllProjects projects={allProjects.slice(0, projectsToShow)} />
              {projectsToShow < allProjects.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    type="primary"
                    className="px-8 py-2 h-auto"
                    onClick={loadMoreProjects}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="lg:w-1/4 flex-shrink-0 !mb-8">
          <PostAProject />
        </div>
      </div>
      
      {/* Simplified Filters Drawer with only Remote, Free, and Premium options */}
      <Drawer
        title="Project Filters"
        placement="left"
        onClose={toggleFilters}
        open={filtersOpen}
        width={320}
        footer={
          <div className="flex justify-between">
            <Button onClick={resetFilters}>Reset All</Button>
            <Button type="primary" onClick={applyFilters} disabled={!filters.remote && !filters.free && !filters.premium}>
              Apply Filters
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Filter By</h3>
            <Space direction="vertical">
              <Checkbox
                checked={filters.remote}
                onChange={(e) => handleFilterChange('remote', e.target.checked)}
              >
                Remote
              </Checkbox>
              <Checkbox
                checked={filters.free}
                onChange={(e) => handleFilterChange('free', e.target.checked)}
              >
                Free
              </Checkbox>
              <Checkbox
                checked={filters.premium}
                onChange={(e) => handleFilterChange('premium', e.target.checked)}
              >
                Premium
              </Checkbox>
            </Space>
          </div>
        </div>
      </Drawer>
    </Container>
  );
};

export default Projects;
