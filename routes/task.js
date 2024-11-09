const express = require('express');
const pool = require('../config/db');

const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
}

// List all tasks
router.get('/', isAuthenticated, async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [req.session.userId]);
    res.render('dashboard', { tasks: result.rows });
});

// Create a new task
router.post('/add-task', isAuthenticated, async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        await pool.query(
            'INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4)',
            [req.session.userId, title, description, dueDate]
        );
        res.redirect('/tasks');
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Error adding task.");
    }
});
// Delete a task
router.post('/delete-task/:id', isAuthenticated, async (req, res) => {
    const taskId = req.params.id;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [taskId, req.session.userId]);
        res.redirect('/tasks');
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send("Error deleting task.");
    }
});
// Update a task
router.post('/update-task/:id', isAuthenticated, async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body; // Assuming you're only updating the status here

    try {
        await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3',
            [status, taskId, req.session.userId]
        );
        res.redirect('/tasks');
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Error updating task.");
    }
});

module.exports = router;
