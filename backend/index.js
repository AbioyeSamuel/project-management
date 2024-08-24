const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.use((req, res, next) => {
    req.db = db;
    next();
});

// Use routes
app.use('/api', routes); 

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
