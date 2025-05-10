import { Link } from 'react-router-dom';
import { Button } from 'antd';
import logo from '../../assets/images/techtalent.png';
import { LuArrowLeftToLine } from 'react-icons/lu';
import Container from '../../components/Container';
import { useState } from 'react';

const DataScienceProjectDetail = () => {
  // Reduced team roles to 3 key roles
  const [teamRoles, setTeamRoles] = useState([
    {
      role: "TechDev",
      count: 1,
      description: "Python developer experienced in ML for time series forecasting and energy data analysis"
    },
    {
      role: "TechDesign",
      count: 1,
      description: "UX/UI designer for creating intuitive energy usage dashboards and visualizations"
    },
    {
      role: "TechLeads",
      count: 1,
      description: "Project lead with experience in energy analytics and ML implementations"
    }
  ]);

  // Payment information
  const [paymentInfo, setPaymentInfo] = useState({
    amount: 200,
    distribution: "Equal share among team members (~$67 per person)",
    paymentMethod: "PayPal or bank transfer",
    schedule: "50% upon project start, 50% upon completion"
  });

  return (
    <Container className="w-full flex flex-col lg:flex-row gap-2 mt-10 lg:mt-20">
      <div className="w-full flex flex-col items-start bg-white">
        <Link to="/projects" className="text-[#101010] font-bold mb-4 flex items-center gap-2">
          <LuArrowLeftToLine /> <span>Back to projects</span>
        </Link>
        <p className="text-sm text-gray-500 mb-2">Published on May 10, 2025</p>
        <h1 className="text-3xl font-bold mb-4">Using Machine Learning to Forecast Personal Energy Usage and Save Money</h1>
        <p className="text-[#131518] mb-2">Full-Time / Remote / <span className="text-blue-600 font-semibold">Paid Project ($200)</span></p>

        {/* Payment Information */}
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Payment Information:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Total Budget:</strong> ${paymentInfo.amount}</li>
            <li><strong>Distribution:</strong> {paymentInfo.distribution}</li>
            <li><strong>Payment Method:</strong> {paymentInfo.paymentMethod}</li>
            <li><strong>Payment Schedule:</strong> {paymentInfo.schedule}</li>
          </ul>
        </div>

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
            This project will focus on developing machine learning models that can predict personal household energy consumption patterns. The team will work with smart meter data, weather information, and household characteristics to build predictive models that can forecast energy usage, identify cost-saving opportunities, and recommend optimizations. The solution will include an intuitive dashboard for homeowners to visualize their energy usage, view predictions, and receive actionable recommendations to reduce costs and environmental impact.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Project Duration:</h2>
          <ul className="list-disc list-inside">
            <li><strong>Start Date:</strong> June 1, 2025</li>
            <li><strong>End Date:</strong> July 13, 2025</li>
            <li><strong>Total Duration:</strong> 6 weeks</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Badge Skill Level:</h2>
          <p className="text-[#131518]">
            <strong>Open to All – No Badge Level Required.</strong> This project is open to participants regardless of their badge skill level. All motivated contributors are welcome to apply.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Required Skill Sets:</h2>
          <ul className="list-disc list-inside">
            <li>Python Programming (NumPy, Pandas, Scikit-learn)</li>
            <li>Time Series Forecasting (ARIMA, Prophet, LSTM)</li>
            <li>Data Visualization (Matplotlib, Seaborn, Plotly)</li>
            <li>Statistical Analysis</li>
            <li>Experience with Jupyter Notebooks</li>
            <li>UX/UI Design (for dashboard creation)</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Key Tasks and Responsibilities:</h2>
          <ul className="list-disc list-inside">
            <li>Collect and preprocess energy consumption data from smart meters and IoT devices.</li>
            <li>Integrate weather and household characteristic data for improved predictions.</li>
            <li>Develop machine learning models for short and long-term energy usage forecasting.</li>
            <li>Create user-friendly dashboards for energy visualization and recommendations.</li>
            <li>Implement cost-saving opportunity detection algorithms.</li>
            <li>Design and test user interfaces for mobile and web applications.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Benefits of Participation:</h2>
          <ul className="list-disc list-inside">
            <li>Gain experience in applying machine learning to real-world energy efficiency challenges.</li>
            <li>Build a strong portfolio demonstrating forecasting, UX design, and ML skills.</li>
            <li>Contribute to sustainability efforts by helping reduce household energy consumption.</li>
            <li>Receive payment for your contributions ($200 total budget).</li>
            <li>Learn about energy markets and utility pricing structures.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Nice-to-have Skills:</h2>
          <ul className="list-disc list-inside">
            <li>Experience with smart home technology integration</li>
            <li>Knowledge of cloud computing platforms (AWS, GCP, Azure)</li>
            <li>Familiarity with utility rate structures and energy markets</li>
            <li>Experience with web/mobile app development</li>
          </ul>
        </div>

        <div className="fixed bottom-8 right-8">
          <Link to="/apply/application">
            <Button type="primary" size="large" className="rounded-full px-8 py-4 font-bold">
              Apply for this Project
            </Button>
          </Link>
        </div>
      </div>

      <div className="shrink-0 w-[307px] h-[312px] rounded-2xl p-10 bg-[#F3F3FF] flex justify-center items-center flex-col gap-6">
        <img src={logo} alt="Project Logo" className="w-[148px] h-[148px] object-cover" />
        <Link to="/apply/application">
          <Button type="primary" size="large" block>
            Apply for this Project
          </Button>
        </Link>
      </div>
    </Container>
  );
}

export default DataScienceProjectDetail;
