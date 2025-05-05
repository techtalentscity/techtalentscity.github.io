import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeWrapper from "./components/HomeWrapper";
import TopScroll from "./components/TopScroll";
// Pages
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
// Import Project Posting and Application components
import ProjectPost from "./Pages/post/projectpost";
import Application from "./Pages/Apply/application";
// Project Detail Pages
import MentalAppDetail from "./Pages/ProjectDetail/mental-app";
import AiAgentDetail from "./Pages/ProjectDetail/ai-agent";
import RealTimeNotificationSystem from "./Pages/ProjectDetail/Real-time-Notification-System";
import BlockchainDeFi from "./Pages/ProjectDetail/blockchain-defi";
import ClimatePrediction from "./Pages/ProjectDetail/climate-prediction";
// 404 Not Found Page
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <TopScroll>
          <Routes>
            {/* Public Pages inside HomeWrapper */}
            <Route element={<HomeWrapper />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/ai-agent' element={<AiAgentDetail />} />
              <Route path='/projects/mental-app' element={<MentalAppDetail />} />
              <Route path='/projects/real-time-notification-system' element={<RealTimeNotificationSystem />} />
              <Route path='/projects/blockchain-defi' element={<BlockchainDeFi />} />
              <Route path='/projects/climate-prediction' element={<ClimatePrediction />} />
              {/* Project posting and application routes */}
              <Route path='/projectpost' element={<ProjectPost />} />
              <Route path='/apply' element={<Application />} />
            </Route>
            {/* Authentication Pages */}
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            {/* Dashboard Pages */}
            <Route element={<Dashboard />}>
              <Route path='/dashboard' element={<MainDashboard />} />
              <Route path='/all-projects' element={<AllProjects />} />
              <Route path='/recruit' element={<Recruit />} />
              <Route path='/recruit/:slug' element={<RecruitProfile />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/settings/reset-password' element={<ResetPassword />} />
              <Route path='/settings/edit-profile' element={<EditProfile />} />
            </Route>
            {/* 404 Catch-All Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TopScroll>
      </BrowserRouter>
    </>
  );
}

export default App;
