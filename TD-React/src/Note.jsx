import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import image from './assets/vignette_par_defaut.jpg';
import jsonData from './data.json';
import { saveAs } from 'file-saver';
import {useState} from "react";

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

export default Notes;