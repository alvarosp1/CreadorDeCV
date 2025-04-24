import React from 'react';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
  return (
    <div className="min-h-screen bg-[#fdfdfc]">
      <header className="bg-[#071463] text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-[#f2ae2b] mr-2">CV</span>Builder
          </h1>
          <p className="text-sm md:text-base">Crea tu currículum profesional</p>
        </div>
      </header>
      <main className="container mx-auto px-2 sm:px-4 py-4">
        <ResumeBuilder />
      </main>
      <footer className="bg-[#071463] text-white p-4 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>© 2025 CVBuilder - Creador de currículums profesionales</p>
        </div>
      </footer>
    </div>
  );
}

export default App;