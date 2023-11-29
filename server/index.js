const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");

const clientRoutes = require("./routes/client");
const generalRoutes = require("./routes/general");
const managementRoutes = require("./routes/management");
const salesRoutes = require("./routes/sales");

// Data imports for the first time
// const Product = require("./models/productModel");
// const ProductStat = require("./models/productStatModel");
// const { dataProduct, dataProductStat, dataTransaction, dataUser } = require("./data/data");
// const Transaction = require("./models/transactionModel");
// const User = require("./models/userModel");

// initializing the app
const app = express();

// Configuration
// middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// mongoose setup: connect to db
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
