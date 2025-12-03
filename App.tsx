import React from 'react';
import Header from './components/Header';
import Generator from './components/Generator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Header />
      
      <main className="flex-grow flex flex-col relative z-10">
        <Generator />
      </main>

      <footer className="py-6 text-center text-slate-600 text-xs border-t border-slate-800/50">
        <p>© {new Date().getFullYear()} CryptoTycoon Gen. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;