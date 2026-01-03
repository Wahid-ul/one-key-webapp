import { useState } from 'react';
import Header from "./components/Header";
import OneKeyHero from "./components/OneKeyHero";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import AadhaarCard from "./pages/AadhaarCard";

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'aadhaar'>('dashboard');

  return (
    <>
      <Header />
      {currentPage === 'dashboard' ? (
        <>
          <OneKeyHero />
          <Dashboard onNavigate={setCurrentPage} />
        </>
      ) : (
        <AadhaarCard onBack={() => setCurrentPage('dashboard')} />
      )}
      <Footer />
    </>
  );
}

export default App;
