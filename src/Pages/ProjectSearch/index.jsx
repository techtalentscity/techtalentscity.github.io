// src/Pages/ProjectSearch/index.jsx
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { Card, Tag } from 'antd';
import Container from '../../components/Container';

// Mock fetch function - in a real app, this would be an API call
const fetchProjects = async () => {
  // Sample projects database based on our ProjectDetail data
  return [
    {
      id: 1,
      title: 'Building an AI-powered Agent for Customer Engagement',
      description: 'This project will develop a conversational AI agent to improve customer service efficiency in banking.',
      employmentType: 'Full-Time / Remote / Free',
      publishDate: 'May 16, 2024',
      skills: [
        'Natural Language Processing (NLP)',
        'Machine Learning',
        'Python',
        'React',
        'Node.js',
        'UI/UX Design',
        'Cybersecurity'
      ]
    },
    {
      id: 2,
      title: 'Real-time Notification System',
      description: 'Develop a comprehensive system that provides real-time notifications for users across multiple platforms.',
      employmentType: 'Part-Time / Hybrid / Paid',
      publishDate: 'May 10, 2024',
      skills: [
        'WebSockets',
        'React',
        'Node.js',
        'Redis',
        'Push Notifications',
        'Frontend',
        'Backend'
      ]
    },
    {
      id: 3,
      title: 'Blockchain-based Supply Chain Tracking',
      description: 'Create a decentralized application for transparent tracking of products through a global supply chain.',
      employmentType: 'Full-Time / Remote / Paid',
      publishDate: 'May 5, 2024',
      skills: [
        'Blockchain',
        'Smart Contracts',
        'Solidity',
        'Web3.js',
        'React',
        'Supply Chain',
        'API Development'
      ]
    },
    {
      id: 4,
      title: 'Climate Data Visualization Platform',
      description: 'Develop an interactive platform to visualize climate data and make environmental information accessible to the public.',
      employmentType: 'Part-Time / Remote / Free',
      publishDate: 'May 12, 2024',
      skills: [
        'Data Visualization',
        'D3.js',
        'React',
        'Python',
        'Data Analysis',
        'UI/UX Design',
        'API Integration'
      ]
    },
    {
      id: 5,
      title: 'Mental Health Support Application',
      description: 'Create a mobile application that provides mental health resources, mood tracking, and guided meditation exercises.',
      employmentType: 'Full-Time / Remote / Paid',
      publishDate: 'May 8, 2024',
      skills: [
        'Mobile Development',
        'React Native',
        'UI/UX Design',
        'Backend',
        'API Integration',
        'Data Security',
        'Healthcare Tech'
      ]
    }
  ];
};

const ProjectSearch = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
        
        // If there's an initial query, filter projects right away
        if (initialQuery) {
          filterProjects(initialQuery, data);
        } else {
          setFilteredProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    loadProjects();
  }, [initialQuery]);

  const filterProjects = (query, projectsData = projects) => {
    if (!query.trim()) {
      setFilteredProjects(projectsData);
      return;
    }
    
    const searchTerms = query.toLowerCase().split(' ');
    
    const filtered = projectsData.filter(project => {
      const projectText = `
        ${project.title} 
        ${project.description} 
        ${project.employmentType}
        ${project.skills.join(' ')}
      `.toLowerCase();
      
      return searchTerms.every(term => projectText.includes(term));
    });
    
    setFilteredProjects(filtered);
  };

  const handleSearch = () => {
    filterProjects(searchQuery);
    
    // Update URL without page reload
    const newUrl = `/projects/search?query=${encodeURIComponent(searchQuery)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-8">Project Search Results</h1>
      
      <div className="mb-8 rounded-xl shadow-md bg-white flex justify-between items-center py-3 px-4">
        <input
          type="text"
          placeholder="Search projects by title, description, or skills..."
          className="w-full bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div 
          className="bg-black w-10 h-10 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <IoIosSearch size={24} color="white" />
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Link to={`/project/${project.id}`} key={project.id}>
              <Card 
                className="h-full hover:shadow-lg transition-shadow"
                title={
                  <div className="font-bold text-xl">{project.title}</div>
                }
                extra={<span className="text-sm text-gray-500">{project.publishDate}</span>}
              >
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-gray-700 mb-4">{project.employmentType}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.slice(0, 5).map((skill, index) => (
                    <Tag key={index} color="blue">{skill}</Tag>
                  ))}
                  {project.skills.length > 5 && (
                    <Tag color="default">+{project.skills.length - 5} more</Tag>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl mb-4">No projects found matching "{searchQuery}"</p>
          <p>Try a different search term or browse all projects.</p>
        </div>
      )}
    </Container>
  );
};

export default ProjectSearch;
