import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import notesData from '../../../data.json';
import './Notes.css';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('course');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setNotes(notesData);
        setFilteredNotes(notesData);
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        setFilteredNotes(
            notes.filter(
                (note) =>
                    note.course.toLowerCase().includes(value) ||
                    `${note.student.firstname.toLowerCase()} ${note.student.lastname.toLowerCase()}`.includes(value)
            )
        );
    };

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === 'asc';
        setOrder(isAscending ? 'desc' : 'asc');
        setOrderBy(property);
        setFilteredNotes((prevNotes) =>
            [...prevNotes].sort((a, b) => {
                const valueA = a[property];
                const valueB = b[property];
                if (valueA < valueB) return isAscending ? -1 : 1;
                if (valueA > valueB) return isAscending ? 1 : -1;
                return 0;
            })
        );
    };

    const handlePageChange = (event, newPage) => setPage(newPage);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper className="p-4">
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={handleSearch}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'course'}
                                    direction={order}
                                    onClick={() => handleSort('course')}
                                >
                                    Course
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'student'}
                                    direction={order}
                                    onClick={() => handleSort('student')}
                                >
                                    Student
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'date'}
                                    direction={order}
                                    onClick={() => handleSort('date')}
                                >
                                    Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'grade'}
                                    direction={order}
                                    onClick={() => handleSort('grade')}
                                >
                                    Grade
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredNotes
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((note) => (
                                <TableRow key={note.unique_id}>
                                    <TableCell>{note.course}</TableCell>
                                    <TableCell>{`${note.student.firstname} ${note.student.lastname}`}</TableCell>
                                    <TableCell>{note.date}</TableCell>
                                    <TableCell>{note.grade}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredNotes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
}

export default Notes;
