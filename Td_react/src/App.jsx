import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import data from './data.json';
import Notes from './components/Notes.jsx'; // Import du composant Notes
import Etudiants from './components/Etudiants.jsx'; // Import du composant Etudiants
import Matieres from './components/Matieres.jsx'; // Import du composant Matieres
import APropos from './components/APropos.jsx'; // Import du composant APropos

function Header() {
  return (
    <header>
      <img src="https://emsi.ma/wp-content/uploads/2020/07/logo-1.png" alt="Logo de votre formation" style={{ maxWidth: '100%', height: 'auto' }} />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

function Menu({ items, activeItem, onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        ☰
      </button>
      {isOpen && (
        <nav
          style={{
            position: 'absolute',
            top: '50px',
            left: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '10px',
            zIndex: 999,
          }}
        >
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li key={item} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => onMenuClick(item)}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: item === activeItem ? '#ddd' : 'transparent',
                    border: 'none',
                    textAlign: 'left',
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function DateDisplay() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('fr-FR', options);
  const time = currentDate.toLocaleTimeString('fr-FR');

  return (
    <div>
      <p>
        Bonjour, on est le {formattedDate} et il est {time}.
      </p>
    </div>
  );
}

function ActiveItemContent({ activeItem, search, setSearch }) {
  switch (activeItem) {
    case 'Notes':
      return <Notes search={search} setSearch={setSearch} />;  {/* Passage de search et setSearch */}
    case 'Etudiants':
      return <Etudiants search={search} setSearch={setSearch} />;  {/* Passage de search et setSearch */}
    case 'Matières':
      return <Matieres search={search} setSearch={setSearch} />;  {/* Passage de search et setSearch */}
    case 'A propos':
      return <APropos />;
    default:
      return <p>Sélectionnez un menu pour voir le contenu</p>;
  }
}

function Footer({ Nom, Prenom }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>© {currentYear} - {Prenom}.{Nom}, Tous droits réservés.</p>
    </footer>
  );
}

const getRandomItem = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

const RandomItemDisplay = () => {
  const [randomItem, setRandomItem] = useState(getRandomItem(data));
  const handleGenerateNewItem = () => {
    setRandomItem(getRandomItem(data));
  };
  return (
    <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Détail de l'élément</h1>
      <div className="item-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <p><strong>ID Unique:</strong> {randomItem.unique_id}</p>
        <p><strong>Cours:</strong> {randomItem.course}</p>
        <p><strong>Prénom:</strong> {randomItem.student.firstname}</p>
        <p><strong>Nom:</strong> {randomItem.student.lastname}</p>
        <p><strong>ID Étudiant:</strong> {randomItem.student.id}</p>
        <p><strong>Date:</strong> {randomItem.date}</p>
        <p><strong>Note:</strong> {randomItem.grade}</p>
      </div>
      <button
        onClick={handleGenerateNewItem}
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Afficher un autre élément
      </button>
    </div>
  );
};

function App() {
  const [activeItem, setActiveItem] = useState('');  // Gère la section active
  const [search, setSearch] = useState('');  // Gère la recherche

  const menuItems = ['Notes', 'Etudiants', 'Matières', 'A propos'];

  return (
    <>
      <Menu items={menuItems} activeItem={activeItem} onMenuClick={setActiveItem} />
      <div>
        <Header />
        <DateDisplay />
        <ActiveItemContent activeItem={activeItem} search={search} setSearch={setSearch} /> {/* Passage de search et setSearch */}
        <RandomItemDisplay />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer Nom="Rzama" Prenom="Hamza" />
    </>
  );
}

export default App;
