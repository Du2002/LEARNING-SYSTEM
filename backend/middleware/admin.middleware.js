const jwt = require("jsonwebtoken")

async function authenticateAdmin(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.status(401).json({ msg: "No token provided" })
        }

        const token = authHeader.split(" ")[1] // Bearer <token>
        
        if (!token) {
            return res.status(401).json({ msg: "Invalid token format" })
        }

        const decoded = jwt.verify(token, "12345")
        
        if (decoded.role !== "admin") {
            return res.status(403).json({ msg: "Access denied. Admin only." })
        }

        req.user = decoded._id
        next()
        
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" })
    }
}

module.exports = { authenticateAdmin }