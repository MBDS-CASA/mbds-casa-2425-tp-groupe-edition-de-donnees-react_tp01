import React, { useRef } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button } from '@mui/material';
import data from '../data/data.json'
import { useEffect, useState } from 'react'

const Etudiant = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const formRef = useRef();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setStudents(data);
        const uniqueCourses = [...new Set(data.map(item => item.course))];
        setCourses(uniqueCourses);
    }, []);

    useEffect(() => {
        if (editingStudent) {
            setSelectedCourse(editingStudent.course);
        } else {
            setSelectedCourse('');
        }
    }, [editingStudent]);

    function addStudent(data) {
        const newStudent = {
            unique_id: students.length + 1,
            course: data.course,
            student: {
                id: data.studentId,
                firstname: data.firstName,
                lastname: data.lastName
            },
            date: data.date
        };
        setStudents(prevStudents => [...prevStudents, newStudent]);
    }

    function editStudent(updatedData) {
        setStudents(prevStudents => prevStudents.map(student =>
            student.unique_id === editingStudent.unique_id ? {
                ...student,
                course: updatedData.course,
                student: {
                    id: updatedData.studentId,
                    firstname: updatedData.firstName,
                    lastname: updatedData.lastName
                },
                date: updatedData.date
            } : student
        ));
        setEditingStudent(null);
        setSelectedCourse('');
    }

    function deleteStudent(unique_id) {
        setStudents(prevStudents => prevStudents.filter(student => student.unique_id !== unique_id));
    }

    function onSubmitData(event) {
        event.preventDefault();
        const data = new FormData(formRef.current);
        const newStudent = {};
        data.forEach((value, key) => {
            newStudent[key] = value;
        });

        if (editingStudent) {
            editStudent(newStudent);
        } else {
            addStudent(newStudent);
        }

        formRef.current.reset();
        setSelectedCourse('');
    }

    function downloadCSV() {
        const csvRows = [
            ['ID', 'First Name', 'Last Name', 'Course'],
            ...students.map(student => [
                student.student.id,
                student.student.firstname,
                student.student.lastname,
                student.course
            ])
        ];

        const csvContent = csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "students.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderForm = () => {
        return (
            <form ref={formRef} onSubmit={onSubmitData} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="studentId"
                            placeholder="ID de l'étudiant"
                            defaultValue={editingStudent ? editingStudent.student.id : ''}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            placeholder="Prénom"
                            defaultValue={editingStudent ? editingStudent.student.firstname : ''}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            placeholder="Nom"
                            defaultValue={editingStudent ? editingStudent.student.lastname : ''}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            name="course"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            required
                        >
                            <option value={editingStudent ? editingStudent.course : ''}>Sélectionner un cours</option>
                            {courses.map((course, index) => (
                                <option key={index} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <input
                            className="form-control"
                            type="date"
                            name="date"
                            defaultValue={editingStudent ? editingStudent.date : ''}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            {editingStudent ? 'Modifier' : 'Ajouter'}
                        </button>
                        {editingStudent && (
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {
                                    setEditingStudent(null);
                                    setSelectedCourse('');
                                }}
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </div>
            </form>
        );
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">{editingStudent ? 'Modifier un Etudiant' : 'Ajouter un Etudiant'}</h2>
            {renderForm()}

            {students.length > 0 && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>Liste des Étudiants</h2>
                        <span className="badge bg-primary fs-5">
                            {students.length} étudiant{students.length > 1 ? 's' : ''}
                        </span>
                    </div>
                    <Button variant="contained" color="primary" onClick={downloadCSV}>
                        Télécharger CSV
                    </Button>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Course</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                                    <TableRow key={student.unique_id}>
                                        <TableCell>{student.student.id}</TableCell>
                                        <TableCell>{student.student.firstname}</TableCell>
                                        <TableCell>{student.student.lastname}</TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>{student.date}</TableCell>
                                        <TableCell>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => setEditingStudent(student)}
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => deleteStudent(student.unique_id)}
                                            >
                                                Supprimer
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={students.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </>
            )}
        </div>

    );
};
export default Etudiant;