// App.jsx — Rotas do MundoLúdico (atividades + telas da barra inferior)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";

import Home                from "./components/Home";
import Memory              from "./pages/Memory";
import Routine             from "./pages/Routine";
import PictureCommunication from "./pages/PictureCommunication";
import Emotions            from "./pages/Emotions";
import AnimalSounds        from "./pages/AnimalSounds";
import ShapeSorter         from "./pages/ShapeSorter";
import Progress            from "./pages/Progress";
import Achievements        from "./pages/Achievements";
import Settings            from "./pages/Settings";

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Home />} />

          {/* Atividades — o path é o `id` em data/activities.js */}
          <Route path="/memory"     element={<Memory />} />
          <Route path="/sequence"   element={<Routine />} />
          <Route path="/comm"       element={<PictureCommunication />} />
          <Route path="/social"     element={<Emotions />} />
          <Route path="/sounds"     element={<AnimalSounds />} />
          <Route path="/shapes"     element={<ShapeSorter />} />

          {/* Barra de navegação inferior */}
          <Route path="/progresso"  element={<Progress />} />
          <Route path="/conquistas" element={<Achievements />} />
          <Route path="/config"     element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
