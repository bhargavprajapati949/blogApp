import jwt from 'jsonwebtoken';
import config from '../../config.js';

// Generate a JWT token for a user
export const generateToken = (user) => {
    const secret = config.get('jwtSecret');
    const expireTime = config.get('jwtExpiry');
    const expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + expireTime);
    
    const payload = {
        username: user.username,
        role: user.role,
        expire_date: expireDate
    };
    
    const token = jwt.sign(payload, secret, { expiresIn: expireTime });
    return { token, expireDate };
};

// Verify a JWT token
export const verifyToken = (token) => {
    const secret = config.get('jwtSecret');
    return jwt.verify(token, secret);
};
