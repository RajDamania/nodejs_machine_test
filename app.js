require("dotenv").config;
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rgefe.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const prodSchema = new mongoose.Schema({
  title: String,
  category: String,
});

const Prod = mongoose.model("Prod", prodSchema);

//insertinng-data
app.post("/add", (req, res) => {
  const title = req.body.title;
  const category = req.body.category;

  const newProd = new Prod({
    title,
    category,
  });
  newProd
    .save()
    .then((Prod) => {
      res.json(Prod);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//pageloading nad loading products on each page.
app.get("/prods", async (req, res) => {
  const ITEMS_PER_PAGE = 8;
  const page = parseInt(req.query.page || "0");
  const totalPages = await Prod.countDocuments({});
  const prods = await Prod.find({})
    .skip(page * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.json({
    totalPages: Math.ceil(totalPages / ITEMS_PER_PAGE),
    prods,
  });
});

//edit-product: getting data on edit page.
app.get("/:id", (req, res) => {
  const id = req.params.id;
  Prod.findById(id, (err, prods) => {
    res.json(prods);
  });
});

//removing product item
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Prod.findByIdAndRemove(id).exec();
  res.send("deleted");
});

//updating-item.
app.post("/:id", (req, res) => {
  const id = req.params.id;

  Prod.findByIdAndUpdate(id, req.body, (err, prods) => {
    if (!prods) {
      res.status(404).send("Product Data Not Found");
    } else {
      prods
        .save()
        .then((prods) => {
          res.json(prods);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 5000);
    console.log("Server is running on Port 5000 & connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
