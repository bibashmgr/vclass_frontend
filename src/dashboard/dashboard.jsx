import React, { useState } from 'react';

function TeacherDashboard() {
  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    const postContent = e.target.elements.postContent.value;
    const newPost = { id: Date.now(), content: postContent };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    e.target.reset();
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const studentName = e.target.elements.studentName.value;
    const newStudent = { id: Date.now(), name: studentName };
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    e.target.reset();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Create a Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            name="postContent"
            placeholder="Enter post content"
            className="border border-gray-300 p-2 rounded-md mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
        </form>
      </div>

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
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.content}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Students</h2>
        {students.length === 0 ? (
          <p>No students available.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;
