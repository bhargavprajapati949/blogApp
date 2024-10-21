import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils.js';
import { createUser, findUserByUsername } from '../repositories/userRepository.js';

export const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser(username, hashedPassword, role);
        const { token, expireDate } = generateToken({ username, role });
        res.cookie('authToken', token, { httpOnly: true, expires: expireDate });
        res.status(201).json({ token, authenticated: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ authenticated: false, message: 'Error registering user', error });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);

        if (user && await bcrypt.compare(password, user.password)) {
            const { token, expireDate } = generateToken({ username, role: user.role });
            res.cookie('authToken', token, { httpOnly: true, expires: expireDate });
            res.json({ token, authenticated: true, message: 'Login successful' });
        } else {
            res.status(401).json({ authenticated: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ authenticated: false, message: 'Error logging in user', error });
    }
};
