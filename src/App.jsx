import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home   from "./components/Home"
import Memory from "./pages/Memory"
import Routine from "./pages/Routine"
import Emotions from "./pages/Emotions"

// dentro do <Routes>:

// dentro do <Routes>:

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/memory" element={<Memory onBack={() => window.history.back()} />} />
        <Route path="/sequence" element={<Routine />} />
        <Route path="/social" element={<Emotions />} />
      </Routes>
    </BrowserRouter>
  )
}