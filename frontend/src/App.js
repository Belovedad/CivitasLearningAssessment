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
      setQuery('')
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/course/${id}`);
    getCourses();
    setQuery('');
  };

  const searchCourses = async () => {
    const response = await axios.get(`http://localhost:5000/api/courses/search?query=${query}`);
    setCourses(response.data);
  };

  const resetSearch = () => {
    setQuery('');
    getCourses();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Course Management System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Add New Course</h2>
          <form onSubmit={addCourse} className="space-y-4">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Course Number (e.g. 033)"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Course</button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-semibold mb-4">Search Courses</h2>
            <div className="flex">
              <input
                type="text"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow border p-2 rounded-l"
              />
              <button onClick={searchCourses} className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600">Search</button>
              <button onClick={resetSearch} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Reset</button>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{course.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{course.courseNumber}</td>
                    <td className="px-6 py-4">{course.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => deleteCourse(course._id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;