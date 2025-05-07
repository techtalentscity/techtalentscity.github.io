import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import PostAProject from "../Home/PostAProject";
import techtalent from '../../assets/images/techtalent.png';
import AllProjects from "./AllProjects";
import { Input, Drawer, Checkbox, Button, Space, Divider } from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustments } from "react-icons/hi";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    remote: false,
    free: false,
    premium: false
  });
  // Added states for pagination
  const [projectsPerPage, setProjectsPerPage] = useState(3); // Initially show 3 projects
  const navigate = useNavigate();
  
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

  // State to hold filtered projects
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  
  const applyFilters = () => {
    let result = [...projects];
    
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
    setProjectsPerPage(3); // Reset pagination when filters are applied
  };

  // Load more projects function
  const loadMoreProjects = () => {
    // Increase the number of projects to show
    setProjectsPerPage(prevCount => prevCount + 3);
  };

  const projects = [
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
    }
  ];
  
  // Reset all filters and display all projects
  const clearFilters = () => {
    resetFilters();
    setIsFiltered(false);
    setProjectsPerPage(3); // Reset pagination when filters are cleared
  };
  
  // Get current projects based on pagination
  const getCurrentProjects = () => {
    const projectsToUse = isFiltered ? filteredProjects : projects;
    return projectsToUse.slice(0, projectsPerPage);
  };
  
  // Check if there are more projects to load
  const hasMoreProjects = () => {
    const projectsToUse = isFiltered ? filteredProjects : projects;
    return projectsPerPage < projectsToUse.length;
  };
  
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
                <AllProjects projects={getCurrentProjects()} />
                {/* Load More button for filtered projects */}
                {hasMoreProjects() && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      onClick={loadMoreProjects} 
                      type="primary" 
                      size="large"
                      className="px-8 h-12 flex items-center justify-center"
                    >
                      Load More Projects
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
              <AllProjects projects={getCurrentProjects()} />
              {/* Load More button for all projects */}
              {hasMoreProjects() && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={loadMoreProjects} 
                    type="primary" 
                    size="large"
                    className="px-8 h-12 flex items-center justify-center"
                  >
                    Load More Projects
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
}

export default Projects;
