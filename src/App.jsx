// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWrapper from "./components/HomeWrapper";
import TopScroll from "./components/TopScroll";
// Main Pages
import { 
  About, 
  AllProjects, 
  Dashboard, 
  EditProfile, 
  Home, 
  Login, 
  MainDashboard, 
  Projects, 
  Recruit, 
  RecruitProfile, 
  Register, 
  ResetPassword, 
  Settings 
} from "./Pages";
// Project Posting and Application
import ProjectPost from "./Pages/post/projectpost";
import Application from "./Pages/Apply/application";
// Career Test Pages
import CareerTestLanding from "./Pages/Home/CareerTestLanding"; // ✅ CTA with button
import CareerTest from "./Pages/career/CareerTest";              // Updated import path
// Support Page
import Support from "./Pages/Support";                          // Import Support page
// Import existing Privacy Policy page (correct path with space)
import PrivacyPolicy from "./Pages/Privacy Policy";
// Project Detail Pages
import MentalAppDetail from "./Pages/ProjectDetail/mental-app";
import AiAgentDetail from "./Pages/ProjectDetail/ai-agent";
import RealTimeNotificationSystem from "./Pages/ProjectDetail/Real-time-Notification-System";
import BlockchainDeFi from "./Pages/ProjectDetail/blockchain-defi";
import ClimatePrediction from "./Pages/ProjectDetail/climate-prediction";
// New Search Page
import ProjectSearch from "./Pages/ProjectSearch";
// Not Found Page
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <TopScroll>
        <Routes>
          {/* Public Pages wrapped in layout */}
          <Route element={<HomeWrapper />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            {/* Project Detail Routes */}
            <Route path='/projects/ai-agent' element={<AiAgentDetail />} />
            <Route path='/projects/mental-app' element={<MentalAppDetail />} />
            <Route path='/projects/real-time-notification-system' element={<RealTimeNotificationSystem />} />
            <Route path='/projects/blockchain-defi' element={<BlockchainDeFi />} />
            <Route path='/projects/climate-prediction' element={<ClimatePrediction />} />
            {/* Search Route */}
            <Route path='/projects/search' element={<ProjectSearch />} />
            <Route path='/projectpost' element={<ProjectPost />} />
            <Route path='/apply' element={<Application />} />
            <Route path='/apply/application' element={<Application />} />
            {/* Career Test Routes */}
            <Route path='/career' element={<CareerTestLanding />} />  {/* Landing page with button */}
            <Route path='/career/test' element={<CareerTest />} />    {/* Test form/page */}
            {/* Support and Privacy Pages */}
            <Route path='/support' element={<Support />} />          {/* Support/Feedback page */}
            <Route path='/privacy-policy' element={<PrivacyPolicy />} /> {/* Existing Privacy Policy page */}
          </Route>
          {/* Authentication Routes */}
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          {/* Dashboard Routes */}
          <Route element={<Dashboard />}>
            <Route path='/dashboard' element={<MainDashboard />} />
            <Route path='/all-projects' element={<AllProjects />} />
            <Route path='/recruit' element={<Recruit />} />
            <Route path='/recruit/:slug' element={<RecruitProfile />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/settings/reset-password' element={<ResetPassword />} />
            <Route path='/settings/edit-profile' element={<EditProfile />} />
          </Route>
          {/* Catch-All for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TopScroll>
    </BrowserRouter>
  );
}

export default App;
