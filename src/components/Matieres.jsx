import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import data from '../data.json'; // Adjust the data source as needed

const columns = [
  { field: 'course', headerName: 'Course', flex: 1 },
]; // Ajout d'une fermeture correcte du tableau

function Matieres() {
  const [loading, setLoading] = useState(true);
  const [matieresData, setMatieresData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log(data);
      const formattedData = data.map((item) => ({
        id: item.unique_id,
        course: item.course,
      }));
      setMatieresData(formattedData);
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
      <Box
          sx={{
            height: 400,
            width: '100%',
            backgroundColor: '#f0f0f0',
            padding: 2,
            borderRadius: 2,
          }}
      >
        <Typography variant="h5" component="div" gutterBottom>
          Matières
        </Typography>
        <DataGrid
            rows={matieresData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
  );
}

export default Matieres;
