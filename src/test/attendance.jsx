import { useState } from 'react';

const AttendanceComponent = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState('');

  const addAttendee = () => {
    if (newAttendee.trim() !== '') {
      setAttendees([...attendees, newAttendee]);
      setNewAttendee('');
    }
  };

  const removeAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Taking System</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newAttendee}
          onChange={(e) => setNewAttendee(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Enter attendee name"
        />
        <button
          onClick={addAttendee}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc list-inside mt-4">
        {attendees.map((attendee, index) => (
          <li key={index} className="flex justify-between">
            <span>{attendee}</span>
            <button
              onClick={() => removeAttendee(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceComponent;
