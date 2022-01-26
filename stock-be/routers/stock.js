const express = require("express");

let router = express.Router();
const connection = require("../utils/db");

//建議加上api 符合RESTful API的列表
router.get("/", async (req, res, next) => {
  let [data, fields] = await connection.execute("SELECT * FROM stocks");

  console.log(data);
  res.json(data);
});

router.get("/:stockId", async (req, res, next) => {
  //取得目前在第幾頁
  //如果沒有設定req.query.page 那就設成1
  let page = req.query.page || 1;
  console.log("aaa", page);

  //TODO:取得目前總筆數
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?",
    [req.params.stockId]
  );

  console.log("bbb", total);
  total = total[0].total;

  //TODO:計算總共應該要有幾頁
  //  決定一頁有幾筆
  const perPage = 3;
  const lastPage = Math.ceil(total / perPage);

  //TODO: 計算SQL要用的offset
  let offset = (page - 1) * perPage;

  //TODO:取得資料
  let [data] = await connection.execute(
    "SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?",
    [req.params.stockId, perPage, offset]
  );

  //TODO:準備要response
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
});

module.exports = router;
