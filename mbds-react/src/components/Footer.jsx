import { motion } from "framer-motion";

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-sm"
            >
                <p>© {new Date().getFullYear()} - Soufiane.Aniba</p>
                <p className="text-gray-400 text-xs mt-1">Tous droits réservés</p>
            </motion.div>
        </footer>
    );
}
export default Footer;