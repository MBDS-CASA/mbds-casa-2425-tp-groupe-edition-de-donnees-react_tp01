import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Notes from './components/Notes';
import Etudiants from './components/Etudiants';
import Matieres from './components/Matieres';
import About from './components/About';
import Menu from './components/Menu';
import AddStudent from "./components/AddStudent.jsx";


function App() {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Home': return <Home />;
      case 'Notes': return <Notes />;
      case 'Etudiants': return <Etudiants />;
      case 'AddEtudiant': return <AddStudent />;
      case 'Matières': return <Matieres />;
      case 'A propos': return <About />;
      default: return <Home />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-100">
        <motion.div
            className={`fixed h-full bg-gray-900 z-20 transition-all duration-300 ease-in-out`}
            animate={{ width: isMenuOpen ? '16rem' : '0rem' }}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <Menu onSelect={setSelectedMenu} activeItem={selectedMenu} />
          </div>
        </motion.div>

        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        <div
            className={`transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'ml-64' : 'ml-0'
            }`}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-8">
              <motion.div
                  key={selectedMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
  );
}

export default App;