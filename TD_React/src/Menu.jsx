

import { useState } from 'react';

function HamburgerMenu({ menuItems, onSelect, ...props }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  const handleItemClick = (item) => {
    setActiveItem(item);
    onSelect(item);
    setMenuOpen(false); 
  };

  return (
    <div className="hamburger-menu" {...props}>
      
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      
      {menuOpen && (
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleItemClick(item)}
              className={`menu-item ${item === activeItem ? "active" : ""}`} 
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default HamburgerMenu;