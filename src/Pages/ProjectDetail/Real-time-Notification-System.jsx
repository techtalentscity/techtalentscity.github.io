import { Link } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import Container from '../../components/Container';
import { useState } from 'react';

const ProjectDetail = () => {
  // Project budget
  const [totalBudget, setTotalBudget] = useState(110);
  
  // Fixed role amounts for realtime project
  const [roleAmounts, setRoleAmounts] = useState({
    techDev: 50,
    techGuard: 30,
    techLeads: 30
  });

  // Calculate total to verify
  const calculateTotal = () => {
    return Object.values(roleAmounts).reduce((sum, amount) => sum + amount, 0);
  };

  const total = calculateTotal();

  return (
    <Container className='w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20'>
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">Published on April 20, 2025</p>
        <h1 className="text-3xl font-bold mb-4">Developing a Scalable Real-time Notification System</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">${totalBudget}</span></p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Budget Distribution:</h2>
          <ul className="list-disc list-inside">
            <li><strong>TechDev:</strong> ${roleAmounts.techDev}</li>
            <li><strong>TechGuard:</strong> ${roleAmounts.techGuard}</li>
            <li><strong>TechLeads:</strong> ${roleAmounts.techLeads}</li>
            <li><strong>Total:</strong> ${total} (budget: ${totalBudget})</li>
          </ul>
        </div>

    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Badge Skill Level:</h2>
       <p className="text-[#131518]">
       <strong>Open to All – No Badge Level Required.</strong> This project is open to participants regardless of their badge skill level. All motivated contributors are welcome to apply.</p>
    </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project focuses on building a high-performance, real-time notification system that can handle millions of concurrent connections. The system will use WebSockets for persistent connections and Redis as a pub/sub mechanism to distribute notifications across multiple server instances. The goal is to create a backend architecture that maintains low latency while scaling horizontally.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> June 14, 2025</li>
            <li><strong>End Date:</strong> August 30, 2025</li>
            <li><strong>Total Duration:</strong> 11 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Backend Development (Node.js, Go, or Elixir)</li>
            <li>WebSocket protocols and implementation</li>
            <li>Redis or other pub/sub systems</li>
            <li>Database design (MongoDB or PostgreSQL)</li>
            <li>Message queuing systems (Kafka or RabbitMQ)</li>
            <li>Load testing and performance optimization</li>
            <li>Docker and container orchestration</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Design a notification service architecture that can scale horizontally</li>
            <li>Implement WebSocket connections with automatic reconnection handling</li>
            <li>Build a Redis-based pub/sub system for distributing notifications</li>
            <li>Create an API for other services to trigger notifications</li>
            <li>Develop a storage system for offline notification delivery</li>
            <li>Implement authentication and authorization for secure notifications</li>
            <li>Design metrics collection for system health monitoring</li>
            <li>Load test the system and optimize for high throughput</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Gain expertise in building and scaling real-time systems</li>
            <li>Learn advanced patterns for distributed systems</li>
            <li>Develop skills in performance optimization and load testing</li>
            <li>Create a portfolio project demonstrating backend architecture expertise</li>
            <li>Experience with technologies used in high-scale production environments</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with distributed systems</li>
            <li>Knowledge of WebRTC or other real-time protocols</li>
            <li>Familiarity with event-driven architectures</li>
            <li>Understanding of network protocols and latency optimization</li>
            <li>Experience with cloud infrastructure (AWS, Azure, or GCP)</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <a href="https://forms.gle/wKS61rtU12unkPT49" target="_blank" rel="noopener noreferrer">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </a>
        </div>
      </div>
      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <a href="https://forms.gle/wKS61rtU12unkPT49" target="_blank" rel="noopener noreferrer">
          <Button type="primary" size="large" block>Apply for this Project</Button>
        </a>
      </div>
    </Container>
  );
}

export default ProjectDetail;
