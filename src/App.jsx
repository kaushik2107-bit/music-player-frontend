import Home from "./Home"
import Login from "./components/login/index"
import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

function App() {
  const [state, setState] = useState(false)

  return (
    <div className="bg-[#333] w-[100vw] h-[100vh] flex "  >
      <Routes>
        <Route exact path="/" element={state ? <Home /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={state ? <Navigate to="/" /> : <Login setStatus={setState} />} />
      </Routes>
    </div>
  )
}

export default App
