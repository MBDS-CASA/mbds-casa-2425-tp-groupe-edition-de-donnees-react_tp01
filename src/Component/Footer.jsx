import React from 'react'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="fixed-bottom bg-dark text-white py-3">
            <div className="container text-center">
                © {year} - MUTAKA DANIEL, Tous droits réservés.
            </div>
        </footer>

    )
}

export default Footer