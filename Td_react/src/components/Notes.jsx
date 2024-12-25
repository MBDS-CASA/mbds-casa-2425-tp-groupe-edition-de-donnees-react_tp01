import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import data from '.././data.json';

function Notes() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrer les données en fonction de la recherche
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
        label="Rechercher par nom, prénom ou cours"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        value={search}
        style={{ marginBottom: '20px' }}
        inputProps={{ style: { color: 'white' } }}  // Texte blanc dans la barre de recherche
      />

      {/* Table avec fond sombre */}
      <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }}>ID</TableCell>
              <TableCell style={{ color: 'white' }}>Cours</TableCell>
              <TableCell style={{ color: 'white' }}>Étudiant</TableCell>
              <TableCell style={{ color: 'white' }}>Date</TableCell>
              <TableCell style={{ color: 'white' }}>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.unique_id}>
                <TableCell style={{ color: 'white' }}>{item.unique_id}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.course}</TableCell>
                <TableCell style={{ color: 'white' }}>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.date}</TableCell>
                <TableCell style={{ color: 'white' }}>{item.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Notes;
