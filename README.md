#README 


# Course Management System - Summary


The Course Management System is a simple web application for managing course records within Civitas Learning. It should allow a user to capture course information (e.g id, subject, courseNumber, description).


## Course Management System - Features


Listed below are the following features:


* Addition of new courses
* Remove existing courses
* Search courses (this can be done by the description - with partial matches)
* List all courses
* Prevent duplicate courses (unique subject and course number)
* Validate course number format (three-digit, zero-padded integer)


## Technology Stack Used


* Backend: Node.js with Express
* Frontend: React
* Database: MongoDB
* Jest: Testing


## Prerequisites


* Node.js (v18 or later)
* MongoDB
* Git (Optional)
* Docker (Optional) - Recommended


________________




## Setup (GIT/Local)


1. Clone the repository or extract the zip folder:
   ```
   git clone https://github.com/yourusername/course-manager.git
   cd course-manager
   ```


2. Install dependencies for both backend and frontend:
   ```
   cd backend && npm install
   cd frontend && npm install
   ```


3. Start MongoDB:
   Make sure MongoDB is running on your system.


4. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The server will start on http://localhost:5000


5. Start the frontend application:
   ```
   cd frontend
   npm start
   ```
   The application will open in your default browser at http://localhost:3000


________________




## API Endpoints


* GET /api/courses  (Get all courses)
* POST /api/course  (Add a new course)
* DELETE /api/courses/:id (Delete a course)
* GET /api/courses/search?query=:query  (Search for courses by description)




## Testing


To run the tests for the backend:


```
cd backend
npm test
```


## Docker (Optional-Recommended)


To run the application using Docker:


1. Build the Docker image:
   ```
   Docker-compose up --build .
   ```


The application will be available at http://localhost:3000
