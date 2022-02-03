const express = require("express");

let router = express.Router();

const stockController = require("../controllers/stock");

router.get("/", stockController.getAll);

router.get("/:stockId", stockController.getPriceByCode);

module.exports = router;
