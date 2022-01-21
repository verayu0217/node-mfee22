const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();

(async () => {
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    //1.讀檔案 抓到檔案代碼
    // 根據變數去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    let queryStockName = await axios.get(
      "https://www.twse.com.tw/zh/api/codeQuery",
      {
        params: {
          query: stockNo,
        },
      }
    );
    // console.log(queryStockName.data);
    // queryStockName.data.suggestions

    //2.檢查代碼有沒有資料內容
    if (
      !queryStockName.data.suggestions ||
      queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"
    ) {
      throw new Error("查無此代表");
    }
    // 可以到這裡，表示有資料
    let stockData = queryStockName.data.suggestions[0];
    let stockDatas = stockData.split("\t");
    //3.有的話把資料抓出來
    let stockName = stockDatas[1];

    // 4.儲存股票代碼與名稱進資料庫
    // Using prepared statements
    // to protect from SQL Injection attacks
    let saveNameResult = await connection.execute(
      "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
      [stockNo, stockName]
    );
    // console.log(saveNameResult);

    // 5.處理日期
    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

    //6.透過日期去查到價格資料
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        // 這裡可以放一些設定
        // params: 放 query string 的參數
        params: {
          response: "json",
          date: queryDate,
          stockNo,
        },
      }
    );

    // 7.價格資料做一個轉換
    let processData = response.data.data.map((d) => {
      // 處理民國年轉西元年
      let dateArr = d[0].split("/");
      dateArr[0] = Number(dateArr[0]) + 1911;
      d[0] = dateArr.join("-");
      // 對每一個欄位處理千分逗點
      d = d.map((value) => {
        return value.replace(/[,]+/g, "");
      });
      d.unshift(stockNo);
      return d;
    });
    console.log(processData);

    // 8.最後存到資料庫去
    let savePriceResult = await connection
      .promise()
      .query(
        "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
        [processData]
      );
    console.log(savePriceResult);
  } catch (e) {
    console.error(e);
  }
  connection.end();
})();
