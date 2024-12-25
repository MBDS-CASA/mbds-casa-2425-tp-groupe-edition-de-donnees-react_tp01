import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, IconButton, TextField, Button, Snackbar, Alert, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import data from '../data.json'; // Adjust the data source as needed

function Matieres() {
    const [loading, setLoading] = useState(true);
    const [matieresData, setMatieresData] = useState([]);
    const [currentMatiere, setCurrentMatiere] = useState({ id: null, course: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        setTimeout(() => {
            const formattedData = data.map((item) => ({
                id: item.unique_id,
                course: item.course,
            }));
            setMatieresData(formattedData);
            setLoading(false);
        }, 1000); // Simulate loading delay
    }, []);

    const handleAdd = () => {
        if (currentMatiere.course.trim() === '') {
            setSnackbar({ open: true, message: 'Failed to add: Course name is empty', severity: 'error' });
            return; // Prevent adding empty course
        }
        const newMatiere = { id: Date.now(), course: currentMatiere.course };
        setMatieresData((prevData) => [...prevData, newMatiere]);
        setCurrentMatiere({ id: null, course: '' }); // Reset form
        setSnackbar({ open: true, message: 'Course added successfully', severity: 'success' });
    };

    const handleEdit = (id) => {
        const matiere = matieresData.find((item) => item.id === id);
        setCurrentMatiere(matiere);
    };

    const handleUpdate = () => {
        setMatieresData(
            matieresData.map((item) =>
                item.id === currentMatiere.id ? currentMatiere : item
            )
        );
        setCurrentMatiere({ id: null, course: '' });
    };

    const handleDelete = (id) => {
        setMatieresData(matieresData.filter((item) => item.id !== id));
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const columns = [
        { field: 'course', headerName: 'Course', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: (params) => (
                <strong>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row.id)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
                Matières
            </Typography>
            <Box mb={2}>
                <TextField
                    label="Course"
                    value={currentMatiere.course}
                    onChange={(e) => setCurrentMatiere({ ...currentMatiere, course: e.target.value })}
                />
                {currentMatiere.id ? (
                    <>
                        <Button variant="contained" color="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(currentMatiere.id)} style={{ marginLeft: 8 }}>
                            Delete
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        Add
                    </Button>
                )}
            </Box>
            <DataGrid
                rows={matieresData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
            />
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default Matieres;