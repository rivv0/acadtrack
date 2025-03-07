// Fetch and display students
async function fetchStudents() {
    try {
      const response = await fetch('/students');
      const students = await response.json();
      const tbody = document.querySelector('#studentTable tbody');
      tbody.innerHTML = students.map(student => `
        <tr>
          <td>${student.Student_ID}</td>
          <td>${student.Name}</td>
          <td>${student.Enrollment_Number}</td>
          <td>${student.Email}</td>
          <td>${student.Phone_Number}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }
  
  // Add a new student
  document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const student = {
      name: document.getElementById('name').value,
      enrollment_number: document.getElementById('enrollment_number').value,
      email: document.getElementById('email').value,
      phone_number: document.getElementById('phone_number').value
    };
    try {
      const response = await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      if (response.ok) {
        fetchStudents();
        document.getElementById('studentForm').reset();
      } else {
        console.error('Failed to add student:', await response.json());
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  });
  
  // Fetch and display courses
  async function fetchCourses() {
    try {
      const response = await fetch('/courses');
      const courses = await response.json();
      const tbody = document.querySelector('#courseTable tbody');
      tbody.innerHTML = courses.map(course => `
        <tr>
          <td>${course.Course_ID}</td>
          <td>${course.Course_Name}</td>
          <td>${course.Credits}</td>
          <td>${course.Instructor_Name}</td>
          <td>${course.Semester}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  
  // Add a new course
  document.getElementById('courseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const course = {
      course_name: document.getElementById('course_name').value,
      credits: document.getElementById('credits').value,
      instructor_name: document.getElementById('instructor_name').value,
      semester: document.getElementById('semester').value
    };
    try {
      const response = await fetch('/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      });
      if (response.ok) {
        fetchCourses();
        document.getElementById('courseForm').reset();
      } else {
        console.error('Failed to add course:', await response.json());
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  });
  
  // Fetch and display grades
 async function fetchGrades() {
  try {
    const response = await fetch('/grades');
    const grades = await response.json();
    const tbody = document.querySelector('#gradeTable tbody');
    tbody.innerHTML = grades.map(grade => `
      <tr>
        <td>${grade.Grade_ID}</td>
        <td>${grade.Evaluation_Type}</td>
        <td>${grade.Total_Marks}</td>
        <td>${grade.Course_ID}</td>
        <td>${grade.Marks_Obtained}</td>
        <td>${grade.Grade}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error fetching grades:', error);
  }
}

// Add a new grade
document.getElementById('gradeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const grade = {
    evaluation_type: document.getElementById('evaluation_type').value,
    total_marks: document.getElementById('total_marks').value,
    course_id: document.getElementById('course_id').value,
    marks_obtained: document.getElementById('marks_obtained').value,
    grade: document.getElementById('grade').value
  };
  try {
    const response = await fetch('/grades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grade)
    });
    if (response.ok) {
      fetchGrades(); // Refresh the grade list
      document.getElementById('gradeForm').reset(); // Clear the form
    } else {
      console.error('Failed to add grade:', await response.json());
    }
  } catch (error) {
    console.error('Error adding grade:', error);
  }
});
// Fetch and display exams
// Fetch and display exams
async function fetchExams() {
    try {
      const response = await fetch('/exams');
      const exams = await response.json();
      const tbody = document.querySelector('#examTable tbody');
      tbody.innerHTML = exams.map(exam => `
        <tr>
          <td>${exam.Exam_ID}</td>
          <td>${exam.Exam_Type}</td>
          <td>${exam.Course_ID}</td>
          <td>${new Date(exam.Exam_Date).toLocaleDateString()}</td>
          <td>${exam.Total_Marks}</td>
          <td>${exam.Marks_Obtained}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  }
  
  // Add a new exam
// Add a new exam
document.getElementById('examForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const exam = {
      exam_type: document.getElementById('exam_type').value,
      course_id: document.getElementById('course_id').value,
      exam_date: new Date(document.getElementById('exam_date').value).toISOString(), // Convert to ISO format
      total_marks: document.getElementById('total_marks').value,
      marks_obtained: document.getElementById('marks_obtained').value
    };
    try {
      const response = await fetch('/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exam)
      });
      if (response.ok) {
        fetchExams(); // Refresh the exam list
        document.getElementById('examForm').reset(); // Clear the form
      } else {
        console.error('Failed to add exam:', await response.json());
      }
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  });
  
  

  // Fetch and display assignments
async function fetchAssignments() {
    try {
      const response = await fetch('/assignments');
      const assignments = await response.json();
      const tbody = document.querySelector('#assignmentTable tbody');
      tbody.innerHTML = assignments.map(assignment => `
        <tr>
          <td>${assignment.Assignment_ID}</td>
          <td>${assignment.Assignment_Title}</td>
          <td>${assignment.Course_ID}</td>
          <td>${new Date(assignment.Submission_Date).toLocaleDateString()}</td> 
          <td>${assignment.Marks_Assigned}</td>
          <td>${assignment.Status}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  }
  
  // Add a new assignment
// Add a new assignment
document.getElementById('assignmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const assignment = {
      assignment_title: document.getElementById('assignment_title').value,
      course_id: document.getElementById('course_id').value,
      submission_date: new Date(document.getElementById('submission_date').value).toISOString(), // Convert to ISO format
      marks_assigned: document.getElementById('marks_assigned').value,
      status: document.getElementById('status').value
    };
    console.log('Submitting assignment:', assignment);
    try {
      const response = await fetch('/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignment)
      });
      if (response.ok) {
        fetchAssignments(); // Refresh the assignment list
        document.getElementById('assignmentForm').reset(); // Clear the form
      } else {
        console.error('Failed to add assignment:', await response.json());
      }
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  });
  

  
  // Fetch and display time management tasks
  async function fetchTimeManagement() {
    try {
      const response = await fetch('/time-management');
      const tasks = await response.json();
      const tbody = document.querySelector('#timeManagementTable tbody');
      tbody.innerHTML = tasks.map(task => `
        <tr>
          <td>${task.Task_ID}</td>
          <td>${task.Task_Name}</td>
          <td>${task.Priority_Level}</td>
          <td>${task.Activity_Type}</td>
          <td>${task.Duration}</td>
          <td>${task.Deadline}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching time management tasks:', error);
    }
  }
  
  // Add a new time management task
  document.getElementById('timeManagementForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
      task_name: document.getElementById('task_name').value,
      priority_level: document.getElementById('priority_level').value,
      activity_type: document.getElementById('activity_type').value,
      duration: document.getElementById('duration').value,
      deadline: document.getElementById('deadline').value
    };
    try {
      const response = await fetch('/time-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (response.ok) {
        fetchTimeManagement(); // Refresh the task list
        document.getElementById('timeManagementForm').reset(); // Clear the form
      } else {
        console.error('Failed to add task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  });
  
  // Fetch and display skills
  async function fetchSkills() {
    try {
      const response = await fetch('/skills');
      const skills = await response.json();
      const tbody = document.querySelector('#skillTable tbody');
      tbody.innerHTML = skills.map(skill => `
        <tr>
          <td>${skill.Skill_ID}</td>
          <td>${skill.Skill_Name}</td>
          <td>${skill.Hours_Practiced}</td>
          <td>${skill.Proficiency_Level}</td>
          <td>${skill.Learning_Resources}</td>
          <td>${skill.Certification_Status}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  }
  
  // Add a new skill
  document.getElementById('skillForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const skill = {
      skill_name: document.getElementById('skill_name').value,
      hours_practiced: document.getElementById('hours_practiced').value,
      proficiency_level: document.getElementById('proficiency_level').value,
      learning_resources: document.getElementById('learning_resources').value,
      certification_status: document.getElementById('certification_status').value
    };
    try {
      const response = await fetch('/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      if (response.ok) {
        fetchSkills(); // Refresh the skill list
        document.getElementById('skillForm').reset(); // Clear the form
      } else {
        console.error('Failed to add skill:', await response.json());
      }
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  });
  
  // Fetch and display projects
  async function fetchProjects() {
    try {
      const response = await fetch('/projects');
      const projects = await response.json();
      const tbody = document.querySelector('#projectTable tbody');
      tbody.innerHTML = projects.map(project => `
        <tr>
          <td>${project.Project_ID}</td>
          <td>${project.Project_Guide}</td>
          <td>${project.Project_Title}</td>
          <td>${project.Description}</td>
          <td>${project.Technologies_Used}</td>
          <td>${project.Completion_Status}</td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  
  // Add a new project
  document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const project = {
      project_guide: document.getElementById('project_guide').value,
      project_title: document.getElementById('project_title').value,
      description: document.getElementById('description').value,
      technologies_used: document.getElementById('technologies_used').value,
      completion_status: document.getElementById('completion_status').value
    };
    try {
      const response = await fetch('/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (response.ok) {
        fetchProjects(); // Refresh the project list
        document.getElementById('projectForm').reset(); // Clear the form
      } else {
        console.error('Failed to add project:', await response.json());
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  });
  
  // Initial fetch

  fetchAssignments();
  fetchTimeManagement();
  fetchSkills();
  fetchProjects();
  
  

// Repeat similar functions for Assignments, Exams, Skills, Projects, and Time Management

// Initial fetch
fetchStudents();
fetchCourses();
fetchGrades();
// Initial fetch
fetchExams();