import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function EditStudent({ student, onSave, onClose }) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [id, setId] = useState(student.id);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSave = () => {
    onSave({ ...student, firstname, lastname, id });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
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