const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require('dotenv').config();
const path = require("path");

const app = express();

app.use(helmet()); 

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@so-pockockobdd.dp9nk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connection to MongoDB successful !"))
  .catch(() => console.log("Connection to MongoDB failed !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;