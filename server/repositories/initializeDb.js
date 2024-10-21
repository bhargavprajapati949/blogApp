import { initializeUserTable } from './userRepository.js';
import { initializePostTable } from './postRepository.js';
import { initializeCommentTable } from './commentRepository.js';

// Function to initialize all tables in the database
export const initializeDb = () => {
    initializeUserTable();
    initializePostTable();
    initializeCommentTable();
    console.log('Database initialized successfully');
};
