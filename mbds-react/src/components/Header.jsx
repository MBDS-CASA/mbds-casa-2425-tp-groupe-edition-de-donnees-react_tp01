import reactLogo from '../assets/react.svg';
import { motion } from 'framer-motion';
import React from 'react';

function Header() {
    let reactLogo = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg';
    return (
        <motion.header
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-6 px-8 shadow-lg"
        >
            <div className="flex items-center justify-center gap-4">
                <motion.img
                    src={reactLogo}
                    alt="React Logo"
                    className="w-12 h-12"
                    animate={{rotate: 360}}
                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    MBDS ReactKGKGJFJ
                </h1>
            </div>
        </motion.header>
    );
}

export default Header;