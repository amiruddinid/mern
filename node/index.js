require('dotenv').config({ path: '../.env' })
const fs = require('fs');
const { parse } = require('csv-parse');
const http = require('http');
const url = require('url');
const { MongoClient, ServerApiVersion } = require('mongodb');
const countWords = require('./utils/countWords');

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@lakivia.ggntims.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});


async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('lakivia');
  const collection = db.collection('users');

  const parser = fs
    .createReadStream('data.csv')
    .pipe(parse({ columns: true }));

  for await (const record of parser) {
    await collection.insertOne(record);
  }

  const addResult = await collection.find().toArray()
  console.log('add', addResult)

  const server = http.createServer(async (req, res) => {
    const reqUrl = url.parse(req.url, true);
    if (reqUrl.pathname === '/users' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        const user = parse(body);
        await collection.insertOne(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    } else if (reqUrl.pathname.startsWith('/users/') && req.method === 'DELETE') {
      const id = reqUrl.pathname.split('/')[2];
      await collection.deleteOne({ _id: id });
      res.writeHead(204);
      res.end();
    } else if (reqUrl.pathname.startsWith('/words/') && req.method === 'GET') {
      const words = reqUrl.pathname.split('/')[2];
      const len = countWords(decodeURIComponent(words))
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({length: len}));
      res.end();
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

  await client.close();
}

main().catch(console.error);