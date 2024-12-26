import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function EditMatiere({ course, onSave, onClose }) {
  const [open, setOpen] = useState(false);
  const [courseName, setCourseName] = useState(course);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleSave = () => {
    onSave(courseName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
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