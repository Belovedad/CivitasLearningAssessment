import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const response = await axios.get('http://localhost:5000/api/courses');
    setCourses(response.data);
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/course', { subject, courseNumber, description });
      getCourses();
      setSubject('');
      setCourseNumber('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/course/${id}`);
    getCourses();
  };

  const searchCourses = async () => {
    const response = await axios.get(`http://localhost:5000/api/courses/search?query=${query}`);
    setCourses(response.data);
  };

  return (
    <div className="App">
      <h1>Course Manager</h1>
      
      <form onSubmit={addCourse}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Number (e.g. 033)"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Course</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchCourses}>Search</button>
      </div>

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.subject} {course.courseNumber} - {course.description}
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;