import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import PostAProject from "../Home/PostAProject";
import techtalent from '../../assets/images/techtalent.png';
import AllProjects from "./AllProjects";
import { Input, Drawer, Checkbox, Radio, Button, Space, Divider } from "antd";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineAdjustments } from "react-icons/hi";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    projectType: [],
    skills: [],
    price: 'all',
    verified: false
  });
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

  const handleFilterChange = (category, value) => {
    if (category === 'projectType' || category === 'skills') {
      if (filters[category].includes(value)) {
        setFilters({
          ...filters,
          [category]: filters[category].filter(item => item !== value)
        });
      } else {
        setFilters({
          ...filters,
          [category]: [...filters[category], value]
        });
      }
    } else {
      setFilters({
        ...filters,
        [category]: value
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      projectType: [],
      skills: [],
      price: 'all',
      verified: false
    });
  };

  const applyFilters = () => {
    // Here you would normally filter projects based on filters
    // For this implementation, we'll just close the drawer
    setFiltersOpen(false);
    
    // You could also navigate to a filtered search page
    /*
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.append('query', searchQuery);
    if (filters.projectType.length) queryParams.append('type', filters.projectType.join(','));
    if (filters.skills.length) queryParams.append('skills', filters.skills.join(','));
    if (filters.price !== 'all') queryParams.append('price', filters.price);
    if (filters.verified) queryParams.append('verified', 'true');
    
    navigate(`/projects/search?${queryParams.toString()}`);
    */
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
      price: 'Free',
      link: '/projects/climate-prediction',
    }
  ];
  
  // Collect all unique skills from the projects for filter options
  const allSkills = [...new Set(projects.flatMap(project => project.skills))];
  
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
      <div className="flex flex-col lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 my-10 lg:my-[60px]">
        <div className="lg:flex-grow">
          <AllProjects projects={projects} />
        </div>
        <div className="lg:w-1/4 flex-shrink-0 !mb-8">
          <PostAProject />
        </div>
      </div>
      
      {/* Filters Drawer */}
      <Drawer
        title="Project Filters"
        placement="left"
        onClose={toggleFilters}
        open={filtersOpen}
        width={320}
        footer={
          <div className="flex justify-between">
            <Button onClick={resetFilters}>Reset All</Button>
            <Button type="primary" onClick={applyFilters}>Apply Filters</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Project Type</h3>
            <Space direction="vertical">
              <Checkbox
                checked={filters.projectType.includes('fullTime')}
                onChange={() => handleFilterChange('projectType', 'fullTime')}
              >
                Full Time
              </Checkbox>
              <Checkbox
                checked={filters.projectType.includes('partTime')}
                onChange={() => handleFilterChange('projectType', 'partTime')}
              >
                Part Time
              </Checkbox>
              <Checkbox
                checked={filters.projectType.includes('contract')}
                onChange={() => handleFilterChange('projectType', 'contract')}
              >
                Contract
              </Checkbox>
              <Checkbox
                checked={filters.projectType.includes('remote')}
                onChange={() => handleFilterChange('projectType', 'remote')}
              >
                Remote
              </Checkbox>
              <Checkbox
                checked={filters.projectType.includes('onsite')}
                onChange={() => handleFilterChange('projectType', 'onsite')}
              >
                On-site
              </Checkbox>
            </Space>
          </div>
          
          <Divider />
          
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <Radio.Group 
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
            >
              <Space direction="vertical">
                <Radio value="all">All</Radio>
                <Radio value="free">Free</Radio>
                <Radio value="paid">Paid</Radio>
              </Space>
            </Radio.Group>
          </div>
          
          <Divider />
          
          <div>
            <h3 className="font-semibold mb-2">Verification</h3>
            <Checkbox
              checked={filters.verified}
              onChange={(e) => handleFilterChange('verified', e.target.checked)}
            >
              Verified Projects Only
            </Checkbox>
          </div>
          
          <Divider />
          
          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="max-h-60 overflow-y-auto pr-2">
              <Space direction="vertical">
                {allSkills.map((skill, index) => (
                  <Checkbox
                    key={index}
                    checked={filters.skills.includes(skill)}
                    onChange={() => handleFilterChange('skills', skill)}
                  >
                    {skill}
                  </Checkbox>
                ))}
              </Space>
            </div>
          </div>
        </div>
      </Drawer>
    </Container>
  );
}

export default Projects;
