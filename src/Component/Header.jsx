import React from 'react'
import Note from './Note';
import Etudiant from './Etudiant';
import Matiere from './Matiere';
import { useState } from 'react';
import Menu from './Menu';
import { Link } from 'react-router';
import { BrowserRouter } from 'react-router';


const MENUS = [
  { title: 'NOTE', path: '/note' },
  { title: 'ETUDIANTS', path: '/students' },
  { title: 'MATIERES', path: '/cours' },
]




const Header = () => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState("");

  function onClickMenu(title) {
    setSelected(title);
  }


 

  return (
    <header>
      <div className='container md-5'>
        <div id='examples'>
          {MENUS.map((menu, index) => (
             <Link
             key={index}
             to={menu.path}
             className={`d-inline p-5 text-white text-decoration-none bg-secondary menu ${selected === menu.title ? 'active' : ''}`}
             onClick={() => onClickMenu(menu.title)}
           >
             <span className={selected === menu.title ? 'active' : ''}>
               {menu.title}
             </span>
           </Link>
          ))}

          

        </div>
        <img src="images.jpg" alt="React Logo" />
        <h3>Introduction à React</h3>
        <h6>A la découverte des premières notions de React</h6>

      </div>
    </header>
  );
}

export default Header