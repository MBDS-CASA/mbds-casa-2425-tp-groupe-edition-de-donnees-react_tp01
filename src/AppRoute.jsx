import { Routes, Route } from 'react-router';
import Note from './Component/Note';
import Etudiant from './Component/Etudiant';
import Matiere from './Component/Matiere';


export default function AppRoute(){
    return (
        <Routes>
            <Route path="/" element={<Note />} />
            <Route path="etudiants" element={<Etudiant />} />
            <Route path="matieres" element={<Matiere />} />
        </Routes>
    )
}
