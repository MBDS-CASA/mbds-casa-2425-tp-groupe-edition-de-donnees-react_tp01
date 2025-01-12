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
import Alert from '@mui/material/Alert';
import { getCourses, deleteCourse } from '../../services/apiService.js';
import AddMatiere from './AddMatiere.jsx';
import EditMatiere from './EditMatiere.jsx';

function Matieres() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        setError('Erreur lors de la récupération des cours. Veuillez réessayer.');
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
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
      courses.filter(course => course.name.toLowerCase().includes(value))
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
    setCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
    setFilteredCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
    setEditingCourse(null);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
      setFilteredCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      setError('Erreur lors de la suppression de la matière. Veuillez réessayer.');
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {error && <Alert severity="error">{error}</Alert>}
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
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Nom du cours
                </TableSortLabel>
              </TableCell>
              <TableCell>Code du cours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.code}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit course" onClick={() => handleEditCourse(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete course" onClick={() => handleDeleteCourse(course._id)}>
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