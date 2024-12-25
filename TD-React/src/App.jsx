/* App.js */

import { useState } from 'react';
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

import { saveAs } from 'file-saver';

/*---------------------------------------
 | getCourseCounts
 ---------------------------------------*/
function getCourseCounts(dataset) {
    return dataset.reduce((acc, item) => {
        acc[item.course] = (acc[item.course] || 0) + 1;
        return acc;
    }, {});
}

/*---------------------------------------
 | getRandomItem
 ---------------------------------------*/
function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

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
 | RandomInfo
 | (Infos d'un étudiant aléatoire)
 ---------------------------------------*/
const RandomInfo = ({ data }) => {
    const [item, setItem] = useState(getRandomItem(data));

    const handleRandomize = () => {
        setItem(getRandomItem(data));
    };

    return (
        <div className="random-info-section">
            <h4>Les Informations Aléatoires d'un étudiant</h4>
            <p><strong>Cours :</strong> {item.course}</p>
            <p><strong>Étudiant :</strong> {item.student?.firstname} {item.student?.lastname}</p>
            <p><strong>Date :</strong> {item.date}</p>
            <p><strong>Note :</strong> {item.grade}</p>
            <button onClick={handleRandomize} className="neon-button">
                Un autre étudiant
            </button>
        </div>
    );
};

/*---------------------------------------
 | Notes
 | - Liste de toutes les notes
 | - Tri asc/desc
 | - Téléchargement CSV
 | - Édition / Suppression
 | => On exclut les items dont le course est vide
 ---------------------------------------*/
const Notes = ({ data, onUpdateData }) => {
    const [isAscending, setIsAscending] = useState(true);

    // On filtre pour exclure tout item dont l'étudiant est vide OU dont course est vide
    const filteredNotes = data.filter(
        (item) =>
            item.student &&
            item.student.firstname.trim() !== '' &&
            item.student.lastname.trim() !== '' &&
            item.course.trim() !== ''
    );

    // Tri du tableau filtré
    const sortedNotes = [...filteredNotes].sort((a, b) =>
        isAscending ? a.grade - b.grade : b.grade - a.grade
    );

    // Inversion du sens du tri
    const handleSort = () => {
        setIsAscending(!isAscending);
    };

    // Téléchargement CSV
    const handleDownloadCSV = () => {
        const headers = ['Cours', 'Étudiant', 'Note', 'Date'];
        const csvContent = [
            headers.join(','),
            ...sortedNotes.map((item) =>
                [
                    item.course,
                    `${item.student.firstname} ${item.student.lastname}`,
                    item.grade,
                    item.date,
                ].join(',')
            ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'notes.csv');
    };

    // Édition de la note (Mise à jour dans le state parent via onUpdateData)
    const handleEdit = (index, newGrade) => {
        // 1) L'élément qu'on veut modifier dans le tableau trié
        const itemToUpdate = sortedNotes[index];

        // 2) On crée une copie du tableau complet data
        const newData = [...data];

        // 3) On retrouve l'index réel de l'item dans newData
        const realIndex = newData.indexOf(itemToUpdate);

        if (realIndex !== -1) {
            // 4) On met à jour la note
            newData[realIndex] = {
                ...newData[realIndex],
                grade: newGrade,
            };
            // 5) On informe le parent (App) de la mise à jour
            onUpdateData(newData);
        }
    };

    // Suppression (met la note à 0) => idem, on met à jour le parent
    const handleDelete = (index) => {
        const itemToDelete = sortedNotes[index];
        const newData = [...data];
        const realIndex = newData.indexOf(itemToDelete);

        if (realIndex !== -1) {
            newData[realIndex] = {
                ...newData[realIndex],
                grade: 0,
            };
            onUpdateData(newData);
        }
    };

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title" align="center">
                Liste des Notes
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', gap: '16px' }}>
                <button onClick={handleSort} className="sort-button">
                    Trier {isAscending ? 'Descendant' : 'Ascendant'}
                </button>
                <button onClick={handleDownloadCSV} className="download-button">
                    Télécharger CSV
                </button>
            </Box>

            <TableContainer component={Paper} sx={tableStyles}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cours</TableCell>
                            <TableCell>Étudiant</TableCell>
                            <TableCell>Note</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedNotes.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.course}</TableCell>
                                <TableCell>
                                    {`${item.student.firstname} ${item.student.lastname}`}
                                </TableCell>
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
                                <TableCell>
                                    {/* Modifier via prompt */}
                                    <button
                                        onClick={() => {
                                            const newGrade = parseFloat(
                                                prompt('Entrez la nouvelle note :', item.grade)
                                            );
                                            if (!isNaN(newGrade)) {
                                                handleEdit(index, newGrade);
                                            }
                                        }}
                                        className="edit-button"
                                    >
                                        Modifier
                                    </button>

                                    {/* Supprimer => grade = 0 */}
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="delete-button"
                                    >
                                        Supprimer
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

/*---------------------------------------
 | Etudiants
 | - Recherche
 | - Ajout / Suppression / Modification
 | - Ajouter un cours
 ---------------------------------------*/
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

/*---------------------------------------
 | Matieres
 | Ajout/édition/suppression de matière
 | via onUpdateData
 ---------------------------------------*/
const Matieres = ({ data, onUpdateData }) => {
    const [open, setOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ course: '' });

    // Calcul du nombre d'étudiants par matière
    const courseCounts = data.reduce((acc, item) => {
        if (
            item.student &&
            (item.student.firstname.trim() !== '' || item.student.lastname.trim() !== '')
        ) {
            acc[item.course] = (acc[item.course] || 0) + 1;
        } else {
            if (!acc[item.course]) {
                acc[item.course] = 0;
            }
        }
        return acc;
    }, {});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditingCourse(null);
        setFormData({ course: '' });
    };

    const handleSubmit = () => {
        let newData = [...data];

        if (editingCourse !== null) {
            // Mise à jour d'une matière
            newData = newData.map((item) => {
                if (item.course === editingCourse) {
                    return { ...item, course: formData.course };
                }
                return item;
            });
        } else {
            // Ajout d'une nouvelle matière, sans créer de note ni d'étudiant
            newData.push({
                course: formData.course,
                student: null,
                grade: null,
                date: null,
            });
        }

        onUpdateData(newData);
        handleClose();
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({ course });
        setOpen(true);
    };

    const handleDelete = (course) => {
        // Supprime toutes les lignes liées à cette matière
        const newData = data.filter((item) => item.course !== course);
        onUpdateData(newData);
    };

    return (
        <Box className="table-container">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <Typography variant="h4" className="neon-title">
                    Liste des Matières
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    sx={{ background: 'linear-gradient(90deg, #3B82F6 0%, #2563EB 100%)' }}
                >
                    Ajouter une matière
                </Button>
            </div>

            <TableContainer component={Paper} sx={tableStyles}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Matière</TableCell>
                            <TableCell>Nombre d'étudiants</TableCell>
                            <TableCell>Moyenne</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(courseCounts).map(([course, count], index) => {
                            const courseGrades = data
                                .filter(
                                    (item) =>
                                        item.course === course &&
                                        item.student &&
                                        (item.student.firstname.trim() !== '' ||
                                            item.student.lastname.trim() !== '')
                                )
                                .map((item) => item.grade || 0);

                            const average =
                                courseGrades.length > 0
                                    ? (
                                        courseGrades.reduce((a, b) => a + b, 0) /
                                        courseGrades.length
                                    ).toFixed(1)
                                    : '0.0';

                            return (
                                <TableRow key={index}>
                                    <TableCell>{course}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{count}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`grade-pill ${
                                                parseFloat(average) >= 10 ? 'passing' : 'failing'
                                            }`}
                                        >
                                            {average}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleEdit(course)}
                                            color="primary"
                                            sx={{ mr: 1 }}
                                        >
                                            Modifier
                                        </Button>
                                        <Button onClick={() => handleDelete(course)} color="error">
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog : Ajouter / Éditer une matière */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editingCourse ? 'Modifier la matière' : 'Ajouter une matière'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom de la matière"
                        fullWidth
                        value={formData.course}
                        onChange={(e) => setFormData({ course: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingCourse ? 'Modifier' : 'Ajouter'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

/*---------------------------------------
 | APropos
 ---------------------------------------*/
const APropos = ({ data }) => {
    // Filtrer seulement les items dont l'étudiant n'est pas vide
    const filteredData = data.filter(
        (item) =>
            item.student &&
            (item.student.firstname.trim() !== '' || item.student.lastname.trim() !== '')
    );

    return (
        <Card className="about-card">
            <CardContent>
                <Typography variant="h4" className="neon-title">
                    À Propos
                </Typography>
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-value">{filteredData.length}</span>
                        <span className="stat-label">Total des notes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {
                                new Set(
                                    filteredData.map(
                                        (item) =>
                                            `${item.student.firstname} ${item.student.lastname}`
                                    )
                                ).size
                            }
                        </span>
                        <span className="stat-label">Étudiants</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {new Set(data.map((item) => item.course)).size}
                        </span>
                        <span className="stat-label">Matières</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

/*---------------------------------------
 | Header
 ---------------------------------------*/
function Header() {
    return (
        <header>
            <img src={image} alt="Default vignette" />
            <h1>Introduction à React</h1>
            <h2>À la découverte des premières notions de React</h2>
        </header>
    );
}

/*---------------------------------------
 | MainContent
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
 ---------------------------------------*/
function Menu({ data, onUpdateData }) {
    const [activeItem, setActiveItem] = useState('Notes');

    const menuItems = [
        {
            id: 'Notes',
            // On passe la prop onUpdateData au composant Notes
            component: <Notes data={data} onUpdateData={onUpdateData} />
        },
        { id: 'Etudiants', component: <Etudiants data={data} /> },
        { id: 'Matières', component: <Matieres data={data} onUpdateData={onUpdateData} /> },
        { id: 'A propos', component: <APropos data={data} /> },
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
                {menuItems.find((item) => item.id === activeItem)?.component}
            </div>
        </div>
    );
}

/*---------------------------------------
 | App
 | Point d'entrée principal
 ---------------------------------------*/
function App() {
    // State local initialisé avec data.json
    const [courseData, setCourseData] = useState(jsonData);

    // Méthode pour mettre à jour le dataset (Notes, Matières, etc.)
    const handleUpdateData = (newData) => {
        setCourseData(newData);
    };

    return (
        <>
            <Header />
            <Menu data={courseData} onUpdateData={handleUpdateData} />
            <RandomInfo data={courseData} />
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

