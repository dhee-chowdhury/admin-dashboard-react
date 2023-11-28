const express = require("express");
const {
  getProducts,
  getCustomers,
} = require("../controllers/clientController");

const router = express.Router();

// Routes
router.get("/products", getProducts);
router.get("/customers", getCustomers);
module.exports = router;
