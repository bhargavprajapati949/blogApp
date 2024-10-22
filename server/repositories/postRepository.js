import db from './db.js';

// Create a table for storing blog posts if it doesn't exist
export const initializePostTable = () => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'Draft',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE
        )
    `).run();
};

// Insert a new post into the database
export const createPost = (title, content, status, author) => {
    try {
        const sqlQuery = db.prepare('INSERT INTO posts (title, content, status, author) VALUES (?, ?, ?, ?)');
        sqlQuery.run(title, content, status, author);
    } catch (e) {
        console.error('Error creating post:', e);
        throw e;
    }
};

// Get all published posts
export const getPosts = (includeDraft = false, userId = null) => {
    try {
        const sqlQuery = db.prepare(`
            SELECT posts.id, posts.title, posts.status, posts.createdAt, users.name AS author_name
            FROM posts
            JOIN users ON posts.author = users.id
            ${includeDraft && userId ? "WHERE posts.status = 'Published' OR (posts.status = 'Draft' AND posts.author = ?)" : "WHERE posts.status = 'Published'"}
            ORDER BY createdAt DESC
        `);
        return includeDraft && userId ? sqlQuery.all(userId) : sqlQuery.all();
    } catch (e) {
        console.error('Error fetching posts:', e);
        throw e;
    }
};

// Get a post by its ID
export const getPostById = (id, userId = null) => {
    try {
        const sqlQuery = db.prepare(`
        SELECT posts.*, users.name AS author_name
        FROM posts
        JOIN users ON posts.author = users.id
        WHERE posts.id = ?
        ${userId ? "AND (posts.status = 'Published' OR posts.author = ?)" : "AND posts.status = 'Published'"}
    `);
        return userId ? sqlQuery.get(id, userId) : sqlQuery.get(id);
    } catch (e) {
        console.error('Error fetching post by ID:', e);
        throw e;
    }
};


// Update the status of a post
export const changePostStatus = (id, status) => {
    const sqlQuery = db.prepare('UPDATE posts SET status = ? WHERE id = ?');
    sqlQuery.run(status, id);
};
