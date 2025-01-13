// src/components/About.jsx
import React from "react";

function About() {
  {/* Content Section */}
  <section className="p-6 bg-white rounded shadow-lg transition duration-500 ease-in-out hover:shadow-xl">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">About This App</h2>
    <p className="text-gray-600 mb-4">
      This dashboard showcases the performance and key metrics of a student-course management system.
      It includes detailed statistics about courses, students, grades, and other important metrics.
    </p>
    <p className="text-gray-600">
      The data displayed here is dynamic, updating in real-time to provide accurate insights into the
      application’s usage.
    </p>
  </section>
}

export default About;