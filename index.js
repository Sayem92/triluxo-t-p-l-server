require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lhckmem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usersCollection = client.db("Triluxo").collection("allUser");
    const reminderCollection = client.db("Triluxo").collection("reminders");

    // save user data
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // get reminder
    app.get("/myReminders/:email", async (req, res) => {
      const email = req.params.email;
      const result = await reminderCollection.find({ email }).toArray();
      res.send(result);
    });

    // add reminder
    app.post("/addReminder", async (req, res) => {
      const data = req.body;
      const result = await reminderCollection.insertOne(data);
      res.send(result);
    });
    // update reminder
    app.put("/reminder/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: status,
      };
      const result = await reminderCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    // delete reminder
    app.delete("/reminder/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reminderCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("Triluxo server is running");
});

app.listen(port, () => console.log(`Triluxo running on ${port}`));
