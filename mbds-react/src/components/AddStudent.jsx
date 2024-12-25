import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button.jsx';
import { Input } from './ui/Input.jsx';
import data from '../../../data.json';

const AddStudent = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const courseRef = useRef();
    const dateRef = useRef();
    const gradeRef = useRef();

    const handleAddStudent = () => {
        const newStudent = {
            student: {
                firstname: firstNameRef.current.value,
                lastname: lastNameRef.current.value,
            },
            course: courseRef.current.value,
            date: dateRef.current.value,
            grade: gradeRef.current.value,
        };

        data.push(newStudent);
        console.log('Student added:', newStudent);
        // Optionally, you can update the state or perform other actions here
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <form className="space-y-4">
                <Input ref={firstNameRef} label="First Name" />
                <Input ref={lastNameRef} label="Last Name" />
                <Input ref={courseRef} label="Course" />
                <Input ref={dateRef} label="Date" type="date" />
                <Input ref={gradeRef} label="Grade" type="number" />

                <Button onClick={handleAddStudent} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Add Student
                </Button>
            </form>
        </div>
    );
};

export default AddStudent;