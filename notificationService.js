const pool = require('./config/db.js'); // Ensure this connects to your PostgreSQL database
const nodemailer = require('nodemailer'); // For email notifications


const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: 'aditya.zaveri2021@vitbhopal.ac.in',
        pass: 'muqs fhxi elbk xofn'
    }
});

async function sendNotifications() {
    try {
        // Query to get all tasks for each user, regardless of completion status
        const result = await pool.query(`
            SELECT users.email, users.username, COUNT(tasks.id) AS total_tasks
            FROM tasks
            JOIN users ON tasks.user_id = users.id
            GROUP BY users.email, users.username
        `);

        const usersWithTasks = result.rows;

        // Loop through each user and send a notification if they have any tasks
        for (const user of usersWithTasks) {
            if (user.total_tasks > 0) {
                await sendEmailNotification(user.email, user.username, user.total_tasks);
            }
        }

    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}

async function sendEmailNotification(email, name, taskCount) {
    const message = {
        from: 'adityazaveri7@gmail.com',
        to: email,
        subject: 'Daily Task Reminder',
        text: `Hello ${name},\n\nYou have ${taskCount} tasks. Don't forget to review them!\n\nBest,\nYour Task Manager`
    };

    try {
        await transporter.sendMail(message);
        console.log(`Notification sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send notification to ${email}:`, error);
    }
}

module.exports = { sendNotifications };
