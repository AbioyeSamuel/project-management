// // middleware/authenticateToken.js
// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');

//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     jwt.verify(token, 'your_jwt_secret', (err, user) => {
//         if (err) return res.status(403).json({ message: 'Token is invalid' });

//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;
