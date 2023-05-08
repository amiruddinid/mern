require('dotenv').config({ path: '../.env' })
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@lakivia.ggntims.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
      const db = client.db("lakivia");
      const users = db.collection("users");
      let id = null

      await users.insertMany( [
        { "name": "Alice", "email":"alice@xyz.com", "department": "engineering", "status":"inactive", "age":25 },
        { "name": "Bob", "email":"bob@xyz.com", "department": "sales", "status":"inactive", "age":24 },
        { "name": "Dave", "email":"dave@xyz.com", "department": "sales", "status":"active", "age":23 },
        { "name": "Carol", "email":"bob@xyz.com", "department": "finance", "status":"active", "age":26 }
     ])

     const addResult = await users.find().toArray()
     id = addResult[1]._id
     console.log('add', addResult)

     //quest 1
     const age = await users.find({ age: { $gt: 25 } }).toArray()
     console.log('age', age)

     //quest 2
     await users.updateOne({ _id: id }, { $set: { email: "new_email@xyz.com" } })
     const emailResult = await users.findOne({ email: "new_email@xyz.com" })
     console.log('emai', emailResult);

     //quest 3
     await users.deleteMany({ status: "inactive" })
     const deleteResult = await users.find().toArray()
     console.log('inactive', deleteResult);

    //  await users.drop()

    } finally {
      await client.close();
    }
}
  
run();