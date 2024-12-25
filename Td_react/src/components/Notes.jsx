import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import data from '.././data.json';

function Notes() {
  const [search, setSearch] = useState('');
  const [notesData, setNotesData] = useState(data); // Copie locale des données
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrer les données en fonction de la recherche
  const filteredData = notesData.filter((item) => {
    const fullName = `${item.student.firstname} ${item.student.lastname}`.toLowerCase();
    const course = item.course.toLowerCase();
    const searchTerm = search.toLowerCase();

    return (
        fullName.includes(searchTerm) || course.includes(searchTerm)
    );
  });

  // Ouvrir la boîte de dialogue
  const handleOpenDialog = (note = null) => {
    setCurrentNote(note); // Note actuelle ou nouvelle
    setOpenDialog(true);
  };

  // Fermer la boîte de dialogue
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentNote(null);
  };

  // Ajouter ou modifier une note
  const handleSaveNote = () => {
    if (currentNote.unique_id) {
      // Modifier
      setNotesData((prevData) =>
          prevData.map((note) =>
              note.unique_id === currentNote.unique_id ? currentNote : note
          )
      );
    } else {
      // Ajouter
      setNotesData((prevData) => [
        ...prevData,
        { ...currentNote, unique_id: Date.now() } // Générer un ID unique
      ]);
    }
    handleCloseDialog();
  };

  // Supprimer une note
  const handleDeleteNote = (id) => {
    setNotesData((prevData) => prevData.filter((note) => note.unique_id !== id));
  };

  return (
      <div>
        {/* Barre de recherche */}
        <TextField
            label="Rechercher par nom, prénom ou cours"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
            value={search}
            style={{ marginBottom: '20px' }}
            inputProps={{ style: { color: 'white' } }} // Texte blanc dans la barre de recherche
        />

        {/* Table avec fond sombre */}
        <TableContainer component={Paper} style={{ backgroundColor: '#333' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white' }}>ID</TableCell>
                <TableCell style={{ color: 'white' }}>Cours</TableCell>
                <TableCell style={{ color: 'white' }}>Étudiant</TableCell>
                <TableCell style={{ color: 'white' }}>Date</TableCell>
                <TableCell style={{ color: 'white' }}>Note</TableCell>
                <TableCell style={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                  <TableRow key={item.unique_id}>
                    <TableCell style={{ color: 'white' }}>{item.unique_id}</TableCell>
                    <TableCell style={{ color: 'white' }}>{item.course}</TableCell>
                    <TableCell style={{ color: 'white' }}>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
                    <TableCell style={{ color: 'white' }}>{item.date}</TableCell>
                    <TableCell style={{ color: 'white' }}>{item.grade}</TableCell>
                    <TableCell>
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenDialog(item)}
                      >
                        Modifier
                      </Button>
                      <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteNote(item.unique_id)}
                          style={{ marginLeft: '10px' }}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Bouton Ajouter */}
        <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog()}
            style={{ marginTop: '20px' }}
        >
          Ajouter une note
        </Button>

        {/* Boîte de dialogue pour ajouter/modifier une note */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentNote?.unique_id ? 'Modifier' : 'Ajouter'} une note</DialogTitle>
          <DialogContent>
            <TextField
                label="Cours"
                fullWidth
                value={currentNote?.course || ''}
                onChange={(e) =>
                    setCurrentNote({ ...currentNote, course: e.target.value })
                }
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Prénom de l'étudiant"
                fullWidth
                value={currentNote?.student?.firstname || ''}
                onChange={(e) =>
                    setCurrentNote({
                      ...currentNote,
                      student: { ...currentNote?.student, firstname: e.target.value },
                    })
                }
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Nom de l'étudiant"
                fullWidth
                value={currentNote?.student?.lastname || ''}
                onChange={(e) =>
                    setCurrentNote({
                      ...currentNote,
                      student: { ...currentNote?.student, lastname: e.target.value },
                    })
                }
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Date"
                fullWidth
                value={currentNote?.date || ''}
                onChange={(e) => setCurrentNote({ ...currentNote, date: e.target.value })}
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Note"
                fullWidth
                value={currentNote?.grade || ''}
                onChange={(e) => setCurrentNote({ ...currentNote, grade: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleSaveNote} color="primary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

export default Notes;
