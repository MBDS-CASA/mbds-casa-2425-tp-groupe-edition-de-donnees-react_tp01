import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import jsonData from './data.json';


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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';



/*---------------------------------------
 | Styles (Material UI)
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
    },
};


/*---------------------------------------
 | Etudiants
 | - Recherche
 | - Ajout / Suppression / Modification
 | - Ajouter un cours
 ---------------------------------------*/
import {useState} from "react";
import APropos from "./APropos.jsx";


/*---------------------------------------
 | getCourseCounts
 ---------------------------------------*/
function getCourseCounts(dataset) {
    return dataset.reduce((acc, item) => {
        acc[item.course] = (acc[item.course] || 0) + 1;
        return acc;
    }, {});
}

const Etudiants = ({ data }) => {
    const [refresh, setRefresh] = useState(false);

    // Champs pour ajouter un nouvel étudiant
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Édition d'un étudiant (nom/prénom)
    const [editingIndex, setEditingIndex] = useState(null);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');

    // Recherche
    const [searchTerm, setSearchTerm] = useState('');

    // Ajout d'un cours
    const [addingCourseIndex, setAddingCourseIndex] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');

    // Liste de toutes les matières existantes
    const courseCounts = getCourseCounts(data);
    const allCourses = Object.keys(courseCounts);

    // Tableau unique d'étudiants
    const uniqueStudents = [
        ...new Map(
            data
                .filter(
                    (item) =>
                        item.student &&
                        (item.student.firstname.trim() !== '' ||
                            item.student.lastname.trim() !== '')
                )
                .map((item) => [
                    `${item.student.firstname}-${item.student.lastname}`,
                    item.student,
                ])
        ).values(),
    ];

    // Filtrage par nom/prénom
    const filteredStudents = uniqueStudents.filter((student) => {
        const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    /*---------------------------------------
     | Ajouter un étudiant
     ---------------------------------------*/
    const addStudent = (e) => {
        e.preventDefault();
        if (!firstName.trim() || !lastName.trim()) return;

        // On ajoute l'étudiant sans cours => n'apparaîtra pas dans Notes
        data.push({
            student: { firstname: firstName, lastname: lastName },
            course: '',
            grade: 0,
            date: 'N/A',
        });

        setFirstName('');
        setLastName('');
        setRefresh(!refresh);
    };

    /*---------------------------------------
     | Supprimer un étudiant
     ---------------------------------------*/
    const handleDelete = (student) => {
        // Supprime toutes les "lignes" liées à cet étudiant
        for (let i = data.length - 1; i >= 0; i--) {
            const s = data[i].student;
            if (s?.firstname === student.firstname && s?.lastname === student.lastname) {
                data.splice(i, 1);
            }
        }
        setRefresh(!refresh);
    };

    /*---------------------------------------
     | Éditer un étudiant (nom/prénom)
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
        data.forEach((item) => {
            if (
                item.student &&
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
     | Ajouter un cours à cet étudiant
     ---------------------------------------*/
    const handleAddCourse = (index) => {
        setAddingCourseIndex(index);
        setSelectedCourse('');
    };
    const handleSaveCourse = (student) => {
        // On ajoute juste un nouveau record pour le cours
        data.push({
            student: {
                firstname: student.firstname,
                lastname: student.lastname,
            },
            course: selectedCourse,
            grade: 0,
            date: 'N/A',
        });
        setAddingCourseIndex(null);
        setSelectedCourse('');
        setRefresh(!refresh);
    };
    const handleCancelCourse = () => {
        setAddingCourseIndex(null);
        setSelectedCourse('');
    };

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title">
                Liste des Étudiants
            </Typography>

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
                            // On compte seulement les records dont course != ''
                            const courseCount = data.filter(
                                (item) =>
                                    item.student &&
                                    item.student.firstname === student.firstname &&
                                    item.student.lastname === student.lastname &&
                                    item.course.trim() !== ''
                            ).length;

                            // MODE ÉDITION
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

                            // MODE AJOUT DE COURS
                            if (addingCourseIndex === index) {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{student.firstname}</TableCell>
                                        <TableCell>{student.lastname}</TableCell>
                                        <TableCell>
                                            <span className="count-badge">{courseCount}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px',
                                                }}
                                            >
                                                <select
                                                    value={selectedCourse}
                                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                                >
                                                    <option value="">
                                                        -- Choisir une matière --
                                                    </option>
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

                            // MODE AFFICHAGE NORMAL
                            return (
                                <TableRow key={index}>
                                    <TableCell>{student.firstname}</TableCell>
                                    <TableCell>{student.lastname}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{courseCount}</span>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                                marginBottom: '30px',
                                            }}
                                        >
                                            {/* Modifier */}
                                            <button
                                                className="neon-button"
                                                style={{ backgroundColor: '#2563EB', color: '#fff' }}
                                                onClick={() => handleEdit(student, index)}
                                            >
                                                Modifier
                                            </button>

                                            {/* Supprimer */}
                                            <button
                                                className="neon-button"
                                                style={{ backgroundColor: '#DC2626', color: '#fff' }}
                                                onClick={() => handleDelete(student)}
                                            >
                                                Supprimer
                                            </button>

                                            {/* Ajouter cours */}
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

export default Etudiants