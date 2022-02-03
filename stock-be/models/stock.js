const connection = require("../utils/db");

async function getAll() {
  let [data, fields] = await connection.execute("SELECT * FROM stocks");

  console.log(data);
  return data;
}

async function countByCode(stockId) {
  //TODO:取得目前總筆數
  let [total] = await connection.execute(
    "SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?",
    [stockId]
  );
  return total[0].total;
}

async function getPriceByCode(stockId, perPage, offset) {
  //TODO:取得資料
  let [data] = await connection.execute(
    "SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?",
    [stockId, perPage, offset]
  );
  return data;
}

module.exports = {
  getAll,
  countByCode,
  getPriceByCode,
};
