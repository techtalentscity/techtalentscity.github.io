// src/Pages/PrivacyPolicy/index.jsx
import React from 'react';
import Container from '../../components/Container';

const PrivacyPolicy = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        <div className="flex justify-center mb-6">
          <p className="text-lg font-semibold">TechTalents City</p>
          <p className="ml-4 text-gray-500">Effective Date: {formattedDate}</p>
        </div>
        
        <p className="mb-6">
          TechTalents City ("we," "our," or "us") values your privacy and is committed to protecting your personal information. 
          This Privacy Policy outlines how we collect, use, and safeguard the data of individuals who engage with our platform.
        </p>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
          <p className="mb-2">
            We collect limited personal information necessary to help users participate meaningfully on our platform. This may include:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Full name and email address</li>
            <li>Role and skill preferences</li>
            <li>GitHub handles or LinkedIn profiles (if voluntarily provided)</li>
            <li>Project interests or applications</li>
            <li>Basic usage data such as browser type, IP address, and device information</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
          <p className="mb-2">We use collected data to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Enable participation in tech projects and learning programs</li>
            <li>Provide access to personalized dashboards or profiles</li>
            <li>Communicate relevant updates, opportunities, or platform news</li>
            <li>Improve platform performance and user experience</li>
            <li>Ensure community safety and integrity</li>
          </ul>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Data Sharing and Disclosure</h2>
          <p className="mb-4">
            We do <span className="font-bold">not sell or rent</span> your personal information. We may share limited information 
            with trusted service providers who help us operate the platform — such as email services or hosting providers — but only 
            under strict data protection agreements.
          </p>
          <p>In rare cases, we may disclose information if legally required to do so.</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
          <p>
            We take appropriate technical and organizational measures to protect your personal information from unauthorized access, 
            misuse, or loss. These measures include secure data storage and role-based access control.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Request access to your data</li>
            <li>Correct or update any inaccurate information</li>
            <li>Request deletion of your data (subject to platform participation constraints)</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p>
            To exercise any of these rights, contact us via email at <span className="font-medium">privacy@techtalentscity.com</span>.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">6. Use of Cookies and Analytics</h2>
          <p>
            We may use cookies or basic analytics tools to monitor traffic, improve functionality, and understand how users engage with 
            the platform. You can manage cookie preferences through your browser settings.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">7. Third-Party Links</h2>
          <p>
            Our platform may contain links to external sites. We are not responsible for their privacy practices. Please review those 
            policies independently before sharing any personal information.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">8. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised effective date.
          </p>
        </section>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500">
            Last updated: {formattedDate}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
