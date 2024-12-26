import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import jsonData from './data.json';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
 | Matieres
 | Ajout/édition/suppression de matière
 | via onUpdateData
 ---------------------------------------*/
import {useState} from "react";


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

export default Matieres;