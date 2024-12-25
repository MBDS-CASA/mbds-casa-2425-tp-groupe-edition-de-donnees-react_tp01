import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography } from '@mui/material';
import data from '.././data.json';

function Matieres() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrer les données en fonction du nom de la matière
  const filteredData = data.filter((item) => {
    const course = item.course.toLowerCase();
    const searchTerm = search.toLowerCase();
    
    return course.includes(searchTerm);
  });

  return (
    <div>
      {/* Titre des matières */}
      <Typography variant="h4" style={{ color: 'white', marginBottom: '20px' }}>
        Matières
      </Typography>

      {/* Barre de recherche */}
      <TextField
        label="Rechercher par matière"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        value={search}
        style={{ marginBottom: '20px' }}
        inputProps={{ style: { color: 'white' } }}  // Texte blanc dans la barre de recherche
      />

      {/* Table avec fond sombre, affichant uniquement les matières */}
      <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Matière</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.course}>
                <TableCell style={{ color: 'white' }}>{item.course}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Matieres;
