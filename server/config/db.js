import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
}
).then(() => {
    console.log('connection to mongodb establised', mongoose.connection.host)
}).catch((error) => {
    console.log('error in connection to db', error);
})

export default mongoose.connection;