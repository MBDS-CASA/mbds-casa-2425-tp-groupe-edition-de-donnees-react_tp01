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

export default APropos;