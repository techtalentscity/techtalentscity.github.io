import { Link } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import Container from '../../components/Container';
import { useState } from 'react';

const BlockchainProjectDetail = () => {
  // Project budget
  const [totalBudget, setTotalBudget] = useState(180);
  
  // Role amounts for blockchain project
  const [roleAmounts, setRoleAmounts] = useState({
    techDev: 80,     // $80
    techArchs: 60,   // $60
    techGuard: 40    // $40
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
        <p className="text-sm text-gray-500 mb-2">Published on April 18, 2025</p>
        <h1 className="text-3xl font-bold mb-4">Building a Decentralized Finance (DeFi) Application</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-red-500">${totalBudget}</span></p>

        {/* Budget Distribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Budget Distribution:</h2>
          <ul className="list-disc list-inside">
            <li><strong>TechDev:</strong> ${roleAmounts.techDev}</li>
            <li><strong>TechArchs:</strong> ${roleAmounts.techArchs}</li>
            <li><strong>TechGuard:</strong> ${roleAmounts.techGuard}</li>
            <li><strong>Total:</strong> ${total}</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Description:</h2>
          <p>
            This project will focus on developing a decentralized finance application on the Ethereum blockchain. The application will allow users to stake tokens, provide liquidity to decentralized exchanges, and earn interest on their crypto assets. The project will include implementing smart contracts, designing a responsive UI, and ensuring security at all levels of the application stack.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> September 13, 2025</li>
            <li><strong>End Date:</strong> November 29, 2025</li>
            <li><strong>Total Duration:</strong> 11 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Solidity Smart Contract Development</li>
            <li>Web3.js or Ethers.js</li>
            <li>React/Next.js Frontend Development</li>
            <li>Blockchain Security Best Practices</li>
            <li>Hardhat or Truffle Framework</li>
            <li>UI/UX Design for Web3 Applications</li>
            <li>Testing and Deployment on Test Networks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Design and implement Solidity smart contracts for token staking and rewards.</li>
            <li>Develop a responsive frontend interface using React or Next.js.</li>
            <li>Integrate wallet connections (MetaMask, WalletConnect).</li>
            <li>Perform security audits and implement best practices for DeFi applications.</li>
            <li>Test and deploy the application on Ethereum test networks.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Gain hands-on experience with blockchain development and DeFi protocols.</li>
            <li>Build a portfolio project showcasing full-stack Web3 development skills.</li>
            <li>Learn about cryptographic security and decentralized applications.</li>
            <li>Experience working in an emerging and high-demand technology sector.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with other blockchain platforms (Solana, Polkadot, etc.)</li>
            <li>Understanding of DeFi protocols and tokenomics</li>
            <li>Previous contributions to open-source blockchain projects</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/viewform" target="_blank" rel="noopener noreferrer">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </a>
        </div>
      </div>
      <div className='shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6'>
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <a href="https://docs.google.com/forms/d/e/1FAIpQLScIbS6ykk3RY8bXUJRg52oikbt8mcvu8eOdj2x3w9xTeFeKmg/viewform" target="_blank" rel="noopener noreferrer">
          <Button type="primary" size="large" block>Apply for this Project</Button>
        </a>
      </div>
    </Container>
  );
}

export default BlockchainProjectDetail;
