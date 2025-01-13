import React, { useState, useEffect } from 'react';
import { getStudents } from '../../services/apiService.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddStudent from './AddStudent.jsx';
import EditStudent from './EditStudent.jsx';

function Etudiants() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStudents();
        setStudents(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleSaveStudent = (updatedStudent) => {
    setStudents(students.map(student => (student._id === updatedStudent._id ? updatedStudent : student)));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student._id !== id));
  };

  const sortedStudents = students.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <AddStudent onAdd={handleAddStudent} />

      </div>
      <div style={{ flex: '3' }}>
        <TableContainer component={Paper} style={{ padding: '20px', borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'firstName'}
                    direction={orderBy === 'firstName' ? order : 'asc'}
                    onClick={() => handleRequestSort('firstName')}
                  >
                    Prénom
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'lastName'}
                    direction={orderBy === 'lastName' ? order : 'asc'}
                    onClick={() => handleRequestSort('lastName')}
                  >
                    Nom
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === '_id'}
                    direction={orderBy === '_id' ? order : 'asc'}
                    onClick={() => handleRequestSort('_id')}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student._id}</TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="view student">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="edit student" onClick={() => handleEditStudent(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete student" onClick={() => handleDeleteStudent(student._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {editingStudent && (
          <EditStudent
            student={editingStudent}
            onSave={handleSaveStudent}
            onClose={() => setEditingStudent(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Etudiants;