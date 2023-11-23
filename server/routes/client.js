const express = require("express");
const getProducts = require("../controllers/clientController");

const router = express.Router();

// Routes
router.get("/products", getProducts);

module.exports = router;
