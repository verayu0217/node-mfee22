const http = require("http");
require("dotenv").config();

// 做一個web server 接受request 回應resopnse
//參數放一個handle request function用來負責處理request 跟response
//用一個變數接收
const server = http.createServer(function (request, response) {
  //TODO: 怎麼處理request,要負責回覆response
  response.statusCode = 200;
  const path = request.url;
  console.log(path);

  //這個網站接受到任何網址都回同一頁 要處理路徑
  //status code HTTP狀態碼
  //1xx,2xx,3xx,4xx,5xx
  //現實上不會只是這樣 都還沒寫商業邏輯就在處理基本工作 就會有框架產生
  switch (path) {
    case "/":
      response.end("Hello, Server EFG");
      break;
    case "/about":
      response.end("Hello, this is about");
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

// 伺服器要listen 要給個port 值不會寫死在裡面 會用設定檔
// 設定檔會用dotenv npm i dotenv 新增.env儲存port ,|| 做預設值
let port = process.env.SERVER_PORT || 3000;

server.listen(port, () => {
  console.log(`我們的簡易版 server 已經啟動，在 port ${port}上`);
});

//執行檔案 會等待請求 clint用瀏覽器發出請求 打開瀏覽器輸入localhost:3001
