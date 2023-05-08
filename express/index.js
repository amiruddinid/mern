require('dotenv').config({ path: '../.env' })

const express = require("express");
const multer = require('multer');
const cors = require('cors')

const app = express();
const client = require("./config/db");
const upload = multer({ dest: 'uploads/' });

const requestLogger = require('./middleware/requestLogger')

const { PORT = 8000 } = process.env;

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const db = client.db("lakivia");

//list
app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.use((req, res) => {
    res.status(404).send("Not Found")
})

app.listen(PORT, () => {
    console.log(`Server is up : http://localhost:${PORT}`)
})