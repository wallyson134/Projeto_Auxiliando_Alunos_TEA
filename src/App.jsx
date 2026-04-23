import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home   from "./components/Home"
import Memory from "./pages/Memory"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/memory" element={<Memory onBack={() => window.history.back()} />} />
      </Routes>
    </BrowserRouter>
  )
}