// 1.用require引入
const axios = require("axios");

// 2.async宣告範圍 使用arrow function await後面是要做的事
//自己try-catch
  (async () => {
    try {
      let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211201&stockNo=2330&_=1642085176492");
      console.log(result.data);
    } catch (err) {
      console.error(err);
    }
  })();
  