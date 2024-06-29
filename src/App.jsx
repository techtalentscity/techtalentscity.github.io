import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeWrapper from "./components/HomeWrapper"
import { About, Dashboard, Home, Login, MainDashboard, ProjectDetail, Projects, Register } from "./Pages"
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
            </Route>
          </Routes>
        </TopScroll>
      </BrowserRouter>
    </>
  )
}

export default App
