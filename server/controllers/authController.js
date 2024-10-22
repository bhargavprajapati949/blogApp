import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';
import { createUser, findUserByUsername } from '../repositories/userRepository.js';

export const register = async (req, res) => {
    const { username, name, password, role } = req.body;

    try {
        const existingUser = findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ authenticated: false, message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser(username, name, hashedPassword, role);
        const { token, expireDate } = generateToken({ username, role });
        res.cookie('authToken', token, { httpOnly: false, expires: expireDate });
        res.status(201).json({ authenticated: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ authenticated: false, message: 'Error registering user', error });
    }
};


export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username, true);

        if (user && await bcrypt.compare(password, user.password)) {
            const { token, expireDate } = generateToken({ username, role: user.role });
            res.cookie('authToken', token, { httpOnly: false, expires: expireDate });
            res.json({ authenticated: true, message: 'Login successful' });
        } else {
            res.status(401).json({ authenticated: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ authenticated: false, message: 'Error logging in user', error });
    }
};

export const getUserDetails = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(req.user);
};