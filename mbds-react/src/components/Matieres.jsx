import React, { useState, useEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import data from '../../../data.json';
import AddMatiere from './AddMatiere';
import EditMatiere from './EditMatiere';

function Matieres() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('course');
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    const coursesData = data.map(note => note.course);
    setCourses([...new Set(coursesData)]);
    setFilteredCourses([...new Set(coursesData)]);
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredCourses(
      courses.filter(course => course.toLowerCase().includes(value))
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    setFilteredCourses([...courses, newCourse]);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(course => (course === editingCourse ? updatedCourse : course)));
    setFilteredCourses(courses.map(course => (course === editingCourse ? updatedCourse : course)));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (course) => {
    setCourses(courses.filter(c => c !== course));
    setFilteredCourses(courses.filter(c => c !== course));
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      <AddMatiere onAdd={handleAddCourse} />
      <TableContainer component={Paper} style={{ padding: '20px', borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'course'}
                  direction={orderBy === 'course' ? order : 'asc'}
                  onClick={() => handleRequestSort('course')}
                >
                  Course
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit course" onClick={() => handleEditCourse(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete course" onClick={() => handleDeleteCourse(course)}>
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
        count={filteredCourses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {editingCourse && (
        <EditMatiere
          course={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => setEditingCourse(null)}
        />
      )}
    </div>
  );
}

export default Matieres;