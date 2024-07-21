import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeWrapper from "./components/HomeWrapper"
import { About, AllProjects, Dashboard, EditProfile, Home, Login, MainDashboard, ProjectDetail, Projects, Register, ResetPassword, Settings, TtcAi } from "./Pages"
import TopScroll from "./components/TopScroll"


function App() {

  return (
    <>
      <BrowserRouter>
        <TopScroll>
          <Routes>
            <Route element={<HomeWrapper />}>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/:id' element={<ProjectDetail />} />
            </Route>
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route element={<Dashboard />}>
              <Route path='/dashboard' element={<MainDashboard />} />
              <Route path='/all-projects' element={<AllProjects />} />
              <Route path='/ttc-ai' element={<TtcAi />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/settings/reset-password' element={<ResetPassword />} />
              <Route path='/settings/edit-profile' element={<EditProfile />} />
            </Route>
          </Routes>
        </TopScroll>
      </BrowserRouter>
    </>
  )
}

export default App
