import React from 'react';
import Container from "../../components/Container";
import PostAProject from "./PostAProject";
import RecentProjects from "./RecentProjects";
import techtalent from '../../assets/images/techtalent.png';

const HomeProjects = () => {
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
      price: '$1000',
      link: '/projects/ai-agent',
    }
  ];

  return (
    <Container className="flex flex-col-reverse lg:flex-row lg:items-start md:p-4 space-y-4 lg:space-y-0 lg:space-x-8 my-10 lg:my-[60px]">
      <div className="lg:flex-grow">
        <RecentProjects projects={projects} />
      </div>
      <div className="lg:w-1/4 flex-shrink-0 !mb-8">
        <PostAProject />
      </div>
    </Container>
  );
};

export default HomeProjects;
