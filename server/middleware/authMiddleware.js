import { verifyToken } from './../utils/jwtUtils.js'
import { findUserByUsername } from './../repositories/userRepository.js'

// Middleware to authenticate requests using JWT
// Here, if strict is false, it will just add user to req object and will not stop unauthorized requests
export const authenticateJWT = (strict = true) => (req, res, next) => {
    const token = req.cookies?.authToken;

    if (token) {
        try {
            const decoded = verifyToken(token);
            if (new Date(decoded.expire_date) < new Date()) {
                if (strict) {
                    return res.status(403).json({ message: 'Token expired' });
                }
            } else {
                const user = findUserByUsername(decoded.username);
                if (user) {
                    req.user = user;
                } else {
                    if (strict) {
                        return res.status(403).json({ message: 'Invalid token' });
                    }
                }
            }
        } catch (err) {
            if (strict) {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
    } else if (strict) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
    next();
};


// Middleware to check user role
export const authorizeRole = (role) => (req, res, next) => {
    if (req.user?.role === role) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
};