// Load environment variables from .env file
require('dotenv').config();

// Import mysql2
const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', // Use environment variable or default to 'localhost'
  user: process.env.DB_USER || 'root', // Use environment variable or default to 'root'
  password: process.env.DB_PASSWORD || 'root123', // Use environment variable or default to 'root123'
  database: process.env.DB_NAME || 'acadtrack' // Use environment variable or default to 'acadtrack'
});

// Attempt to connect to the MySQL server
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Successfully connected to MySQL server!');
});

// Close the connection (optional)
db.end();