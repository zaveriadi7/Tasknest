const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./config/db'); // PostgreSQL configuration

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Render home page
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

const cron = require('node-cron');
const { sendNotifications } = require('./notificationService');

// Schedule the task to run every day at 9 PM
cron.schedule('* 21 * * *', async () => {
    console.log('Running the notification task at 9 PM');
    await sendNotifications();
});


module.exports = pool;
