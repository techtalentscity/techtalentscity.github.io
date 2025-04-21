import { Link } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import Container from '../../components/Container';
import { useState } from 'react';

const DataScienceProjectDetail = () => {
  // Team requirements for the project
  const [teamRoles, setTeamRoles] = useState([
    {
      role: "TechDev",
      count: 2,
      description: "Python developers experienced in data processing pipelines and ML frameworks"
    },
    {
      role: "TechArchs",
      count: 1,
      description: "Data architect to design data storage and processing architecture"
    },
    {
      role: "TechQA",
      count: 1,
      description: "Quality assurance specialist for model validation and testing"
    },
    {
      role: "TechLeads",
      count: 1,
      description: "Project lead with experience in data science project management"
    },
    {
      role: "TechGuard",
      count: 1,
      description: "Security specialist for data protection and privacy compliance"
    }
  ]);

  return (
    <Container className='w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20'>
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">Published on April 19, 2025</p>
        <h1 className="text-3xl font-bold mb-4">Climate Change Prediction with Machine Learning</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">Free</span></p>

        {/* Team Composition */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Team Composition:</h2>
          <ul className="list-disc list-inside">
            {teamRoles.map((teamRole, index) => (
              <li key={index}>
                <strong>* {teamRole.role}:</strong> {teamRole.count} {teamRole.count > 1 ? "people" : "person"} - {teamRole.description}
              </li>
            ))}
            <li><strong>Total Team Size:</strong> {teamRoles.reduce((sum, role) => sum + role.count, 0)} people</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This data science project will focus on analyzing climate data and developing prediction models to forecast climate patterns. The team will work with historical weather data, satellite imagery, and other environmental datasets to build machine learning models that can predict temperature changes, precipitation patterns, and extreme weather events. The project aims to contribute to our understanding of climate change through data-driven approaches.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> May 10, 2025</li>
            <li><strong>End Date:</strong> July 26, 2025</li>
            <li><strong>Total Duration:</strong> 11 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Badge Skill Level:</h2>
       <p className="text-[#131518]">
       <strong>Open to All – No Badge Level Required.</strong> This project is open to participants regardless of their badge skill level. All motivated contributors are welcome to apply.</p>
       </div>  

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Python Programming (NumPy, Pandas, Scikit-learn)</li>
            <li>Machine Learning / Deep Learning</li>
            <li>Data Visualization (Matplotlib, Seaborn, Plotly)</li>
            <li>Statistical Analysis</li>
            <li>Time Series Analysis</li>
            <li>Experience with Jupyter Notebooks</li>
            <li>Version Control (Git)</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Collect and preprocess climate and environmental datasets.</li>
            <li>Develop machine learning models for climate pattern prediction.</li>
            <li>Create visualizations to communicate findings effectively.</li>
            <li>Optimize and validate models for accuracy and reliability.</li>
            <li>Document methodology and results for potential publication.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Gain experience in applying data science to real-world environmental challenges.</li>
            <li>Build a portfolio project demonstrating data analysis and machine learning skills.</li>
            <li>Contribute to research that addresses one of the most pressing global issues.</li>
            <li>Develop expertise in working with complex, multi-dimensional datasets.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with geospatial data analysis</li>
            <li>Knowledge of cloud computing platforms (AWS, GCP, Azure)</li>
            <li>Familiarity with climate science or environmental studies</li>
            <li>Experience with big data technologies (Spark, Hadoop)</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdpsu5--x7KuLo4UMhJ19KCLKSPmpsnZrwpoYf2iA3X--XxDQ/viewform?usp=sharing" target="_blank" rel="noopener noreferrer">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </a>
        </div>
      </div>
      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdpsu5--x7KuLo4UMhJ19KCLKSPmpsnZrwpoYf2iA3X--XxDQ/viewform?usp=sharing" target="_blank" rel="noopener noreferrer">
          <Button type="primary" size="large" block>Apply for this Project</Button>
        </a>
      </div>
    </Container>
  );
}

export default DataScienceProjectDetail;
