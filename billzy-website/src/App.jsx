import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Screenshots from "./pages/Screenshots";
import Download from "./pages/Download";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <CustomCursor />  
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/screenshots" element={<Screenshots />} />
          <Route path="/download" element={<Download />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;