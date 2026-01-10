import express from 'express';

const app = express();
const PORT = 5050;

app.get('/api/memories', (req, res) => {
    res.status(200).send("<h1 style='color: brown'>checking</h1>");
})

app.post('/api/memories', (req, res) => {
    res.status(201).json({"msg": "Memory created successfully"});
})

app.put('/api/memories/:id', (req, res) => {
    res.status(201).json({"message" : "Memory updated successfully"});
})

app.delete('/api/memories/:id', (req, res) => {
    res.send("memory deleted");
})

app.listen(PORT, () => {
    console.log(`Server waiting at http://localhost:${PORT}`);
})