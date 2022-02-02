// 引入 express
const express = require("express");
require("dotenv").config();
// path 是 nodejs 內建的 lib
const path = require("path");
const cors = require("cors");

// 利用 express 這個 library 來建立一個 web app (express instance)
let app = express();

// express 是由 middleware 組成的
// request -> middleware 1 -> middleware 2 -> ... -> response
// 中間件順序很重要!! Express 會按照你程式碼的順序去決定 next 是誰
// 中間件裡一定要有 next 或是 res.xxx
// next: 往下一關走
// res.xxx 結束這次的旅程 (req-res cycle)

app.use(
  //為了要讓browser在CORS的情況下還是幫我們送cookie
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//啟用session
const expressSession = require("express-session");
let FileStore = require("session-file-store")(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, "..", "sessions"),
    }),
    secret: process.env.SESSION_SECRET,
    //每次請求發過來session資料沒改也重新存一次
    resave: false,
    saveUninitialized: false,
  })
);

// 設定 express 要用的樣版引擎(template engine)
// 設定視圖檔案要放在哪裡
app.set("views", path.join(__dirname, "views"));
// 要用哪一種 template engine
// npm i pug
app.set("view engine", "pug");

// 使用 express 內建的中間件
// 靜態檔案: 圖片、js 檔案、css 檔案, html...
// 寫法1: 不要有 網址 prefix
// localhost:3002/images/test.png
app.use(express.static(path.join(__dirname, "assets")));
// 寫法2: 有網址的 prefix
// localhost:3002/static/index.html --> 網址上就會有這個 url prefix
app.use("/static", express.static(path.join(__dirname, "public")));

// 一般中間件(自己開發的)
// app.use(function (request, response, next) {});
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來拜訪嚕 at ${current.toISOString()}`);
  next();
  // res.send("Hello Middleware");
});

app.use((req, res, next) => {
  console.log("這是一個沒有用的中間件");
  next();
});

// router middleware
// app.get("/", function(request, response, next) {});
app.get("/", (req, res, next) => {
  console.info("拜訪首頁");
  // 純文字
  // res.send("Hello Express");
  // 用 view engine 來渲染一個頁面
  // 這個 SSR (server-side render)
  res.render("index", {
    stocks: ["台積電", "長榮", "聯發科"],
  });
});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們");
  // res.send("我們是 MFEE22");
  next();
});

app.get("/checkout", (req, res, next) => {});

app.get("/about", (req, res, next) => {
  console.info("這是關於我們 B");
  // res.send("我們是 MFEE22 - Plan B");
  res.render("about");
});

app.get("/contact", (req, res, next) => {
  console.info("有人訪問聯絡我們");
  // 故意製造錯誤，測試錯誤處理中間件
  throw new Error("故意製造的錯誤");
  res.send("這是聯絡我們");
});

let stockRouter = require("./routers/stock");
app.use("/api/stock", stockRouter);

let memberRouter = require("./routers/member");
app.use("/api/member", memberRouter);

let authRouter = require("./routers/auth");
app.use("/api/auth", authRouter);

// 在所有路由中間件的後
// 既然前面都比對不到，那表示這裡是 404
// 利用「順序」這件事來做 404
app.use((req, res, next) => {
  console.log("在所有路由中間件的後面 -> 404");
  res.status(404).send("Not Found");
});

// 錯誤中間件：放在所有中間件的後面
// 有四個參數，是用來「捕捉」錯誤的
app.use((err, req, res, next) => {
  console.log("來自四個參數的錯誤處理中間件", err);
  res.status(500).send("Server 錯誤: 請洽系統管理員～～這裡是server.js");
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
