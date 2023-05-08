require('dotenv').config({ path: '../.env' })

const express = require("express");
const multer = require('multer');
const cors = require('cors')
const yup = require('yup')

const app = express();
const client = require("./config/db");
const upload = multer({ dest: 'uploads/' });
const validate = require('./utils/validate');

const requestLogger = require('./middleware/requestLogger')

const { PORT = 8000 } = process.env;

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const db = client.db("lakivia");

const postsSchema = yup.object({
    body: yup.object({
        title: yup.string().min(8).max(32).required(),
        category: yup.string().required(),
        content: yup.string().min(32).required(),
    }),
});

//search
app.get('/search', async (req, res) => {
    const keyword = req.query.keyword;
    const posts = await db
        .collection('posts')
        .find({ $text: { $search: keyword } })
        .toArray();
    res.json(posts);
});

app.post('/posts', validate(postsSchema), async (req, res) => {
    const posts = await db
        .collection('posts')
        .insertOne(req.body)
        
    res.json(posts);
});

app.get('/schedules', async (req, res) => {
    const schedules = await db
        .collection('schedules')
        .find(req.body)
        .toArray()
        
    res.json(schedules);
});

app.get('/schedules/:id', async (req, res) => {
    const schedules = await db
        .collection('schedules')
        .findOne(req.params.id)
        
    res.json(schedules);
});

app.put('/schedules/:id', async (req, res) => {
    const schedules = await db
        .collection('posts')
        .updateOne(
            {_id: req.params.id}, 
            {
                $set: req.body
            })
        
    res.json(schedules);
});

app.delete('/schedules/:id', async (req, res) => {
    const schedules = await db
        .collection('posts')
        .deleteOne(req.body)
        
    res.status(204).send("deleted");
});

app.use((req, res) => {
    res.status(404).send("Not Found")
})

app.listen(PORT, () => {
    console.log(`Server is up : http://localhost:${PORT}`)
})