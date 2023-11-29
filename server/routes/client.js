const express = require("express");
const {
  getProducts,
  getCustomers,
  getTransactions,
} = require("../controllers/clientController");

const router = express.Router();

// Routes
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);

module.exports = router;
