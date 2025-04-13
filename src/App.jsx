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

// Project Detail Pages
import MentalAppDetail from "./Pages/ProjectDetail/mental-app";
import AiAgentDetail from "./Pages/ProjectDetail/ai-agent";

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
