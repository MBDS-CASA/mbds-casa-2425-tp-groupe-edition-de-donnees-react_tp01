import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import data from './data.json';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Card,
    CardContent,
    Box,
} from '@mui/material';

/*---------------------------------------
 | Fonction utilitaire : retourne un objet
 | { [matière]: count }
 ---------------------------------------*/
function getCourseCounts() {
    return data.reduce((acc, item) => {
        acc[item.course] = (acc[item.course] || 0) + 1;
        return acc;
    }, {});
}

/*---------------------------------------
 | getRandomItem
 | Retourne un élément aléatoire
 ---------------------------------------*/
function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

/*---------------------------------------
 | Styles pour la table (Material UI)
 ---------------------------------------*/
const tableStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(231, 233, 237, 0.7)',
    overflow: 'hidden',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)',
    },
    '& .MuiTableCell-root': {
        color: '#1E293B',
        borderBottom: '1px solid rgba(231, 233, 237, 0.7)',
        fontSize: '0.95rem',
        padding: '18px 24px',
    },
    '& .MuiTableCell-head': {
        background: '#1E293B',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontSize: '0.875rem',
    },
    '& .MuiTableRow-root': {
        transition: 'all 0.3s ease',
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: '#F8FAFC',
        transform: 'scale(1.005)',
    },
    '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)': {
        backgroundColor: '#F1F5F9',
    }
};

/*---------------------------------------
 | RandomInfo
 | Affiche aléatoirement les infos d'un étudiant
 ---------------------------------------*/
const RandomInfo = () => {
    const [item, setItem] = useState(getRandomItem(data));

    const handleRandomize = () => {
        const randomItem = getRandomItem(data);
        setItem(randomItem);
    };

    return (
        <div className="random-info-section">
            <h4>Les Informations Aléatoires d'un étudiant</h4>
            <p>
                <strong>Cours :</strong> {item.course}
            </p>
            <p>
                <strong>Étudiant :</strong> {item.student.firstname} {item.student.lastname}
            </p>
            <p>
                <strong>Date :</strong> {item.date}
            </p>
            <p>
                <strong>Note :</strong> {item.grade}
            </p>
            <button onClick={handleRandomize} className="neon-button">
                Un autre étudiant
            </button>
        </div>
    );
};

/*---------------------------------------
 | Notes
 | Affiche la liste de toutes les notes
 ---------------------------------------*/
const Notes = () => (
    <Box className="table-container">
        <Typography variant="h4" className="neon-title">Liste des Notes</Typography>
        <TableContainer component={Paper} sx={tableStyles}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Cours</TableCell>
                        <TableCell>Étudiant</TableCell>
                        <TableCell>Note</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.course}</TableCell>
                            <TableCell>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                            <TableCell>
                                <span
                                    className={`grade-pill ${
                                        item.grade >= 10 ? 'passing' : 'failing'
                                    }`}
                                >
                                    {item.grade}
                                </span>
                            </TableCell>
                            <TableCell>{item.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
);

/*---------------------------------------
 | Matieres
 | Affiche la liste des matières,
 | le nombre d'étudiants et la moyenne
 ---------------------------------------*/
