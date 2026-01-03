import { useState } from 'react';
import Header from "./components/Header";
import OneKeyHero from "./components/OneKeyHero";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import AadhaarCard from "./pages/AadhaarCard";
import PanCard from "./pages/PanCard";
import PanApplicationForm from "./pages/PanApplicationForm";
import PanCorrectionForm from "./pages/PanCorrectionForm";
import PanStatusCheck from "./pages/PanStatusCheck";

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'aadhaar' | 'pan' | 'pan-form' | 'pan-correction' | 'pan-status'>('dashboard');

  return (
    <>
      <Header />
      {currentPage === 'dashboard' ? (
        <>
          <OneKeyHero />
          <Dashboard onNavigate={setCurrentPage} />
        </>
      ) : currentPage === 'aadhaar' ? (
        <AadhaarCard onBack={() => setCurrentPage('dashboard')} />
      ) : currentPage === 'pan' ? (
        <PanCard onBack={() => setCurrentPage('dashboard')} onNavigate={(page) => setCurrentPage(page as 'dashboard' | 'aadhaar' | 'pan' | 'pan-form' | 'pan-correction' | 'pan-status')} />
      ) : currentPage === 'pan-correction' ? (
        <PanCorrectionForm onBack={() => setCurrentPage('pan')} />
      ) : currentPage === 'pan-status' ? (
        <PanStatusCheck onBack={() => setCurrentPage('pan')} />
      ) : (
        <PanApplicationForm onBack={() => setCurrentPage('pan')} />
      )}
      <Footer />
    </>
  );
}

export default App;
