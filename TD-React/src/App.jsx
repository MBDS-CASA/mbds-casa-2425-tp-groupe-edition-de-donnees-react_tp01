import { useState, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import data from './data.json';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent, Box,} from '@mui/material';
import { saveAs } from 'file-saver';


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


const Notes = () => {
    const [notesData, setNotesData] = useState(data);
    const [isAscending, setIsAscending] = useState(true);

    const handleSort = () => {
        const sortedData = [...notesData].sort((a, b) =>
            isAscending ? a.grade - b.grade : b.grade - a.grade
        );
        setNotesData(sortedData);
        setIsAscending(!isAscending);
    };

    const handleDownloadCSV = () => {
        const headers = ["Cours", "Étudiant", "Note", "Date"];
        const csvContent = [
            headers.join(","),
            ...notesData.map(item =>
                [
                    item.course,
                    `${item.student.firstname} ${item.student.lastname}`,
                    item.grade,
                    item.date
                ].join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "notes.csv");
    };

    const handleEdit = (index, newGrade) => {
        const updatedData = [...notesData];
        updatedData[index].grade = newGrade;
        setNotesData(updatedData);
    };

    const handleDelete = (index) => {
        const updatedData = [...notesData];
        updatedData[index].grade = 0;
        setNotesData(updatedData);
    };

    return (
        <Box className="table-container">
            <Typography variant="h4" className="neon-title" align="center">
                Liste des Notes
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', gap: '16px' }}>
                <button onClick={handleSort} className="sort-button">
                    Trier {isAscending ? "Descendant" : "Ascendant"}
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
                        {notesData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.course}</TableCell>
                                <TableCell>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                                <TableCell>
                                    <span className={`grade-pill ${item.grade >= 10 ? 'passing' : 'failing'}`}>
                                        {item.grade}
                                    </span>
                                </TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => {
                                            const newGrade = parseFloat(prompt("Entrez la nouvelle note :", item.grade));
                                            if (!isNaN(newGrade)) handleEdit(index, newGrade);
                                        }}
                                        className="edit-button"
                                    >
                                        Modifier
                                    </button>
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

const Etudiants = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const uniqueStudents = [...new Map(
        data.map(item => [
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

const Matieres = () => {
    const courseCounts = data.reduce((acc, item) => {
        acc[item.course] = (acc[item.course] || 0) + 1;
        return acc;
    }, {});

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
                        {Object.entries(courseCounts).map(([course, count], index) => {
                            const courseGrades = data
                                .filter(item => item.course === course)
                                .map(item => item.grade);
                            const average = (courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length).toFixed(1);

                            return (
                                <TableRow key={index}>
                                    <TableCell>{course}</TableCell>
                                    <TableCell>
                                        <span className="count-badge">{count}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`grade-pill ${average >= 10 ? 'passing' : 'failing'}`}>
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


function App() {
    return (
        <>
            <Header/>
            <Menu/>
            <RandomInfo/>
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