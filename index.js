const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const cors = require('cors');

// username  parvesmosarof32
// pass       DuXEcEzgKc8D4wMY 

// middleware 
app.use(cors());
app.use(express.json());











const uri = "mongodb+srv://parvesmosarof32:DuXEcEzgKc8D4wMY@cluster0.3tilc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async(req,res)=>{
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const user = await userCollection.findOne(query);
      res.send(user);
    })


    app.post('/users', async (req, res) => {
      try {
        const user = req.body;
        console.log('new user', user);
        
        // Use await since this function is now async
        const result = await userCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).send({ error: "Failed to insert user" });
      }
    });

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updatedUser = req.body;

    
      
  
      // Ensure you validate incoming data
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
          $set: updatedUser,
      };
  
      try {
          const result = await userCollection.updateOne(filter, updateDoc);
          res.send(result); // Sends back the MongoDB update result
      } catch (error) {
          console.error("Error updating user:", error);
          res.status(500).send({ error: "Failed to update user" });
      }
  });
  

    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      console.log('please delete from database', id);
      const query = { _id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);













const users = 
    [
        {
          "id": 1,
          "name": "John Doe",
          "email": "johndoe@example.com",
          "role": "admin",
          "active": true
        },
        {
          "id": 2,
          "name": "Jane Smith",
          "email": "janesmith@example.com",
          "role": "user",
          "active": true
        },
        {
          "id": 3,
          "name": "Sam Johnson",
          "email": "samjohnson@example.com",
          "role": "user",
          "active": false
        },
        {
          "id": 4,
          "name": "Alice Brown",
          "email": "alicebrown@example.com",
          "role": "moderator",
          "active": true
        }
      ];
      


app.get("/",(req, res)=>{
    res.send("users management asdf server is running")
})

// app.post('/users', (req, res)=>{
//     console.log("post api hitting");
//     console.log(req.body);
//     const NewUser = req.body;
//     NewUser.id = users.length + 1;
//     users.push(NewUser);
//     res.send(NewUser);
// })

// app.get("/users",(req, res)=>{
//     res.send(users);
// })
 
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
    
})