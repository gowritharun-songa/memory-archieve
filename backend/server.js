import express from 'express';
import router from "./routes/memoRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config({
    quiet: true,
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(rateLimiter);

app.use('/api/memories', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server waiting at http://localhost:${PORT}`);
    })
});