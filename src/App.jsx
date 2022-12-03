import Home from "./Home"
import Login from "./components/login/index"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="bg-[#333] w-[100vw] h-[100vh] flex "  >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
