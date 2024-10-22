import Database from 'better-sqlite3';

const db = new Database('./dev.sqlite', { 
    // verbose: console.log 
});

export default db;
