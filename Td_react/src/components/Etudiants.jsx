import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import data from '.././data.json';

function Etudiants() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrer les données en fonction du nom, prénom et matière
  const filteredData = data.filter((item) => {
    const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
    const course = item.course.toLowerCase();
    const searchTerm = search.toLowerCase();
    
    return (
      fullName.includes(searchTerm) || course.includes(searchTerm)
    );
  });

  return (
    <div>
      {/* Barre de recherche */}
      <TextField
        label="Rechercher par prénom, nom ou matière"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        value={search}
        style={{ marginBottom: '20px' }}
        inputProps={{ style: { color: 'white' } }}  // Texte blanc dans la barre de recherche
      />

      <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>ID Étudiant</TableCell>
              <TableCell style={{ color: 'white' }}>Prénom</TableCell>
              <TableCell style={{ color: 'white' }}>Nom</TableCell>
              <TableCell style={{ color: 'white' }}>Matière</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.student.id}>
                <TableCell style={{ color: 'white' }}>{item.student.id}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.student.firstname}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.student.lastname}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.course}</TableCell> {/* Affichage de la matière */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Etudiants;
