// src/Pages/ProjectSearch/index.jsx
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import Container from '../../components/Container';

// This would be replaced with your actual project data fetching logic
const fetchProjects = async () => {
  // In a real app, you would fetch this from an API
  // For now, we'll create a sample list based on the files we saw in the GitHub repo
  return [
    {
      id: 1,
      title: 'Real-time Notification System',
      description: 'A system that provides real-time notifications for users',
      technologies: ['React', 'WebSockets', 'Node.js'],
      filename: 'Real-time-Notification-System.jsx'
    },
    {
      id: 2,
      title: 'AI Agent',
      description: 'Intelligent agent for automating tasks',
      technologies: ['AI', 'Machine Learning', 'React'],
      filename: 'ai-agent.jsx'
    },
    {
      id: 3,
      title: 'Blockchain Definition',
      description: 'Decentralized blockchain implementation',
      technologies: ['Blockchain', 'Crypto', 'Smart Contracts'],
      filename: 'blockchain-defi.jsx'
    },
    {
      id: 4,
      title: 'Climate Prediction',
      description: 'Climate prediction and analysis platform',
      technologies: ['Data Science', 'Visualization', 'React'],
      filename: 'climate-prediction.jsx'
    },
    {
      id: 5,
      title: 'Mental Health App',
      description: 'Application for mental health support and resources',
      technologies: ['React', 'Healthcare', 'UX Design'],
      filename: 'mental-app.jsx'
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
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, projects]);

  const handleSearch = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    
    const filtered = projects.filter(project => {
      const projectText = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.filename}`.toLowerCase();
      
      return searchTerms.every(term => projectText.includes(term));
    });
    
    setFilteredProjects(filtered);
    
    // Update URL without full page reload
    const newUrl = `/projects/search?query=${encodeURIComponent(query)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const handleInputSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-8">Project Search Results</h1>
      
      <div className="mb-8 rounded-xl shadow-md bg-white flex justify-between items-center py-3 px-4">
        <input
          type="text"
          placeholder="Refine your search..."
          className="w-full bg-transparent outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleInputSearch}
        />
        <div 
          className="bg-black w-8 h-8 rounded-full p-2 flex justify-center items-center cursor-pointer"
          onClick={handleSearchClick}
        >
          <IoIosSearch size={20} color="white" />
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Link 
              to={`/project/${project.id}`} 
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
