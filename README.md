TaskNest

A task management web application that allows users to create, update, and delete tasks. Users can also upload, preview, and download files associated with tasks(coming soon). This app is built using Node.js, Express.js, PostgreSQL, and Multer for file handling.

Features
Create Tasks: Users can create new tasks with a name, description, and file attachment.
Update Tasks: Allows users to update existing tasks, including uploading new files.
Delete Tasks: Users can delete tasks along with their associated files.
File Upload: Tasks can have files uploaded, with support for images, PDFs, and text files.
File Preview: Preview images uploaded to tasks.
File Download: Download files attached to tasks.
Tech Stack
Frontend: HTML, CSS, EJS
Backend: Node.js, Express.js
Database: PostgreSQL
File Upload: Multer
CSS Styling: Flexbox for layout and responsive design
Prerequisites
Before running the app, ensure you have the following installed:

Node.js (v14.x or above)
PostgreSQL
npm (Node package manager)
Setup and Installation
1. Clone the Repository
2. Install Dependencies
Run the following command to install the required dependencies:

bash
Copy code
npm install
3. Set Up PostgreSQL Database
Create a PostgreSQL database and run the following SQL queries to create the necessary tables:

sql
Copy code
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  task_description TEXT
);

CREATE TABLE task_files (
  id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(id),
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Ensure that PostgreSQL is running on your machine.

4. Configure the Database Connection
In your app.js (or the main backend file), update the database connection details.

javascript
Copy code
const pool = new Pool({
  user: 'yourusername',
  host: 'localhost',
  database: 'task_management',
  password: 'yourpassword',
  port: 5432
});
5. Run the Application
To start the server, run the following command:

bash
Copy code
npm start
This will start the app on http://localhost:3000.

6. Visit the App
Open your browser and visit http://localhost:3000. You will be able to:

Create new tasks with a file upload.
View tasks, update them with new files, or delete them.
Preview and download files attached to tasks.
File Upload
This app uses Multer to handle file uploads. The uploaded files are stored in the uploads/ directory on the server(coming soon).
