import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { createCourse } from '../../services/apiService.js';

function AddMatiere({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      const newCourse = await createCourse({ name: courseName });
      onAdd(newCourse);
      setOpen(false);
      setError('');
    } catch (error) {
      setError('Erreur lors de la création de la matière. Veuillez réessayer.');
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Course
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Course Name"
            type="text"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddMatiere;