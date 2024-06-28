import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeWrapper from "./components/HomeWrapper"
import { About, Home, Login, Projects, Register } from "./Pages"
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
            </Route>
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<Register />} />
          </Routes>
        </TopScroll>
      </BrowserRouter>
    </>
  )
}

export default App
