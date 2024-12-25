import { useState, useRef } from 'react';
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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

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

const RandomInfo = ({ data }) => {
    const [item, setItem] = useState(getRandomItem(data));

    const handleRandomize = () => {
        const randomItem = getRandomItem(data);
        setItem(randomItem);
    };

    return (
        <div className="random-info-section">
            <h4>Les Informations Aléatoire d'un étudiant</h4>
            <p>
                <strong>Cours :</strong> {item.course}
            </p>
            <p>
                <strong>Etudiant :</strong> {item.student.firstname} {item.student.lastname}
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

const Notes = ({ data }) => (
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
                    {data.filter(item => item.student.firstname !== "" && item.student.lastname !== "").map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.course}</TableCell>
                            <TableCell>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                            <TableCell>
                                <span className={`grade-pill ${item.grade >= 10 ? 'passing' : 'failing'}`}>
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

const Etudiants = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const uniqueStudents = [...new Map(
        data
            .filter(item => item.student.firstname !== "" && item.student.lastname !== "")
            .map(item => [
                `${item.student.firstname}-${item.student.lastname}`,
                item.student
            ])
    ).values()];

    const filteredStudents = uniqueStudents.filter(student => {
        const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title">Liste des Étudiants</Typography>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Rechercher un étudiant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <TableContainer component={Paper} sx={tableStyles}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Prénom</TableCell>
                            <TableCell>Nom</TableCell>
                            <TableCell>Nombre de cours</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell>{student.firstname}</TableCell>
                                <TableCell>{student.lastname}</TableCell>
                                <TableCell>
                                    <span className="count-badge">
                                        {data.filter(item =>
                                            item.student.firstname === student.firstname &&
                                            item.student.lastname === student.lastname
                                        ).length}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const Matieres = ({ data, onUpdateData }) => {
    const [open, setOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        course: ''
    });

    const courseCounts = data.reduce((acc, item) => {
        // Ne compte que si l'étudiant a un prénom ou un nom
        if (item.student.firstname.trim() !== '' || item.student.lastname.trim() !== '') {
            acc[item.course] = (acc[item.course] || 0) + 1;
        } else {
            // S'assure que la matière existe dans l'objet même si elle n'a pas d'étudiants
            if (!acc[item.course]) {
                acc[item.course] = 0;
            }
        }
        return acc;
    }, {});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCourse(null);
        setFormData({ course: '' });
    };

    const handleSubmit = () => {
        let newData = [...data];
        if (editingCourse !== null) {
            // Mise à jour d'une matière existante
            newData = newData.map(item => {
                if (item.course === editingCourse) {
                    return { ...item, course: formData.course };
                }
                return item;
            });
        } else {
            // Ajout d'une nouvelle matière sans étudiant
            newData.push({
                course: formData.course,
                student: { firstname: "", lastname: "" }, // étudiant vide
                grade: 0,
                date: new Date().toISOString().split('T')[0]
            });
        }
        onUpdateData(newData);
        handleClose();
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({ course: course });
        setOpen(true);
    };

    const handleDelete = (course) => {
        const newData = data.filter(item => item.course !== course);
        onUpdateData(newData);
    };

    return (
        <Box className="table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Typography variant="h4" className="neon-title">Liste des Matières</Typography>
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
                                .filter(item =>
                                    item.course === course &&
                                    (item.student.firstname.trim() !== '' || item.student.lastname.trim() !== '')
                                )
                                .map(item => item.grade);

                            // Calcul de la moyenne avec gestion du cas où il n'y a pas d'étudiants
                            const average = courseGrades.length > 0
                                ? (courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length).toFixed(1)
                                : "0.0";

                            return (
                                <TableRow key={index}>
                                    <TableCell>{course}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{count}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`grade-pill ${average > 0 ? (average >= 10 ? 'passing' : 'failing') : ''}`}>
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
                                        <Button
                                            onClick={() => handleDelete(course)}
                                            color="error"
                                        >
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

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

const APropos = ({ data }) => {
    // Filtrer les étudiants non vides pour les statistiques
    const filteredData = data.filter(item =>
        item.student.firstname.trim() !== '' || item.student.lastname.trim() !== ''
    );

    return (
        <Card className="about-card">
            <CardContent>
                <Typography variant="h4" className="neon-title">À Propos</Typography>
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-value">{filteredData.length}</span>
                        <span className="stat-label">Total des notes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {new Set(filteredData.map(item =>
                                `${item.student.firstname} ${item.student.lastname}`
                            )).size}
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
};

function Header() {
    return (
        <header>
            <img src={image} alt="Default vignette"/>
            <h1>Introduction à React</h1>
            <h2>A la découverte des premières notions de React</h2>
        </header>
    );
}

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
            <p>Bonjour, on est le {day} {month} {year} et il est {hour}:{minute}:{second}</p>
        </div>
    );
}

function Footer() {
    const now = new Date();
    const year = now.getFullYear();
    return (
        <footer>
            <p>© {year} - Alehiane Ouiame, Tous droits réservés.</p>
        </footer>
    );
}

function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

function Menu({ data, onUpdateData }) {
    const [activeItem, setActiveItem] = useState('Notes');

    const menuItems = [
        { id: 'Notes', component: <Notes data={data} /> },
        { id: 'Etudiants', component: <Etudiants data={data} /> },
        { id: 'Matières', component: <Matieres data={data} onUpdateData={onUpdateData} /> },
        { id: 'A propos', component: <APropos data={data} /> }
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

function App() {
    const [courseData, setCourseData] = useState(data);

    const handleUpdateData = (newData) => {
        setCourseData(newData);
    };

    return (
        <>
            <Header/>
            <Menu data={courseData} onUpdateData={handleUpdateData}/>
            <RandomInfo data={courseData}/>
            <MainContent/>
            <div className="logo-section">
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <Footer/>
        </>
    );
}

export default App;