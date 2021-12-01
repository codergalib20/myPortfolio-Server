const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dpacy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("Galib_portfolio");
    const portfolioItemCollection = database.collection("item");

    // All Folio Items
    app.get("/folioItems", async (req, res) => {
      const cursor = portfolioItemCollection.find({});
      const items = await cursor.toArray();
      res.send(items);
    });
    // Single folio item
    app.get("/folioItems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const items = await portfolioItemCollection.findOne(query);
      res.json(items);
    });

  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get('/', (req, res)=> {
       res.send('Running galib\'s portfolio')
})
app.listen(port, () => {
  console.log("Asadullah Hil Galib server is running " + port);
});

// Allahuakbar
// Personal Info______
// DB_USER=galibPortfolio
// DB_PASS=C7XcWLSvGbYBj6vc