const Matieres = () => {
    // Récupère l'objet { [cours]: count }
    const courseCounts = getCourseCounts();

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title">Liste des Matières</Typography>
            <TableContainer component={Paper} sx={tableStyles}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Matière</TableCell>
                            <TableCell>Nombre d'étudiants</TableCell>
                            <TableCell>Moyenne</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* On itère sur courseCounts pour générer le tableau */}
                        {Object.entries(courseCounts).map(([course, count], index) => {
                            // Récupère toutes les notes pour cette matière
                            const courseGrades = data
                                .filter(item => item.course === course)
                                .map(item => item.grade);
                            // Calcule la moyenne
                            const average = (
                                courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length
                            ).toFixed(1);

                            return (
                                <TableRow key={index}>
                                    <TableCell>{course}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{count}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`grade-pill ${
                                                average >= 10 ? 'passing' : 'failing'
                                            }`}
                                        >
                                            {average}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

/*---------------------------------------
 | Etudiants
 | - Recherche d'étudiants
 | - Ajout / Suppression / Modification
 | - Ajouter un cours via un dropdown
 |   basé sur la liste de matières
 |   existantes dans data
 ---------------------------------------*/
const Etudiants = () => {
    // Pour forcer un re-rendu après chaque opération
    const [refresh, setRefresh] = useState(false);

    // Champs pour l'ajout d'un nouvel étudiant
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Gestion de l'édition d'un étudiant existant
    const [editingIndex, setEditingIndex] = useState(null);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');

    // Champ de recherche
    const [searchTerm, setSearchTerm] = useState('');

    // Variables pour l'ajout d'un cours
    const [addingCourseIndex, setAddingCourseIndex] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [newCourseGrade, setNewCourseGrade] = useState('');

    // 1) Récupère la liste des matières existantes depuis data
    const courseCounts = getCourseCounts();
    // => un objet { MATH: 2, PHYSIQUE: 3, ... }
    // 2) Convertit en tableau pour le dropdown
    const allCourses = Object.keys(courseCounts);
    // => ['MATH', 'PHYSIQUE', 'CHIMIE', etc.]

    // Calcule la liste (unique) des étudiants
    const uniqueStudents = [
        ...new Map(
            data.map(item => [
                `${item.student.firstname}-${item.student.lastname}`,
                item.student
            ])
        ).values()
    ];

    // Filtrage selon la recherche
    const filteredStudents = uniqueStudents.filter(student => {
        const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    /*---------------------------------------
     | Ajouter un étudiant
     ---------------------------------------*/
    const addStudent = (e) => {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim()) return;

        const newStudent = {
            student: { firstname: firstName, lastname: lastName },
            course: 'N/A',
            grade: 0,
            date: 'N/A'
        };
        data.push(newStudent);

        setFirstName('');
        setLastName('');
        setRefresh(!refresh);
    };

    /*---------------------------------------
     | Supprimer un étudiant
     ---------------------------------------*/
    const handleDelete = (student) => {
        for (let i = data.length - 1; i >= 0; i--) {
            const s = data[i].student;
            if (s.firstname === student.firstname && s.lastname === student.lastname) {
                data.splice(i, 1);
            }
        }
        setRefresh(!refresh);
    };

    /*---------------------------------------
     | Éditer un étudiant (Nom/Prénom)
     ---------------------------------------*/
    const handleEdit = (student, index) => {
        setEditingIndex(index);
        setEditFirstName(student.firstname);
        setEditLastName(student.lastname);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditFirstName('');
        setEditLastName('');
    };

    const handleSave = (oldStudent) => {
        data.forEach(item => {
            if (
                item.student.firstname === oldStudent.firstname &&
                item.student.lastname === oldStudent.lastname
            ) {
                item.student.firstname = editFirstName;
                item.student.lastname = editLastName;
            }
        });
        setEditingIndex(null);
        setEditFirstName('');
        setEditLastName('');
        setRefresh(!refresh);
    };

    /*---------------------------------------
     | Ajouter un cours depuis le dropdown
     ---------------------------------------*/
    const handleAddCourse = (index) => {
        setAddingCourseIndex(index);
        setSelectedCourse('');
        setNewCourseGrade('');
    };

    const handleSaveCourse = (student) => {
        const newEntry = {
            student: {
                firstname: student.firstname,
                lastname: student.lastname
            },
            course: selectedCourse || 'N/A',
            grade: newCourseGrade ? parseFloat(newCourseGrade) : 0,
            date: 'N/A'
        };
        data.push(newEntry);

        setAddingCourseIndex(null);
        setSelectedCourse('');
        setNewCourseGrade('');
        setRefresh(!refresh);
    };

    const handleCancelCourse = () => {
        setAddingCourseIndex(null);
        setSelectedCourse('');
        setNewCourseGrade('');
    };

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title">Liste des Étudiants</Typography>

            {/* Barre de recherche */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher un étudiant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Formulaire d'ajout d'étudiant */}
            <form onSubmit={addStudent} className="add-student-form">
                <input
                    type="text"
                    placeholder="Prénom de l'étudiant"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom de l'étudiant"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit" className="neon-button">
                    Ajouter
                </button>
            </form>

            <TableContainer component={Paper} sx={tableStyles}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Nombre de cours</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((student, index) => {
                            // Compte le nombre de cours pour cet étudiant
                            const courseCount = data.filter(item =>
                                item.student.firstname === student.firstname &&
                                item.student.lastname === student.lastname
                            ).length;

                            // Mode édition Nom/Prénom
                            if (editingIndex === index) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <input
                                                type="text"
                                                value={editFirstName}
                                                onChange={(e) => setEditFirstName(e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="text"
                                                value={editLastName}
                                                onChange={(e) => setEditLastName(e.target.value)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="count-badge">{courseCount}</span>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                className="neon-button"
                                                onClick={() => handleSave(student)}
                                            >
                                                Sauvegarder
                                            </button>
                                            <button
                                                className="neon-button"
                                                onClick={handleCancelEdit}
                                            >
                                                Annuler
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }

                            // Mode ajout de cours (dropdown)
                            if (addingCourseIndex === index) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{student.firstname}</TableCell>
                                        <TableCell>{student.lastname}</TableCell>
                                        <TableCell>
                                            <span className="count-badge">{courseCount}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {/* Sélecteur de matière : alimenté par allCourses */}
                                                <select
                                                    value={selectedCourse}
                                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                                >
                                                    <option value="">-- Choisir une matière --</option>
                                                    {allCourses.map((courseName) => (
                                                        <option key={courseName} value={courseName}>
                                                            {courseName}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button
                                                        className="neon-button"
                                                        onClick={() => handleSaveCourse(student)}
                                                    >
                                                        Enregistrer
                                                    </button>
                                                    <button
                                                        className="neon-button"
                                                        onClick={handleCancelCourse}
                                                    >
                                                        Annuler
                                                    </button>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }

                            // Affichage normal
                            return (
                                <TableRow key={index}>
                                    <TableCell>{student.firstname}</TableCell>
                                    <TableCell>{student.lastname}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{courseCount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',marginBottom:'30px' }}>
                                            {/* Modifier (bleu) */}
                                            <button
                                                className="neon-button"
                                                style={{ backgroundColor: '#2563EB', color: '#fff' }}
                                                onClick={() => handleEdit(student, index)}
                                            >
                                                Modifier
                                            </button>
                                            {/* Supprimer (rouge) */}
                                            <button
                                                className="neon-button"
                                                style={{ backgroundColor: '#DC2626', color: '#fff' }}
                                                onClick={() => handleDelete(student)}
                                            >
                                                Supprimer
                                            </button>
                                            {/* Ajouter cours (vert) */}
                                            <button
                                                className="neon-button"
                                                style={{ backgroundColor: '#16A34A', color: '#fff' }}
                                                onClick={() => handleAddCourse(index)}
                                            >
                                                Ajouter cours
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

/*---------------------------------------
 | APropos
 | Affiche quelques statistiques globales
 ---------------------------------------*/
const APropos = () => (
    <Card className="about-card">
        <CardContent>
            <Typography variant="h4" className="neon-title">À Propos</Typography>
            <div className="stats-container">
                <div className="stat-item">
                    <span className="stat-value">{data.length}</span>
                    <span className="stat-label">Total des notes</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">
                        {new Set(data.map(item => `${item.student.firstname} ${item.student.lastname}`)).size}
                    </span>
                    <span className="stat-label">Étudiants</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">
                        {new Set(data.map(item => item.course)).size}
                    </span>
                    <span className="stat-label">Matières</span>
                </div>
            </div>
        </CardContent>
    </Card>
);

/*---------------------------------------
 | Header
 | Entête de la page
 ---------------------------------------*/
function Header() {
    return (
        <header>
            <img src={image} alt="Default vignette"/>
            <h1>Introduction à React</h1>
            <h2>À la découverte des premières notions de React</h2>
        </header>
    );
}

/*---------------------------------------
 | MainContent
 | Affiche la date, l'heure, etc.
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

/*---------------------------------------
 | Menu
 | Gère la navigation (Notes, Étudiants, Matières, À propos)
 ---------------------------------------*/
function Menu() {
    const [activeItem, setActiveItem] = useState('Notes');

    const menuItems = [
        { id: 'Notes', component: <Notes /> },
        { id: 'Etudiants', component: <Etudiants /> },
        { id: 'Matières', component: <Matieres /> },
        { id: 'A propos', component: <APropos /> }
    ];

    return (
        <div className="menu-container">
            <div className="menu-buttons">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveItem(item.id)}
                        className={`menu-button ${activeItem === item.id ? 'active' : ''}`}
                    >
                        {item.id}
                    </button>
                ))}
            </div>
            <div className="content-section">
                {menuItems.find(item => item.id === activeItem)?.component}
            </div>
        </div>
    );
}

/*---------------------------------------
 | App
 | Point d'entrée principal
 ---------------------------------------*/
function App() {
    return (
        <>
            <Header />
            <Menu />
            <RandomInfo />
            <MainContent />
            <div className="logo-section">
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <Footer />
        </>
    );
}

export default App;
