const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const router = express.Router();

// Render Register Page
router.get('/register', (req, res) => {
    res.render('register');  // Render the register.ejs file
});

// Register route for handling form submission
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
        [username, email, hashedPassword]
    );
    res.redirect('/auth/login');
});

// Render Login Page
router.get('/login', (req, res) => {
    res.render('login');  // Render the login.ejs file
});

// Login route for handling form submission
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
        const user = result.rows[0];
        if (await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            return res.redirect('/tasks');
        }
    }
    res.redirect('/auth/login');
});

module.exports = router;

