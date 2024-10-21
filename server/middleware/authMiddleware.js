
// Middleware to authenticate requests using JWT
export const authenticateJWT = (req, res, next) => {
    const token = req.cookies?.authToken;

    if (token) {
        try {
            const decoded = verifyToken(token);
            if (new Date(decoded.expire_date) < new Date()) {
                return res.status(403).json({ message: 'Token expired' });
            }
            req.user = decoded; // Set the decoded user information into req object
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization token missing' });
    }
};

// Middleware to check user role
export const authorizeRole = (role) => (req, res, next) => {
    if (req.user?.role === role) {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
};