import Database from 'better-sqlite3';

// Create a single database instance and export it
const db = new Database('./dev.sqlite', { verbose: console.log });

export default db;
