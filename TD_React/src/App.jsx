import { useState } from 'react';
import university from './assets/azurelogo.png';
import './App.css';

import Header from './Header';
import MainContent from './AfficherDate';
import Footer from './Footer';
import HamburgerMenu from './Menu';

import AppRoute from './Routes';
import { BrowserRouter } from 'react-router';

function App() {
  const [currentPage, setCurrentPage] = useState("Notes");

  const handleMenuSelect = (item) => {
    setCurrentPage(item);
  };
  return (
    <>
      <HamburgerMenu
        menuItems={["Notes", "Etudiants", "Matières", "A propos"] }
        onSelect={handleMenuSelect}
      />
      <main>
        <p>Vous êtes dans la page : {currentPage}</p>
      </main>

      

      <div>
        <Header
          title1="Introduction à React"
          title2="A la découverte des premières notions de React"
          logo={university}
        />
        
        
        <MainContent jour='Lundi' mois='Decembre' annee='2024' heure='16' minute='30' seconde='00' />
       <BrowserRouter ><AppRoute menuItem={currentPage}/></BrowserRouter>
      
      </div>
      <Footer annee='2024' nom='EL RHRIB' prenom='Oussama'/>
      
    </>
  );
}

export default App;
