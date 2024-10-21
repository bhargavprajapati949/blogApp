import db from './db.js';

// Create a table for storing blog posts if it doesn't exist
export const initializePostTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Draft',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `).run();
};

// Insert a new post into the database
export const createPost = (title, content, status = 'Draft') => {
    const sqlQuery = db.prepare('INSERT INTO posts (title, content, status) VALUES (?, ?, ?)');
    sqlQuery.run(title, content, status);
};

// Get all published posts
export const getPosts = () => {
    const sqlQuery = db.prepare('SELECT * FROM posts WHERE status = "Published" ORDER BY createdAt DESC');
    return sqlQuery.all();
};

// Get a post by its ID
export const getPostById = (id) => {
    const sqlQuery = db.prepare('SELECT * FROM posts WHERE id = ?');
    return sqlQuery.get(id);
};

// Update the status of a post
export const changePostStatus = (id, status) => {
    const sqlQuery = db.prepare('UPDATE posts SET status = ? WHERE id = ?');
    sqlQuery.run(status, id);
};
