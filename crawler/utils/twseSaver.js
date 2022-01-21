// twseSaver

// 儲存名字
async function saveStockName(connection, stockNo, stockName) {
  let saveNameResult = await connection.execute(
    "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
    [stockNo, stockName]
  );
  return saveNameResult;
}

// 儲存價格
async function saveStockPrice(connection, processData) {
  return await connection
    .promise()
    .query(
      "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [processData]
    );
}

module.exports = { saveStockName, saveStockPrice };
