//引用express
const express = require("express");
require("dotenv").config();

//利用express library來建立 web app
let app = express();

const port = process.env.SERVER_PORT || 3000;
//listen port 參數給它port,callback函式
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
