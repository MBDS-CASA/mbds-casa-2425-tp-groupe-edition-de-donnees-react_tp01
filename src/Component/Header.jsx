import React from 'react'
import Note from './Note';
import Etudiant from './Etudiant';
import Matiere from './Matiere';
import { useState } from 'react';
import Menu from './Menu';


const MENUS = [
  { title: 'NOTE' },
  { title: 'ETUDIANTS' },
  { title: 'MATIERES' },
]




const Header = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState("");

  function onClickMenu(title) {
    setSelected(title);
  }
  const renderContent = () => {
    switch (selected) {
      case 'NOTE':
        return <Note />;
      case 'ETUDIANTS':
        return <Etudiant />;
      case 'MATIERES':
        return <Matiere />;
      default:
        return null;
    }
  };

  return (
    <header>
      <div className='container md-5'>

        <div id='examples'>
          {MENUS.map((menu, index) => (
            <Menu
              key={index}
              title={menu.title}
              clickHandle={() => onClickMenu(menu.title)}
              classname={selected == menu.title ? 'active' : null}

            />
          ))}

        </div>
        <img src="images.jpg" alt="React Logo" />
        <h3>Introduction à React</h3>
        <h6>A la découverte des premières notions de React</h6>

        {renderContent()}

      </div>
    </header>
  );
}

export default Header