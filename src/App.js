
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";



import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Gardeners from "./pages/Gardeners";
import Plants from "./pages/Plants";
import Login from "./pages/Login";
import DiseaseDetection from "./pages/DiseaseDetection";
import Profile from "./pages/Profile";
import GardenAnimation from "./components/GardenAnimation";
import BlurGardenBg from "./components/BlurGardenBg";


function App() {
  const [showAnim, setShowAnim] = useState(true);

  return (
    <>
      {showAnim && <GardenAnimation onFinish={() => setShowAnim(false)} />}
      {!showAnim && (
        <>
          <BlurGardenBg />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market" element={<Marketplace />} />
              <Route path="/gardeners" element={<Gardeners />} />
              <Route path="/plants" element={<Plants />} />
              <Route path="/login" element={<Login />} />
              <Route path="/detect" element={<DiseaseDetection />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;