import db from './db.js';

// Create a table for storing users if it doesn't exist
export const initializeUserTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `).run();
};

// Insert a new user into the database
export const createUser = (username, name, hashedPassword, role = 'user') => {
    try {
        const sqlQuery = db.prepare('INSERT INTO users (username, name, password, role) VALUES (?, ?, ?, ?)');
        sqlQuery.run(username, name, hashedPassword, role);
    } catch (e) {
        console.error('Error creating user:', e);
        throw e;
    }
};

// Fetch a user by their username
export const findUserByUsername = (username, includePassword = false) => {
    try{
        const sqlQuery = db.prepare(`SELECT id, username, name, role${includePassword ? ", password": ""} FROM users WHERE username = ?`);
        return sqlQuery.get(username);
    }
    catch(e){
        console.log('Error finding user by username:', e);
        throw e;
    }
};