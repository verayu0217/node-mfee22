// 爬蟲
const axios = require("axios");
axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211201&stockNo=2330&_=1642085176492")
  .then(function (response) {
    //response 是很大的物件 只要data就.data
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

