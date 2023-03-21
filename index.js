const express = require("express");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ConnectionClosedEvent,
} = require("mongodb");
const query = require("express/lib/middleware/query");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();
const stripe = require("stripe")(
  "sk_test_51LVKw8GSGClrvX9q7T97oJnASQEho0USM91MWBTKyIQj8sJMyqBUTjtzwvHZxgI5UQThfQ365RaTYwsHBJb9c17L00ilwp1Ynb"
);

// app.post("/create-payment-intent", async (req, res) => {
//   const booking = req.body;
//   const price = booking.price;
//   const amount = price * 100;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: "usd",
//     payment_methods_type: ["card"],
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

//homefy
//S7LWJAfdHcg_Qup

// middleware
app.use(cors());
app.use(express.json());
//ycxtPXJJ7KqqWBFP
//SMS
const uri =
  "mongodb+srv://homeify:ycxtPXJJ7KqqWBFP@cluster0.8lf54jt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
//console.log(client);

async function run() {
  try {
    const history = client.db("SMS").collection("Data");
    const student = client.db("SMS").collection("Student");
    const attendance = client.db("SMS").collection("Attendance");

    app.get("/data", async (req, res) => {
      const query = {};
      const category = await data.find(query);
      res.send(category);
    });
    app.get("/student", async (req, res) => {
      const query = {};
      const category = await student.find(query).toArray();
      res.send(category);
    });
    app.post("/attendance", async (req, res) => {
      const data = req.body;
      console.log(data);
      const options = { ordered: true };
      const result = await attendance.insertMany(data, options);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("SMS server is running");
});

//others stripe method
// app.post("/paymentstripe", async (req, res) => {
//   let status, error;

//   const { token, amount } = req.body;
//   console.log(token.id, amount);
//   try {
//     await stripe.charges.create({
//       source: token.id,
//       amount,
//       currency: "usd",
//     });
//     status = "success";
//   } catch (err) {
//     console.log(err);
//     status = "200";
//   }
//   res.send(status);
// });

app.listen(port, () => console.log(`SMS running on ${port}`));
