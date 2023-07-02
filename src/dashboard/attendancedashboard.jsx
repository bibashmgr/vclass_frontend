import React, { useState } from 'react';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const studentName = e.target.elements.studentName.value;

    const newStudent = { id: Date.now(), name: studentName };

    setStudents((prevStudents) => [...prevStudents, newStudent]);

    e.target.reset();
  };

  const handleMarkAttendance = (studentId) => {
    const studentAttendance = attendance.find((a) => a.studentId === studentId);
    if (studentAttendance) {

      setAttendance((prevAttendance) =>

        prevAttendance.filter((a) => a.studentId !== studentId)
      );
    } else {
      const newAttendance = { studentId, date: new Date().toLocaleDateString() };

      setAttendance((prevAttendance) => [...prevAttendance, newAttendance]);
    }
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

      <div>
        <h2 className="text-xl font-bold mb-2">Create a Student</h2>

        <form onSubmit={handleCreateStudent}>
          <input
            type="text"
            name="studentName"
            placeholder="Enter student name"
            className="border border-gray-300 p-2 rounded-md mr-2"

            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </form>
      </div>

      <div className="mt-4">

        <h2 className="text-xl font-bold mb-2">Students</h2>
        {students.length === 0 ? (
          <p>No students available.</p>
        ) : (

          <table className="border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Name</th>

                <th className="border border-gray-300 p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>

                  <td className="border border-gray-300 p-2">{student.name}</td>

                  <td className="border border-gray-300 p-2">

                    <button

                      onClick={() => handleMarkAttendance(student.id)}

                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${
                        attendance.find((a) => a.studentId === student.id)
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {attendance.find((a) => a.studentId === student.id)
                        ? 'Present'
                        : 'Absent'}
                        
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
