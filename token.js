const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET 

function verifyToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const decodedToken = jwt.verify(token, secret);

        console.log(decodedToken);
        req.customer = decodedToken;

        next(); // Proceed to next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;
