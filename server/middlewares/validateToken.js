import User from "../models/User.js";
import jwt from 'jsonwebtoken'
const validateToken = (req, res, next) => {
    try {
        // verify the header
        const header = req.header.autorization
        const token = header.split(" ")[1];
        if (!token) {
            res.status(400).json({ message: "token not present" })
        }
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" })
            }
            req.user = await User.findById(decoded.id).select('-password');

            next();
        })
    } catch (error) {
        console.log(error)
        next()
    }
}

export default validateToken;