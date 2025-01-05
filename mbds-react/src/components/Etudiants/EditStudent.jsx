import React, { useState, useEffect } from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert} from '@mui/material';
import { updateStudent } from '../../services/apiService.js';

function EditStudent({ student, onSave, onClose }) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(student.firstName);
  const [lastname, setLastname] = useState(student.lastName);
  const [id, setId] = useState(student._id);
  const [error, setError] = useState('');

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSave = async () => {
    try {
      const updatedStudent = await updateStudent({ firstName: firstname, lastName: lastname, _id: id });
      onSave(updatedStudent);
      debugger
      setOpen(false);
      setError('');
    } catch (error) {
      setError('Erreur lors de la mise à jour de l\'étudiant. Veuillez réessayer.');
      console.error('Error updating student:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Last Name"
          type="text"
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="ID"
          type="text"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
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

export default EditStudent;