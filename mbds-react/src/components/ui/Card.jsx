import React from 'react';

const Card = ({ children, className = '', onClick }) => (
    <div
        className={`bg-white rounded-lg shadow-md transition-all duration-300 ${className}`}
        onClick={onClick}
    >
        {children}
    </div>
);

const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export { Card, CardContent };