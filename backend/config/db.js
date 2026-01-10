
import mongoose from 'mongoose'

const connectDB = async () => {
    const MONGO_URI = 'mongodb+srv://gowritharun461_db_user:VLtD8NLi2Na7mPeg@cluster0.xphu4ut.mongodb.net/?appName=Cluster0'
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected!");
    } catch(error) {
        console.error("MongoDB connection error:", error.message);
        pr
    }
}

export default connectDB;