const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    });

// Routes
app.post('/api/submit', async (req, res) => {
    try {
        // Basic validation
        const requiredFields = ['fullName', 'dateOfBirth', 'telephone', 'ninumber'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ 
                    success: false, 
                    error: `Missing required field: ${field}` 
                });
            }
        }

        const {
            fullName, dateOfBirth, telephone, ninumber,
            bankName, sortCode, accountNumber,
            emergencyName, emergencyNumber,
            healthIssues, additionalInfo
        } = req.body;

        const query = `
            INSERT INTO employee_data (
                full_name, date_of_birth, telephone, ni_number,
                bank_name, sort_code, account_number,
                emergency_contact_name, emergency_contact_number,
                health_issues, additional_info
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(query, [
            fullName, dateOfBirth, telephone, ninumber,
            bankName, sortCode, accountNumber,
            emergencyName, emergencyNumber,
            healthIssues || null, additionalInfo || null
        ]);

        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const searchTerm = req.query.search || '';
        let query = 'SELECT * FROM employee_data';
        let params = [];

        if (searchTerm) {
            query += ' WHERE full_name LIKE ?';
            params = [`%${searchTerm}%`];
        }

        query += ' ORDER BY submission_date DESC';

        const [rows] = await pool.execute(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve submissions.html for the /submissions route
app.get('/submissions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submissions.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
