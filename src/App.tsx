import { Routes, Route, Navigate } from "react-router-dom";
import Room from "./components/Room.tsx";
import Layout from "./Layout.tsx";
import About from "./components/About.tsx";

const App = () => {
  return (
    <div className="w-full h-full max-h-full bg-slate-800 text-neutral-100">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Room />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
