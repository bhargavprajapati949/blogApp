import db from './db.js';

// Create a table for storing comments if it doesn't exist
export const initializeCommentTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            postId INTEGER NOT NULL,
            comment TEXT NOT NULL,
            username TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (postId) REFERENCES posts(id)
        )
    `).run();
};

// Add a comment to a post
export const addComment = (postId, comment, username) => {
    const stmt = db.prepare('INSERT INTO comments (postId, comment, username) VALUES (?, ?, ?)');
    stmt.run(postId, comment, username);
};
