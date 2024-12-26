import React from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import data from '../data/data.json';

const Note = () => {
  const [students, setStudents] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editIndex, setEditIndex] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const formRef = useRef(null);

  // Load initial data
  useEffect(() => {
    // Extract unique students from data.json
    const uniqueStudents = Array.from(new Set(data.map(item =>
      JSON.stringify({
        id: item.student.id,
        firstname: item.student.firstname,
        lastname: item.student.lastname
      })
    ))).map(str => JSON.parse(str));

    setStudents(uniqueStudents);
    setSubjectData(loadFromLocalStorage('matieres'));
    setNotes(loadFromLocalStorage('notes') || data);
  }, []);

  // LocalStorage functions
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  useEffect(() => {
    saveToLocalStorage('notes', notes);
  }, [notes]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addNote = (newNote) => {
    setNotes([...notes, {
      ...newNote,
      unique_id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }]);
  };

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const editNote = (updatedNote) => {
    const updatedData = notes.map((note, i) =>
      i === editIndex ? { ...updatedNote, unique_id: notes[i].unique_id } : note
    );
    setNotes(updatedData);
    handleEditClose();
  };

  const deleteNote = (index) => {
    const updatedData = notes.filter((_, i) => i !== index);
    setNotes(updatedData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const studentId = formData.get('student');
    const selectedStudent = students.find(s => s.id === parseInt(studentId));

    const newNote = {
      course: formData.get('cours'),
      student: {
        id: parseInt(studentId),
        firstname: selectedStudent.firstname,
        lastname: selectedStudent.lastname
      },
      grade: parseInt(formData.get('grade'))
    };

    if (!newNote.student.id || !newNote.course || !newNote.grade) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    if (isNaN(newNote.grade) || newNote.grade < 0 || newNote.grade > 100) {
      alert('La note doit être un nombre entre 0 et 100.');
      return;
    }

    addNote(newNote);
    formRef.current.reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gérer les notes</h1>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <FormControl fullWidth>
          <InputLabel id="student-label">Étudiant</InputLabel>
          <Select
            labelId="student-label"
            id="student"
            name="student"
            defaultValue=""
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {`${student.firstname} ${student.lastname}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="matiere-label">Matière</InputLabel>
          <Select
            labelId="matiere-label"
            id="cours"
            name="cours"
            defaultValue=""
          >
            {subjectData.map((subject) => (
              <MenuItem key={subject.id} value={subject.matiere}>
                {subject.matiere}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Note"
          id="grade"
          name="grade"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          fullWidth
        />

        <Button type="submit" className="btn btn-primary text-black p-2 rounded">
          Ajouter
        </Button>
      </form>

      <TableContainer component={Paper} className="mt-4">
        <Table aria-label="student grades table">
          <TableHead>
            <TableRow>
              <TableCell>ETUDIANT</TableCell>
              <TableCell align="center">Cours</TableCell>
              <TableCell align="right">Note</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.unique_id}>
                  <TableCell>
                    {`${item.student.firstname} ${item.student.lastname}`}
                  </TableCell>
                  <TableCell align="center">{item.course}</TableCell>
                  <TableCell align="right">{item.grade}</TableCell>
                  <TableCell align="right">{item.date}</TableCell>
                  <TableCell align="right">
                    <div className="space-x-2">
                      <Button
                        onClick={() => deleteNote(index)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Supprimer
                      </Button>
                      <Button
                        onClick={() => handleEditOpen(index)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Éditer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={notes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {editIndex !== null && (
        <EditNote
          open={editOpen}
          handleClose={handleEditClose}
          note={notes[editIndex]}
          students={students}
          subjectData={subjectData}
          handleEdit={editNote}
        />
      )}
    </div>
  );
};

const EditNote = ({ open, handleClose, note, students, subjectData, handleEdit }) => {
  const formRef = useRef(null);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const studentId = formData.get('student');
    const selectedStudent = students.find(s => s.id === parseInt(studentId));

    const updatedNote = {
      course: formData.get('cours'),
      student: {
        id: parseInt(studentId),
        firstname: selectedStudent.firstname,
        lastname: selectedStudent.lastname
      },
      grade: parseInt(formData.get('grade')),
      date: note.date
    };

    if (!updatedNote.student.id || !updatedNote.course || !updatedNote.grade) {
      alert('Tous les champs doivent être remplis.');
      return;
    }

    if (isNaN(updatedNote.grade) || updatedNote.grade < 0 || updatedNote.grade > 100) {
      alert('La note doit être un nombre entre 0 et 100.');
      return;
    }

    handleEdit(updatedNote);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Éditer note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Modifier les informations de la note.
        </DialogContentText>
        <form ref={formRef} className="space-y-4">
          <FormControl fullWidth>
            <InputLabel id="edit-student-label">Étudiant</InputLabel>
            <Select
              labelId="edit-student-label"
              id="student"
              name="student"
              defaultValue={note.student.id}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {`${student.firstname} ${student.lastname}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="edit-matiere-label">Matière</InputLabel>
            <Select
              labelId="edit-matiere-label"
              id="cours"
              name="cours"
              defaultValue={note.course}
            >
              {subjectData.map((subject) => (
                <MenuItem key={subject.id} value={subject.matiere}>
                  {subject.matiere}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Note"
            id="grade"
            name="grade"
            type="number"
            defaultValue={note.grade}
            inputProps={{ min: 0, max: 100 }}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} className="text-gray-600">
          Annuler
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-500 text-white">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Note;



