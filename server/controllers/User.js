import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import generateToken from "../config/generateToken.js"
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: `user doesn't exist in database` })
        }
        const matchPassword = bcrypt.compare(password, user.password);
        if (matchPassword) {
            res.status(200).json({
                _id: user._id,
                userName: user.userName,
                token: generateToken(user._id),
                email: user.email

            })
        }
        else {
            res.status(400).json({ message: 'Incorrect password' })
        }
    } catch (error) {
        next(error);
    }
}
const userRegister = async (req, res, next) => {
    try {

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            res.status(400).json({ message: 'insufficient data' })
        }
        const userExists = await User.findOne({ email });


        if (userExists) {
            res.status(400).json({ message: 'user with this email already exists' })
        }
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })
        const token = generateToken(user._id);

        if (user) {
            res.status(200).send({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: token

            });
        }
        else {
            res.status(500).json({ message: 'cannot create user' })
        }

    } catch (error) {
        next(error);
    }
}
// need to modify auto login
const autoLogin = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);
        if (user) {

            res.status(200).json({
                userName: user.userName,
                email: user.email,

            })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export { userLogin, userRegister, autoLogin };
