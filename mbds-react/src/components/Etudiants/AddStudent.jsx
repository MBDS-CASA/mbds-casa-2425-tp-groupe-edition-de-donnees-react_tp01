import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { createStudent } from '../../services/apiService.js';

function AddStudent({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      const newStudent = await createStudent({ firstName: firstname, lastName: lastname });
      onAdd(newStudent);
      setOpen(false);
      setError('');
    } catch (error) {
      setError('Erreur lors de la création de l\'étudiant. Veuillez réessayer.');
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Student
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Student</DialogTitle>
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
          {/*<TextField*/}
          {/*    */}
          {/*  margin="dense"*/}
          {/*  label="ID"*/}
          {/*  type="text"*/}
          {/*  fullWidth*/}
          {/*  value={id}*/}
          {/*  onChange={(e) => setId(e.target.value)}*/}
          {/*/>*/}
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

export default AddStudent;