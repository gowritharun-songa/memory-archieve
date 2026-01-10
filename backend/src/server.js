import express from 'express';
import router from "./routes/memoRoute.js";

const app = express();
const PORT = 5050;

app.use('/api/memories', router);

app.listen(PORT, () => {
    console.log(`Server waiting at http://localhost:${PORT}`);
})