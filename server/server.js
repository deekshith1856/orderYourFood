import express from 'express';
import 'dotenv/config.js'
import UserRoutes from './routes/User.js'
import db from './config/db.js'
import cors from 'cors'
const app = express();

const connectToDb = async (req, res, next) => {
    req.db = db;
    console.log('using db middleware', db.host)
    next();
}
app.use(express.json());
app.use(cors());
app.use(connectToDb);
app.use('/api/user', UserRoutes)


// error handling
app.use((err, req, res) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})