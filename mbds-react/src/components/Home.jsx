import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card.jsx';
import { Button } from './ui/button.jsx';
import { School, UserCircle2, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import data from '../../../data.json';

const Home = () => {
    const dashboardData = [
        { icon: <School className="w-8 h-8 text-emerald-500" />, title: "Courses", value: 10, color: "bg-emerald-50" },
        { icon: <UserCircle2 className="w-8 h-8 text-blue-500" />, title: "Students", value: 25, color: "bg-blue-50" },
        { icon: <Calendar className="w-8 h-8 text-orange-500" />, title: "Date", value: new Date().toLocaleDateString(), color: "bg-orange-50" },
        { icon: <GraduationCap className="w-8 h-8 text-rose-500" />, title: "Average Grade", value: 87, color: "bg-rose-50" }
    ];

    const [selectedItem, setSelectedItem] = useState(null);

const handleRandomSelect = () => {
    const randomNote = data[Math.floor(Math.random() * data.length)];
    const mockData = {
        course: randomNote.course,
        student: { firstname: randomNote.student.firstname, lastname: randomNote.student.lastname },
        date: randomNote.date,
        grade: randomNote.grade
    };
    setSelectedItem(mockData);
};

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-slate-800 mb-3 animate-fade-in">
                    Dashboard Overview
                </h1>
                <p className="text-slate-600">Track all key metrics related to your application here.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {dashboardData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Card className={`${item.color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                            <CardContent className="flex flex-col items-center justify-center p-6">
                                {item.icon}
                                <h3 className="mt-4 font-semibold text-slate-800">{item.title}</h3>
                                <p className="text-2xl font-bold text-slate-900 mt-2">{item.value}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Button
                onClick={handleRandomSelect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
                Select Random Item
            </Button>

            {selectedItem && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8"
                >
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 relative overflow-hidden">
                        {/* Paper texture and decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
                        <div className="absolute top-2 right-4 text-sm text-slate-400">Exam ID: #{Math.random().toString(36).substr(2, 9)}</div>

                        {/* Content */}
                        <div className="space-y-6">
                            <div className="text-center border-b pb-6">
                                <h2 className="text-2xl font-bold text-slate-800">{selectedItem.course}</h2>
                                <p className="text-slate-600 mt-2">Final Assessment</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-slate-500">Student Name</p>
                                    <p className="text-lg font-semibold text-slate-800">
                                        {`${selectedItem.student.firstname} ${selectedItem.student.lastname}`}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Date</p>
                                    <p className="text-lg font-semibold text-slate-800">{selectedItem.date}</p>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <div className="inline-block rounded-full bg-blue-50 px-6 py-3">
                                    <p className="text-sm text-blue-600">Final Grade</p>
                                    <p className="text-3xl font-bold text-blue-700">{selectedItem.grade}%</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t text-center text-sm text-slate-500">
                                This is an official academic record. Please retain for your records.
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Home;