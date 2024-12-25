import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import data from '../data.json'; // Adjust the data source as needed

const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'firstname', headerName: 'First Name', flex: 1 },
  { field: 'lastname', headerName: 'Last Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
];

function Etudiants() {
  const [loading, setLoading] = useState(true);
  const [etudiantsData, setEtudiantsData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const formattedData = data.map((item) => ({
        id: item.student.id,
        firstname: item.student.firstname,
        lastname: item.student.lastname,
        email: item.student.email,
      }));
      setEtudiantsData(formattedData);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#f3e5f5', padding: 2, borderRadius: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Etudiants
      </Typography>
      <DataGrid rows={etudiantsData} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
    </Box>
  );
}

export default Etudiants;