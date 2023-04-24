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

   
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("Triluxo server is running");
});

app.listen(port, () => console.log(`Triluxo running on ${port}`));
