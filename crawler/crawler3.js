const axios = require("axios");

// 得到讀取檔案的函式(nodejs內建)
const { readFile } = require("fs/promises");
// 得到取得日期套件(第三方所以要安裝、引用)
const moment = require("moment");


(async () => {
  try {

    // 根據變數去抓取資料
    let stockNo = await readFile("stock.txt", "utf-8");
    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期 不寫死


    // let response = await axios.get(
    //   `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`
    // );

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

    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();