import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8010/api',
});


//create a new student
export const createStudent = async (student) => {
    try {
        const response = await api.post('/students', student);
        debugger
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
};

// update student
export const updateStudent = async (student) => {
    try {
        const response = await api.put(`/students?_id=${student._id}`, student);
        debugger
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

export const getStudents = async () => {
    try {
        const response = await api.get('/students');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

export const getCourses = async () => {
    try {
        const response = await api.get('/courses');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const getGrades = async () => {
    try {
        const response = await api.get('/grades');
        return response.data;
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
};


// Créer une nouvelle matière
export const createCourse = async (course) => {
    try {
        const response = await api.post('/courses', course);
        return response.data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

// Mettre à jour une matière
export const updateCourse = async (course) => {
    try {
        const response = await api.put(`/courses?_id=${course._id}`, course);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
};

// Supprimer une matière
export const deleteCourse = async (courseId) => {
    try {
        await api.delete(`/courses?_id=${courseId}`);
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};