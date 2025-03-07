const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123',
  database: process.env.DB_NAME || 'acadtrack'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
});

// Routes for Students
app.post('/students', (req, res) => {
  const { name, enrollment_number, email, phone_number } = req.body;
  if (!name || !enrollment_number || !email || !phone_number) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO student (Name, Enrollment_Number, Email, Phone_Number) VALUES (?, ?, ?, ?)';
  const values = [name, enrollment_number, email, phone_number];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      return res.status(500).json({ error: 'Failed to add student' });
    }
    res.status(201).json({ message: 'Student added successfully!', id: result.insertId });
  });
});

app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM student';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
});

// Routes for Courses
app.post('/courses', (req, res) => {
  const { course_name, credits, instructor_name, semester } = req.body;
  if (!course_name || !credits || !instructor_name || !semester) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO courses (Course_Name, Credits, Instructor_Name, Semester) VALUES (?, ?, ?, ?)';
  const values = [course_name, credits, instructor_name, semester];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding course:', err);
      return res.status(500).json({ error: 'Failed to add course' });
    }
    res.status(201).json({ message: 'Course added successfully!', id: result.insertId });
  });
});

app.get('/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
    res.json(results);
  });
});

// Routes for Grades
app.post('/grades', (req, res) => {
  const { evaluation_type, total_marks, course_id, marks_obtained, grade } = req.body;
  if (!evaluation_type || !total_marks || !course_id || !marks_obtained || !grade) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO grades (Evaluation_Type, Total_Marks, Course_ID, Marks_Obtained, Grade) VALUES (?, ?, ?, ?, ?)';
  const values = [evaluation_type, total_marks, course_id, marks_obtained, grade];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding grade:', err);
      return res.status(500).json({ error: 'Failed to add grade' });
    }
    res.status(201).json({ message: 'Grade added successfully!', id: result.insertId });
  });
});

app.get('/grades', (req, res) => {
  const sql = 'SELECT * FROM grades';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching grades:', err);
      return res.status(500).json({ error: 'Failed to fetch grades' });
    }
    res.json(results);
  });
});

// Routes for Assignments
app.post('/assignments', (req, res) => {
  const { assignment_title, course_id, submission_date, marks_assigned, status } = req.body;
  if (!assignment_title || !course_id || !submission_date || !marks_assigned || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO assignments (Assignment_Title, Course_ID, Submission_Date, Marks_Assigned, Status) VALUES (?, ?, ?, ?, ?)';
  const values = [assignment_title, course_id, new Date(submission_date).toISOString(), marks_assigned, status];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding assignment:', err);
      return res.status(500).json({ error: 'Failed to add assignment' });
    }
    res.status(201).json({ message: 'Assignment added successfully!', id: result.insertId });
  });
});

app.get('/assignments', (req, res) => {
  const sql = 'SELECT * FROM assignments';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching assignments:', err);
      return res.status(500).json({ error: 'Failed to fetch assignments' });
    }
    res.json(results);
  });
});

// Routes for Exams
app.post('/exams', (req, res) => {
    const { exam_type, course_id, exam_date, total_marks, marks_obtained } = req.body;
    if (!exam_type || !course_id || !exam_date || !total_marks || !marks_obtained) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO exams (Exam_Type, Course_ID, Exam_Date, Total_Marks, Marks_Obtained) VALUES (?, ?, ?, ?, ?)';
    const values = [exam_type, course_id, new Date(exam_date).toISOString(), total_marks, marks_obtained];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding exam:', err);
        return res.status(500).json({ error: 'Failed to add exam' });
      }
      res.status(201).json({ message: 'Exam added successfully!', id: result.insertId });
    });
  });
  
  app.get('/exams', (req, res) => {
    const sql = 'SELECT * FROM exams';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching exams:', err);
        return res.status(500).json({ error: 'Failed to fetch exams' });
      }
      res.json(results);
    });
  });
  
  // Routes for Skills
  app.post('/skills', (req, res) => {
    const { skill_name, hours_practiced, proficiency_level, learning_resources, certification_status } = req.body;
    if (!skill_name || !hours_practiced || !proficiency_level || !learning_resources || !certification_status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO skills (Skill_Name, Hours_Practiced, Proficiency_Level, Learning_Resources, Certification_Status) VALUES (?, ?, ?, ?, ?)';
    const values = [skill_name, hours_practiced, proficiency_level, learning_resources, certification_status];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding skill:', err);
        return res.status(500).json({ error: 'Failed to add skill' });
      }
      res.status(201).json({ message: 'Skill added successfully!', id: result.insertId });
    });
  });
  
  app.get('/skills', (req, res) => {
    const sql = 'SELECT * FROM skills';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching skills:', err);
        return res.status(500).json({ error: 'Failed to fetch skills' });
      }
      res.json(results);
    });
  });
  
  // Routes for Projects
  app.post('/projects', (req, res) => {
    const { project_guide, project_title, description, technologies_used, completion_status } = req.body;
    if (!project_guide || !project_title || !description || !technologies_used || !completion_status) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO projects (Project_Guide, Project_Title, Description, Technologies_Used, Completion_Status) VALUES (?, ?, ?, ?, ?)';
    const values = [project_guide, project_title, description, technologies_used, completion_status];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding project:', err);
        return res.status(500).json({ error: 'Failed to add project' });
      }
      res.status(201).json({ message: 'Project added successfully!', id: result.insertId });
    });
  });
  
  app.get('/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching projects:', err);
        return res.status(500).json({ error: 'Failed to fetch projects' });
      }
      res.json(results);
    });
  });
  
  // Routes for Time Management
  app.post('/time-management', (req, res) => {
    const { task_name, priority_level, activity_type, duration, deadline } = req.body;
    if (!task_name || !priority_level || !activity_type || !duration || !deadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const sql = 'INSERT INTO time_management (Task_Name, Priority_Level, Activity_Type, Duration, Deadline) VALUES (?, ?, ?, ?, ?)';
    const values = [task_name, priority_level, activity_type, duration, deadline];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding task:', err);
        return res.status(500).json({ error: 'Failed to add task' });
      }
      res.status(201).json({ message: 'Task added successfully!', id: result.insertId });
    });
  });
  
  app.get('/time-management', (req, res) => {
    const sql = 'SELECT * FROM time_management';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ error: 'Failed to fetch tasks' });
      }
      res.json(results);
    });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });