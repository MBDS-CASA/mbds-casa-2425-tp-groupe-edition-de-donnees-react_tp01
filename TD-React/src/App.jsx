/* App.js */

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import jsonData from './data.json';
import Notes from './Note.jsx';
import Etudiants from './Etudiant.jsx';
import Matieres from './Matiere.jsx';
import APropos from './APropos.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';




/*---------------------------------------
 | getRandomItem
 ---------------------------------------*/
function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}




/*---------------------------------------
 | Header
 ---------------------------------------*/
function Header() {
    return (
        <header>
            <img src={image} alt="Default vignette" />
            <h1>Introduction à React</h1>
            <h2>À la découverte des premières notions de React</h2>
        </header>
    );
}

/*---------------------------------------
 | MainContent
 ---------------------------------------*/
function MainContent() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString('fr-FR', { month: 'long' });
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return (
        <div className="main-content">
            <p>Ici, nous afficherons des informations intéressantes :)</p>
            <p>
                Bonjour, on est le {day} {month} {year} et il est {hour}:{minute}:{second}
            </p>
        </div>
    );
}

/*---------------------------------------
 | Footer
 ---------------------------------------*/
function Footer() {
    const now = new Date();
    const year = now.getFullYear();
    return (
        <footer>
            <p>© {year} - Alehiane Ouiame, Tous droits réservés.</p>
        </footer>
    );
}

function Menu({ data, onUpdateData }) {
    const menuItems = [
        { id: 'Notes', path: '/notes' },
        { id: 'Etudiants', path: '/etudiants' },
        { id: 'Matieres', path: '/matieres' },
        { id: 'A propos', path: '/apropos' }
    ];

    return (
        <div className="menu-container">
            <div className="menu-buttons">
                {menuItems.map((item) => (
                    <Link key={item.id} to={item.path} className="menu-button">
                        {item.id}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function App() {
    const [courseData, setCourseData] = useState(jsonData);

    const handleUpdateData = (newData) => {
        setCourseData(newData);
    };

    return (
        <Router>
            <>
                <Header />
                <Menu data={courseData} onUpdateData={handleUpdateData} />
                <Routes>
                    <Route path="/notes" element={<Notes data={courseData} onUpdateData={handleUpdateData} />} />
                    <Route path="/etudiants" element={<Etudiants data={courseData} />} />
                    <Route path="/matieres" element={<Matieres data={courseData} onUpdateData={handleUpdateData} />} />
                    <Route path="/apropos" element={<APropos data={courseData} />} />
                    <Route path="/" element={<MainContent />} />
                </Routes>
                <Footer />
            </>
        </Router>
    );
}

export default App;