// src/Pages/TermsOfService/index.jsx
import React from 'react';
import Container from '../../components/Container';

const TermsOfService = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  return (
    <Container className="py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Terms of Service</h1>
        <div className="flex justify-center mb-6">
          <p className="text-lg font-semibold">TechTalents City</p>
          <p className="ml-4 text-gray-500">Effective Date: {formattedDate}</p>
        </div>
        
        <p className="mb-6">
          Welcome to TechTalents City. By accessing or using our platform, you agree to abide by these Terms of Service ("Terms"). 
          These Terms govern your use of the services, resources, and content provided by TechTalents City.
        </p>
        
        <p className="mb-6 font-medium">
          If you do not agree to these Terms, please do not use the platform.
        </p>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">1. Eligibility</h2>
          <p>
            To use TechTalents City, you must be at least 13 years old or the age of digital consent in your jurisdiction. 
            By using the platform, you confirm that you meet this requirement.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">2. User Responsibilities</h2>
          <p className="mb-2">As a user, you agree to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Provide accurate and complete information when signing up or submitting forms</li>
            <li>Engage respectfully with others in all communication channels</li>
            <li>Use the platform for its intended purposes — learning, collaboration, and career development</li>
            <li>Not impersonate another person or misrepresent your identity</li>
          </ul>
          <p>
            You are responsible for maintaining the confidentiality of any login credentials associated with your account.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">3. Platform Use and Conduct</h2>
          <p className="mb-2">You may not:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Upload malicious code, spam, or attempt unauthorized access to other users' data</li>
            <li>Use the platform in any way that violates applicable laws or infringes on intellectual property</li>
            <li>Exploit the platform for unauthorized commercial purposes</li>
          </ul>
          <p>
            Violations of these terms may result in restricted access, suspension, or permanent removal from the platform.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">4. Intellectual Property</h2>
          <p>
            All content, tools, and materials provided by TechTalents City are the intellectual property of TechTalents City 
            unless otherwise stated. You may not reproduce, distribute, or use any part of the platform's content for external 
            commercial use without written permission.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">5. Third-Party Services</h2>
          <p>
            Our platform may link to third-party websites or services. TechTalents City is not responsible for the content or 
            privacy practices of those external platforms. Users engage with them at their own discretion.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">6. Modifications and Termination</h2>
          <p>
            We reserve the right to modify or discontinue any part of the platform at any time without prior notice. We may 
            also revise these Terms from time to time. Continued use of the platform after such changes implies acceptance 
            of the new Terms.
          </p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-2">7. Disclaimers</h2>
          <p>
            TechTalents City is provided "as is" and "as available." We make no guarantees regarding uninterrupted access or 
            error-free performance. We are not liable for any damages resulting from your use of the platform.
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

export default TermsOfService;
