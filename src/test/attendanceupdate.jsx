import React, { useState, useEffect } from 'react';

const AttendanceUpdateSystem = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  useEffect(() => {
    // Simulating API call to fetch student data
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://api.example.com/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleAttendanceStatusChange = (event) => {
    setAttendanceStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulating API call to update attendance
    const updateAttendance = async () => {
      try {
        const response = await fetch('https://api.example.com/attendance', {
          method: 'POST',
          body: JSON.stringify({
            studentId: selectedStudent,
            status: attendanceStatus,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Attendance updated successfully:', data);
      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    };

    updateAttendance();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-blue-500 text-white rounded-md p-4">
        <h2 className="text-2xl font-bold mb-4">Attendance Update System</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentId" className="text-lg font-medium">
              Student ID:
            </label>
            <select
              id="studentId"
              className="border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              value={selectedStudent}
              onChange={handleStudentChange}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="attendanceStatus" className="text-lg font-medium">
              Attendance Status:
            </label>
            <select
              id="attendanceStatus"
              className="border border-gray-400 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              value={attendanceStatus}
              onChange={handleAttendanceStatusChange}
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-4 py-2 mt-2 self-start"
            disabled={!selectedStudent || !attendanceStatus}
          >
            Update Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceUpdateSystem;
