import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import data from '../data.json';

const columns = [
  { field: 'course', headerName: 'Course', flex: 1 },
  { field: 'student', headerName: 'Student', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'grade', headerName: 'Grade', flex: 1 },
];

function Notes() {
  const [loading, setLoading] = useState(true);
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const formattedData = data.map((item) => ({
        id: item.unique_id,
        course: item.course,
        student: `${item.student.firstname} ${item.student.lastname}`,
        date: item.date,
        grade: item.grade,
      }));
      setNotesData(formattedData);
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
    <Box sx={{ height: 400, width: '100%', backgroundColor: '#e0f7fa', padding: 2, borderRadius: 2 }}>
      <Typography variant="h5" component="div" gutterBottom>
        Notes
      </Typography>
      <DataGrid rows={notesData} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
    </Box>
  );
}

export default Notes;