import express from 'express';
import 'dotenv/config.js'

const app = express();


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})