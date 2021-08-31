const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const MONGODB_URI = process.env.MONGO_HOST_KEY;

const shopRoutes = require("./router/shop");

app.use(shopRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 5000);
    console.log("Server is running on Port 5000 & connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
