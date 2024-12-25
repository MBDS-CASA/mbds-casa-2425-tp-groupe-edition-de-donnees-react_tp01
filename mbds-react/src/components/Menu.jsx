import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Home,
    BookOpen,
    Users,
    GraduationCap,
    Info
} from 'lucide-react';

const Menu = ({ onSelect }) => {
    const [activeItem, setActiveItem] = useState(null);

    const menuItems = [
        { text: 'Home', icon: <Home size={20} /> },
        { text: 'Notes', icon: <BookOpen size={20} /> },
        { text: 'Etudiants', icon: <Users size={20} /> },
        { text: 'AddEtudiant', icon: <Users size={20} /> },
        { text: 'Matières', icon: <GraduationCap size={20} /> },
        { text: 'A propos', icon: <Info size={20} /> }
    ];

    const handleClick = (text) => {
        setActiveItem(text);
        onSelect(text);
    };

    return (
        <nav className="p-6">
            <div className="space-y-3">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <button
                            onClick={() => handleClick(item.text)}
                            className={`
w-full flex items-center gap-4 px-5 py-3.5 rounded-xl
transition-all duration-300 ease-in-out bg-gradient-to-r from-gray-800 to-gray-900
                ${activeItem === item.text
? 'bg-gradient-to-r from-blue-100 to-blue-900 text-white shadow-lg shadow-green-500/30 scale-105'
: 'text-gray-300 hover:bg-gray-800/50 hover:text-black hover:scale-102'
                            }
              `}
                        >
              <span className={`
                transition-transform duration-300
                ${activeItem === item.text ? 'scale-110' : 'group-hover:scale-105'}
              `}>
                {item.icon}
              </span>
                            <span className="font-medium">{item.text}</span>
                        </button>
                    </motion.div>
                ))}
            </div>
        </nav>
    );
};

export default Menu;