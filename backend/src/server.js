import express from 'express';
import router from "./routes/memoRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({
    quiet: true,
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/memories', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server waiting at http://localhost:${PORT}`);
    })
});