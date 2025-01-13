import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { updateCourse } from '../../services/apiService.js';

function EditMatiere({ course, onSave, onClose }) {
  const [open, setOpen] = useState(false);
  const [courseName, setCourseName] = useState(course.name);
  const [error, setError] = useState('');

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSave = async () => {
    try {
      const updatedCourse = await updateCourse({ ...course, name: courseName });
      debugger
      onSave(updatedCourse);
      setOpen(false);
      setError('');
    } catch (error) {
      setError('Erreur lors de la mise à jour de la matière. Veuillez réessayer.');
      console.error('Error updating course:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditMatiere;