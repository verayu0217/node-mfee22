const express = require("express");
const router = express.Router();

router.get("/info", (req, res, next) => {
  res.json({
    id: 1,
    name: "假資料",
  });
});

module.exports = router;
