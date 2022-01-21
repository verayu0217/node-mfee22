const { readFile } = require("fs/promises");
const moment = require("moment");
const twse = require("./utils/twse");
const converter = require("./utils/converter");
const twseSaver = require("./utils/twseSaver");
const connection = require("./utils/db");

(async () => {
  try {
    // 根據變數去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    let stockNameData = await twse.queryStockName(stockNo);
    // 解析查到的資料
    let stockName = converter.parseStockName(stockNameData);
    // 儲存股票代碼與名稱進資料庫
    let saveNameResult = await twseSaver.saveStockName(
      connection,
      stockNo,
      stockName
    );

    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期
    // 去查資料
    let priceData = await twse.queryStockPrice(stockNo, queryDate);
    // 開始處理資料
    let processData = converter.convertPrice(priceData, stockNo);
    // 把整理好的資料存進資料庫
    let savePriceResult = await twseSaver.saveStockPrice(
      connection,
      processData
    );
    console.log(savePriceResult);
  } catch (e) {
    console.error(e);
  }
  connection.end();
})();
