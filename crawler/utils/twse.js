const axios = require("axios");

//查詢股票名
async function queryStockName(stockNo){
    let queryStockName = await axios.get(
        "https://www.twse.com.tw/zh/api/codeQuery",
        {
          params: {
            query: stockNo,
          },
        }
      );
      return queryStockName.data;
}


//查詢股票金額 
async function queryStockPrice(stockNo,queryDate){
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
        return response.data;
      
}

// exports出去
module.exports = {queryStockName,queryStockPrice};