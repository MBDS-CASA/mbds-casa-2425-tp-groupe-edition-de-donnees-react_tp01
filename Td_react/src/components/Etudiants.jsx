import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import data from '../data.json';

function Etudiants() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState(data); // Données initiales
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    firstname: '',
    lastname: '',
    course: '',
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstname: '',
    lastname: '',
    course: '',
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEditClick = (id) => {
    const studentToEdit = students.find((item) => item.student.id === id);
    setEditingStudentId(id);
    setEditedStudent({
      firstname: studentToEdit.student.firstname,
      lastname: studentToEdit.student.lastname,
      course: studentToEdit.course,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    setStudents((prev) =>
        prev.map((item) =>
            item.student.id === editingStudentId
                ? {
                  ...item,
                  student: {
                    ...item.student,
                    firstname: editedStudent.firstname,
                    lastname: editedStudent.lastname,
                  },
                  course: editedStudent.course,
                }
                : item
        )
    );
    setEditingStudentId(null);
    setEditedStudent({ firstname: '', lastname: '', course: '' });
  };

  const handleDeleteClick = (id) => {
    setStudents((prev) => prev.filter((item) => item.student.id !== id));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = () => {
    const nextId =
        students.length > 0
            ? Math.max(...students.map((item) => item.student.id)) + 1
            : 1;

    const newEntry = {
      student: {
        id: nextId,
        firstname: newStudent.firstname,
        lastname: newStudent.lastname,
      },
      course: newStudent.course,
    };

    setStudents((prev) => [...prev, newEntry]);
    setNewStudent({ firstname: '', lastname: '', course: '' });
    setIsAddDialogOpen(false);
  };

  const filteredStudents = students.filter((item) => {
    const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
    const course = item.course.toLowerCase();
    const searchTerm = search.toLowerCase();
    return fullName.includes(searchTerm) || course.includes(searchTerm);
  });

  return (
      <div>
        {/* Barre de recherche */}
        <TextField
            label="Rechercher par prénom, nom ou matière"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            value={search}
            style={{ marginBottom: '20px' }}
            inputProps={{ style: { color: 'white' } }}
        />

        <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddDialogOpen(true)}
            style={{ marginBottom: '20px' }}
        >
          Ajouter un étudiant
        </Button>

        {/* Table des étudiants */}
        <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>ID Étudiant</TableCell>
                <TableCell style={{ color: 'white' }}>Prénom</TableCell>
                <TableCell style={{ color: 'white' }}>Nom</TableCell>
                <TableCell style={{ color: 'white' }}>Matière</TableCell>
                <TableCell style={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((item) => (
                  <TableRow key={item.student.id}>
                    {editingStudentId === item.student.id ? (
                        <>
                          <TableCell style={{ color: 'white' }}>{item.student.id}</TableCell>
                          <TableCell style={{ color: 'white' }}>
                            <TextField
                                name="firstname"
                                value={editedStudent.firstname}
                                onChange={handleEditChange}
                                variant="standard"
                                style={{ color: 'white' }}
                            />
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>
                            <TextField
                                name="lastname"
                                value={editedStudent.lastname}
                                onChange={handleEditChange}
                                variant="standard"
                                style={{ color: 'white' }}
                            />
                          </TableCell>
                          <TableCell style={{ color: 'white' }}>
                            <TextField
                                name="course"
                                value={editedStudent.course}
                                onChange={handleEditChange}
                                variant="standard"
                                style={{ color: 'white' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Button color="primary" onClick={handleEditSave}>
                              Sauvegarder
                            </Button>
                            <Button color="secondary" onClick={() => setEditingStudentId(null)}>
                              Annuler
                            </Button>
                          </TableCell>
                        </>
                    ) : (
                        <>
                          <TableCell style={{ color: 'white' }}>{item.student.id}</TableCell>
                          <TableCell style={{ color: 'white' }}>{item.student.firstname}</TableCell>
                          <TableCell style={{ color: 'white' }}>{item.student.lastname}</TableCell>
                          <TableCell style={{ color: 'white' }}>{item.course}</TableCell>
                          <TableCell>
                            <IconButton
                                color="primary"
                                onClick={() => handleEditClick(item.student.id)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDeleteClick(item.student.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </>
                    )}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog d'ajout */}
        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
          <DialogTitle>Ajouter un étudiant</DialogTitle>
          <DialogContent>
            <TextField
                name="firstname"
                label="Prénom"
                value={newStudent.firstname}
                onChange={handleAddChange}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                name="lastname"
                label="Nom"
                value={newStudent.lastname}
                onChange={handleAddChange}
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            <TextField
                name="course"
                label="Matière"
                value={newStudent.course}
                onChange={handleAddChange}
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddStudent} color="primary">
              Ajouter
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)} color="secondary">
              Annuler
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default Etudiants;
