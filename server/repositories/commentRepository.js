import db from './db.js';

// Create a table for storing comments if it doesn't exist
export const initializeCommentTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            postId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            comment TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        )
    `).run();
};


// Add a comment to a post
export const addComment = (postId, comment, userId) => {
    try {
        const sqlQuery = db.prepare('INSERT INTO comments (postId, comment, userId) VALUES (?, ?, ?)');
        sqlQuery.run(postId, comment, userId);
    } catch (e) {
        console.error('Error adding comment:', e);
        throw e;
    }
};

// Get all comments for a post
export const getCommentsByPostId = (postId) => {
    try {
        const sqlQuery = db.prepare(`
            SELECT comments.comment, comments.createdAt, users.name AS author_name
            FROM comments
            JOIN users ON comments.userId = users.id
            WHERE comments.postId = ?
            ORDER BY comments.createdAt ASC
        `);
        return sqlQuery.all(postId);
    } catch (e) {
        console.error('Error fetching comments by postId:', e);
        throw e;
    }
};