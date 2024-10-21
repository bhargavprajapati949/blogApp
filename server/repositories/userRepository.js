import db from './db.js';

// Create a table for storing users if it doesn't exist
export const initializeUserTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `).run();
};

// Insert a new user into the database
export const createUser = (username, hashedPassword, role) => {
    const sqlQuery = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    sqlQuery.run(username, hashedPassword, role);
};

// Fetch a user by their username
export const findUserByUsername = (username) => {
    const sqlQuery = db.prepare('SELECT * FROM users WHERE username = ?');
    return sqlQuery.get(username);
};