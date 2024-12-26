import React, { useState, useRef, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function AddMatiere({ addMatiere }) {
  const formRef = useRef(null);

  function Onsubmit() {
    let formData = new FormData(formRef.current);
    let newMatiere = Object.fromEntries(formData.entries());
    addMatiere(newMatiere);
  }

  return (
    <div>
      <h1>Ajouter une matière</h1>
      <form ref={formRef}>
        <TextField label="Matière" id="matiere" name="matiere" fullWidth margin="normal" />
        <Button variant="contained" color="primary" onClick={Onsubmit}>Ajouter</Button>
      </form>
    </div>
  );
}

function EditMatiere({ open, handleClose, matiere, handleEdit }) {
  const formRef = useRef(null);

  function Onsubmit() {
    let formData = new FormData(formRef.current);
    let updatedMatiere = Object.fromEntries(formData.entries());
    handleEdit(updatedMatiere);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Éditer matière</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modifier les informations de la matière.
        </DialogContentText>
        <form ref={formRef}>
          <TextField label="Matière" id="matiere" name="matiere" defaultValue={matiere.matiere} fullWidth margin="normal" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Annuler</Button>
        <Button onClick={Onsubmit} color="primary">Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}

function Matiere() {
  const [matieres, setMatieres] = useState(() => {
    const savedMatieres = localStorage.getItem('matieres');
    return savedMatieres ? JSON.parse(savedMatieres) : [];
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('matieres', JSON.stringify(matieres));
  }, [matieres]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addMatiere = (newMatiere) => {
    setMatieres([...matieres, newMatiere]);
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editMatiere = (updatedMatiere) => {
    const updatedMatieres = matieres.map((matiere, i) => (i === editIndex ? updatedMatiere : matiere));
    setMatieres(updatedMatieres);
    handleEditClose();
  };

  const deleteMatiere = (index) => {
    const updatedMatieres = matieres.filter((_, i) => i !== index);
    setMatieres(updatedMatieres);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Matière</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matieres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.matiere}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => deleteMatiere(index)}>Supprimer</Button>
                  <Button variant="contained" color="primary" onClick={() => handleEditOpen(index)}>Éditer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={matieres.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddMatiere addMatiere={addMatiere} />
      {editIndex !== null && (
        <EditMatiere
          open={editOpen}
          handleClose={handleEditClose}
          matiere={matieres[editIndex]}
          handleEdit={editMatiere}
        />
      )}
    </>
  );
}

export default Matiere;