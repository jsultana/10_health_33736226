// -------------------------------
//  IMPORTS
// -------------------------------
const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');

const app = express();
const port = 8000;   // required by coursework


// -------------------------------
//  DATABASE CONNECTION POOL
// -------------------------------
const db = mysql.createPool({
    host: process.env.HEALTH_HOST,
    user: process.env.HEALTH_USER,
    password: process.env.HEALTH_PASSWORD,
    database: process.env.HEALTH_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

global.db = db;


// -------------------------------
//  APP CONFIG
// -------------------------------
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true
}));


// -------------------------------
//  ROUTES
// -------------------------------

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
});


// Workouts list + SEARCH (case-insensitive, partial)
app.get('/workouts', (req, res, next) => {
    const qRaw = req.query.q || '';
    const q = qRaw.trim().toLowerCase();

    let sql;
    let params;

    if (!q) {
        // No search term → show all workouts
        sql = 'SELECT * FROM workouts ORDER BY workout_date DESC';
        params = [];
    } else {
        // Case-insensitive partial search on type or notes
        sql = `
            SELECT * FROM workouts
            WHERE LOWER(workout_type) LIKE ? 
               OR LOWER(IFNULL(notes, '')) LIKE ?
            ORDER BY workout_date DESC
        `;
        const like = `%${q}%`;
        params = [like, like];
    }

    db.query(sql, params, (err, results) => {
        if (err) return next(err);

        res.render('workouts', {
            workouts: results
            // we are NOT using q in the view anymore
        });
    });
});


// Show form to add a new workout
app.get('/workouts/add', (req, res) => {
    res.render('workouts_add');
});


// Handle form submission to add a new workout
app.post('/workouts/add', (req, res, next) => {
    let { workout_date, workout_type, duration_minutes, notes } = req.body;

    workout_type = req.sanitize(workout_type);
    notes = req.sanitize(notes);

    const sql = `
        INSERT INTO workouts (user_id, workout_date, workout_type, duration_minutes, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    const params = [
        1,       // placeholder user
        workout_date,
        workout_type,
        duration_minutes,
        notes || null
    ];

    db.query(sql, params, (err) => {
        if (err) return next(err);
        res.redirect('/workouts');
    });
});


// -------------------------------
//  START SERVER
// -------------------------------
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
